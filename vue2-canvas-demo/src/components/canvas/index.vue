<!--
 * @Author: zhoulei0232
 * @Date: 2021-12-31 13:25:45
 * @LastEditTime: 2022-01-03 22:24:51
 * @LastEditors: zhoulei0232
 * @Description: 
-->
<template>
  <div class="warp">
    <div class="top">
      <div class="top-btn" @click="handleResetCanvas()">还原按钮</div>
    </div>
    <canvas
      id="canvas"
      class="canvas"
      ref="refCanvas"
      :width="cWidth"
      :height="cHeight"
      :style="'width:' + cWidth / 2 + 'px;height:' + cHeight / 2 + 'px;'"
    ></canvas>
  </div>
</template>

<script>
import Canvas from "./base.js";
export default {
  name: "laborImage",
  props: {
    cWidth: {
      type: Number,
      default: 0,
    },
    cHeight: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  components: {},
  watch: {
    // 监听传进来的参数
    list: {
      handler(newName) {
        if (newName.length == 0) {
          return;
        }
        this.handleChangeData(newName);
        this.$nextTick(() => {
          this.initScene();
        });
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      // canvasWidth: 1000, // 画布大小
      // canvasHeight: 1000,
      //底色块体
      baseSquareList: [],
      // 网格线
      baseGridLineList: [
         {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 0],
            [1000, 0],
          ],
        },
         {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 50],
            [1000, 50],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 100],
            [1000, 100],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 150],
            [1000, 150],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 200],
            [1000, 200],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 250],
            [1000, 250],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 300],
            [1000, 300],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 350],
            [1000, 350],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 400],
            [1000, 400],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 450],
            [1000, 450],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 500],
            [1000, 500],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 550],
            [1000, 550],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 600],
            [1000, 600],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 650],
            [1000, 650],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 700],
            [1000, 700],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 750],
            [1000, 750],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 800],
            [1000, 800],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 850],
            [1000, 850],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 900],
            [1000, 900],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 950],
            [1000, 950],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 1000],
            [1000, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [0,0],
            [0, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [50,0],
            [50, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [100,0],
            [100, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [150,0],
            [150, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [200,0],
            [200, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [250,0],
            [250, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [300,0],
            [300, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [350,0],
            [350, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [400,0],
            [400, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [450,0],
            [450, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [500,0],
            [500, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [550,0],
            [550, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [600,0],
            [600, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [650,0],
            [650, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [700,0],
            [700, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [750,0],
            [750, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [800,0],
            [800, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [850,0],
            [850, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [900,0],
            [900, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [950,0],
            [950, 1000],
          ],
        },
        {
          type: "line",
          color: "red",
          name: "基础边缘线",
          params: {},
          lineWidth: 4,
          data: [
            [1000,0],
            [1000, 1000],
          ],
        },
      ],
      // 边界线
      baseScopeLineList: [
         {
          type: "line",
          color: "blue",
          name: "网格线",
          params: {},
          lineWidth: 4,
          data: [
            [0, 5],
            [500, 5],
            [500, 300],
            [400, 340],
            [200, 300],
            [100, 300],
          ],
        },
      ],
      // 点
      pointList: [
        {
          type: "point",
          color: "#FFB6C1",
          name: "a点",
          params: {
            text: "携带高层参数",
          },
          x: 400,
          y: 400,
          radius: 8,
        },
        {
          type: "point",
          color: "#FFB6C1",
          name: "a点",
          params: {
            text: "携带高层参数",
          },
          x: 500,
          y: 400,
          radius: 8,
        },
      ],
      refCanvas: null,
      ctx: null,
      sceneX: 0, // 图片在画布中渲染的起点x坐标
      sceneY: 0,
      scale: 0.9, // 场景缩放比例大小
    };
  },
  mounted() {
    this.canvas = new Canvas(document.getElementById("canvas"));
    this.refCanvas = this.$refs.refCanvas;
    this.ctx = this.refCanvas.getContext("2d");
    this.canvasEventsInit();
    this.initScene();
  },
  methods: {
    // 初始化场景用
    initScene() {
      this.baseSquareList.forEach((item) => {
        this.canvas.createBlock({
          data: item.data.map((item) => {
            return [
              item[0] * this.scale + this.sceneX,
              item[1] * this.scale + this.sceneY,
            ];
          }),
          lineWidth: item.lineWidth * this.scale,
          name: item.name,
          color: item.color,
          borderColor: item.borderColor,
        });
      });
      this.baseGridLineList.forEach((item) => {
        this.canvas.createLine({
          // 红色
          data: item.data.map((item) => {
            return [
              item[0] * this.scale + this.sceneX,
              item[1] * this.scale + this.sceneY,
            ];
          }),
          lineWidth: item.lineWidth * this.scale,
          name: item.name,
          color: item.color,
        });
      });
      this.baseScopeLineList.forEach((item) => {
        this.canvas.createLine({
          // 红色
          data: item.data.map((item) => {
            return [
              item[0] * this.scale + this.sceneX,
              item[1] * this.scale + this.sceneY,
            ];
          }),
          lineWidth: item.lineWidth * this.scale,
          name: item.name,
          color: item.color,
        });
      });
      this.pointList.forEach((item) => {
        this.canvas.createPoint({
          // 红色
          x: item.x * this.scale + this.sceneX,
          y: item.y * this.scale + this.sceneY,
          radius: item.radius * this.scale,
          name: item.name,
          params: item.params,
          color: item.color,
        });
      });
    },
    // 重新加载场景
    handleReloadScene() {
      this.canvas.cleanScene();
      this.initScene();
    },
    /**
     * 为画布上鼠标的拖动和缩放注册事件
     */
    canvasEventsInit() {
      var _this = this;
      var canvas = _this.refCanvas;
      // 移动的方法
      canvas.onmousedown = function (event) {
        var sceneX = _this.sceneX;
        var sceneY = _this.sceneY;
        var pos = { x: event.clientX, y: event.clientY }; //坐标转换，将窗口坐标转换成canvas的坐标
        canvas.onmousemove = function (evt) {
          //移动
          canvas.style.cursor = "move";

          var x = (evt.clientX - pos.x) * 2 + sceneX;
          var y = (evt.clientY - pos.y) * 2 + sceneY;
          _this.sceneX = x;
          _this.sceneY = y;

          _this.handleReloadScene(); //重新绘制图片
        };
        canvas.onmouseup = function () {
          canvas.onmousemove = null;
          canvas.onmouseup = null;
          canvas.style.cursor = "default";
        };
      };
      //滚轮放大缩小
      canvas.onmousewheel = canvas.onwheel = function (event) {
        var wheelDelta = event.wheelDelta
          ? event.wheelDelta
          : event.deltalY * -40; //获取当前鼠标的滚动情况
        if (wheelDelta > 0) {
          _this.scale *= 1.1;
        } else {
          if (_this.scale > 0.9) {
            _this.scale *= 0.9;
          }
        }
        _this.handleReloadScene();
        event.preventDefault && event.preventDefault();
        return false;
      };
    },
    // 重置场景
    handleResetCanvas() {
      this.scale = 0.9;
      this.sceneX = 0;
      this.sceneY = 0;
      this.handleReloadScene();
    },
    // 转化数据用
    handleChangeData(arr) {
      arr.forEach((item) => {
        if (item.type == "baseBox") {
          this.baseSquareList = item.data.map((item1) => {
            return {
              type: "square",
              name: "基础范围",
              color: item.color,
              borderColor:  item.borderColor,
              params: {}, // 传参对象
              lineWidth: 4,
              data: item1,
            };
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.warp {
  background-color: yellow;
  cursor: pointer;
  width: 500px;
  height: 500px;
  border: 2px solid #333;
  position: relative;
}
.warp .top {
  position: absolute;
  top: 0;
  right: 0;
}
.warp .top .top-btn {
  background-color: skyblue;
  color: #fff;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
}
</style>
