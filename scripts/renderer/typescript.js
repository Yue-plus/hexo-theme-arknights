"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var ts = require("typescript");
var os = require("os");
var path = require("path");
function reportDiagnostics(diagnostics) {
    if (!diagnostics)
        return;
    diagnostics.forEach(function (diagnostic) {
        var message = ts.formatDiagnostic(diagnostic, {
            getCurrentDirectory: function () { return hexo.theme_dir; },
            getNewLine: function () { return os.EOL; },
            getCanonicalFileName: function (fileName) { return path.normalize(fileName); }
        });
        hexo.log.error(message.trim());
    });
}
function getCompileOption(options) {
    var config = hexo.theme.config.render.ts;
    var defaultOptions = ts.getDefaultCompilerOptions();
    var fileOptions = null;
    if (config) {
        if (typeof config === "object") {
            var result = ts.convertCompilerOptionsFromJson(config, hexo.theme_dir);
            reportDiagnostics(result.errors);
            fileOptions = result.options;
        }
        else {
            var file = hexo.theme_dir + String(config);
            var json = require(file);
            var result = ts.convertCompilerOptionsFromJson(json.compilerOptions, hexo.theme_dir, String(config));
            reportDiagnostics(result.errors);
            fileOptions = result.options;
        }
    }
    var argOptions = null;
    if (options) {
        var result = ts.convertCompilerOptionsFromJson(options, hexo.theme_dir);
        reportDiagnostics(result.errors);
        argOptions = result.options;
    }
    var mergedOptions = __assign(__assign(__assign({}, defaultOptions), fileOptions), argOptions);
    // transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between input and output paths.
    mergedOptions.suppressOutputPathCheck = true;
    // Filename can be non-ts file.
    mergedOptions.allowNonTsExtensions = true;
    // We are not doing a full typecheck, we are not resolving the whole context,
    // so pass --noResolve to avoid reporting missing file errors.
    mergedOptions.noResolve = true;
    return mergedOptions;
}
function tsRenderer(data, hexoOptions) {
    var options = getCompileOption(hexoOptions);
    // if jsx is specified then treat file as .tsx
    var inputFileName = data.path || (options.jsx ? "module.tsx" : "module.ts");
    var sourceFile = ts.createSourceFile(inputFileName, data.text, options.target);
    // Output
    var outputText;
    var sourceMapText;
    var defHost = ts.createCompilerHost(options);
    // Create a compilerHost object to allow the compiler to read and write files
    var compilerHost = __assign(__assign({}, defHost), { getSourceFile: function (fileName, langVersion, onError, shouldCreateNewSourceFile) {
            return fileName === path.normalize(inputFileName)
                ? sourceFile
                : defHost.getSourceFile(fileName, langVersion, onError, shouldCreateNewSourceFile);
        }, writeFile: function (name, text) {
            if (path.extname(name) === ".map") {
                sourceMapText = text;
            }
            else {
                outputText = text;
            }
        }, useCaseSensitiveFileNames: function () { return false; }, getCanonicalFileName: function (fileName) { return fileName; }, getCurrentDirectory: function () { return hexo.theme_dir; }, fileExists: function (fileName) {
            return fileName === inputFileName || defHost.fileExists(fileName);
        } });
    var program = ts.createProgram([inputFileName], options, compilerHost);
    // Emit
    var emitResult = program.emit();
    var allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    reportDiagnostics(allDiagnostics);
    return outputText || "";
}
hexo.extend.renderer.register("ts", "js", tsRenderer, true);
hexo.extend.renderer.register("tsx", "js", tsRenderer, true);
