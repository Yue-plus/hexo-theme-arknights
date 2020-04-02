// var canvas = document.getElementById('particle');
// var ctx = canvas.getContext('2d');
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