"use strict";
function BgmControl() {
    const bgm = document.getElementById('bgm');
    const control = document.getElementById("bgm-control");
    if (bgm.paused) {
        bgm.play();
        control.setAttribute("fill", "#18d1ff");
        control.style.transform = "scaleY(1)";
    }
    else {
        bgm.pause();
        control.setAttribute("fill", "currentColor");
        control.style.transform = "scaleY(.5)";
    }
}
function getElement(string, item = document.documentElement) {
    let tmp = item.querySelector(string);
    if (tmp === null) {
        throw new Error("Unknown HTML");
    }
    return tmp;
}
function getParent(item, level = 1) {
    while (level--) {
        let tmp = item.parentElement;
        if (tmp === null) {
            throw new Error("Unknown HTML");
        }
        item = tmp;
    }
    return item;
}
function format(format, ...args) {
    return format.replaceAll(/\$\*?[0-9]*/g, (match) => {
        if (match === '$*') {
            return '';
        }
        let Index = match.slice(1);
        if (Index >= args.length) {
            return '';
        }
        return args[Index];
    });
}
/// <reference path="common/base.ts" />
class expands {
    reverse = (item, s0, s1) => {
        const block = getParent(item);
        if (block.classList.contains(s0)) {
            block.classList.remove(s0);
            block.classList.add(s1);
        }
        else {
            block.classList.remove(s1);
            block.classList.add(s0);
        }
    };
    addEvent = (header) => {
        header.addEventListener('click', (click) => {
            if (click.target.tagName !== 'BUTTON' &&
                click.target.tagName !== 'A') {
                this.reverse(header, 'open', 'fold');
            }
        });
        header.addEventListener('keypress', (key) => {
            if (key.key === 'Enter') {
                this.reverse(header, 'open', 'fold');
            }
        });
    };
    setHTML = () => {
        document.querySelectorAll('.expand-box').forEach((item) => {
            this.addEvent(item.children[0]);
        });
    };
    constructor() { }
}
let expand = new expands();
class Code {
    mermaids = [];
    doAsMermaid = (item) => {
        let Amermaid = item.querySelector('.mermaid');
        item.outerHTML = '<div class="highlight mermaid">' + Amermaid.innerText + '</div>';
    };
    resetName = (str) => {
        if (str == 'plaintext') {
            return 'TEXT';
        }
        if (str == 'cs') {
            return 'C#';
        }
        if (str == 'cpp') {
            return 'C++';
        }
        return str.toUpperCase();
    };
    doAsCode = (item) => {
        const code_fold = page_config.code_fold || config.code_fold || -1;
        const codeType = this.resetName(item.classList[1]), lineCount = getElement('.gutter', item).children[0].childElementCount >> 1;
        item.classList.add(lineCount <= code_fold || code_fold === -1 ? 'open' : 'fold');
        item.classList.add('expand-box');
        item.innerHTML =
            `<div class="ex-header" tabindex='0'>
        <i class="i-status"></i>
        <span class="ex-title">${format(config.code.codeInfo, codeType, lineCount)}</span>
      </div>
      <div class="ex-content">${item.innerHTML}
        <button class="code-copy" title="${config.code.copy}"></button>
      </div>`;
        getElement('.code-copy', item).addEventListener('click', (click) => {
            const button = click.target;
            navigator.clipboard.writeText(getElement('code', item).innerText);
            button.classList.add('copied');
            setTimeout(() => {
                button.classList.remove('copied');
            }, 1200);
        });
    };
    paintMermaid = () => {
        if (typeof (mermaid) === 'undefined')
            return;
        mermaid.initialize(document.documentElement.getAttribute('theme-mode') === 'dark' ?
            { theme: 'dark' } : { theme: 'default' });
        if (typeof (mermaid.run) !== 'undefined') {
            mermaid.run({ querySelector: '.mermaid' });
        }
        else {
            mermaid.init();
        }
    };
    findCode = () => {
        let codeBlocks = document.querySelectorAll('.highlight');
        if (codeBlocks !== null) {
            codeBlocks.forEach(item => {
                if (item.getAttribute('code-find') === null) {
                    try {
                        if (!item.classList.contains('mermaid') && item.querySelector('.code-header') === null) {
                            if (item.querySelector('.mermaid') !== null) {
                                this.doAsMermaid(item);
                            }
                            else {
                                this.doAsCode(item);
                            }
                        }
                    }
                    catch (e) {
                        return;
                    }
                    item.setAttribute('code-find', '');
                }
            });
        }
        document.querySelectorAll('.mermaid').forEach((item) => {
            this.mermaids.push(item.outerHTML);
        });
        expand.setHTML();
    };
    resetMermaid = () => {
        if (typeof (mermaid) === 'undefined')
            return;
        let id = 0;
        document.querySelectorAll('.mermaid').forEach((item) => {
            item.outerHTML = this.mermaids[id];
            ++id;
        });
        this.paintMermaid();
    };
    constructor() {
        this.findCode();
        document.addEventListener('pjax:success', this.findCode);
        window.addEventListener('hexo-blog-decrypt', this.findCode);
    }
}
let code = new Code();
class dust {
    x;
    y;
    vx = Math.random() * 1 + 1;
    vy = Math.random() * 1 + 0.01;
    shadowBlur = Math.random() * 3;
    shadowX = (Math.random() * 2) - 1;
    shadowY = (Math.random() * 2) - 1;
    radiusX = Math.random() * 1.5 + 0.5;
    radiusY = this.radiusX * (Math.random() * (1.3 - 0.3) + 0.3);
    rotation = Math.PI * Math.floor(Math.random() * 2);
    constructor(x = 50, y = 50) {
        this.x = x;
        this.y = y;
    }
}
class canvasDust {
    canvas;
    ctx;
    color = '#fff';
    width = 300;
    height = 300;
    dustQuantity = 50;
    dustArr = [];
    inStop = false;
    constructor(canvasID) {
        const canvas = getElement(canvasID);
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.build();
        window.addEventListener('resize', this.resize);
    }
    build = () => {
        this.resize();
        if (this.ctx) {
            const point = canvasDust.getPoint(this.dustQuantity);
            for (let i of point) {
                const dustObj = new dust(i[0], i[1]);
                this.buildDust(dustObj);
                this.dustArr.push(dustObj);
            }
            requestAnimationFrame(this.paint);
        }
    };
    paint = () => {
        if (this.inStop) {
            return;
        }
        const dustArr = this.dustArr;
        for (let i of dustArr) {
            this.ctx.clearRect(i.x - 6, i.y - 6, 12, 12);
            if (i.x < -5 || i.y < -5) {
                const x = this.width;
                const y = Math.floor(Math.random() * window.innerHeight);
                i.x = x;
                i.y = y;
            }
            else {
                i.x -= i.vx;
                i.y -= i.vy;
            }
        }
        for (let i of dustArr) {
            this.buildDust(i);
        }
        requestAnimationFrame(this.paint);
    };
    buildDust = (dust) => {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.shadowBlur = dust.shadowBlur;
        ctx.shadowOffsetX = dust.shadowX;
        ctx.shadowOffsetY = dust.shadowY;
        ctx.ellipse(dust.x, dust.y, dust.radiusX, dust.radiusY, dust.rotation, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };
    resize = () => {
        const canvas = this.canvas;
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.width = width;
        this.height = height;
        this.dustQuantity = Math.floor((width + height) / 38);
        canvas.width = width;
        canvas.height = height;
        this.ctx.shadowColor =
            this.ctx.fillStyle = this.color;
    };
    static getPoint = (number = 1) => {
        let point = [];
        for (let i = 0; i < number; ++i) {
            const x = Math.floor(Math.random() * window.innerWidth);
            const y = Math.floor(Math.random() * window.innerHeight);
            point.push([x, y]);
        }
        return point;
    };
    stop = () => {
        this.inStop = true;
    };
    play = () => {
        if (this.inStop === true) {
            this.inStop = false;
            requestAnimationFrame(this.paint);
        }
    };
}
try {
    var canvasDusts = new canvasDust('#canvas-dust');
}
catch (e) { }
class GiscusManager {
    messageHandlers = [];
    config = null;
    loaded = false;
    settingsLoadedPromise = null;
    containerPromise = null;
    isLoading = false;
    loadStartTime = 0;
    showErrorTimeoutId = null;
    activeTimeouts = new Set();
    async loadConfig() {
        if (this.loaded)
            return this.config;
        try {
            const response = await fetch('/giscus.json');
            if (response.ok) {
                this.config = await response.json();
            }
        }
        catch (e) {
            console.warn('加载Giscus配置文件失败:', e);
        }
        this.loaded = true;
        return this.config;
    }
    async validateOrigin() {
        if (typeof window === 'undefined')
            return true;
        const currentOrigin = window.location.origin;
        const settings = window.giscusSettings;
        if (settings?.origin === currentOrigin)
            return true;
        const config = await this.loadConfig();
        if (!config)
            return true;
        if (config.origins?.includes(currentOrigin))
            return true;
        if (config.originsRegex?.length) {
            for (const pattern of config.originsRegex) {
                try {
                    if (pattern && new RegExp(pattern).test(currentOrigin))
                        return true;
                }
                catch (e) {
                    console.warn('无效的正则表达式模式:', pattern, e);
                }
            }
        }
        return !(config.origins?.length || config.originsRegex?.length);
    }
    waitForGiscusSettings(timeout = 8000) {
        if (this.settingsLoadedPromise) {
            return this.settingsLoadedPromise;
        }
        this.settingsLoadedPromise = new Promise((resolve, reject) => {
            const settings = window.giscusSettings;
            if (settings !== undefined) {
                resolve(settings);
                return;
            }
            let timeoutId;
            const startTime = Date.now();
            const checkSettings = () => {
                const currentSettings = window.giscusSettings;
                if (currentSettings !== undefined) {
                    this.activeTimeouts.delete(timeoutId);
                    resolve(currentSettings);
                    return;
                }
                if (Date.now() - startTime > timeout) {
                    this.activeTimeouts.delete(timeoutId);
                    reject(new Error(`Giscus配置加载超时 (${timeout}ms)`));
                    return;
                }
                timeoutId = setTimeout(checkSettings, 100);
                this.activeTimeouts.add(timeoutId);
            };
            checkSettings();
        });
        return this.settingsLoadedPromise;
    }
    waitForContainer(timeout = 5000) {
        if (this.containerPromise) {
            return this.containerPromise;
        }
        this.containerPromise = new Promise((resolve, reject) => {
            let timeoutId;
            const checkContainer = () => {
                const container = document.querySelector('#giscus');
                if (container) {
                    this.activeTimeouts.delete(timeoutId);
                    resolve(container);
                    return;
                }
                timeoutId = setTimeout(checkContainer, 100);
                this.activeTimeouts.add(timeoutId);
            };
            if (typeof document === 'undefined') {
                reject(new Error('文档对象不可用'));
                return;
            }
            setTimeout(() => {
                this.activeTimeouts.delete(timeoutId);
                reject(new Error(`Giscus容器未找到 (${timeout}ms)`));
            }, timeout);
            if (document.readyState === 'loading') {
                const domContentLoadedHandler = () => {
                    checkContainer();
                };
                document.addEventListener('DOMContentLoaded', domContentLoadedHandler, { once: true });
            }
            else {
                checkContainer();
            }
        });
        return this.containerPromise;
    }
    async loadGiscusScript() {
        if (this.isLoading) {
            throw new Error('Giscus脚本正在加载中');
        }
        this.isLoading = true;
        this.loadStartTime = Date.now();
        this.settingsLoadedPromise = null;
        this.containerPromise = null;
        this.clearAllMessages();
        try {
            const [container, settings] = await Promise.all([
                this.waitForContainer(),
                this.waitForGiscusSettings()
            ]);
            const existingScript = container.querySelector('script[src*="giscus.app/client.js"]');
            const existingIframe = container.querySelector('iframe.giscus-frame');
            if (existingScript)
                existingScript.remove();
            if (existingIframe)
                existingIframe.remove();
            const script = document.createElement('script');
            script.src = 'https://giscus.app/client.js';
            script.async = true;
            const attributes = {
                'data-repo': settings.repo,
                'data-repo-id': settings.repoId,
                'data-category': settings.category,
                'data-category-id': settings.categoryId,
                'data-mapping': settings.mapping,
                'data-strict': settings.strict,
                'data-reactions-enabled': settings.reactionsEnabled,
                'data-emit-metadata': settings.emitMetadata,
                'data-input-position': settings.inputPosition,
                'data-lang': settings.lang,
                'data-theme': this.getGiscusTheme(document.documentElement.getAttribute('theme-mode')),
                'crossorigin': settings.crossorigin || 'anonymous'
            };
            Object.entries(attributes).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    script.setAttribute(key, String(value));
                }
            });
            container.appendChild(script);
            await new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    reject(new Error('Giscus脚本加载超时'));
                }, 15000);
                script.onload = () => {
                    clearTimeout(timeoutId);
                    resolve();
                };
                script.onerror = () => {
                    clearTimeout(timeoutId);
                    reject(new Error('Giscus脚本加载失败'));
                };
            });
            this.clearAllMessages();
        }
        catch (error) {
            const container = document.querySelector('#giscus');
            if (container) {
                this.showErrorWithDelay(container, error);
            }
            throw error;
        }
        finally {
            this.isLoading = false;
        }
    }
    showErrorWithDelay(container, error) {
        if (this.showErrorTimeoutId) {
            clearTimeout(this.showErrorTimeoutId);
        }
        this.showErrorTimeoutId = setTimeout(() => {
            const loadTime = Math.round((Date.now() - this.loadStartTime) / 1000);
            let msg = '网络连接较慢';
            if (error.message.includes('超时')) {
                msg = `加载超时 (${loadTime}秒)`;
            }
            else if (error.message.includes('失败')) {
                msg = '网络连接失败';
            }
            const errorDiv = document.createElement('div');
            errorDiv.className = 'giscus-error-message';
            const iconDiv = document.createElement('div');
            iconDiv.className = 'giscus-error-icon';
            iconDiv.textContent = '⏳';
            const contentDiv = document.createElement('div');
            contentDiv.className = 'giscus-error-content';
            const titleDiv = document.createElement('div');
            titleDiv.className = 'giscus-error-title';
            titleDiv.textContent = '评论系统加载较慢';
            const messageDiv = document.createElement('div');
            messageDiv.className = 'giscus-error-message-text';
            messageDiv.textContent = msg;
            const retryButton = document.createElement('button');
            retryButton.className = 'giscus-error-retry';
            retryButton.textContent = '重新加载';
            retryButton.addEventListener('click', () => {
                retryButton.disabled = true;
                retryButton.textContent = '重新加载中...';
                const manager = window.giscusManager;
                if (manager?.loadGiscusScript) {
                    manager.loadGiscusScript().finally(() => {
                        retryButton.disabled = false;
                        retryButton.textContent = '重新加载';
                    });
                }
            });
            contentDiv.appendChild(titleDiv);
            contentDiv.appendChild(messageDiv);
            contentDiv.appendChild(retryButton);
            errorDiv.appendChild(iconDiv);
            errorDiv.appendChild(contentDiv);
            const existingError = container.querySelector('.giscus-error-message');
            if (existingError)
                existingError.remove();
            container.appendChild(errorDiv);
            this.showErrorTimeoutId = null;
        }, 5000);
    }
    async getDefaultCommentOrder() {
        return (await this.loadConfig())?.defaultCommentOrder || 'oldest';
    }
    getGiscusTheme(siteTheme) {
        const themeConfig = window.giscusThemeConfig;
        if (themeConfig?.theme)
            return themeConfig.theme;
        if (themeConfig?.light && themeConfig?.dark) {
            return siteTheme === 'dark' ? themeConfig.dark : themeConfig.light;
        }
        return siteTheme === 'auto' || !siteTheme ? 'preferred_color_scheme'
            : siteTheme === 'dark' ? 'dark' : 'light';
    }
    syncTheme(theme) {
        return this.sendMessage({
            setConfig: {
                theme: this.getGiscusTheme(theme || document.documentElement.getAttribute('theme-mode'))
            }
        });
    }
    sendMessage(message) {
        if (!message)
            return false;
        const iframe = document.querySelector('iframe.giscus-frame');
        if (!iframe?.contentWindow)
            return false;
        try {
            iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
            return true;
        }
        catch (e) {
            return false;
        }
    }
    addMessageHandler(handler) {
        this.messageHandlers.push(handler);
    }
    removeMessageHandler(handler) {
        const index = this.messageHandlers.indexOf(handler);
        if (index > -1)
            this.messageHandlers.splice(index, 1);
    }
    isLoaded() {
        return !!document.querySelector('iframe.giscus-frame');
    }
    destroy() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('message', this.handleMessage);
        }
        if (this.showErrorTimeoutId) {
            clearTimeout(this.showErrorTimeoutId);
            this.showErrorTimeoutId = null;
        }
        this.settingsLoadedPromise = null;
        this.containerPromise = null;
        this.messageHandlers = [];
        this.isLoading = false;
        this.loadStartTime = 0;
        this.activeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        this.activeTimeouts.clear();
    }
    constructor() {
        if (typeof window !== 'undefined') {
            window.addEventListener('message', this.handleMessage);
        }
    }
    handleMessage = (event) => {
        if (!event || event.origin !== 'https://giscus.app')
            return;
        if (!(typeof event.data === 'object' && event.data?.giscus))
            return;
        const giscusData = event.data.giscus;
        try {
            this.messageHandlers.forEach(handler => {
                if (typeof handler === 'function') {
                    handler(giscusData);
                }
            });
        }
        catch (e) {
            console.warn('Giscus 消息处理异常:', e);
        }
    };
    clearAllMessages() {
        if (this.showErrorTimeoutId) {
            clearTimeout(this.showErrorTimeoutId);
            this.showErrorTimeoutId = null;
        }
        const container = document.querySelector('#giscus');
        if (container) {
            const existingError = container.querySelector('.giscus-error-message');
            if (existingError)
                existingError.remove();
        }
    }
}
let giscusManager;
if (typeof window !== 'undefined') {
    giscusManager = new GiscusManager();
    window.giscusManager = giscusManager;
}
class ColorMode {
    html = document.documentElement;
    dark = this.html.getAttribute('theme-mode') === 'dark';
    inChanging = false;
    btn = getElement('#color-mode');
    syncGiscusTheme = () => {
        if (typeof giscusManager !== 'undefined' && giscusManager.isLoaded()) {
            giscusManager.syncTheme();
        }
    };
    change = () => {
        this.inChanging = true;
        let background = document.createElement('div');
        background.style.transition = '1.5s';
        background.innerHTML =
            `<div style='background: var(--${this.dark ? 'dark' : 'light'}-background);
        height: 100vh; width: 100vw;
        position: fixed; left: 0; top: 0; z-index: -99999;
        background-attachment: fixed;
        background-position: 50% 0;
        background-repeat: no-repeat;
        background-size: cover;'></div>`;
        document.body.insertBefore(background, document.body.firstChild);
        this.btn.style.pointerEvents = 'none';
        setTimeout(() => {
            if (canvasDusts)
                canvasDusts.stop();
            if (this.dark) {
                this.html.setAttribute('theme-mode', 'light');
                this.dark = false;
                window.localStorage['theme-mode'] = 'light';
            }
            else {
                this.html.setAttribute('theme-mode', 'dark');
                this.dark = true;
                window.localStorage['theme-mode'] = 'dark';
            }
            background.style.opacity = '0';
            code.resetMermaid();
            this.syncGiscusTheme();
        });
        setTimeout(() => {
            document.body.removeChild(background);
            if (canvasDusts)
                canvasDusts.play();
        }, 1500);
        setTimeout(() => {
            this.btn.style.pointerEvents = '';
            this.inChanging = false;
        }, 1000);
    };
    constructor() {
        document.addEventListener('keypress', (ev) => {
            if (this.inChanging) {
                return;
            }
            if (ev.key === 'c' && ev.target &&
                !['INPUT', 'TEXTAREA'].includes(ev.target.tagName)) {
                this.change();
            }
        });
    }
}
try {
    var colorMode = new ColorMode();
}
catch (e) { }
class Pair {
    comment;
    button;
    constructor(first, second) {
        this.comment = first;
        this.button = second;
    }
}
class Selectors {
    elements = [];
    nowActive;
    changeTo = (item) => {
        if (item === this.nowActive) {
            return;
        }
        this.nowActive.comment.style.display = 'none';
        this.nowActive.button.classList.remove('active');
        item.comment.style.display = '';
        item.button.classList.add('active');
        this.nowActive = item;
    };
    constructor(elements = [], active = 0) {
        this.elements = elements;
        this.nowActive = this.elements[active];
        this.elements.forEach((item) => item.comment.style.display = 'none');
        this.nowActive = this.elements[0];
        for (let i of this.elements) {
            i.button.addEventListener('click', () => this.changeTo(i));
        }
        this.nowActive.comment.style.display = '';
        this.nowActive.button.classList.add('active');
    }
}
class Comments {
    search = ["valine", "gitalk", "waline", "artalk", "utterances", "giscus"];
    elements = [];
    async validateGiscusOrigin() {
        return typeof giscusManager !== 'undefined' ? await giscusManager.validateOrigin() : true;
    }
    async loadGiscus() {
        const container = document.querySelector('#giscus');
        if (!container)
            return;
        const isOriginValid = await this.validateGiscusOrigin();
        if (!isOriginValid)
            return;
        if (typeof giscusManager !== 'undefined') {
            giscusManager.loadGiscusScript();
        }
    }
    setHTML = async () => {
        const commentsContainer = document.querySelector('#comments');
        if (!commentsContainer)
            return;
        const selectorContainer = commentsContainer.querySelector('.selector');
        if (selectorContainer) {
            this.elements = [];
            this.search.forEach((item) => {
                try {
                    this.elements.push(new Pair(getElement(`#${item}`), getElement(`.${item}-sel`)));
                }
                catch (e) { }
            });
            new Selectors(this.elements, 0);
        }
        await this.loadGiscus();
    };
    constructor() {
        this.setHTML();
        document.addEventListener('pjax:complete', this.setHTML);
    }
}
new Comments();
class Cursor {
    now = new MouseEvent('');
    first = true;
    last = 0;
    moveIng = false;
    fadeIng = false;
    nowX = 0;
    nowY = 0;
    outer;
    effecter;
    attention = `a,input,button,textarea,
    .navBtnIcon,
    #post-content img,
    .ex-header,
    .gt-user-inner,
    .wl-sort>li,
    #valine .vicon,#valine .vat,
    .lg-container img,.clickable`;
    set = (X = this.nowX, Y = this.nowY) => {
        this.outer.transform =
            `translate(calc(${X.toFixed(2)}px - 50%),
                  calc(${Y.toFixed(2)}px - 50%))`;
    };
    move = (timestamp) => {
        if (this.now !== undefined) {
            let delX = this.now.x - this.nowX, delY = this.now.y - this.nowY;
            this.nowX += delX * Math.min(0.025 * (timestamp - this.last), 1);
            this.nowY += delY * Math.min(0.025 * (timestamp - this.last), 1);
            this.set();
            this.last = timestamp;
            if (Math.abs(delX) > 0.1 || Math.abs(delY) > 0.1) {
                window.requestAnimationFrame(this.move);
            }
            else {
                this.set(this.now.x, this.now.y);
                this.moveIng = false;
            }
        }
    };
    reset = (mouse) => {
        this.outer.top = '0';
        this.outer.left = '0';
        if (!this.moveIng) {
            this.moveIng = true;
            window.requestAnimationFrame(this.move);
        }
        this.now = mouse;
        if (this.first) {
            this.first = false;
            this.nowX = this.now.x;
            this.nowY = this.now.y;
            this.set();
        }
    };
    Aeffect = (mouse) => {
        if (this.fadeIng == false) {
            this.fadeIng = true;
            this.effecter.left = String(mouse.x) + 'px';
            this.effecter.top = String(mouse.y) + 'px';
            this.effecter.transition =
                'transform .5s cubic-bezier(0.22, 0.61, 0.21, 1)\
        ,opacity .5s cubic-bezier(0.22, 0.61, 0.21, 1)';
            this.effecter.transform = 'translate(-50%, -50%) scale(1)';
            this.effecter.opacity = '0';
            setTimeout(() => {
                this.fadeIng = false;
                this.effecter.transition = '';
                this.effecter.transform = 'translate(-50%, -50%) scale(0)';
                this.effecter.opacity = '1';
            }, 500);
        }
    };
    hold = () => {
        this.outer.height = '24px';
        this.outer.width = '24px';
        this.outer.background = "var(--theme-cursor-bg)";
    };
    relax = () => {
        this.outer.height = '36px';
        this.outer.width = '36px';
        this.outer.background = "unset";
    };
    pushHolder = () => {
        document.querySelectorAll(this.attention).forEach(item => {
            if (!item.classList.contains('is--active')) {
                item.addEventListener('mouseover', this.hold, { passive: true });
                item.addEventListener('mouseout', this.relax, { passive: true });
            }
        });
    };
    constructor() {
        let node = document.createElement('div');
        node.id = 'cursor-container';
        node.innerHTML = `<div id="cursor-outer"></div><div id="cursor-effect"></div>`;
        document.body.appendChild(node);
        this.outer = getElement('#cursor-outer', node).style;
        this.outer.top = '-100%';
        this.effecter = getElement('#cursor-effect', node).style;
        this.effecter.transform = 'translate(-50%, -50%) scale(0)';
        this.effecter.opacity = '1';
        window.addEventListener('mousemove', this.reset, { passive: true });
        window.addEventListener('click', this.Aeffect, { passive: true });
        this.pushHolder();
        const observer = new MutationObserver(this.pushHolder);
        observer.observe(document, { childList: true, subtree: true });
    }
}
new Cursor();
class Header {
    header = getElement('header');
    button = getElement('.navBtnIcon');
    closeSearch = false;
    readyRev = true;
    relabel = () => {
        let navs = this.header.querySelectorAll('.navItem'), mayLen = 0, may = navs.item(0);
        navs.forEach(item => {
            try {
                let now = item, link = getElement('a', now);
                if (link !== null) {
                    let href = link.href, match = now.getAttribute('matchdata');
                    now.classList.remove('active');
                    if (getParent(link) != now) {
                        return;
                    }
                    if (href.length > mayLen && document.URL.match(href) !== null) {
                        mayLen = href.length;
                        may = now;
                    }
                    if (match) {
                        const s = match.split(',');
                        s.forEach(item => {
                            if (document.URL.match(item) !== null) {
                                may = now;
                                mayLen = Infinity;
                            }
                        });
                    }
                }
            }
            catch (e) { }
        });
        if (may !== null) {
            do {
                if (may.classList.contains('navItem')) {
                    may.classList.add('active');
                }
            } while (!(may = getParent(may)).classList.contains('navContent'));
        }
    };
    inHeader = (mouse) => {
        let range = this.header.getBoundingClientRect();
        if (mouse.clientX < range.x || mouse.clientY < range.y ||
            mouse.clientX > range.right || mouse.clientY > range.bottom) {
            this.close();
        }
    };
    open = (item = this.header) => {
        item.classList.add('expanded');
        item.classList.remove('closed');
        scrolls.slideDown();
        if (item === this.header) {
            item.classList.add('moving');
            setTimeout(() => item.classList.remove('moving'), 300);
        }
        document.addEventListener('click', this.inHeader);
    };
    close = (item = this.header) => {
        document.removeEventListener('click', this.inHeader);
        item.classList.add('closed');
        item.classList.remove('expanded');
        if (item === this.header) {
            item.classList.add('moving');
            setTimeout(() => item.classList.remove('moving'), 300);
            this.closeAll();
            getElement('nav', item).classList.remove('moved');
        }
    };
    reverse = (item = this.header) => {
        if (this.closeSearch) {
            this.closeSearch = false;
            return;
        }
        if (!this.readyRev) {
            return;
        }
        this.readyRev = false;
        if (item.classList.contains('expanded')) {
            this.close(item);
        }
        else {
            this.open(item);
        }
        setTimeout(() => this.readyRev = true, 300);
    };
    closeAll = () => {
        this.header.querySelectorAll('.expanded').forEach((item) => item.classList.remove('expanded'));
    };
    constructor() {
        this.relabel();
        document.addEventListener('pjax:success', this.relabel);
        document.addEventListener('pjax:send', () => this.close());
        this.button.addEventListener('mousedown', () => {
            if (document.querySelector('.search')) {
                this.closeSearch = true;
            }
        });
        this.button.onclick = () => this.reverse(this.header);
        document.querySelectorAll('.navItemList').forEach((item) => {
            item = getParent(item);
            item.addEventListener('click', (event) => {
                if (getParent(event.target) === item) {
                    this.reverse(item);
                }
            });
        });
    }
}
var header = new Header();
class Index {
    lastIndex = -1;
    headerLink = document.querySelectorAll('null');
    tocLink = document.querySelectorAll('null');
    setItem = (item) => {
        item.classList.add('active');
        let parent = getParent(item), brother = parent.children;
        for (let i = 0, length = brother.length; i < length; ++i) {
            const item = brother.item(i);
            if (item.classList.contains('toc-child')) {
                item.classList.add('has-active');
                break;
            }
        }
        for (; parent.classList[0] !== 'toc'; parent = getParent(parent)) {
            if (parent.classList[0] === 'toc-child') {
                parent.classList.add('has-active');
            }
        }
    };
    reset = (not) => {
        let tocs = document.querySelectorAll('#toc-div .active');
        let tocTree = document.querySelectorAll('#toc-div .has-active');
        tocs.forEach(item => {
            if (!item.contains(not)) {
                item.classList.remove('active');
            }
        });
        tocTree.forEach(item => {
            if (!item.parentElement.contains(not)) {
                item.classList.remove('has-active');
            }
        });
    };
    check = (index, id) => {
        return index[id + 1] > window.innerHeight / 3 || index[id] > 0;
    };
    modifyIndex = () => {
        let index = [];
        this.headerLink.forEach(item => {
            index.push(item.getBoundingClientRect().top);
        });
        if (this.lastIndex >= 0 &&
            (this.lastIndex < 1 || !this.check(index, this.lastIndex - 1)) &&
            this.check(index, this.lastIndex)) {
            return;
        }
        for (let i = 0; i < this.tocLink.length; ++i) {
            const item = this.tocLink.item(i);
            if (i + 1 === index.length || this.check(index, i)) {
                this.lastIndex = i;
                this.setItem(item);
                this.reset(item);
                return;
            }
        }
        this.lastIndex = 0;
        this.setItem(this.tocLink.item(0));
        this.reset(this.tocLink.item(0));
    };
    setHTML = () => {
        try {
            this.headerLink = getElement('#post-content').querySelectorAll('h1,h2,h3,h4,h5,h6');
            this.tocLink = document.querySelectorAll('.toc-link');
            if (this.tocLink.length) {
                this.setItem(this.tocLink.item(0));
            }
        }
        catch { }
    };
    constructor() {
        this.setHTML();
        document.addEventListener('pjax:success', this.setHTML);
        window.addEventListener('hexo-blog-decrypt', this.setHTML);
        getElement('main').addEventListener('scroll', () => {
            if (this.tocLink.length) {
                this.modifyIndex();
            }
        }, { passive: true });
    }
}
let indexs = new Index();
class MonacoEditor {
    // keep references to editors to avoid garbage collection
    editors = new Map();
    updateEditorLayout = () => {
        for (const [container, ed] of Array.from(this.editors.entries())) {
            if (!(container instanceof HTMLElement) || !container.isConnected) {
                this.editors.delete(container);
                continue;
            }
            try {
                ed.layout();
            }
            catch (e) { /* ignore */ }
        }
    };
    createEditor = (container, lang, theme, readOnly, height, options) => {
        if (container.getAttribute('data-initialized') === 'true')
            return;
        container.setAttribute('data-initialized', 'true');
        container.style.height = height;
        try {
            const mon = window.monaco || monaco;
            if (!mon || !mon.editor || !mon.editor.create) {
                console.error('MonacoEditor: monaco not available when trying to create editor');
                return;
            }
            // prefer the <pre> source textContent to avoid HTML-escaped entities
            const pre = container.querySelector('pre');
            const source = pre?.textContent || '';
            const editor = mon.editor.create(container, {
                value: source,
                language: lang,
                theme: theme,
                readOnly: readOnly,
                ...options,
            });
            // store editor instance to avoid garbage collection
            this.editors.set(container, editor);
        }
        catch (e) {
            console.error('MonacoEditor: failed to create editor', e);
        }
    };
    findEditor = () => {
        const editors = document.querySelectorAll('.monaco-editor-code');
        editors.forEach((editor) => {
            const lang = editor.getAttribute('data-lang') || 'plaintext';
            const theme = editor.getAttribute('data-theme') || 'vs-dark';
            const readOnly = editor.getAttribute('data-readonly') || 'false';
            const height = editor.getAttribute('data-height') || '300px';
            const rawOptions = editor.getAttribute('data-options') || '{}';
            let options = {};
            try {
                // decode HTML entities (e.g. &quot;) produced by server-side escaping
                const decoded = new DOMParser().parseFromString(rawOptions, 'text/html').documentElement.textContent || rawOptions;
                options = JSON.parse(decoded || '{}');
            }
            catch (e) {
                try {
                    // fallback: maybe server used encodeURIComponent
                    options = JSON.parse(decodeURIComponent(rawOptions));
                }
                catch (e2) {
                    console.warn('MonacoEditor: failed to parse data-options, using empty options', rawOptions, e2);
                    options = {};
                }
            }
            this.createEditor(editor, lang, theme, Boolean(readOnly), height, options);
        });
        this.updateEditorLayout();
    };
    loadMonaco = () => {
        if (typeof window.hexo_monaco === 'undefined') {
            const loader = document.createElement('script');
            loader.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/loader.js';
            loader.onload = () => {
                window.require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs' } });
                window.require(['vs/editor/editor.main'], () => {
                    window.hexo_monaco = true; // prevent loading multiple times
                    this.findEditor();
                });
            };
            loader.onerror = () => {
                console.error('Failed to load Monaco Editor loader script.');
            };
            document.body.appendChild(loader);
        }
        else {
            this.findEditor();
        }
    };
    constructor() {
        this.loadMonaco();
        document.addEventListener('pjax:success', this.loadMonaco);
        window.addEventListener('hexo-blog-decrypt', this.loadMonaco);
        window.addEventListener('resize', this.updateEditorLayout);
    }
}
;
let monaco_editor = new MonacoEditor();
class Scroll {
    scrolling = 0;
    getingtop = false;
    height = 0;
    visible = false;
    touchX = 0;
    touchY = 0x7fffffff;
    notMoveY = false;
    reallyUp = false;
    intop = false;
    totop;
    scrolltop = () => {
        getElement('main').scroll({ top: 0, left: 0, behavior: 'smooth' });
        this.totop.style.opacity = '0';
        this.getingtop = true;
        setTimeout(() => this.totop.style.display = 'none', 300);
    };
    totopChange = (top) => {
        if (top < -200) {
            this.totop.style.display = '';
            this.visible = true;
            setTimeout(() => {
                if (this.visible) {
                    this.totop.style.opacity = '1';
                }
            }, 300);
        }
        else {
            this.totop.style.opacity = '0';
            this.visible = false;
            setTimeout(() => {
                if (!this.visible) {
                    this.totop.style.display = 'none';
                }
            }, 300);
        }
    };
    slideDown = () => {
        if (!this.intop) {
            return;
        }
        const main = getElement('main').classList;
        if (!document.querySelector('.expanded')) {
            getElement('.navBtn').classList.add('hide-btn');
        }
        main.remove('up');
        main.add('down');
        main.add('down');
        main.add('moving');
        setTimeout(() => {
            main.remove('down');
            main.remove('moving');
        }, 300);
        this.intop = false;
    };
    slideUp = () => {
        if (this.intop || document.querySelector('.moving')) {
            return;
        }
        if (!document.querySelector('#search-header')) {
            getElement('.navBtn').classList.remove('hide-btn');
            return;
        }
        const main = getElement('main').classList;
        getElement('.navBtn').classList.remove('hide-btn');
        main.remove('down');
        main.add('up');
        main.add('moving');
        this.intop = true;
        setTimeout(() => getElement('main').classList.remove('moving'), 300);
    };
    setHTML = () => {
        try {
            let navBtn = getElement('.navBtn');
            let onScroll = () => {
                try {
                    let nowheight = getElement('article').getBoundingClientRect().top;
                    if (nowheight > 0) {
                        return;
                    }
                    if (!document.querySelector('.expanded')) {
                        if (this.height - nowheight > 100) {
                            navBtn.classList.add('hide-btn');
                            this.height = nowheight;
                        }
                        else if (nowheight > this.height) {
                            if (nowheight - this.height > 20) {
                                navBtn.classList.remove('hide-btn');
                            }
                            this.height = nowheight;
                        }
                    }
                    ++this.scrolling;
                    setTimeout(() => {
                        if (!--this.scrolling) {
                            this.getingtop = false;
                        }
                    }, 100);
                    if (!this.getingtop) {
                        this.totopChange(nowheight);
                    }
                }
                catch (e) { }
            };
            getElement('main').addEventListener('scroll', onScroll);
            this.height = 0;
            this.visible = false;
            this.totop = getElement('#to-top');
            this.setListener();
        }
        catch (e) { }
    };
    checkTouchMove = (event) => {
        if (Math.abs(event.changedTouches[0].screenX - this.touchX) > 50 &&
            !this.reallyUp) {
            this.notMoveY = true;
        }
        if (document.querySelector('.expanded') ||
            window.innerWidth > 1024 ||
            this.notMoveY ||
            event.changedTouches[0].screenY === this.touchY ||
            document.querySelector('.moving')) {
            return;
        }
        if (this.intop || getElement('article').getBoundingClientRect().top >= 0) {
            this.reallyUp = true;
            if (event.changedTouches[0].screenY > this.touchY) {
                this.slideUp();
            }
            else {
                this.slideDown();
            }
            this.touchY = event.changedTouches[0].screenY;
        }
    };
    startTouch = (event) => {
        this.touchX = event.changedTouches[0].screenX;
        this.touchY = event.changedTouches[0].screenY;
        this.notMoveY = false;
    };
    checkPos = () => {
        if (getElement('article').getBoundingClientRect().top < 0 && this.intop) {
            this.slideDown();
        }
    };
    /**
     * used for `supScroll` and `footNoteScroll` functions
     */
    setListener = () => {
        getElement('#post-content').addEventListener('click', this.supScroll);
        getElement('#footnotes').addEventListener('click', this.footNoteScroll);
    };
    supScroll = (event) => {
        const target = event.target;
        const targetParent = getParent(target);
        if (targetParent?.tagName === 'SUP') {
            event.preventDefault();
            const hash = target.href.split('/').pop()?.slice(1) || '';
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
    };
    footNoteScroll = (event) => {
        const target = event.target;
        if (target.tagName === 'A') {
            event.preventDefault();
            const hash = target.href.split('/').pop()?.slice(1) || '';
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }
    };
    constructor() {
        document.addEventListener('pjax:success', this.setHTML);
        document.addEventListener('touchstart', this.startTouch);
        document.addEventListener('touchmove', this.checkTouchMove);
        document.addEventListener('touchend', this.checkPos);
        document.addEventListener('wheel', (event) => {
            if (document.querySelector('.expanded') || window.innerWidth > 1024) {
                return;
            }
            if (getElement('article').getBoundingClientRect().top >= 0) {
                if (event.deltaY < 0) {
                    this.slideUp();
                }
                else {
                    this.slideDown();
                }
            }
        });
        this.setHTML();
        this.totop = document.querySelector('#to-top');
    }
}
var scrolls = new Scroll();
class pjaxSupport {
    loading = getElement('.loading');
    left = getElement('.loadingBar.left');
    right = getElement('.loadingBar.right');
    timestamp = 0;
    start = (need) => {
        this.left.style.transform = `scaleX(${need})`;
        this.right.style.transform = `scaleX(${need})`;
        ++this.timestamp;
    };
    loaded = () => {
        getElement('main').scrollTop = 0;
        this.start(1);
        setTimeout((time) => {
            if (this.timestamp === time) {
                this.loading.style.opacity = '0';
            }
        }, 600, this.timestamp);
    };
    fail = () => {
        setTimeout((time) => {
            if (this.timestamp !== time) {
                return;
            }
            this.start(0);
            this.loading.classList.add('fail');
            setTimeout((time) => {
                if (this.timestamp === time) {
                    this.loading.style.opacity = '0';
                    this.loading.classList.remove('fail');
                }
            }, 600, this.timestamp);
        }, 600, this.timestamp);
    };
    constructor() {
        document.addEventListener('pjax:send', () => {
            if (getElement('main').classList.contains('up')) {
                scrolls.slideDown();
            }
            this.loading.classList.add('reset');
            this.loading.classList.remove('fail');
            this.start(0);
            setTimeout((time) => {
                if (this.timestamp !== time) {
                    return;
                }
                this.loading.classList.remove('reset');
                this.start(0.3);
                this.loading.style.opacity = '1';
                setTimeout((time) => {
                    if (this.timestamp === time) {
                        this.start(0.6);
                    }
                }, 1200, this.timestamp);
            }, 0, this.timestamp);
        });
        document.addEventListener('pjax:start', this.loaded);
        document.addEventListener('pjax:error', this.fail);
    }
}
try {
    new pjaxSupport();
}
catch (e) { }
