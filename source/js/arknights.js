"use strict";
var dust = /** @class */ (function () {
    function dust(canvasID) {
        var _this = this;
        this.dustQuantity = Math.floor((window.innerWidth + window.innerHeight) / 10);
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
    dust.prototype.build = function () {
        var point = dust.getPoint(this.dustQuantity);
        this.resize();
        for (var _i = 0, point_1 = point; _i < point_1.length; _i++) {
            var i = point_1[_i];
            this.dust(i[0], i[1]);
        }
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
        var shadowBlur = Math.floor(Math.random() * 2);
        var shadowX = Math.floor(Math.random() * 2);
        var shadowY = Math.floor(Math.random() * 2);
        var radiusX = Math.floor(Math.random() * 3);
        var radiusY = Math.floor(Math.random() * 3);
        var rotation = Math.PI * Math.floor(Math.random() * 2);
        if (ctx) {
            ctx.beginPath();
            ctx.shadowBlur = shadowBlur;
            ctx.shadowColor = '#fff';
            ctx.shadowOffsetX = shadowX;
            ctx.shadowOffsetY = shadowY;
            ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = '#fff';
            ctx.fill();
        }
    };
    dust.getPoint = function (number) {
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
