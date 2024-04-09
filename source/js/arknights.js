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
        this.inStop = false;
        this.build = () => {
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
        this.paint = () => {
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
        this.stop = () => {
            this.inStop = true;
        };
        this.play = () => {
            if (this.inStop === true) {
                this.inStop = false;
                requestAnimationFrame(this.paint);
            }
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
    var canvasDusts = new canvasDust('#canvas-dust');
}
catch (e) { }
/// <reference path="common/base.ts" />
class expands {
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
        this.addEvent = (header) => {
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
        this.setHTML = () => {
            document.querySelectorAll('.expand-box').forEach((item) => {
                this.addEvent(item.children[0]);
            });
        };
    }
}
let expand = new expands();
class Code {
    constructor() {
        this.mermaids = [];
        this.doAsMermaid = (item) => {
            let Amermaid = item.querySelector('.mermaid');
            item.outerHTML = '<div class="highlight mermaid">' + Amermaid.innerText + '</div>';
        };
        this.resetName = (str) => {
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
        this.doAsCode = (item) => {
            const codeType = this.resetName(item.classList[1]), lineCount = getElement('.gutter', item).children[0].childElementCount >> 1;
            item.classList.add(lineCount < 16 ? 'open' : 'fold');
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
        this.paintMermaid = () => {
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
            document.querySelectorAll('.mermaid').forEach((item) => {
                this.mermaids.push(item.outerHTML);
            });
            expand.setHTML();
        };
        this.resetMermaid = () => {
            if (typeof (mermaid) === 'undefined')
                return;
            let id = 0;
            document.querySelectorAll('.mermaid').forEach((item) => {
                item.outerHTML = this.mermaids[id];
                ++id;
            });
            this.paintMermaid();
        };
        this.findCode();
        document.addEventListener('pjax:success', this.findCode);
        window.addEventListener('hexo-blog-decrypt', this.findCode);
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
        this.attention = `a,input,button,textarea,
    .navBtnIcon,
    #post-content img,
    .ex-header,
    .gt-user-inner,
    .wl-sort>li,
    #valine .vicon,#valine .vat,
    .lg-container img,.clickable`;
        this.set = (X = this.nowX, Y = this.nowY) => {
            this.outer.transform =
                `translate(calc(${X.toFixed(2)}px - 50%),
                  calc(${Y.toFixed(2)}px - 50%))`;
        };
        this.move = (timestamp) => {
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
        this.pushHolder = () => {
            document.querySelectorAll(this.attention).forEach(item => {
                if (!item.classList.contains('is--active')) {
                    item.addEventListener('mouseover', this.hold, { passive: true });
                    item.addEventListener('mouseout', this.relax, { passive: true });
                }
            });
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
        this.pushHolder();
        const observer = new MutationObserver(this.pushHolder);
        observer.observe(document, { childList: true, subtree: true });
    }
}
new Cursor();
class Index {
    constructor() {
        this.lastIndex = -1;
        this.headerLink = document.querySelectorAll('null');
        this.tocLink = document.querySelectorAll('null');
        this.setItem = (item) => {
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
        this.reset = (not) => {
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
        this.check = (index, id) => {
            return index[id + 1] > window.innerHeight / 3 || index[id] > 0;
        };
        this.modifyIndex = () => {
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
        this.setHTML = () => {
            try {
                this.headerLink = getElement('#post-content').querySelectorAll('h1,h2,h3,h4,h5,h6');
                this.tocLink = document.querySelectorAll('.toc-link');
                if (this.tocLink.length) {
                    this.setItem(this.tocLink.item(0));
                }
            }
            catch { }
        };
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
class Header {
    constructor() {
        this.header = getElement('header');
        this.button = getElement('.navBtnIcon');
        this.closeSearch = false;
        this.readyRev = true;
        this.relabel = () => {
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
        this.inHeader = (mouse) => {
            let range = this.header.getBoundingClientRect();
            if (mouse.clientX < range.x || mouse.clientY < range.y ||
                mouse.clientX > range.right || mouse.clientY > range.bottom) {
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
            item.addEventListener('click', (event) => {
                if (getParent(event.target) === item) {
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
        this.totopChange = (top) => {
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
        this.slideDown = () => {
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
        this.slideUp = () => {
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
        this.startTouch = (event) => {
            this.touchX = event.changedTouches[0].screenX;
            this.touchY = event.changedTouches[0].screenY;
            this.notMoveY = false;
        };
        this.checkPos = () => {
            if (getElement('article').getBoundingClientRect().top < 0 && this.intop) {
                this.slideDown();
            }
        };
        /**
         * used for `supScroll` and `footNoteScroll` functions
         */
        this.setListener = () => {
            getElement('#post-content').addEventListener('click', this.supScroll);
            getElement('#footnotes').addEventListener('click', this.footNoteScroll);
        };
        this.supScroll = (event) => {
            const target = event.target;
            const targetParent = getParent(target);
            if (targetParent?.tagName === 'SUP') {
                event.preventDefault();
                const hash = target.href.split('/').pop()?.slice(1) || '';
                document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        };
        this.footNoteScroll = (event) => {
            const target = event.target;
            if (target.tagName === 'A') {
                event.preventDefault();
                const hash = target.href.split('/').pop()?.slice(1) || '';
                document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
            }
        };
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
    constructor() {
        this.loading = getElement('.loading');
        this.left = getElement('.loadingBar.left');
        this.right = getElement('.loadingBar.right');
        this.timestamp = 0;
        this.start = (need) => {
            this.left.style.transform = `scaleX(${need})`;
            this.right.style.transform = `scaleX(${need})`;
            ++this.timestamp;
        };
        this.loaded = () => {
            getElement('main').scrollTop = 0;
            this.start(1);
            setTimeout((time) => {
                if (this.timestamp === time) {
                    this.loading.style.opacity = '0';
                }
            }, 600, this.timestamp);
        };
        this.fail = () => {
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
class ColorMode {
    constructor() {
        this.html = document.documentElement;
        this.dark = this.html.getAttribute('theme-mode') === 'dark';
        this.inChanging = false;
        this.btn = getElement('#color-mode');
        this.change = () => {
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
    constructor(first, second) {
        this.comment = first;
        this.button = second;
    }
}
class Selectors {
    constructor(elements = [], active = 0) {
        this.elements = [];
        this.changeTo = (item) => {
            if (item === this.nowActive) {
                return;
            }
            this.nowActive.comment.style.display = 'none';
            this.nowActive.button.classList.remove('active');
            item.comment.style.display = '';
            item.button.classList.add('active');
            this.nowActive = item;
        };
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
    constructor() {
        this.search = ["valine", "gitalk", "waline", "artalk"];
        this.elements = [];
        this.setHTML = () => {
            if (!document.querySelector('#comments .selector'))
                return;
            this.elements = [];
            this.search.forEach((item) => {
                try {
                    this.elements.push(new Pair(getElement(`#${item}`), getElement(`.${item}-sel`)));
                }
                catch (e) { }
            });
            new Selectors(this.elements, 0);
        };
        this.setHTML();
        document.addEventListener('pjax:complete', this.setHTML);
    }
}
new Comments();
/// <reference path="include/canvaDust.ts" />
/// <reference path="include/Code.ts" />
/// <reference path="include/Cursors.ts" />
/// <reference path="include/Index.ts" />
/// <reference path="include/Header.ts" />
/// <reference path="include/scroll.ts" />
/// <reference path="include/pjaxSupport.ts" />
/// <reference path="include/ColorMode.ts" />
/// <reference path="include/Comments.ts" />
/// <reference path="include/Expands.ts" />
