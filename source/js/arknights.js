"use strict";
var dust = /** @class */ (function () {
    function dust(canvasID) {
        var _this = this;
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
        this.resize();
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
    return dust;
}());
new dust('canvas-dust');
// var dustQuantity = Math.floor((window.innerWidth + window.innerHeight) / 8);
// var point;
// var i = 0;
// // 设置 canvas 占满页面
// function canvasResize() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }
// // 取屏幕随机点
// function getPoint() {
//     point = {
//         x = Math.floor(Math.random() * window.innerWidth),
//         y = Math.floor(Math.random() * window.innerHeight)
//     }
//     return point;
// }
// // 生成灰尘
// function bulidPoint() {
//     while (i < dustQuantity) {
//         point = getPoint();
//         ctx.beginPath();
//         ctx.lineWidth="1";
//         ctx.strokeStyle="red";
//         ctx.rect(point.x, point.y, 5, 5);
//         ctx.stroke();
//         i++;
//     }
// }
// canvasResize();
// window.addEventListener("resize", canvasResize());
// bulidPoint();
