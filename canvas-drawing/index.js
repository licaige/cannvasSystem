let canvas1 = document.getElementById("canvas1");
let context1 = canvas1.getContext("2d");
canvas1.width = window.innerWidth
canvas1.height = window.innerHeight

let canvas2 = document.getElementById("canvas2");
let context2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth
canvas2.height = window.innerHeight

// 全局属性---------------------------------------------------------------
// let backGroundColor = 'rgb(36, 74, 101)'
let backGroundColor = 'white'
context1.fillStyle = backGroundColor
context1.fillRect(0, 0, canvas1.width, canvas1.height)


let startPoint = {
    'x': undefined,
    'y': undefined
}
let endPoint = {
    'x': undefined,
    'y': undefined
}
let using = false
let clearable = false
let eraserSize = 16
let lineWidth = 16
let lineColor = 'black'
let lineColorOl = document.querySelector('.line-color')
let lineColorLis = lineColorOl.querySelectorAll('li')
let lineWeightOl = document.querySelector('.line-weight')
let lineWeightLis = lineWeightOl.querySelectorAll('li')
let eraserWidthOl = document.querySelector('.eraser-width')
let eraserWidthLis = eraserWidthOl.querySelectorAll('li')

drawGrid(canvas1, context1, 30, '#ccc', 5)
// drawAndCleanLine(canvas2, context2, lineWidth, 'purple')

pen.addEventListener('click', function () {
    pen.classList.add('active')
    eraser.classList.remove('active')


    clearable = false

    document.body.style.cursor = `url('img/pen32.ico') 0 32, auto`
    eraserWidthOl.style.display = 'none'
    lineColorOl.style.display = 'block'
    lineWeightOl.style.display = 'block'
})

eraser.addEventListener('click', function () {
    eraser.classList.add('active')
    pen.classList.remove('active')

    clearable = true

    document.body.style.cursor = `url('img/eraser32.ico') 16 16, auto`
    eraserWidthOl.style.display = 'block'
    lineColorOl.style.display = 'none'
    lineWeightOl.style.display = 'none'
})

clear.addEventListener('click', function () {
    context2.clearRect(0, 0, canvas2.width, canvas2.height)
})

save.addEventListener('click', function () {
    let url = canvas2.toDataURL("image/png");
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.target = '_blank'
    a.download = '我的画图';
    a.click();
})

eraser16.addEventListener('click', function () {
    document.body.style.cursor = `url('img/eraser16.ico') 8 8, auto`
    eraserSize = 8
})

eraser32.addEventListener('click', function () {
    document.body.style.cursor = `url('img/eraser32.ico') 16 16, auto`
    eraserSize = 16
})

eraser48.addEventListener('click', function () {
    document.body.style.cursor = `url('img/eraser48.ico') 24 24, auto`
    eraserSize = 24
})

eraser64.addEventListener('click', function () {
    document.body.style.cursor = `url('img/eraser64.ico') 32 32, auto`
    eraserSize = 32
})


for (let i = 0; i < lineColorLis.length; i++) {
    lineColorLis[i].addEventListener('click', function () {
        for (let i = 0; i < lineColorLis.length; i++) {
            if (lineColorLis[i].classList.value.indexOf('active') != -1) {
                lineColorLis[i].classList.remove('active')
            }
        }
        lineColorLis[i].classList.add('active')
        lineColor = lineColorLis[i].getAttribute('color')
        for (let i = 0; i < lineWeightLis.length; i++) {
            lineWeightLis[i].style.backgroundColor = lineColor
        }
    })
}


for (let i = 0; i < lineWeightLis.length; i++) {
    lineWeightLis[i].addEventListener('click', function () {
        for (let i = 0; i < lineWeightLis.length; i++) {
            if (lineWeightLis[i].classList.value.indexOf('active') != -1) {
                lineWeightLis[i].classList.remove('active')
            }
        }
        lineWeightLis[i].classList.add('active')
        lineWidth = lineWeightLis[i].getAttribute('weight')
    })

}


function drawGrid(canvas, context, gridSpace, gridLineColor, LineDashStyle) {
    let xLines = Math.floor(canvas.width / gridSpace)
    let yLines = Math.floor(canvas.height / gridSpace)
    // 画横线
    for (let i = 0; i <= xLines; i++) {
        context.beginPath()
        context.moveTo(0, 0 + i * gridSpace)
        context.lineTo(canvas.width, 0 + i * gridSpace)
        context.lineWidth = 1
        context.setLineDash([`${LineDashStyle}`])
        context.strokeStyle = gridLineColor
        context.stroke()
    }
    // 画竖线
    for (let i = 0; i <= xLines; i++) {
        context.beginPath()
        context.moveTo(0 + i * gridSpace, 0)
        context.lineTo(0 + i * gridSpace, canvas.height)
        context.lineWidth = 1
        context.setLineDash([`${LineDashStyle}`])
        context.strokeStyle = gridLineColor
        context.stroke()
    }
}

// function drawAndCleanLine(canvas, context, lineWidth, color) {
canvas2.addEventListener('mousedown', function (e) {
    using = true
    startPoint.x = e.clientX
    startPoint.y = e.clientY
    if (clearable) {
        clearArc(e.clientX, e.clientY, eraserSize, context2)
    }
})
canvas2.addEventListener('mousemove', function (e) {
    if (using) {
        endPoint.x = e.clientX
        endPoint.y = e.clientY
        if (clearable) {

            let x = Math.abs(endPoint.x - startPoint.x)
            let y = Math.abs(endPoint.y - startPoint.y)

            clip(context2, canvas2, eraserSize)

            startPoint.x = endPoint.x
            startPoint.y = endPoint.y
        } else {
            context2.beginPath()
            context2.moveTo(startPoint.x, startPoint.y)
            context2.lineTo(endPoint.x, endPoint.y)
            context2.strokeStyle = lineColor
            context2.lineWidth = lineWidth
            context2.lineCap = 'round'
            context2.lineJoin = 'bevel'
            context2.stroke()
            startPoint.x = endPoint.x
            startPoint.y = endPoint.y
        }
    }

})
canvas2.addEventListener('mouseup', function () {
    using = false
})

// }

function clip(context, myCanvas, eraserSize) {

    let asin = eraserSize * Math.sin(Math.atan((endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)));
    let acos = eraserSize * Math.cos(Math.atan((endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)))
    let x3 = startPoint.x + asin;
    let y3 = startPoint.y - acos;
    let x4 = startPoint.x - asin;
    let y4 = startPoint.y + acos;
    let x5 = endPoint.x + asin;
    let y5 = endPoint.y - acos;
    let x6 = endPoint.x - asin;
    let y6 = endPoint.y + acos;

    //保证线条的连贯，所以在矩形一端画圆
    context.save()
    context.beginPath()
    context.arc(endPoint.x, endPoint.y, eraserSize, 0, 2 * Math.PI);
    context.clip()
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    context.restore();

    //清除矩形剪辑区域里的像素
    context.save()
    context.beginPath()
    context.moveTo(x3, y3);
    context.lineTo(x5, y5);
    context.lineTo(x6, y6);
    context.lineTo(x4, y4);
    context.closePath();
    context.clip()
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    context.restore();
}

function clearArc(x, y, r, context) { //(x,y)为要清除的圆的圆心，r为半径，cxt为context
    let stepClear = 1;
    clearArc(x, y, r);

    function clearArc(x, y, radius) {
        var calcWidth = radius - stepClear;
        var calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);

        var posX = x - calcWidth;
        var posY = y - calcHeight;

        var widthX = 2 * calcWidth;
        var heightY = 2 * calcHeight;

        if (stepClear <= radius) {
            context.clearRect(posX, posY, widthX, heightY);
            stepClear += 1;
            clearArc(x, y, radius);
        }
    }
}
