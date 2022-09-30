<!-- tree.vue - 树，canvas -->

<template>
  <div class="container">
    <canvas ref="tree-canvas"></canvas>
    <el-button type='warning' size='small' plain @click='refresh' class='refresh-btn'>刷新</el-button>
  </div>
</template>
<style scoped>
  .refresh-btn{
    position: absolute ;
    top: 20px;
    left: 30%;
  }
  .container{
    position: relative;
  }
</style>
<script>
import utils from '@/utils/utils.js' 
export default {
  data() {
    return {
      canvas: null, // canvas元素
      width: 800, // canvas宽度
      height: 600, // canvas高度
      ctx: null, // canvas的绘制上下文
      tree: {
        isRandomBranch:true , // 是否随机分支长度
        isRandomAngle:true, // 是否分支角度随机
        isShowFlower:true, // 是否有开花 
        flowerRatio:0.01, // 分支结束后，是否出现花朵的概率（必须设置isShowFlower为true，该概率才有效），视为百分比的值，如设置为0.02，即视为概率2%
        flowerRadiusRange:[4,12], // 花朵半径设置（范围，随机在该范围内取值）
        // 树的一些配置
        angle: 1/3, // 分叉角度,π的系数。初始(1/4)*π
        long: 90, // 每支长度
        baseColor: "#265", // 基础颜色（背景色）
        minBranchWidth:0.4, // 最小分支宽度
        
        data:[], // 树的数据
      },
    }
  },
  methods: {
    init() {
      // 初始化canvas状态
      this.canvas = this.$refs["tree-canvas"];
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.style.background = "#f5f5f5";
      if (this.canvas.getContext) {
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineCap = 'round'; // 线段两端圆形
        
        // this.drawTree()
        this.madeTreeBranch(this.width/2,this.height,15,110,utils.colorBright(this.tree.baseColor,0.2),0) ;
        this.drawTree() ;
      } else {
        this.$message("您的浏览器不支持canvas绘画环境");
      }
    },
    drawTree(){
      // 绘制背景色
      this.ctx.fillStyle = this.tree.baseColor ;
      this.ctx.fillRect(0,0,this.width,this.height);
      // 绘制树
      for(var i=0;i<this.tree.data.length;i++){
        let item = this.tree.data[i] ;
        if(item.type=='branch'){
          // 该数据是分支（树枝）数据，绘制直线
          this.ctx.beginPath();
          this.ctx.moveTo(item.startX,item.startY) ;
          this.ctx.lineTo(item.endX,item.endY) ;
          this.ctx.strokeStyle = item.color ; // 线段颜色
          this.ctx.lineWidth = item.width ; // 线段宽度
          this.ctx.stroke();
          this.ctx.closePath() ;
        }else if(item.type=='flower'){
          // 该数据是“花”数据，绘制‘花’
          /* x:endX,
          y:endY,
          r:Math.floor(Math.random()*3+5)+1, // 5-8之间的随机数作为花的半径
          color:'rgba('+Math.floor(Math.random()*255+1)+','+Math.floor(Math.random()*255+1)+','+Math.floor(Math.random()*255+1)+','+'1'+')', // 随机颜色 */
          this.ctx.save() ; 
          console.log('-----',item)
          let gradient = this.ctx.createRadialGradient(item.x,item.y,item.r/10,item.x,item.y,item.r) ;  // 设置径向渐变
          gradient.addColorStop(0,item.color) ;
          gradient.addColorStop(0.2,utils.updateAlpha(item.color,0.5)) ;
          gradient.addColorStop(0.6,utils.updateAlpha(item.color,0.1)) ;
          gradient.addColorStop(0.9,utils.updateAlpha(item.color,0)) ;

          this.ctx.fillStyle = gradient;
          this.ctx.beginPath();
          this.ctx.arc(item.x,item.y,item.r,0,2*Math.PI);
          this.ctx.fill() ;
          this.ctx.restore() ;
        }
        
      }
    },
    madeTreeBranch(startX,startY,width,length,color,angle){  // 初始坐标xy：startX，startX，线宽width，长度length,颜色color，角度angle（以竖直向上为轴方向，即0度，往右偏为正表示，往左偏为负表示）
      let endX ,endY ; // 结束端坐标
      let subWidth ; // 下级宽度
      let subColor ; // 下级颜色
      let subLength ; // 下级长度
      endX = Number((Math.sin(angle)*length + startX).toFixed(5)) ;
      endY = Number(startY - Math.cos(angle)*length.toFixed(5)) ;// 引canvas上的坐标，越往上，y越小，因此这里startY - 向上的偏移值，而不是加。
      
      if(isNaN(endX)) return false 
      let line = {
        startX:startX,
        startY:startY,
        endX:endX,
        endY:endY,
        angle:angle, // 将角度也记录进来
        width:width,
        color:color,
        type:'branch' // 类型是分支（树枝）
      }
      // console.log('--------------:',line)
      this.tree.data.push(line) ; // 生成的线段数据存入data中保存
      
      if(width>this.tree.minBranchWidth){
        // 线宽大于最小值限制，还可以继续分
        subColor = utils.colorBright(color,0.1) ; // 颜色提亮1%，作为下级的颜色
        let subAngle1,subAngle2 ; // 两个分支，他们各自的角度值
        if(this.tree.isRandomAngle){
          // 随机角度
          let num = Math.random()*0.4+0.3 ; // 0.3 - 0.7之间的随机数 ； 
          subAngle1 = angle+num*this.tree.angle*Math.PI ; // 分支1的角度
          subAngle2 = angle-(1-num)*this.tree.angle*Math.PI ;// 分支2的角度 
          console.log('subAngle1:',subAngle1)
          console.log('subAngle2:',subAngle2)
        }else{
          // 不随机角度，则分支正好与上级枝条的角度对分
          subAngle1 = angle+0.5*this.tree.angle*Math.PI ; // 分支1的角度
          subAngle2 = angle-0.5*this.tree.angle*Math.PI ; // 分支2的角度 
        }

        
        let subLength1,subLength2 ; // 分别两个枝条的长度；
        let subWidth1,subWidth2 ; // 分别两个枝条的宽度；
        let subNum ; // 下级系数，随机数
        if(this.tree.isRandomBranch){
          // 随机分支长度/宽度
          subNum =Math.random()*0.3+0.6 ; // 赋值下级系数，0.6-0.9之间的随机数
          subWidth1 = width*subNum ;
          subLength1 = length*subNum
          subNum =Math.random()*0.3+0.6 ; // 赋值下级系数，0.6-0.9之间的随机数
          subWidth2 = width*subNum ;
          subLength2 = length*subNum
        }else{
          // 不随机枝条长宽，则下级系数固定为0.8
          subNum = 0.8 ;
          subWidth1 = width*subNum ;
          subLength1 = length*subNum ;
          subWidth2 = width*subNum ;
          subLength2 = length*subNum ;
        }
        // 再考虑角度（树总是倾向于往上长，因此分支角度越接近0（竖直向上），枝条越长，反之，枝条越短。使树更倾向于集中往上长，而往两边的枝条短一些，相对少一些）
        // 根据角度，修正枝条长度系数
        if(Math.abs(subAngle1-0)<=Math.PI*1/6){ // 角度值与竖直方向的夹角小于30度（1/6*PI），则视为向上，其余视为偏向两边
          subLength1 = subLength1*1.05 ;// 往上长的，略微增加长度
        }else if(Math.abs(subAngle1-0)>Math.PI*1/6){ // // 角度值与竖直方向的夹角大于30度（1/6*PI），则视为向旁边生长
          subLength1 = subLength1*0.9 ;// 往旁边长的，略微减少长度
        }
        if(Math.abs(subAngle2-0)<=Math.PI*1/6){ // 角度值与竖直方向的夹角小于30度（1/6*PI），则视为向上，其余视为偏向两边
          subLength2 = subLength2*1.05 ;// 往上长的，略微增加长度
        }else if(Math.abs(subAngle2-0)>Math.PI*1/6){ // // 角度值与竖直方向的夹角大于30度（1/6*PI），则视为向旁边生长
          subLength2 = subLength2*0.9 ;// 往旁边长的，略微减少长度
        }

        // 最后，将两个分支生成并存入数据中
        this.madeTreeBranch(endX,endY,subWidth1,subLength1,subColor,subAngle1 )
        this.madeTreeBranch(endX,endY,subWidth2,subLength2,subColor,subAngle2 )
      }else{
        // 线宽不大于最小值限制了，不可继续分支
        if(this.tree.isShowFlower){ // 如果配置了有‘花’，则在枝条顶端出现‘花’
          let num = Math.floor(Math.random()*99+1) ; // 随机数1-100
          if(num<=this.tree.flowerRatio*100){ // 小于等于概率值，才开花（不是每个枝条都开花的），概率大概是(this.tree.flowerRatio*100)%
            // 需要开花。则在结束位置生成花朵数据
            let flower = {
              x:endX,
              y:endY,
              r:Math.floor(Math.random()*(this.tree.flowerRadiusRange[1]-this.tree.flowerRadiusRange[0])+1)+this.tree.flowerRadiusRange[0], // 指定范围的随机数作为花的半径
              // color:'rgba('+Math.floor(Math.random()*255+1)+','+Math.floor(Math.random()*255+1)+','+Math.floor(Math.random()*255+1)+','+'1'+')', // 随机颜色
              color:'rgba(150,255,255,1)', // 颜色
              type:'flower' // 类型是分支
            }
            this.tree.data.push(flower);
          }
        }
      }
    },
    refresh(){
      this.ctx.clearRect(0,0,this.width,this.height) ; // 清除canvas画布
      this.tree.data = [] ; // 清除树的数据 ;
      this.madeTreeBranch(this.width/2,this.height,15,110,utils.colorBright(this.tree.baseColor,0.2),0) ;
      this.drawTree() ;
    }
  },
  mounted() {
    this.init();
  },
};
</script>
