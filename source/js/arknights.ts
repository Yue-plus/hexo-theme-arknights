let canvas = document.getElementById('particle');
let ctx = canvas.getContext('2d');

// 设置 canvas 占满页面
function canvasResize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

canvasResize
window.addEventListener("resize", canvasResize)

ctx.fillStyle="#ff0000"