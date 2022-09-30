# canvas拖拽

#### 项目介绍
拖拽canvas截取图片，可支持移动端两指放大缩小。

#### 依赖框架
1. hammer.min.js
2. easeljs-0.8.1.min.js

#### 调用方式
1. new一个image对象。
```
var img = new Image();
```
2. 在onload方法中，为Drag添加对象（`D.addChild(bjCont)`）。
```
img.onload = function () {
    var bjCont = new createjs.Container();
    bjCont.name = 'bjCont';
    bjCont.x = 0;//图片在canvas中的left值
    bjCont.y = 0;//图片在canvas中的top值
    
    var pic = new createjs.Bitmap(this);
    pic.regX = this.width/2;//图片相当于自己的left值
    pic.regY = this.height/2;//图片相当于自己的top值
    
    bjCont.addChild(pic);
    stage.addChild(bjCont);  
    D.addChild(bjCont);
}
```
3. 赋值src，可为各种方式获取
- 调取本地图片方式
```
img.src = "image/p1.jpg";
```
- 上传图片方式。获取files的src，通过声明FileReader对象，src保存在e.target.result中。
```
var file = input.files[0];
var reader = new FileReader(); //声明一个FileReader实例
reader.onload = function (e) {
    img3.src = e.target.result;
}
reader.readAsDataURL(file);
```
- 通过后台发送img方式，和上传同理，只需改变new Image()的src即可，这里就不赘述了。

4. 截取canvas可视范围内的图片

```
var dataPIC = canEle.toDataURL("image/png");
viewImg.src = dataPIC;
```
5. 清除canvas对象，可以应用在上传图片的时候，更换图片的场景。

```
stage.removeAllChildren();
D.removeAllChild();
```

