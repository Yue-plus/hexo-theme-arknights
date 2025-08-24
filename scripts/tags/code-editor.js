/* global hexo */

'use strict';

hexo.extend.tag.register('editor', (args, data) => {
  // args: [language, theme, readOnly, height, ...extras(key:value)]
  const lang = (args && args[0]) ? args[0] : 'javascript';
  const theme = (args && args[1]) ? args[1] : 'vs-dark';
  const readOnly = (args && args[2]) ? args[2] : 'true';
  let height = (args && args[3]) ? args[3] : '300px';
  if (/^\d+$/.test(String(height))) height = `${height}px`;
  const id = 'hexo-monaco-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const escapeHtml = (str = '') => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const contentEscaped = escapeHtml(data || '');

  const parseExtras = (arr) => {
    const opts = {};
    if (!Array.isArray(arr)) return opts;
    arr.forEach((item) => {
      if (typeof item !== 'string') {
        throw new Error(`Invalid option item: expected string "key:value", got ${typeof item}`);
      }
      const idx = item.indexOf(':');
      if (idx === -1) {
        throw new Error(`Invalid option "${item}": missing ':' separator, expected "key:value"`);
      }
      const key = item.slice(0, idx).trim();
      const valueRaw = item.slice(idx + 1).trim();
      if (!key) {
        throw new Error(`Invalid option "${item}": empty key`);
      }

      let value;
      // boolean
      if (/^true$/i.test(valueRaw) || /^on$/i.test(valueRaw)) value = true;
      else if (/^false$/i.test(valueRaw) || /^off$/i.test(valueRaw)) value = false;
      // number (int or float, optional + or -)
      else if (/^[+-]?\d+(\.\d+)?$/.test(valueRaw)) value = Number(valueRaw);
      // null
      else if (valueRaw === 'null') value = null;
      // quoted string: double-quoted -> JSON.parse; single-quoted -> convert to JSON string
      else if (valueRaw.length >= 2 && valueRaw[0] === '"' && valueRaw[valueRaw.length - 1] === '"') {
        try {
          value = JSON.parse(valueRaw);
        } catch (e) {
          throw new Error(`Invalid string value for key "${key}": ${valueRaw}`);
        }
      } else if (valueRaw.length >= 2 && valueRaw[0] === "'" && valueRaw[valueRaw.length - 1] === "'") {
        // convert single-quoted to JSON-parseable double-quoted string, preserve escapes
        const inner = valueRaw.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        try {
          value = JSON.parse('"' + inner + '"');
        } catch (e) {
          throw new Error(`Invalid string value for key "${key}": ${valueRaw}`);
        }
      } else {
        throw new Error(`Invalid option value for key "${key}": ${valueRaw}. Allowed types: boolean, number, null, or quoted string.`);
      }

      opts[key] = value;
    });
    return opts;
  };

  const extras = parseExtras((args || []).slice(3));
  // encode options so they survive HTML attribute encoding reliably; frontend will decode
  const extrasJsonEncoded = encodeURIComponent(JSON.stringify(extras));

  return `<div id="${id}" class="monaco-editor-code"
               data-lang="${lang}"
               data-theme="${theme}"
               data-readonly="${readOnly}"
               data-height="${height}"
               data-options="${extrasJsonEncoded}"
               style="height:${height};"><pre id="${id}-source" style="display:none">${contentEscaped}</pre></div>`;
}, { ends: true })
