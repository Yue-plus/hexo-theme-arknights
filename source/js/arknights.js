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
    constructor() {
        this.x = 50;
        this.y = 50;
        this.vx = Math.random() * 2 + 2;
        this.vy = Math.random() * 2;
        this.color = '#fff';
        this.shadowBlur = Math.random() * 3;
        this.shadowX = (Math.random() * 2) - 1;
        this.shadowY = (Math.random() * 2) - 1;
        this.radiusX = Math.random() * 3;
        this.radiusY = Math.random() * 3;
        this.rotation = Math.PI * Math.floor(Math.random() * 2);
    }
}
class canvasDust {
    constructor(canvasID) {
        this.width = 300;
        this.height = 300;
        this.dustQuantity = 50;
        this.dustArr = [];
        this.build = () => {
            this.resize();
            if (this.ctx) {
                const point = canvasDust.getPoint(this.dustQuantity);
                for (let i of point) {
                    const dustObj = new dust();
                    this.buildDust(i[0], i[1], dustObj);
                    this.dustArr.push(dustObj);
                }
                setInterval(this.play, 40);
            }
        };
        this.play = () => {
            const dustArr = this.dustArr;
            this.ctx?.clearRect(0, 0, this.width, this.height);
            for (let i of dustArr) {
                if (i.x < 0 || i.y < 0) {
                    const x = this.width;
                    const y = Math.floor(Math.random() * window.innerHeight);
                    i.x = x;
                    i.y = y;
                    this.buildDust(x, y, i);
                }
                else {
                    const x = i.x - i.vx;
                    const y = i.y - i.vy;
                    this.buildDust(x, y, i);
                }
            }
        };
        this.buildDust = (x, y, dust) => {
            const ctx = this.ctx;
            if (x)
                dust.x = x;
            if (y)
                dust.y = y;
            if (ctx) {
                ctx.beginPath();
                ctx.shadowBlur = dust.shadowBlur;
                ctx.shadowColor = dust.color;
                ctx.shadowOffsetX = dust.shadowX;
                ctx.shadowOffsetY = dust.shadowY;
                ctx.ellipse(dust.x, dust.y, dust.radiusX, dust.radiusY, dust.rotation, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = dust.color;
                ctx.fill();
            }
        };
        this.resize = () => {
            const canvas = this.canvas;
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.width = width;
            this.height = height;
            this.dustQuantity = Math.floor((width + height) / 38);
            if (canvas !== undefined) {
                canvas.width = width;
                canvas.height = height;
            }
        };
        const canvas = getElement(canvasID);
        if (canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.build();
            window.addEventListener('resize', () => this.resize());
        }
        else {
            throw new Error('canvasID 无效');
        }
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
catch (e) { }
class Code {
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
                `<span class="code-header">\
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
            getElement('.code-header', item).addEventListener('click', (click) => {
                if (!click.target.classList.contains('code-copy')) {
                    this.reverse(click.currentTarget, 'open', 'fold');
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
}
let code = new Code();
class Cursor {
    constructor() {
        this.now = new MouseEvent('');
        this.first = true;
        this.last = 0;
        this.moveIng = false;
        this.fadeIng = false;
        this.attention = "a,input,button,textarea,.code-header,.gt-user-inner,.navBtnIcon";
        this.move = (timestamp) => {
            if (this.now !== undefined) {
                let SX = this.outer.left, SY = this.outer.top, preX = Number(SX.substring(0, SX.length - 2)), preY = Number(SY.substring(0, SY.length - 2)), delX = (this.now.x - preX) * 0.3, delY = (this.now.y - preY) * 0.3;
                if (timestamp - this.last > 15) {
                    preX += delX;
                    preY += delY;
                    this.outer.left = preX.toFixed(2) + 'px';
                    this.outer.top = preY.toFixed(2) + 'px';
                    this.last = timestamp;
                }
                if (Math.abs(delX) > 0.2 || Math.abs(delY) > 0.2) {
                    window.requestAnimationFrame(this.move);
                }
                else {
                    this.moveIng = false;
                }
            }
        };
        this.reset = (mouse) => {
            if (!this.moveIng) {
                this.moveIng = true;
                window.requestAnimationFrame(this.move);
            }
            this.now = mouse;
            if (this.first) {
                this.first = false;
                this.outer.left = String(this.now.x) + 'px';
                this.outer.top = String(this.now.y) + 'px';
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
            this.outer.background = "rgba(255, 255, 255, 0.5)";
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
        this.reset = () => {
            let tocs = document.querySelectorAll('#toc-div .active');
            let tocTree = document.querySelectorAll('#toc-div .has-active');
            tocs.forEach(item => {
                item.classList.remove('active');
            });
            tocTree.forEach(item => {
                item.classList.remove('has-active');
            });
        };
        this.modifyIndex = (headerLink, tocLink) => {
            let index = [];
            headerLink.forEach(item => {
                index.push(item.getBoundingClientRect().top);
            });
            this.reset();
            for (let i = 0; i < tocLink.length; ++i) {
                const item = tocLink.item(i);
                if (i + 1 == index.length || (index[i + 1] > 150 && (index[i] <= 150 || i == 0))) {
                    this.setItem(item);
                    break;
                }
            }
        };
        this.setHtml = () => {
            let headerLink = document.querySelectorAll('h2,h3,h4,h5,h6'), tocLink = document.querySelectorAll('.toc-link');
            if (tocLink.length !== 0) {
                this.setItem(tocLink.item(0));
            }
            getElement('main').addEventListener('scroll', () => {
                if (tocLink.length === 0)
                    return;
                this.modifyIndex(headerLink, tocLink);
            }, { passive: true });
        };
        document.addEventListener('pjax:success', this.setHtml);
        this.setHtml();
    }
}
new Index();
class Header {
    constructor() {
        this.header = getElement('header');
        this.button = getElement('.navBtnIcon');
        this.closeSearch = false;
        this.relabel = () => {
            let navs = this.header.querySelectorAll('.navItem'), mayLen = 0, may = navs.item(0);
            getElement('.navBtn').classList.add('hide');
            navs.forEach(item => {
                if (item.id === 'search-header') {
                    return;
                }
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
            }
        };
        this.reverse = (item = this.header) => {
            if (this.closeSearch) {
                this.closeSearch = false;
            }
            else if (item.classList.contains('expanded')) {
                this.close(item);
            }
            else {
                this.open(item);
            }
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
        this.mayNotUp = false;
        this.reallyUp = false;
        this.intop = false;
        this.startTop = false;
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
        this.setHtml = () => {
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
            if (Math.abs(event.changedTouches[0].clientX - this.touchX) > 50 && !this.reallyUp) {
                this.mayNotUp = true;
            }
            if (document.querySelector('.expanded') ||
                window.innerWidth > 1024 ||
                this.mayNotUp ||
                event.changedTouches[0].clientY == this.touchY) {
                return;
            }
            if (this.startTop || getElement('article').getBoundingClientRect().top >= 0) {
                this.reallyUp = true;
                if (event.changedTouches[0].clientY > this.touchY) {
                    this.slideUp();
                }
                else {
                    this.slideDown();
                }
                this.touchY = event.changedTouches[0].clientY;
            }
        };
        this.startTouch = (event) => {
            this.touchX = event.changedTouches[0].clientX;
            this.touchY = event.changedTouches[0].clientY;
            this.mayNotUp = false;
            this.startTop = getElement('article').getBoundingClientRect().top >= 0;
        };
        document.addEventListener('pjax:success', this.setHtml);
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
        this.setHtml();
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
/// <reference path="include/canvaDust.ts" />
/// <reference path="include/Code.ts" />
/// <reference path="include/Cursors.ts" />
/// <reference path="include/Index.ts" />
/// <reference path="include/Header.ts" />
/// <reference path="include/scroll.ts" />
/// <reference path="include/pjaxSupport.ts" />
