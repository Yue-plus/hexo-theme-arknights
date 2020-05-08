"use strict";
var dust = /** @class */ (function () {
    function dust() {
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
    return dust;
}());
var canvasDust = /** @class */ (function () {
    function canvasDust(canvasID) {
        var _this = this;
        this.width = 300;
        this.height = 300;
        this.dustQuantity = 50;
        this.dustArr = [];
        var canvas = document.getElementById(canvasID);
        if (canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.build();
            window.addEventListener('resize', function () { return _this.resize(); });
        }
        else {
            throw new Error('canvasID 无效');
        }
    }
    canvasDust.prototype.build = function () {
        var _this = this;
        this.resize();
        if (this.ctx) {
            var point = canvasDust.getPoint(this.dustQuantity);
            for (var _i = 0, point_1 = point; _i < point_1.length; _i++) {
                var i = point_1[_i];
                var dustObj = new dust();
                this.buildDust(i[0], i[1], dustObj);
                this.dustArr.push(dustObj);
            }
            setInterval(function () {
                _this.play();
            }, 40);
        }
    };
    canvasDust.prototype.play = function () {
        var _a;
        var dustArr = this.dustArr;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.width, this.height);
        for (var _i = 0, dustArr_1 = dustArr; _i < dustArr_1.length; _i++) {
            var i = dustArr_1[_i];
            if (i.x < 0 || i.y < 0) {
                var x = this.width;
                var y = Math.floor(Math.random() * window.innerHeight);
                i.x = x;
                i.y = y;
                this.buildDust(x, y, i);
            }
            else {
                var x = i.x - i.vx;
                var y = i.y - i.vy;
                this.buildDust(x, y, i);
            }
        }
    };
    canvasDust.prototype.buildDust = function (x, y, dust) {
        var ctx = this.ctx;
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
    canvasDust.prototype.resize = function () {
        var canvas = this.canvas;
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.width = width;
        this.height = height;
        this.dustQuantity = Math.floor((width + height) / 38);
        if (canvas !== undefined) {
            canvas.width = width;
            canvas.height = height;
        }
    };
    canvasDust.getPoint = function (number) {
        if (number === void 0) { number = 1; }
        var point = [];
        for (var i = 0; i < number; i++) {
            var x = Math.floor(Math.random() * window.innerWidth);
            var y = Math.floor(Math.random() * window.innerHeight);
            point.push([x, y]);
        }
        return point;
    };
    return canvasDust;
}());
var index = /** @class */ (function () {
    function index() {
        var _this = this;
        this.index = [];
        this.headerLink = document.getElementsByClassName("headerlink");
        this.tocLink = document.getElementsByClassName("toc-link");
        this.postContent = document.getElementById("post-content");
        this.article = document.getElementsByTagName("article")[0];
        if (this.article) {
            this.article.addEventListener("scroll", function () {
                for (var i = 0; i < _this.headerLink.length; i++) {
                    var link = _this.headerLink.item(i);
                    if (link) {
                        _this.index.push(link.getBoundingClientRect().top);
                    }
                }
                for (var i in _this.index) {
                    var item = _this.tocLink.item(Number(i));
                    item.classList.remove('active');
                }
                for (var i in _this.index) {
                    var item = _this.tocLink.item(Number(i));
                    if (_this.index[i] > 0) {
                        item.classList.add('active');
                        break;
                    }
                }
                _this.index = [];
            });
        }
    }
    return index;
}());
new canvasDust('canvas-dust');
new index();
