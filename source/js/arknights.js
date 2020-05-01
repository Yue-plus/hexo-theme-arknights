"use strict";
var dust = /** @class */ (function () {
    function dust() {
        this.x = 50;
        this.y = 50;
        this.vx = Math.random() * 5 + 5;
        this.vy = Math.random() * 5;
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
        var canvas = document.getElementById(canvasID);
        if (canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.build();
            window.addEventListener('resize', function () { return _this.resize(); });
        }
    }
    canvasDust.prototype.build = function () {
        var _this = this;
        if (this.ctx) {
            var point = canvasDust.getPoint(canvasDust.dustQuantity);
            this.resize();
            for (var _i = 0, point_1 = point; _i < point_1.length; _i++) {
                var i = point_1[_i];
                var dustObj = new dust();
                this.buildDust(i[0], i[1], dustObj);
                canvasDust.dustArr.push(dustObj);
            }
            setInterval(function () {
                _this.play();
            }, 80);
        }
    };
    canvasDust.prototype.play = function () {
        var _a;
        var dustArr = canvasDust.dustArr;
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
        if (canvas !== undefined) {
            canvas.width = width;
            canvas.height = height;
        }
        canvasDust.dustQuantity = Math.floor((width + height) / 20);
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
    canvasDust.dustQuantity = 50;
    canvasDust.dustArr = [];
    return canvasDust;
}());
new canvasDust('canvas-dust');
