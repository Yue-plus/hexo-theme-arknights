"use strict";
var dust = /** @class */ (function () {
    function dust(canvasID) {
        var _this = this;
        this.dustQuantity = Math.floor((window.innerWidth + window.innerHeight) / 20);
        var canvas = document.getElementById(canvasID);
        if (canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.dust = dust.getPoint(this.dustQuantity);
            this.build();
            window.addEventListener('resize', function () { return _this.resize(); });
        }
        else {
            throw new Error('canvasID 无效');
        }
    }
    dust.prototype.build = function () {
        // const point = dust.getPoint(this.dustQuantity)
        // this.resize()
        // for (let i of point) {
        //   this.dust(i[0], i[1])
        // }
        // for (let i of point) {
        //
        // }
        // setTimeout(this.build(), 3)
    };
    dust.prototype.resize = function () {
        if (!(!this.canvas || !this.ctx)) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            return true;
        }
        else {
            return false;
        }
    };
    dust.prototype.dust = function (x, y) {
        var ctx = this.ctx;
        var color = '#fff';
        var shadowBlur = Math.random() * 3;
        var shadowX = (Math.random() * 2) - 1;
        var shadowY = (Math.random() * 2) - 1;
        var radiusX = Math.random() * 3;
        var radiusY = Math.random() * 3;
        var rotation = Math.PI * Math.floor(Math.random() * 2);
        if (ctx) {
            ctx.beginPath();
            ctx.shadowBlur = shadowBlur;
            ctx.shadowColor = color;
            ctx.shadowOffsetX = shadowX;
            ctx.shadowOffsetY = shadowY;
            ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }
    };
    dust.getPoint = function (number) {
        if (number === void 0) { number = 1; }
        var point = [];
        for (var i = 1; i < number; i++) {
            var x = Math.floor(Math.random() * window.innerWidth);
            var y = Math.floor(Math.random() * window.innerHeight);
            point.push([x, y]);
        }
        return point;
    };
    return dust;
}());
new dust('canvas-dust');
