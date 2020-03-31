var canvas = document.getElementById('particle');
var ctx = canvas.getContext('2d');
var dustQuantity = Math.floor((window.innerWidth + window.innerHeight) / 8);
var i = 0;

// 设置 canvas 占满页面
function canvasResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function bulidPoint() {
    while (i < dustQuantity) {
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle="red";
        ctx.rect(Math.floor(Math.random() * window.innerWidth), Math.floor(Math.random() * window.innerHeight), 5, 5);
        ctx.stroke();
        i++;
    }
}

canvasResize();
window.addEventListener("resize", canvasResize());
bulidPoint();