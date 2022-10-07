<template>
  <div  class="canvase-event-list">
<!--    上传文件列表-->
    <div class="canvase-event-list-left"  @click.stop="rotate">
      上传文件列表
    </div>
    <div class="canvase-event-list-middle">
      <!--上传阶段-->
      <div v-if="filesList.length===0">
        <el-button
          icon="el-icon-upload2"
        >选择文件
          <input
            type="file"
            :multiple="multiple"
            class="select-file-input"
            :accept="accept"
            @change="handleFileChange"
          />
        </el-button>
      </div>
      <!-- 图片处理阶段-->
      <div v-if="filesList.length">
        <canvas v-if="loadCanvas" id="canvase-event-list" :width="width" :height="height"></canvas>
<!--        <canvas v-if="loadCanvas" id="mycanvas" :width="width" :height="height"></canvas>-->
      </div>
    </div>
    <div>
      <!--      canvas处理部分-->
<!--      <canvas id="canvase-event-list" height="300"></canvas>-->
    </div>
<!--    信息展示部分-->
    <div class="canvase-event-list-right">
      <div v-if="previewList.length===0">
        暂无数据
      </div>
      <div v-if="previewList.length">
        <div v-for="(item,index) in previewList" :key="item.id" :class="item.isClick?'change-color':''" @click.stop="changeColor(item,index)">
          {{item.name}}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Canvas from "./canvas-event-master/Canvas/index"
import { deepClone } from '@/utils'

export default {
  name: 'canvaseEventList',
  data () {
    return {
      baseWidth: 1085,
      baseHeight: 979,
      multiple:true,
      accept:'image/*',
      canvas:null,
      arrList:[],
      previewList:[],
      shapeList:[],
      //上传文件
      filesList:[],
      loadCanvas:false,
      style:{
        /* width:'1085px',
         height:'979px'*/
        width:'',
        height:''
      },
      //上传图片base64地址
      dialogImageUrl: '',
    }
  },
  mounted () {

  },
  methods: {
    //旋转起来
    rotate(){
      this.loadCanvas=false
      this.rotateBase64Img(this.dialogImageUrl, 90, this.rotateCallBack);
    },
    rotateBase64Img(src, edg, callback) {
      //创建canvas实例
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var imgW;//图片宽度
      var imgH;//图片高度
      var size;//canvas初始大小
      if (edg % 90 != 0) {
        console.error("旋转角度必须是90的倍数!");
        throw '旋转角度必须是90的倍数!';
      }
      //就是负值角度进行装换
      (edg < 0) && (edg = (edg % 360) + 360)
      console.log('edg',edg)
      const quadrant = (edg / 90) % 4; //旋转象限
      console.log('quadrant',quadrant)
      const cutCoor = {sx: 0, sy: 0, ex: 0, ey: 0}; //裁剪坐标
      var image = new Image();
      image.crossOrigin = "anonymous"
      image.src = src;
      image.onload = function () {
        imgW = image.width;
        imgH = image.height;
        //取最大值
        size = imgW > imgH ? imgW : imgH;
        console.log('size',size)
        //创建出来的canvas进行2倍展示
        canvas.width = size * 2;
        canvas.height = size * 2;
        //通过旋转象限，确定裁剪坐标
        switch (quadrant) {
          case 0:
            cutCoor.sx = size;
            cutCoor.sy = size;
            cutCoor.ex = size + imgW;
            cutCoor.ey = size + imgH;
            break;
          case 1:
            cutCoor.sx = size - imgH;
            cutCoor.sy = size;
            cutCoor.ex = size;
            cutCoor.ey = size + imgW;
            break;
          case 2:
            cutCoor.sx = size - imgW;
            cutCoor.sy = size - imgH;
            cutCoor.ex = size;
            cutCoor.ey = size;
            break;
          case 3:
            cutCoor.sx = size;
            cutCoor.sy = size - imgW;
            cutCoor.ex = size + imgH;
            cutCoor.ey = size + imgW;
            break;
        }
        //进行图片背景图绘制
        ctx.translate(size, size);
        ctx.rotate(edg * Math.PI / 180);
        ctx.drawImage(image, 0, 0);
        //获取裁剪图片信息
        var imgData = ctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey);
        if (quadrant % 2 == 0) {
          canvas.width = imgW;
          canvas.height = imgH;
        } else {
          canvas.width = imgH;
          canvas.height = imgW;
        }
        console.log('canvas.width',canvas.width)
        console.log('canvas.height',canvas.height)
        console.log('imgData',imgData)
        //导致图片信息
        ctx.putImageData(imgData, 0, 0);
        callback({
          width: canvas.width,
          height: canvas.height,
          src:canvas.toDataURL()
        })
      };
    },
    rotateCallBack(res){
      // document.getElementById("img").src = base64data;
      console.log('res',res)
      this.dialogImageUrl = res.src
      // 通过图片宽高数据，最终需要得到一个新的宽高数据出来
      let obj= this.getNewSize(this.baseWidth, this.baseHeight, res.width, res.height)
      console.log('新的尺寸数据',obj)
      this.style={
        width:obj.width+'px',
        height:obj.height+'px'
      }
      //试试给canvas添加背景图片
      this.width=obj.width
      this.height=obj.height
      this.loadCanvas=true
      this.$nextTick(()=>{
        this.drawCanvas(res.src,obj.width,obj.height)
      })
    },
    //获取上传图片base64图片
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
        // imgResult就是base64格式的内容了。转为base64字符串要调用h5特性中的FileReader这个api,但是这个api不能return，所以用promise封装一下。
      })
    },
    //判断尺寸方法
    imgchecked(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          // 让页面中的img标签的src指向读取的路径
          let img = new Image()
          img.src = reader.result
          img.onload = () => {
            resolve({
              width: img.width,
              height: img.height,
              src: reader.result
            })
          }
        }
      })
    },
    //通过上传图片的宽高等，得到新的宽高尺寸
    getNewSize(baseWidth, baseHeight, imgWidth, imgHeight) {
      console.log(baseWidth, baseHeight, imgWidth, imgHeight)
      // 大体存在四种情况，进行分类比较得出新数据
      let obj = {
        width: '',
        height: '',
        scale: 1
      }
      //当上传图片的宽高都小
      if (imgWidth < baseWidth && imgHeight < baseHeight) {
        obj = {
          width: imgWidth,
          height: imgHeight,
          //缩放比例默认值
          scale: 1
        }
        console.log('当上传图片的宽高都小')
      } else if (imgWidth > baseWidth && imgHeight > baseHeight) {
        //当上传图片的宽高都大,这个场景下，需要计算对应的比例问题
        let wScale = baseWidth / imgWidth
        let hScale = baseHeight / imgHeight
        if (wScale < hScale) {
          // 这个场景，就是谁的比例小，按照谁为准
          obj = {
            width: imgWidth * wScale,
            height: imgHeight * wScale,
            scale: wScale
          }
        } else {
          obj = {
            width: imgWidth * hScale,
            height: imgHeight * hScale,
            scale: hScale
          }
        }
        console.log('当上传图片的宽高都大')
      }else if(imgWidth < baseWidth && imgHeight > baseHeight){
        //当上传图片的高单方面大
        let scale=baseHeight/imgHeight
        obj = {
          width: imgWidth * scale,
          height: imgHeight * scale,
          scale: scale
        }
        console.log('当上传图片的高单方面大')
      }else if(imgWidth > baseWidth && imgHeight < baseHeight){
        //当上传图片的宽单方面大
        let scale=baseWidth/imgWidth
        obj = {
          width: imgWidth * scale,
          height: imgHeight * scale,
          scale: scale
        }
        console.log('当上传图片的宽单方面大')
      }else {
        //  这个收尾，大概走不到
        console.log('这个收尾，大概走不到')
        obj = {
          width: baseWidth,
          height: baseHeight,
          scale: 1
        }
      }
      return obj
    },
    handleFileChange(e){
      const files = e.target.files
      console.log('handleFileChange -> file', files)
      if (!files) return
      this.filesList=files
      //获取图片的base64,宽,高
      this.imgchecked(files[0]).then(res => {
        console.log('res', res)
        this.dialogImageUrl = res.src
        //通过图片宽高数据，最终需要得到一个新的宽高数据出来
        let obj= this.getNewSize(this.baseWidth, this.baseHeight, res.width, res.height)
        console.log('新的尺寸数据',obj)
        this.style={
          width:obj.width+'px',
          height:obj.height+'px'
        }
        //试试给canvas添加背景图片
        this.width=obj.width
        this.height=obj.height
        this.loadCanvas=true
        this.$nextTick(()=>{
          this.drawCanvas(res.src,obj.width,obj.height)
        })
      })
    },
    //进行canvas绘制操作
    drawCanvas(src,dw,dh){
      //创建Canvas实例
      const canvas = new Canvas(document.querySelector('#canvase-event-list'))
      this.canvas=canvas
      console.log('Canvas实例',canvas)
      // var ctx = document.getElementById('canvase-event-list').getContext('2d');
      var ctx = canvas.ctx
      // return
      var img = new Image();
      let that=this
      img.onload = function(){
        ctx.drawImage(img,0,0,dw,dh);
        // ctx.strokeStyle = 'red'
        // ctx.strokeRect(0,0 ,200, 100)
        let arrList=[
          {
            x: 0,
            y: 0,
            width: 150,
            height:20,
            fillStyle: 'red',
            id:'00000000000',
            isClick:false,
            type:'rect',
            name:'你猜我看'
          },
          {
            x: 0,
            y: 50,
            width: 150,
            height:20,
            fillStyle: 'red',
            id:'1111111111111',
            isClick:false,
            type:'rect',
            name:'hfgjhgjh看'
          }
        ]
        that.arrList=arrList
        that.previewList=deepClone(arrList)
        //通过循环，动态进行canvas绘制
        arrList.map(item=>{
          //对应shape的实例加上type主要用于图形标识的，对应的绘制类方法不同
          canvas.addShape(item.type,item)
        })
        // console.log('李琦 canvas.children',canvas.children)
        //对于创建出来的实例进行事件添加
        let shapeList=canvas.children
        that.shapeList=shapeList
        console.log('李琦shapeList',canvas.children)
        shapeList.map(shape=>{
          console.log('shape',shape)
          //  可以通过对应type不同，进行不同事件的动态添加
          if(shape.type==='rect'){
            //  对于矩形，添加click事件
            shape.on('click', (event) => {
              console.log('李琦 click event',event)
              console.log('李琦 click shape',shape)
              //拿到对应的默认配置选项
              let opts=shape.config
              if(shape.isClick){
                //需要归位了
                canvas.changeShape(shape,{
                  //动态修改对应的shape配置
                  ...opts,
                  fillStyle: 'red',
                  isClick:false
                })
                that.synchronizeData(shape,{
                  ...opts,
                  fillStyle: 'red',
                  isClick:false
                })
                canvas.draw()
              }else {
                //可以改变颜色了
                canvas.changeShape(shape,{
                  ...opts,
                  fillStyle: 'green',
                  isClick:true
                })
                that.synchronizeData(shape,{
                  ...opts,
                  fillStyle: 'green',
                  isClick:true
                })
                canvas.draw()
              }
            })
          }
        })
        //绘制画布
        canvas.draw()
      }
      img.src = src;
    },
    //同步数据
    synchronizeData(shape,opts){
      console.log('同步数据 opts',opts)
      let arrList=this.arrList
      arrList=arrList.map(item=>{
        if(item.id===shape.id){
          return {
            ...item,
            ...opts
          }
        }else {
          return item
        }
      })
      console.log('同步数据 arrList',arrList)
      this.previewList=deepClone(arrList)
    },
    //改变颜色，需要修改canvas画布
    changeColor(item,index){
      console.log('改变颜色，需要修改canvas画布',item,index)
      let shapeList=this.shapeList
      console.log('shapeList',shapeList)
    //  通过对应id，在shapeList中，寻找对应的shape
      let currentIndex=this.shapeList.findIndex(shape=>shape.config.id===item.id)
      console.log('currentIndex',currentIndex)
      if(currentIndex!==-1){
      //  说明找到了
        let shape=shapeList[currentIndex]
        console.log('shape',shape)
        let canvas=this.canvas
        // return
      //  这个时候，就是主动触发事件进行操作了
        if(item.isClick){
          console.log('已经被点击过，需要归位了')
        //  已经被点击过，需要归位了
          canvas.changeShape(shape,{
            //动态修改对应的shape配置
            ...item,
            fillStyle: 'red',
            isClick:false
          })
          this.synchronizeData(shape,{
            ...item,
            fillStyle: 'red',
            isClick:false
          })
          canvas.draw()
        }else {
          console.log('说明没有被点击过，可以改变颜色了')
        //  说明没有被点击过，可以改变颜色了
          canvas.changeShape(shape,{
            ...item,
            fillStyle: 'green',
            isClick:true
          })
          this.synchronizeData(shape,{
            ...item,
            fillStyle: 'green',
            isClick:true
          })
          canvas.draw()
        }
      }
    },
    getCanvas(){
      //创建Canvas实例
      const canvas = new Canvas(document.querySelector('#canvase-event-list'))
      this.canvas=canvas
      console.log('Canvas实例',canvas)
      let arrList=[
        {
          x: 0,
          y: 0,
          width: 150,
          height:20,
          fillStyle: 'red',
          id:'00000000000',
          isClick:false,
          type:'rect',
          name:'你猜我看'
        },
        {
          x: 0,
          y: 50,
          width: 150,
          height:20,
          fillStyle: 'red',
          id:'1111111111111',
          isClick:false,
          type:'rect',
          name:'hfgjhgjh看'
        }
      ]
      this.arrList=arrList
      this.previewList=deepClone(arrList)
      //通过循环，动态进行canvas绘制
      arrList.map(item=>{
        //对应shape的实例加上type主要用于图形标识的，对应的绘制类方法不同
        canvas.addShape(item.type,item)
      })
      // console.log('李琦 canvas.children',canvas.children)
      //对于创建出来的实例进行事件添加
      let shapeList=canvas.children
      this.shapeList=shapeList
      console.log('李琦shapeList',canvas.children)
      shapeList.map(shape=>{
        console.log('shape',shape)
        //  可以通过对应type不同，进行不同事件的动态添加
        if(shape.type==='rect'){
          //  对于矩形，添加click事件
          shape.on('click', (event) => {
            console.log('李琦 click event',event)
            console.log('李琦 click shape',shape)
            //拿到对应的默认配置选项
            let opts=shape.config
            if(shape.isClick){
              //需要归位了
              canvas.changeShape(shape,{
                //动态修改对应的shape配置
                ...opts,
                fillStyle: 'red',
                isClick:false
              })
              this.synchronizeData(shape,{
                ...opts,
                fillStyle: 'red',
                isClick:false
              })
              canvas.draw()
            }else {
              //可以改变颜色了
              canvas.changeShape(shape,{
                ...opts,
                fillStyle: 'green',
                isClick:true
              })
              this.synchronizeData(shape,{
                ...opts,
                fillStyle: 'green',
                isClick:true
              })
              canvas.draw()
            }
          })
        }
      })
      //绘制画布
      canvas.draw()
    },
  },
}
</script>

<style lang="scss" scoped>
.canvase-event-list{
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  //canvas处理部分
  .canvase-event-list-middle{
    width: 1085px;
    height: 979px;
    box-sizing: border-box;
    margin: 0 auto;
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  //信息展示部分
  .canvase-event-list-right{
    //background: red;
    .change-color{
      background: green;
    }
    &:hover{
      cursor: pointer;
    }
  }
}



</style>
