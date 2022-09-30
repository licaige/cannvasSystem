<template>
  <div>
    <div
      class="pie-contain"
      :style="containSty"
    >
      <canvas
        :id="canvasId"
        :width="width"
        :height="height"
      ></canvas>
      <!-- 中间文字显示 -->
      <div class="pie-text">
        <div class="pie-text-num">{{ totalValue }}</div>
        <div
          class="pie-text-word"
          v-html="centerT"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    canvasId: {
      type: String,
      default: "",
    },
    width: {
      type: [String, Number],
      default: "",
    },
    height: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "ring", // 圆环ring 柱状图bar 折线图 line 饼状pie
    },
    data: {
      // 存放图表数据
      type: Array,
      default () {
        return [];
      },
    },
    options: {
      type: Object,
      required: false,
    },
    centerText: {
      type: String,
      default: "",
    },
  },
  data () {
    return {
      canvas: "",
      ctx: "",
      centerT: "",
      colors: [
        {
          star: "rgb(82, 241, 243)",
          center: "rgb(43, 139, 148)",
          end: "rgb(7, 54, 59)",
          rect: "rgb(80, 252, 254)",
        },
        {
          star: "rgb(8, 53, 59)",
          center: "rgb(9, 60, 66)",
          end: "rgb(9, 58, 63)",
          rect: "rgb(48, 146, 155)",
        },
      ], // 环形图颜色列表
    };
  },
  mounted () {
    this.sChart(this.canvasId, this.type, this.data, this.options);
  },
  computed: {
    /**
     * 获取饼状或环形图的数据总和
     * @return {Number} total
     */
    totalValue () {
      let total = 0;
      for (let i = 0; i < this.data.length; i++) {
        total += this.data[i].value;
      }
      return total;
    },
    // 容器宽高
    containSty () {
      const style = {};
      style.width = this.width + "px";
      style.height = this.height + "px";
      return style;
    },
  },
  methods: {
    sChart (canvas, type, data, options) {
      this.canvas = document.getElementById(canvas);
      this.ctx = this.canvas.getContext("2d");
      this.type = type;
      this.data = data; // 存放图表数据
      this.dataLength = this.data.length; // 图表数据的长度
      // this.totalValue = this.getTotalValue(); // 获取饼图数据总和
      this.innerRadius = options.innerRadius;
      this.radius = options.radius;
      // this.colorList = options.colorList;
      this.init();
    },
    init () {
      if (this.dataLength === 0) {
        return false;
      }
      this.drawPieChart();
      // this.drawCenterText(this.centerText);
      this.centerT = this.cutTwo(this.centerText, this.innerRadius * 2 - 5);
    },
    /**
     * 绘制完整的饼状图或环形图
     */
    drawPieChart () {
      // console.log(this.totalValue);
      let x = this.width / 2;
      let y = this.height / 2;

      this.drawColorArc(x, y);
      // 绘制饼图
      var startAngle = -Math.PI / 2,
        endAngle = -Math.PI / 2; //起始、结束弧度
      for (var i = 0; i < this.dataLength; i++) {
        // this.ctx.globalCompositeOperation = 'xor';
        this.ctx.beginPath(); //开始绘制
        endAngle += -(this.data[i].value / this.totalValue) * 2 * Math.PI; //确定结束弧度
        this.ctx.fillStyle = "rgba(255,255,255,0.01)";

        this.ctx.shadowBlur = 0;
        // this.ctx.shadowColor = "rgb(30, 147, 157)";

        this.ctx.moveTo(x, y); //位置挪到先前设置的圆心
        this.ctx.arc(x, y, this.radius, startAngle, endAngle, true); //画大饼
        this.ctx.fill(); //填充
        var lineAngle = (startAngle + endAngle) / 2; //先算出画线角度
        // 画延长线
        this.drawingLine(lineAngle, this.data[i], this.colors[i].rect);

        startAngle = endAngle; //更新起始弧度
      }
      // 绘制高亮
      // let j = 0;
      // for (let i = 0; i < 2; i++) {
      //   console.log(j);
      //   this.ctx.beginPath();
      //   // this.ctx.lineWidth = 1;
      //   this.ctx.shadowBlur = 5;
      //   this.ctx.shadowColor = "rgba(255, 255, 255,0.2)";
      //   let radgrad = this.ctx.createRadialGradient(x - 20 + j, y - this.radius + 10, 0, x - 10 + j, y - this.radius + 10, 20);
      //   radgrad.addColorStop(0, 'rgba(255, 255, 255,0.6)');
      //   radgrad.addColorStop(0.9, 'rgba(255, 255, 255,0.4)');
      //   radgrad.addColorStop(1, 'rgba(255, 255, 255,0.1)');

      //   this.ctx.fillStyle = radgrad;
      //   this.ctx.arc(x - 10 + j, y - this.radius + 10, 20, 0, Math.PI * 2);
      //   this.ctx.fill();
      //   this.ctx.closePath();
      //   j += 35;
      // }

      // 如果类型是环形图，绘制一个内圆
      if (this.type === "ring") {
        this.drawInnerRound(x, y);
      }
    },
    // 绘制有色圆
    drawColorArc (x, y) {
      let startA = -Math.PI / 2,
        endA = -Math.PI / 2; //起始、结束弧度
      for (var i = 0; i < 2; i++) {
        this.ctx.beginPath(); //开始绘制
        endA += -Math.PI; //确定结束弧度
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = "rgb(10, 101, 108,0.6)";
        this.ctx.shadowOffsetY = 1;
        this.ctx.shadowOffsetX = 1;
        var grd = this.ctx.createLinearGradient(
          x - this.innerRadius + 10,
          y - this.innerRadius + 10,
          x,
          y + this.radius - 10
        );
        grd.addColorStop(0, this.colors[i].star);
        grd.addColorStop(0.3, this.colors[i].center);
        grd.addColorStop(1, this.colors[i].end);
        this.ctx.fillStyle = grd;

        this.ctx.shadowBlur = 0;

        this.ctx.moveTo(x, y); //位置挪到先前设置的圆心
        this.ctx.arc(x, y, this.radius, startA, endA, true); //画大饼
        this.ctx.fill(); //填充
        startA = endA; //更新起始弧度
      }
      // 中间挖空透明
      this.clearArcFun(x, y, this.innerRadius, this.ctx);
    },
    // 绘制内部圆
    drawInnerRound (x, y) {
      this.ctx.beginPath();
      // this.ctx.fillStyle = "rgba(81, 245, 248,0.2)";
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = "rgb(81, 245, 248)";
      this.ctx.shadowOffsetY = 3;
      this.ctx.shadowOffsetX = 3;
      this.ctx.arc(x, y, this.innerRadius, 0, Math.PI * 2);
      this.ctx.fill();

      this.clearArcFun(x, y, this.innerRadius, this.ctx);
    },
    // 绘制高亮
    // drawLight () {},
    // 绘制延长线
    drawingLine (lineAngle, dataItem, color) {
      let x = this.width / 2;
      let y = this.height / 2;
      var startX = x + (this.innerRadius + 12) * Math.cos(lineAngle);
      var startY = y + (this.innerRadius + 12) * Math.sin(lineAngle);
      var outX = x + (this.radius + 15) * Math.cos(lineAngle);
      var outY = y + (this.radius + 15) * Math.sin(lineAngle);
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.shadowBlur = 0;
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(outX, outY);
      if (outX >= x) {
        this.ctx.lineTo(outX + 16, outY);
        this.drawingText(outX + 4, outY - 7, "left", dataItem);
        this.drawLineRect(outX + 16, outY - 2, color);
      } else {
        this.ctx.lineTo(outX - 16, outY);
        this.drawingText(outX - 4, outY - 7, "right", dataItem);
        this.drawLineRect(outX - 26, outY - 2, color);
      }
      //   this.ctx.strokeStyle = dataItem.color;
      this.ctx.strokeStyle = "#FFF";
      this.ctx.stroke();
    },
    // 绘制延长线外方块
    drawLineRect (x, y, color) {
      this.ctx.shadowBlur = 0;
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, 10, 4);
    },
    // 绘制文字
    drawingText (tX, tY, algin, dataItem) {
      this.ctx.textAlign = algin; //对齐方式
      this.ctx.font = "16px 微软雅黑"; //字体
      this.ctx.fillStyle = "#FFF"; //文字颜色
      this.ctx.fillText(dataItem.value, tX, tY);
    },
    // 绘制中间文字
    drawCenterText (centerData) {
      var total = this.totalValue,
        name = centerData;
      //total
      this.ctx.beginPath();
      this.ctx.textAlign = "center";
      this.ctx.font = "36px 微软雅黑";
      // var priceW = this.ctx.measureText(total).width;//必须在字体之后才能正常获取宽度
      this.ctx.fillStyle = "#FFF";
      this.ctx.fillText(total, this.width / 2, this.height / 2 - 30);

      // 开始绘制底部小文字
      this.ctx.beginPath();
      this.ctx.textAlign = "center";
      this.ctx.font = "36px 微软雅黑";
      this.ctx.fillStyle = "#FFF";
      let strs = this.cutTwo(name, this.ctx, this.innerRadius * 2 - 10);
      // console.log(strs);
      if (strs) {
        let h = 20;
        for (let key in strs) {
          this.ctx.fillText(strs[key], this.width / 2, this.height / 2 + h);
          h += 40;
        }
      }
    },
    // 内部文字换行
    cutTwo (str, line) {
      let onelineWidth = 0,
        line2w = 0;
      for (let i = 0; i < str.length; i++) {
        onelineWidth += this.getTextWidth(str[i]);
        if (onelineWidth > line) {
          let str1 = str.substring(0, i);
          let str2 = str.substring(i, str.length);

          if (this.getTextWidth(str2) > line - 50) {
            for (let j = 0; j < str2.length; j++) {
              line2w += this.getTextWidth(str2[j]);
              // console.log(line2w, (line - 20));
              if (line2w > line - 35) {
                str2 = str2.substring(0, j) + "...";
                return str1 + "</br>" + str2;
              }
            }
          }
          return str1 + "</br>" + str2;
        }
      }
    },
    // div文字长度
    getTextWidth (text, font = "500 16px 'Microsoft Yahei'") {
      let tCanvas = null;
      const canvas = tCanvas || (tCanvas = document.createElement("canvas"));
      const context = canvas.getContext("2d");
      context.font = font;
      return context.measureText(text).width;
    },
    // 清除内部圆
    clearArcFun (x, y, r, cxt) {
      //(x,y)为要清除的圆的圆心，r为半径，cxt为context
      var stepClear = 0.2; //别忘记这一步
      clearArc(x, y, r);
      function clearArc (x, y, radius) {
        var calcWidth = radius - stepClear;
        var calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);
        var posX = x - calcWidth;
        var posY = y - calcHeight;

        var widthX = 2 * calcWidth;
        var heightY = 2 * calcHeight;

        if (stepClear <= radius) {
          cxt.clearRect(posX, posY, widthX, heightY);
          stepClear += 0.2;
          clearArc(x, y, radius);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pie-contain {
  position: relative;
  .pie-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    &-num {
      line-height: 20px;
      font-size: 22px;
      font-weight: 700;
      font-family: "Microsoft Yahei";
      color: #fff;
    }
    &-word {
      font-size: 16px;
      font-weight: 500;
      font-family: "Microsoft Yahei";
      color: #fff;
    }
  }
}
</style>
