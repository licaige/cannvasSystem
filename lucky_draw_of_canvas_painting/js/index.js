
// 判断是不是移动设备
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true: false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true: false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true: false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true: false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

var obj = {
    rewardNames: [], //转盘奖品名称数组
    colors: [], //转盘奖品区块对应背景颜色
    outsideRadius: 192, //转盘外圆的半径
    insideRadius: 68, //转盘内圆的半径
    textRadius: 155, //转盘奖品位置距离圆心的距离
    startAngle: 0, //开始角度
    bRotate: false //false:停止;true:旋转
};

$(function() {
     // 模拟数据，可以Ajax请求服务器数据，添加大转盘的奖品与奖品区域背景颜色
    /*
    $.ajax({
        type: "POST",
        url: "",
        data: null,
        async:false,
        dataType:"json", // 返回数据类型
        success: function(data){
            turnWheel.rewardNames = data["rewardNames"];
            turnWheel.colors = data["colors"];
        },
        error: function(data){
            alert("网络错误，请检查您的网络设置！");
            $("#tip").text("请求数据失败");
        }
    });
    */
    obj.rewardNames = [
        "50M流量包", "10Q币",
        "谢谢参与", "5Q币",
        "10M流量包", "20M流量包",
        "10M流量包", "20M流量包",
        "20Q币", "30M流量包",
        "100M流量包", "2Q币"
    ];

    obj.colors = [
        "#FFF4D7", "#FFFFFF",
        "#F0F4D8", "#FFFFFF",
        "#FFF4D0", "#FFFFFF",
        "#FFF4D0", "#FFFFFF",
        "#FFF4D6", "#FFFFFF",
        "#FFF4D6", "#FFFFFF"
    ];

    $('.pointer').click(function() {
        if (obj.bRotate) return
        obj.bRotate = !obj.bRotate
        var count = obj.rewardNames.length

        //这里的值可以从后端返回，目前暂时用随机数,只需改变item（对应的获奖序号）
        var item = randomNum(0, count - 1)
        getRotateFlash(item, obj.rewardNames[item], count)
    })

    //旋转转盘 item:奖品序号，从0开始的; prize：中奖名称 ,count 奖品的总数量;
    function getRotateFlash(item, prize, count) {
        console.log(item, prize, count)
        // 应该旋转的角度，旋转插件角度参数是角度制
        var baseAngle = 360 / count;
        // 旋转角度 == 270°（当前第一个角度和指针位置的偏移量） - 奖品的位置 * 每块所占的角度 - 每块所占的角度的一半(指针指向区域的中间)
        var angle = 360*3/4 - item * baseAngle - baseAngle / 2 // 因为第一个奖品是从0°开始的，即水平向右方向
        $('#canvas').stopRotate();
        $('#canvas').rotate({
            angle: 0,
            animateTo: angle + 5 * 360, // 这里多旋转了5圈，圈数越多，转的越快
            duration: 5000,
            callback: function() {
                $('#tip').text(prize)
                obj.bRotate = !obj.bRotate
                if(isMobile.any()){ // 判断是否移动设备
                    //做跳转逻辑
                    console.log('旋转结束')
                }
            }
        })
    }
})


/*
返回在n和m之间的随机整数
n<= random <=m
*/
function randomNum(n, m) {
    /* Math.floor(Math.random()*10);时，可均衡获取0到9的随机整数。 */
    var random = Math.floor(Math.random() * (m - n)) + n;
    return random;

}

//页面所有元素加载完毕后执行drawWheelCanvas()方法对转盘进行渲染
window.onload = function() {
    drawWheelCanvas();
};

/*
 * 渲染转盘 图标的导入 不知道为什么要加~/
 * */
var bCoin = new Image()
bCoin.src = "~/../imgs/qb.png";
var flowCoin = new Image()
flowCoin.src = "~/../imgs/1.png";
var sorryCoin = new Image()
sorryCoin.src = "~/../imgs/2.png";

function drawWheelCanvas() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    // 计算每块占的角度，弧度制
    var baseAngle = Math.PI * 2 / (obj.colors.length);
    console.log('每块的弧度 ', baseAngle)
    //在给定矩形内清空一个矩形
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
   // ctx.strokeStyle = "#000000";
    ctx.font = "20px Microsoft YaHei";
    for (var i = 0; i < obj.colors.length; i++) {
        var angle = i * baseAngle;
        console.log('当前的角度 ', angle)
        ctx.fillStyle = obj.colors[i];
        ctx.beginPath();
        // ctx.arc(x,y,r,sAngle,eAngle,counterclockwise) 
        // 参数: x: 圆中心X坐标 ，y:圆中心Y坐标，r: 圆半径,  sAngle: 起始角, eAngle: 结束角, counterclockwise: 可选，顺/逆时针 
        ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, obj.insideRadius, angle + baseAngle, angle, true);
        ctx.arc(canvasWidth * 0.5, canvasHeight * 0.5, obj.outsideRadius, angle, angle + baseAngle, false);
       // ctx.stroke();
        ctx.fill();
        ctx.save();

        // 重点及难点
        ctx.fillStyle = '#f00';
        var rewardName = obj.rewardNames[i];
        var lineHeight = 17;

        var translateX = canvasWidth * 0.5 + Math.cos(angle + baseAngle / 2) * obj.textRadius;
        var translateY = canvasHeight * 0.5 + Math.sin(angle + baseAngle / 2) * obj.textRadius
        // console.log('translateX ', translateX, translateY)
        ctx.translate(translateX, translateY)
        // angle，当前扇形自身旋转的角度 +  baseAngle / 2 中心线多旋转的角度  + 垂直的角度90°
        ctx.rotate(angle + baseAngle / 2 + Math.PI / 2)

        if (rewardName.indexOf('M') > 0) { //查询是否有流量包
            console.log('流量包 ', rewardName)
            var rewardNames = rewardName.split('M');
            for (var j = 0; j < rewardNames.length; j++) {
                ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei'
                if (j == 0) {
                    // fillText: 输出的文本 x, X轴坐标，y，y轴坐标，
                    //measureText (width,x,y) width: 字体的宽度，x: 横向坐标 y: 纵向坐标
                    ctx.fillText(rewardNames[j] + 'M', -ctx.measureText(rewardNames[j] + 'M').width / 2, j * lineHeight)
                } else {
                    ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * lineHeight)
                }
            }
        } else if (rewardName.indexOf('M') === -1 && rewardName.length > 6) { //查询奖品是否字符长
            console.log('字符超6个 ', rewardName)
            rewardName = rewardName.substring(0, 6) + "||" + rewardName.substring(6);
            var rewardNames = rewardName.split("||");
            for (var j = 0; j < rewardNames.length; j++) {
                ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
            }
        } else { //查询Q币及未中奖
            console.log('Q币及未中奖 ', rewardName)
            if (rewardName.indexOf('谢谢') >= 0) {
                ctx.font = '16px Microsoft YaHei';
                ctx.fillStyle='#000000'
                ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0)
            } else {
                ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0)
            }
        }

        //以下为图标的导入
        if (rewardName.indexOf('币') >= 0) { //Q币图标
            // 注意，这里要等到img加载完成才能绘制
            bCoin.onload = function() {
                ctx.drawImage(bCoin, -15, 5)
            }
            ctx.drawImage(bCoin, -15, 5)
        } else if (rewardName.indexOf('流量') >= 0) { //流量图标
            flowCoin.onload = function() {
                ctx.drawImage(flowCoin, -18, 8)
            }
            ctx.drawImage(flowCoin, -18, 22)
        }else if (rewardName.indexOf('谢谢') >= 0) { //谢谢参与图标
            sorryCoin.onload = function() {
                ctx.drawImage(sorryCoin, -18, 8)
            }
            ctx.drawImage(sorryCoin, -18, 8)
        }
        //还原画板的状态到上一个save()状态之前
        ctx.restore();
    }
}