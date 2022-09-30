// var can = document.getElementById("can"); id选择器
var cans = document.querySelector("#can");  //标签选择,优点可多选择，更细
var cat = cans.getContext("2d");
var arr = [];//储存小球位置
var w , h;
function init() {//初始化方法
    cans.width = window.innerWidth;
    cans.height = window.innerHeight;
     w = window.innerWidth;//浏览器宽高
h = window.innerHeight;
};
init();//打开页面就全部铺平；

function Generate(x, y, color) {//控制小球的位置颜色半径
    this.x = x;
    this.y = y;
    this.r = 20;
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * 4 - 2;
    this.color = "#" + Math.ceil(Math.random() * 1000);//小球颜色
}

Generate.prototype = {
    draw: function () {//画小球的方法
        if (this.r > 5) {
            cat.beginPath();//抬笔
            cat.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);//位置，半径，弧度，顺时针或逆时针
            // cat.rect(this.x,this.y,200,200);//正方形
            cat.fillStyle = this.color;
            cat.fill();//填充 stroke是描边
        }

    },
    update: function () {//控制小球变化的方法
        this.x += this.vx;
        this.y += this.vy;
        this.vx = this.vx * 0.98;
        this.vy = this.vy * 0.98;
        this.r = this.r * 0.99;
    }
}

cans.addEventListener('mousemove', function (e) {//一个监听事件mouse鼠标  move 移动  click点击
    arr.push(new Generate(e.clientX, e.clientY));
})
function move() {//进行画
    cat.clearRect(0, 0, w, h);//清除上一次小球
    arr.forEach(
        function (generate) {
            generate.draw();
            generate.update();
        }
    )
    requestAnimationFrame(move);//根据浏览器刷新率来刷新小球,类似于定时器但优于定时器
}
move();
window.onresize = init;//每次调整窗口就进行调整；
