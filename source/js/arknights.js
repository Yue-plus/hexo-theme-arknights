/// <reference path="enviroment.d.ts" />
'use strict';
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
class dust {
    constructor(x = 50, y = 50) {
        this.vx = Math.random() * 1 + 1;
        this.vy = Math.random() * 1 + 0.01;
        this.shadowBlur = Math.random() * 3;
        this.shadowX = (Math.random() * 2) - 1;
        this.shadowY = (Math.random() * 2) - 1;
        this.radiusX = Math.random() * 1.5 + 0.5;
        this.radiusY = this.radiusX * (Math.random() * (1.3 - 0.3) + 0.3);
        this.rotation = Math.PI * Math.floor(Math.random() * 2);
        this.x = x;
        this.y = y;
    }
}
class canvasDust {
    constructor(canvasID) {
        this.color = '#fff';
        this.width = 300;
        this.height = 300;
        this.dustQuantity = 50;
        this.dustArr = [];
        this.build = () => {
            this.resize();
            if (this.ctx) {
                const point = canvasDust.getPoint(this.dustQuantity);
                for (let i of point) {
                    const dustObj = new dust(i[0], i[1]);
                    this.buildDust(dustObj);
                    this.dustArr.push(dustObj);
                }
                requestAnimationFrame(this.play);
            }
        };
        this.play = () => {
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
            requestAnimationFrame(this.play);
        };
        this.buildDust = (dust) => {
            const ctx = this.ctx;
            ctx.beginPath();
            ctx.shadowBlur = dust.shadowBlur;
            ctx.shadowOffsetX = dust.shadowX;
            ctx.shadowOffsetY = dust.shadowY;
            ctx.ellipse(dust.x, dust.y, dust.radiusX, dust.radiusY, dust.rotation, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        };
        this.resize = () => {
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
        const canvas = getElement(canvasID);
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.build();
        window.addEventListener('resize', this.resize);
    }
}
canvasDust.getPoint = (number = 1) => {
    let point = [];
    for (let i = 0; i < number; ++i) {
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        point.push([x, y]);
    }
    return point;
};
try {
    new canvasDust('#canvas-dust');
}
catch (e) {
    throw new Error('canvasID 无效');
}
class Code {
    doAsMermaid(item) {
        let Amermaid = item.querySelector('.mermaid');
        item.outerHTML = '<div class="highlight mermaid">' + Amermaid.innerText + '</div>';
    }
    resetName(str) {
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
    }
    constructor() {
        this.reverse = (item, s0, s1) => {
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
        this.doAsCode = (item) => {
            const codeType = this.resetName(item.classList[1]), lineCount = getElement('.gutter', item).children[0].childElementCount >> 1;
            item.classList.add(lineCount < 16 ? 'open' : 'fold');
            item.innerHTML =
                `<span class="code-header" tabindex='0'>\
        <span class="code-title">\
          <div class="code-icon"></div>
          ${format(config.code.codeInfo, codeType, lineCount)}
        </span>\
        <span class="code-header-tail">\
          <button class="code-copy">${config.code.copy}</button>\
          <span class="code-space">${config.code.expand}</span>\
        </span>\
      </span>\
      <div class="code-box">${item.innerHTML}</div>`;
            getElement('.code-copy', item).addEventListener('click', (click) => {
                const button = click.target;
                navigator.clipboard.writeText(getElement('code', item).innerText);
                button.classList.add('copied');
                button.innerText = config.code.copyFinish;
                setTimeout(() => {
                    button.classList.remove('copied');
                    button.innerText = config.code.copy;
                }, 1200);
            });
            const header = getElement('.code-header', item);
            header.addEventListener('click', (click) => {
                if (click.target === header) {
                    this.reverse(header, 'open', 'fold');
                }
            });
            header.addEventListener('keyup', (key) => {
                if (key.key === 'Enter' && key.target === header) {
                    this.reverse(header, 'open', 'fold');
                }
            });
        };
        this.findCode = () => {
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
        };
        this.findCode();
    }
}
let code = new Code();
class Cursor {
    constructor() {
        this.now = new MouseEvent('');
        this.first = true;
        this.last = 0;
        this.moveIng = false;
        this.fadeIng = false;
        this.nowX = 0;
        this.nowY = 0;
        this.attention = "a,input,button,textarea,.code-header,.gt-user-inner,.navBtnIcon";
        this.set = (X = this.nowX, Y = this.nowY) => {
            this.outer.transform =
                `translate(calc(${X.toFixed(2)}px - 50%),
                  calc(${Y.toFixed(2)}px - 50%))`;
        };
        this.move = (timestamp) => {
            if (this.now !== undefined) {
                let delX = (this.now.x - this.nowX) * 0.5, delY = (this.now.y - this.nowY) * 0.5;
                if (timestamp - this.last > 10) {
                    this.nowX += delX;
                    this.nowY += delY;
                    this.set();
                    this.last = timestamp;
                }
                if (Math.abs(delX) > 0.1 || Math.abs(delY) > 0.1) {
                    window.requestAnimationFrame(this.move);
                }
                else {
                    this.set(this.now.x, this.now.y);
                    this.moveIng = false;
                }
            }
        };
        this.reset = (mouse) => {
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
        this.Aeffect = (mouse) => {
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
        this.hold = () => {
            this.outer.height = '24px';
            this.outer.width = '24px';
            this.outer.background = "var(--theme-cursor-bg)";
        };
        this.relax = () => {
            this.outer.height = '36px';
            this.outer.width = '36px';
            this.outer.background = "unset";
        };
        this.pushHolder = (items) => {
            items.forEach(item => {
                if (!item.classList.contains('is--active')) {
                    item.addEventListener('mouseover', this.hold, { passive: true });
                    item.addEventListener('mouseout', this.relax, { passive: true });
                }
            });
        };
        this.pushHolders = () => {
            this.pushHolder(document.querySelectorAll(this.attention));
        };
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
        this.pushHolders();
        const observer = new MutationObserver(this.pushHolders);
        observer.observe(document, { childList: true, subtree: true });
    }
}
window.onload = () => new Cursor();
class Index {
    constructor() {
        this.setItem = (item) => {
            item.classList.add('active');
            let parent = getParent(item), brother = parent.children;
            for (let i = 0; i < brother.length; ++i) {
                const item = brother.item(i);
                if (item.classList.contains('toc-child')) {
                    item.classList.add('has-active');
                    break;
                }
            }
            for (; parent.classList[0] != 'toc'; parent = getParent(parent)) {
                if (parent.classList[0] == 'toc-child') {
                    parent.classList.add('has-active');
                }
            }
        };
        this.reset = (not) => {
            let tocs = document.querySelectorAll('#toc-div .active');
            let tocTree = document.querySelectorAll('#toc-div .has-active');
            tocs.forEach(item => {
                if (!item.contains(not)) {
                    item.classList.remove('active');
                }
            });
            tocTree.forEach(item => {
                if (!item.contains(not)) {
                    item.classList.remove('has-active');
                }
            });
        };
        this.modifyIndex = (headerLink, tocLink) => {
            let index = [];
            headerLink.forEach(item => {
                index.push(item.getBoundingClientRect().top);
            });
            for (let i = 0; i < tocLink.length; ++i) {
                const item = tocLink.item(i);
                if (i + 1 == index.length || (index[i + 1] > 150 && (index[i] <= 150 || i == 0))) {
                    this.setItem(item);
                    this.reset(item);
                    break;
                }
            }
        };
        this.setHTML = () => {
            let headerLink = document.querySelectorAll('h2,h3,h4,h5,h6'), tocLink = document.querySelectorAll('.toc-link');
            if (tocLink.length !== 0) {
                this.setItem(tocLink.item(0));
            }
            getElement('main').addEventListener('scroll', () => {
                if (tocLink.length === 0) {
                    return;
                }
                this.modifyIndex(headerLink, tocLink);
            }, { passive: true });
        };
        document.addEventListener('pjax:success', this.setHTML);
        this.setHTML();
    }
}
let indexs = new Index();
class Header {
    constructor() {
        this.header = getElement('header');
        this.button = getElement('.navBtnIcon');
        this.closeSearch = false;
        this.readyRev = true;
        this.relabel = () => {
            let navs = this.header.querySelectorAll('.navItem'), mayLen = 0, may = navs.item(0);
            getElement('.navBtn').classList.add('hide');
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
        this.inHeader = (mouse) => {
            let item = mouse.target;
            while (item !== this.header && item !== document.body)
                item = getParent(item);
            if (item !== this.header) {
                this.close();
            }
        };
        this.open = (item = this.header) => {
            item.classList.add('expanded');
            item.classList.remove('closed');
            scrolls.slideDown();
            if (item === this.header) {
                item.classList.add('moving');
                setTimeout(() => item.classList.remove('moving'), 300);
            }
            document.addEventListener('click', this.inHeader);
        };
        this.close = (item = this.header) => {
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
        this.reverse = (item = this.header) => {
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
        this.closeAll = () => {
            this.header.querySelectorAll('.expanded').forEach((item) => item.classList.remove('expanded'));
        };
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
            if (item.classList.contains('navBlock')) {
                item = getParent(item);
            }
            item.addEventListener('click', (event) => {
                if (getParent(event.target) === item ||
                    getParent(event.target, 2) === item) {
                    this.reverse(item);
                }
            });
        });
    }
}
var header = new Header();
class Scroll {
    constructor() {
        this.scrolling = 0;
        this.getingtop = false;
        this.height = 0;
        this.visible = false;
        this.touchX = 0;
        this.touchY = 0x7fffffff;
        this.notMoveY = false;
        this.reallyUp = false;
        this.intop = false;
        this.scrolltop = () => {
            getElement('main').scroll({ top: 0, left: 0, behavior: 'smooth' });
            this.totop.style.opacity = '0';
            this.getingtop = true;
            setTimeout(() => this.totop.style.display = 'none', 300);
        };
        this.totopChange = (post) => {
            if (post.getBoundingClientRect().top < -200) {
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
        this.slideDown = () => {
            if (!this.intop) {
                return;
            }
            const main = getElement('main').classList;
            if (!document.querySelector('.expanded')) {
                getElement('.navBtn').classList.add('hide');
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
        this.slideUp = () => {
            if (this.intop || document.querySelector('.moving')) {
                return;
            }
            if (!document.querySelector('#search-header')) {
                getElement('.navBtn').classList.remove('hide');
                return;
            }
            const main = getElement('main').classList;
            getElement('.navBtn').classList.remove('hide');
            main.remove('down');
            main.add('up');
            main.add('moving');
            this.intop = true;
            setTimeout(() => getElement('main').classList.remove('moving'), 300);
        };
        this.setHTML = () => {
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
                                navBtn.classList.add('hide');
                                this.height = nowheight;
                            }
                            else if (nowheight > this.height) {
                                if (nowheight - this.height > 20) {
                                    navBtn.classList.remove('hide');
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
                            this.totopChange(getElement('#post-title'));
                        }
                    }
                    catch (e) { }
                };
                getElement('main').addEventListener('scroll', onScroll);
                this.height = 0;
                this.visible = false;
                this.totop = getElement('#to-top');
            }
            catch (e) { }
        };
        this.checkTouchMove = (event) => {
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
            if (getElement('article').getBoundingClientRect().top >= 0) {
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
        this.startTouch = (event) => {
            this.touchX = event.changedTouches[0].screenX;
            this.touchY = event.changedTouches[0].screenY;
            this.notMoveY = false;
        };
        document.addEventListener('pjax:success', this.setHTML);
        document.addEventListener('touchstart', this.startTouch);
        document.addEventListener('touchmove', this.checkTouchMove);
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
    constructor() {
        this.loading = getElement('.loading');
        this.left = getElement('.loadingBar.left');
        this.right = getElement('.loadingBar.right');
        this.timestamp = 0;
        this.start = (need) => {
            this.left.style.width = need + '%';
            this.right.style.width = need + '%';
            ++this.timestamp;
        };
        this.loaded = () => {
            ++this.timestamp;
            if (this.loading.style.opacity === '1') {
                getElement('main').scrollTop = 0;
                if (this.left.style.width !== "50%") {
                    this.start(50);
                    setTimeout((time) => {
                        if (this.timestamp == time) {
                            this.loading.style.opacity = '0';
                        }
                    }, 600, this.timestamp);
                }
            }
        };
        document.addEventListener('pjax:send', () => {
            if (getElement('main').classList.contains('up')) {
                scrolls.slideDown();
            }
            this.loading.classList.add('reset');
            this.start(0);
            setTimeout((time) => {
                if (this.timestamp == time) {
                    this.loading.style.opacity = '1';
                    this.loading.classList.remove('reset');
                    this.start(15);
                    setTimeout((time) => {
                        if (this.timestamp == time) {
                            this.start(30);
                        }
                    }, 800, this.timestamp);
                }
            }, 10, this.timestamp);
        });
        document.addEventListener('pjax:start', this.loaded);
        document.addEventListener('pjax:complete', this.loaded);
    }
}
try {
    new pjaxSupport();
}
catch (e) { }
class ColorMode {
    constructor() {
        this.html = document.documentElement;
        this.dark = this.html.getAttribute('theme-mode') === 'dark';
        this.inChanging = false;
        document.addEventListener('keypress', (ev) => {
            if (this.inChanging) {
                return;
            }
            if (ev.key === 'c' && ev.target &&
                !['INPUT', 'TEXTAREA'].includes(ev.target.tagName)) {
                this.inChanging = true;
                let background = document.createElement('div');
                background.style.transition = '1.5s';
                background.innerHTML =
                    `<div style='background: var(--${this.dark ? 'dark' : 'light'}-background);
            height: 100vh; width: 100vw;
            position: fixed; left: 0; top: 0; z-index: -99999;'></div>`;
                document.body.insertBefore(background, document.body.firstChild);
                setTimeout(() => {
                    if (this.dark) {
                        this.html.setAttribute('theme-mode', 'light');
                        this.dark = false;
                    }
                    else {
                        this.html.setAttribute('theme-mode', 'dark');
                        this.dark = true;
                    }
                    background.style.opacity = '0';
                });
                setTimeout(() => document.body.removeChild(background), 1500);
                setTimeout(() => this.inChanging = false, 1000);
            }
        });
    }
}
var colorMode = new ColorMode();
/// <reference path="include/canvaDust.ts" />
/// <reference path="include/Code.ts" />
/// <reference path="include/Cursors.ts" />
/// <reference path="include/Index.ts" />
/// <reference path="include/Header.ts" />
/// <reference path="include/scroll.ts" />
/// <reference path="include/pjaxSupport.ts" />
/// <reference path="include/ColorMode.ts" />
