Page({
  data:{
    imageWidth:"",
    dianti:"",
    zuobiao:"",
    dianti1: "",
    zuobiao1: "",
    dianti2:400,
    zuobiao2:200,
    yuanxin:10,
    stop:false,
    show:false,
    time:0,
    timer: '',//定时器名字
    countDownNum: '60',//倒计时初始值
    context:'',
    // arcx:200, 
    arxy:'', 
    arcr:'',
    variable: -2
  },
  imageLoad: function () {
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    })
  },
  canvasIdErrorCallback(e) {
    console.error(e.detail.errMsg)
  },
  onReady(e) {
    // 使用 wx.createContext 获取绘图上下文 context
    var imageWidth = wx.getSystemInfoSync().windowWidth;
    const contexts = wx.createCanvasContext('fiirstCqwanvas');
    this.context = contexts;
    var point1 = { left: 172, top: 276 };//第一个点
    var point2 = { left: 254, top: 236 };//第二个点
    contexts.beginPath();

    //直线
    contexts.moveTo(0, 0);
    contexts.lineTo(600, 338)
    contexts.beginPath();
    contexts.arc(this.data.dianti2, this.data.zuobiao2, this.data.yuanxin, 0, 2 * Math.PI);
    contexts.stroke();
    contexts.moveTo(point1.left, point1.top);//起始位置
    contexts.lineTo(point2.left, point2.top);//停止位置
    contexts.stroke();
    //左边使用箭头三角形
    contexts.moveTo(50, 80);
    contexts.lineTo(40,90);
    contexts.lineTo(50, 100);
    contexts.lineTo(50, 80);
    contexts.fillStyle = "#EE0000";
    contexts.fill();
    //使用箭头根
    contexts.moveTo(50, 90);
    contexts.lineTo(70, 90);
    //划线
    // contexts.moveTo(60, 100);
    // contexts.lineTo(70, 100);
    contexts.fillStyle = 'rgba(255,0,0,.3)';//填充颜色：红色，半透明
    // contexts.strokeStyle = 'red';//线条颜色：绿色
    contexts.lineWidth = 13
    contexts.beginPath();
    // contexts.moveTo(this.data.zuobiao, this.data.dianti);//将画笔移到x0,y0处
    // contexts.lineTo(this.data.zuobiao1, this.data.dianti1);//从x0,y0到x1,y1画一条
    // contexts.moveTo(this.data.zuobiao, this.data.dianti);
    // contexts.lineTo(this.data.zuobiao1, this.data.dianti1);
    //使用左边框
    contexts.moveTo(0, 0)
    contexts.lineTo(80, 10)
    contexts.textAlign = 'center'
    contexts.fillStyle = '#000000'
    contexts.strokeText("出口", 80, 10)            
    contexts.moveTo(100, 10)
    contexts.textAlign = 'center'
    contexts.fillStyle = '#000000'
    contexts.strokeText("出口", 230, 40)  
    contexts.lineTo(220, 20)
    contexts.moveTo(240, 20)
    contexts.lineTo(imageWidth, 40)

    //直线
    contexts.moveTo(0, 0);
    contexts.lineTo(400, 200);
    //下面的线条
    // contexts.moveTo(0, 190)
    // contexts.lineTo(300, 240)
    // contexts.stroke()
    // contexts.moveTo(300, 240)
    // contexts.lineTo(0, 190)
    // contexts.stroke()
    contexts.moveTo(100, 200)
    contexts.lineTo(0, 190)
    contexts.setLineWidth(1)
    contexts.rect(60, 170, 20, 20);
    //下边使用箭头三角形
    contexts.moveTo(100, 190);
    contexts.lineTo(90, 180);
    contexts.lineTo(110, 180);
    contexts.lineTo(100, 190);
    contexts.fillStyle = "#EE0000";
    contexts.fill();
    // //使用箭头根
    contexts.moveTo(100, 180);
    contexts.lineTo(100, 160);
    //下面楼梯
    contexts.moveTo(115, 174);
    contexts.lineTo(170, 174);
    //展示大厅
    contexts.moveTo(115, 150);
    contexts.lineTo(115, 60);
    //营业大厅
    contexts.moveTo(115, 80);
    contexts.lineTo(290, 80);


    contexts.moveTo(115, 200);
    contexts.lineTo(115, 192);
    contexts.moveTo(115, 180);
    contexts.lineTo(115, 170);
    contexts.moveTo(115, 170);
    contexts.lineTo(170, 170);
    contexts.setLineWidth(1)
    contexts.rect(120, 180, 45, 15);

    contexts.moveTo(130, 180);
    contexts.lineTo(130, 195);
    contexts.moveTo(140, 180);
    contexts.lineTo(140, 195);
    contexts.moveTo(150, 180);
    contexts.lineTo(150, 195);
    contexts.moveTo(160, 180);
    contexts.lineTo(160, 195);

    contexts.moveTo(170, 170);
    contexts.lineTo(170, 209);

    contexts.moveTo(200, 190);
    contexts.lineTo(210, 180);
    contexts.lineTo(190, 180);
    contexts.lineTo(200, 190);
    contexts.fillStyle = "#EE0000";
    contexts.fill();
    // //使用箭头根
    contexts.moveTo(200, 180);
    contexts.lineTo(200, 161);

    contexts.moveTo(160, 140);
    contexts.lineTo(170, 130);
    contexts.lineTo(170, 150);
    contexts.lineTo(160, 140);
    contexts.fillStyle = "#EE0000";
    contexts.fill();
    // //使用箭头根
    contexts.moveTo(170, 140);
    contexts.lineTo(190, 140);
   //旋转
    // contexts.rotate(Math.PI / 6);//正方向旋转30度
    // contexts.fillRect(100, 100, 300, 200);

    contexts.textAlign = 'center'
    contexts.fillStyle = '#000000'
    contexts.strokeText("出口", 110, 220)  
  
    contexts.textAlign = 'center'
    contexts.fillStyle = '#000000'
    contexts.strokeText("出口", 200, 220)
    //下面电梯
    contexts.moveTo(60, 170)
    contexts.lineTo(80, 190) 
    contexts.moveTo(60, 190)
    contexts.lineTo(80, 170)

    contexts.moveTo(190, 210)
    contexts.lineTo(110, 200)
    //厕所
    contexts.moveTo(215, 210)
    contexts.lineTo(215, 180)
    contexts.textAlign = 'center'
    contexts.fillStyle = '#000000'
    contexts.strokeText("wc", 225, 200)

    contexts.textAlign = 'center'
    contexts.fillStyle = '#000000'
    contexts.strokeText("wc", 252, 200)

    contexts.rect(265, 85, 45, 10);
    contexts.moveTo(270, 85)
    contexts.lineTo(270, 95)
    contexts.moveTo(275, 85)
    contexts.lineTo(275, 95)
    contexts.moveTo(280, 85)
    contexts.lineTo(280, 95)
    contexts.moveTo(285, 85)
    contexts.lineTo(285, 95)
    contexts.moveTo(290, 85)
    contexts.lineTo(290, 95)
    contexts.moveTo(295, 85)
    contexts.lineTo(295, 95)
    contexts.moveTo(300, 85)
    contexts.lineTo(300, 95)
    contexts.moveTo(305, 85)
    contexts.lineTo(305, 95)

   //营业大厅电梯位置
    contexts.moveTo(260, 100)
    contexts.lineTo(280, 110)
    contexts.moveTo(280, 100)
    contexts.lineTo(260, 110)
    contexts.rect(260, 95, 20, 20);
   //营业大厅的电梯
    contexts.moveTo(270, 220)
    contexts.lineTo(270, 120)
    //电梯1
    contexts.moveTo(270, 120)
    contexts.lineTo(290, 140)
    contexts.moveTo(290, 120)
    contexts.lineTo(270, 140)
    contexts.rect(270, 120, 20, 20);
    //电梯2
    contexts.moveTo(310, 120)
    contexts.lineTo(290, 140)
    contexts.moveTo(290, 120)
    contexts.lineTo(310, 140)
    contexts.rect(290, 120, 20, 20);
  //营业大厅消防通道
    contexts.moveTo(270, 200)
    contexts.lineTo(290, 200)

    contexts.moveTo(300, 200)
    contexts.lineTo(340, 200)
    contexts.moveTo(320, 200)
    contexts.lineTo(320, 225)
    contexts.moveTo(350, 200)
    contexts.lineTo(imageWidth, 200)

    contexts.moveTo(220, 180)
    contexts.lineTo(260, 180)

    contexts.moveTo(240, 180)
    contexts.lineTo(240, 216)

    contexts.moveTo(200, 210)
    contexts.lineTo(imageWidth, 230)
    
    //左边的线条
    contexts.moveTo(0, 0)
    contexts.lineTo(0, 70)
    contexts.moveTo(0, 70)
    contexts.lineTo(30,70)
    contexts.moveTo(30, 70)
    contexts.lineTo(30, 90)
    contexts.moveTo(30, 100)
    contexts.lineTo(30, 120)
    contexts.moveTo(30, 130)
    contexts.lineTo(30, 150)
    contexts.moveTo(30, 150)
    contexts.lineTo(0, 150)
    contexts.moveTo(0, 150)
    contexts.lineTo(0, 190)
    contexts.textAlign = 'center'
    contexts.fillStyle = '#000000'
    contexts.strokeText("出口", 50, 130)  

    //右边的线条
    contexts.moveTo(imageWidth, 40)
    contexts.lineTo(imageWidth, 90)
    contexts.moveTo(imageWidth, 110)
    contexts.lineTo(imageWidth, 140)
    contexts.textAlign = 'center'
    contexts.fillStyle = '#000000'
    contexts.strokeText("出口", imageWidth-10, 110) 
    contexts.moveTo(imageWidth, 150)
    contexts.lineTo(imageWidth, 230)
    contexts.stroke()
    contexts.setStrokeStyle('#ff0000')
    contexts.draw(); 
  },
  // run:function(cxt){
  //   cxt.clearRect(0, 0, 1024, 728);
  //   drawNotChange(cxt);
  //   cxt.save();//将当前以左上角坐标为(0,0)的上下文环境进行保存，这样是为了在接下来中要进行画布偏移后，可以进行还原当前的环境
  //   cxt.translate(500, 400);
  //   cxt.rotate(time * 8 * Math.PI / 180);//设定每次旋转的度数
  //   cxt.fillStyle = 'blue';
  //   cxt.beginPath();
  //   cxt.arc(0, 150, 30, 0, 2 * Math.PI, false);
  //   cxt.closePath();
  //   cxt.fill();
  //   cxt.restore();//将当前为(500,400)的点还原为（0,0）,其实在save中就是将上下文环境保存到栈中，在restore下面对其进行还原
  //   time+= 1;
  // },
  btnclick: function() {
    // var time=1;
    // time++
    // var timer = setTimeout(res => {
    //   console.log(time);
    //   // this.checkTime(time)
    // }, 1000)
  },
  onShow: function () {
    //什么时候触发倒计时，就在什么地方调用这个函数
    // this.countDown();
  },
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum++;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum,
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 200) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 2000)
    })
  },
  btnclick: function (e) {
   if(this.data.show!=false){
     this.data.show=false;
     this.data.zuobiao = e.detail.x;
    this.data.dianti = e.detail.y-54;
   }else{
     this.data.show=true;
     this.data.zuobiao1 = e.detail.x;
    this.data.dianti1 = e.detail.y-54;
   }
    this.onReady();
    console.log(this.data.dianti)
  },
  btnclicksd: function () {
    var that=this;
    this.data.stop = true;
    console.log(this.data.zuobiao2);
    console.log(this.data.dianti2);
    console.log(this.data.stop)
    setInterval(function () {
      that.run();
    }, 330);
    //定时转动
    // //定时关闭加载
    // setTimeout(function () {
    //   // this.run();
    // }, 1000);
    // this.run();
  },
  suspended:function(){
    var that = this;
    this.data.stop = false;
      that.run();
      return;
  },
  run: function () {
    var that = this;
    
    if (this.data.zuobiao2 >= 200 && this.data.dianti2 >= 400) {
      this.data.variable = -2;
    } else if (this.data.zuobiao2 <= 0 && this.data.dianti2 >= 0) {
      this.data.variable = 2;
    }
    if (this.data.stop ==true){
      this.data.zuobiao2 = this.data.zuobiao2 + this.data.variable;
      this.data.dianti2 = this.data.dianti2 + this.data.variable / (200 / 400);
    }else{
      return;
    }
    this.onReady();
  },
})