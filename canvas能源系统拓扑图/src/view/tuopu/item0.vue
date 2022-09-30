<template>
    <div>
      <div id="main" :style="{width: '100%',height: getHeight }"></div>
    </div>
</template>
<script>
    const innerWidth = window.innerWidth;
    const inerHeight = window.innerHeight;
    import lengqueta from '@/assets/images/canvas/lengqueta.png';
    import lengji from '@/assets/images/canvas/lengji.png';
    import offNo from '@/assets/images/canvas/offNo.png';
    import shinei from '@/assets/images/canvas/shinei.png';
    import shuibeng_no from '@/assets/images/canvas/shuibeng_no.png';
    import shuibeng_off from '@/assets/images/canvas/shuibeng_off.png';
    const echarts = require('echarts');
    export default {
        name: "item1",
        props: {
          propsData:{
            required:true
          }
        },
        components: {},
        computed: {
          getSize(){
            let size = this.$store.state.wh; //innerHeight innerWidth
            return size - 100;
          },
          getHeight(){
            let size = this.$store.state.wh.innerHeight; //innerHeight innerWidth
            return `${size - 65}px`;
          }
        },
        data() {
            return {
              configStage: {
                width: innerWidth,
                height: inerHeight - 70
              },
              configAll: {
                //冷却罐
                coolingTank:[]
              },
              imgArr:{lengqueta,lengji,offNo,shinei,shuibeng_no,shuibeng_off},
              dataAll:{}
            }
        },
        methods: {
          init(){
            this.initEchart();
            this.initData();
          },
          //初始化
          initEchart(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            //图标大小
            let symbolSizeSetting = 100,
                iconSize1 = [64,93], iconSize2 = [43,78], iconSize3 = [139,77], iconSize4 = [143,94], iconSize5 = [12,10];
            let labelOne = {//文字1省级市级五区
                  normal: {
                    position: "insideTopLeft",
                    distance:-15,	//离图标多远
                    show: true,
                    textStyle: {
                      fontSize: 12,
                      color:'#fff',
                      fontFamily:'microsoftYaHei',
                      fontWeight:500
                    },
                  }
                },
                label2 = {//室内
                  /*normal: {
                    position: "top",
                    distance:0,	//离图标多远
                    show: true,
                    textStyle: {
                      fontSize: 12,
                      color:'#fff',
                      fontFamily:'microsoftYaHei',
                      fontWeight:500
                    },
                  },*/
                  show: true,
                  position: "insideTop",
                  distance:-15,	//离图标多远
                  formatter: function (params) {
                    let param = params.data.props;
                    return [
                      `{a|${param.name}}`,
                      `{b|${param.subtitle}}`
                    ].join('\n')
                  },
                  rich: {
                    a: {
                      color: '#fff',
                      fontSize: 14
                    },
                    b: {
                      color: '#ffd419',
                      height: 150,
                      lineHeight:150,
                      fontSize: 14
                    }
                  }
                },
                label3 = {//室内
                  show: true,
                  position: "insideTop",
                  distance:-10,	//离图标多远
                  formatter: function (params) {
                    let param = params.data.props;
                    return [
                      `{a|${param.name}}`,
                      `{b|${param.subtitle}}`
                    ].join('\n')
                  },
                  rich: {
                    a: {
                      color: '#fff',
                      fontSize: 12,
                      fontWeight:500,
                      width:100,
                      align:'left'
                    },
                    b: {
                      width:100,
                      color: '#ffd419',
                      height: 130,
                      lineHeight:130,
                      fontSize: 14,
                      align:'center'
                    }
                  }
                };
            let labelTwo = {//文字2
              normal: {
                position: "bottom",
                show: true,
                distance:0,
                textStyle: {
                  fontSize: 18,
                  color:'#fff',
                  fontWeight:'500',
                  fontFamily:'microsoftYaHei'
                },
              }
            };
            let labelThree = {//文字3
              normal: {
                position: "bottom",
                show: true,
                textStyle: {
                  fontSize: 16,
                  color:'#00eaff',
                  fontFamily:'microsoftYaHei'
                },
              }
            };
            let lineColorOne = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#b12223' }]),
                lineWidth = 4, lineOpacity = 1, lineIconColor = '#fff',
                lineColor2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#fc654a' }]),
                lineColor3 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#4e82ab' }]),
                lineColor4 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#4267e0' }]);
              //冷却罐
            let lengqueguan = [
                {
                  name: "冷却罐1",
                  props:{
                    name: "冷却罐1",
                    subtitle:"22℃"
                  },
                  symbol:`image://${lengqueta}`,
                  symbolSize: iconSize1,
                  draggable: false,
                  fixed: true,
                  value: [10, 240],
                  label: label3,
                },
                {
                  name: "冷却罐2",
                  props:{
                    name: "冷却罐2",
                    subtitle:"22℃"
                  },
                  symbol:`image://${lengqueta}`,
                  symbolSize: iconSize1,
                  draggable: false,
                  fixed: true,
                  value: [35, 240],
                  label: label3,
                },
                {
                  name: "冷却罐3",
                  props:{
                    name: "冷却罐3",
                    subtitle:"22℃"
                  },
                  symbol:`image://${lengqueta}`,
                  symbolSize: iconSize1,
                  draggable: false,
                  fixed: true,
                  value: [10, 160],
                  label: label3,
                },
                {
                  name: "冷却罐4",
                  props:{
                    name: "冷却罐4",
                    subtitle:"22℃"
                  },
                  symbol:`image://${lengqueta}`,
                  symbolSize: iconSize1,
                  draggable: false,
                  fixed: true,
                  value: [35, 160],
                  label: label3,
                },
                {
                  name: "冷却罐5",
                  props:{
                    name: "冷却罐5",
                    subtitle:"22℃"
                  },
                  symbol:`image://${lengqueta}`,
                  symbolSize: iconSize1,
                  draggable: false,
                  fixed: true,
                  value: [60, 160],
                  label: label3,
                },
                {
                  name: "冷却罐6",
                  props:{
                    name: "冷却罐6",
                    subtitle:"22℃"
                  },
                  symbol:`image://${lengqueta}`,
                  symbolSize: iconSize1,
                  draggable: false,
                  fixed: true,
                  value: [10, 80],
                  label: label3,
                },
                {
                  name: "冷却罐7",
                  props:{
                    name: "冷却罐7",
                    subtitle:"22℃"
                  },
                  symbol:`image://${lengqueta}`,
                  symbolSize: iconSize1,
                  draggable: false,
                  fixed: true,
                  value: [35, 80],
                  label: label3,
                },
                {
                  name: "冷却罐8",
                  props:{
                    name: "冷却罐8",
                    subtitle:"22℃"
                  },
                  symbol:`image://${lengqueta}`,
                  symbolSize: iconSize1,
                  draggable: false,
                  fixed: true,
                  value: [60, 80],
                  label: label3,
                }
              ],
              //冷水管闸
              lengshuiguanOnoff = [
                {
                  name: "冷却罐1闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [9.5, 260],
                  //label: labelOne,
                },
                {
                  name: "冷却罐2闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [34.5, 260],
                  //label: labelOne,
                },
                {
                  name: "冷却罐3闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [9.5, 180],
                  //label: labelOne,
                },
                {
                  name: "冷却罐4闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [34.5, 180],
                  //label: labelOne,
                },
                {
                  name: "冷却罐5闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [59.5, 180],
                  //label: labelOne,
                },
                {
                  name: "冷却罐6闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [9.5, 100],
                  //label: labelOne,
                },
                {
                  name: "冷却罐7闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [34.5, 100],
                  //label: labelOne,
                },
                {
                  name: "冷却罐8闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [59.5, 100],
                  //label: labelOne,
                },
              ],
              //水泵A
              shuibeng = [
                {
                  name: "水泵1",
                  symbol:`image://${shuibeng_no}`,
                  symbolSize: iconSize2,
                  draggable: false,
                  fixed: true,
                  value: [110, 270],
                  label: labelOne,
                },
                {
                  name: "水泵2",
                  symbol:`image://${shuibeng_off}`,
                  symbolSize: iconSize2,
                  draggable: false,
                  fixed: true,
                  value: [110, 210],
                  label: labelOne,
                },
                {
                  name: "水泵3",
                  symbol:`image://${shuibeng_off}`,
                  symbolSize: iconSize2,
                  draggable: false,
                  fixed: true,
                  value: [110, 150],
                  label: labelOne,
                },
                {
                  name: "水泵4",
                  symbol:`image://${shuibeng_no}`,
                  symbolSize: iconSize2,
                  draggable: false,
                  fixed: true,
                  value: [110, 90],
                  label: labelOne,
                },
                {
                  name: "水泵5",
                  symbol:`image://${shuibeng_off}`,
                  symbolSize: iconSize2,
                  draggable: false,
                  fixed: true,
                  value: [110, 30],
                  label: labelOne,
                }
              ],
              //冷水机
              lengshuiji = [
                {
                  name: "冷水机1",
                  symbol:`image://${lengji}`,
                  symbolSize: iconSize3,
                  draggable: false,
                  fixed: true,
                  value: [160, 200],
                  label: labelOne,
                },
                {
                  name: "冷水机2",
                  symbol:`image://${lengji}`,
                  symbolSize: iconSize3,
                  draggable: false,
                  fixed: true,
                  value: [160, 161],
                  label: labelOne,
                },
                {
                  name: "冷水机3",
                  symbol:`image://${lengji}`,
                  symbolSize: iconSize3,
                  draggable: false,
                  fixed: true,
                  value: [160, 120],
                  label: labelOne,
                }
              ],
              lengshuijiOnoff = [
                {
                  name: "冷水机1闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [141, 199.5],
                  symbolRotate:-90
                  //label: labelOne,
                },
                {
                  name: "冷水机2闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [141, 160.5],
                  symbolRotate:-90
                  //label: labelOne,
                },
                {
                  name: "冷水机3闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [141, 119.5],
                  symbolRotate:-90
                  //label: labelOne,
                },

                {
                  name: "冷水机1闸r",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [178, 199.5],
                  symbolRotate:-90
                  //label: labelOne,
                },
                {
                  name: "冷水机2闸r",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [178, 160.5],
                  symbolRotate:-90
                  //label: labelOne,
                },
                {
                  name: "冷水机3闸r",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [178, 119.5],
                  symbolRotate:-90
                  //label: labelOne,
                }
              ],
              //水泵B
              shuibengb = [
                {
                  name: "水泵B1",
                  symbol:`image://${shuibeng_no}`,
                  symbolSize: iconSize2,
                  draggable: false,
                  fixed: true,
                  value: [210, 270],
                  label: labelOne,
                },
                {
                  name: "水泵B2",
                  symbol:`image://${shuibeng_off}`,
                  symbolSize: iconSize2,
                  draggable: false,
                  fixed: true,
                  value: [210, 210],
                  label: labelOne,
                },
                {
                  name: "水泵B3",
                  symbol:`image://${shuibeng_off}`,
                  symbolSize: iconSize2,
                  draggable: false,
                  fixed: true,
                  value: [210, 150],
                  label: labelOne,
                },
                {
                  name: "水泵B4",
                  symbol:`image://${shuibeng_no}`,
                  symbolSize: iconSize2,
                  draggable: false,
                  fixed: true,
                  value: [210, 90],
                  label: labelOne,
                },
                {
                  name: "水泵B5",
                  symbol:`image://${shuibeng_off}`,
                  symbolSize: iconSize2,
                  draggable: false,
                  fixed: true,
                  value: [210, 30],
                  label: labelOne,
                }
              ],
              shineiArr = [
                {
                  name: "室内1",
                  props:{
                    name: "室内1",
                    subtitle:'24.7℃'
                  },
                  symbol:`image://${shinei}`,
                  symbolSize: iconSize4,
                  draggable: false,
                  fixed: true,
                  value: [270, 240],
                  label: label2
                },
                {
                  name:"室内2",
                  props: {
                    name:"室内2",
                    subtitle:'24.2℃',
                  },
                  symbol:`image://${shinei}`,
                  symbolSize: iconSize4,
                  draggable: false,
                  fixed: true,
                  value: [270, 180],
                  label: label2,
                },
                {
                  name:"室内3",
                  props:{
                    name: "室内3",
                    subtitle:'24.9℃'
                  },
                  symbol:`image://${shinei}`,
                  symbolSize: iconSize4,
                  draggable: false,
                  fixed: true,
                  value: [270, 120],
                  label: label2,
                },
                {
                  name:"室内4",
                  props:{
                    name: "室内4",
                    subtitle:'25.0℃'
                  },
                  symbol:`image://${shinei}`,
                  symbolSize: iconSize4,
                  draggable: false,
                  fixed: true,
                  z:3,
                  value: [270, 60],
                  label: label2,
                }
              ],
              shineiOnoff = [
                {
                  name: "室内1闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [290, 240.5],
                  symbolRotate:-90
                  //label: labelOne,
                },
                {
                  name: "室内2闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [290, 180.5],
                  symbolRotate:-90
                  //label: labelOne,
                },
                {
                  name: "室内3闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [290, 120.5],
                  symbolRotate:-90
                  //label: labelOne,
                },
                {
                  name: "室内4闸",
                  symbol:`image://${offNo}`,
                  symbolSize: iconSize5,
                  draggable: false,
                  fixed: true,
                  value: [290, 60.5],
                  symbolRotate:-90
                  //label: labelOne,
                },
              ],
              shineiBg = [
                {
                  name: "室内图",
                  symbolSize: [170,630],
                  itemStyle: {
                    color: 'rgba(255,255,255,0.1)',
                    z:'-10'
                  },
                  z:1,
                  symbol:'rect',
                  draggable: false,
                  fixed: true,
                  value: [270, 150],
                  label: labelOne,
                }
              ],
              //冷水机-->冷却罐
              lineList1 = [
                //冷水机汇总
                {
                  type:'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 1,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 4,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColorOne,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data:[
                    {
                      coords: [
                        [148, 199],
                        [138, 199],
                        [138, 160]
                      ]
                    },
                    {
                      coords: [
                        [148, 160],
                        [138, 160],
                        [138, 160]
                      ]
                    },
                    {
                      coords: [
                        [148, 119],
                        [138, 119],
                        [138, 160]
                      ]
                    }
                  ]
                },
                {
                  type: 'lines', //冷水机-->冷却罐
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 1,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 4,
                    delay:4000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColorOne,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [140, 160],
                        [135, 160],
                        [135, 295],
                        [78, 295],
                        [78, 185],
                        [70, 185]
                      ]
                    },
                  ]
                },
                {
                  type: 'lines', //冷却罐汇总
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 1,
                  effect: {
                    show: true,
                    rewind: false,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 4,
                    loop: true,
                    delay:8000,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColorOne,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [75, 185],
                        [75, 265],
                        [10, 265],
                        [10, 257]
                      ]
                    },
                    {
                      coords: [
                        [75, 185],
                        [75, 265],
                        [35, 265],
                        [35, 257]
                      ]
                    },
                    {
                      coords: [
                        [75, 185],
                        [75, 185],
                        [10, 185],
                        [10, 177]
                      ]
                    },
                    {
                      coords: [
                        [75, 185],
                        [75, 185],
                        [35, 185],
                        [35, 177]
                      ]
                    },
                    {
                      coords: [
                        [75, 185],
                        [75, 185],
                        [60, 185],
                        [60, 177]
                      ]
                    },
                    {
                      coords: [
                        [75, 185],
                        [75, 105],
                        [10, 105],
                        [10, 97]
                      ]
                    },
                    {
                      coords: [
                        [75, 185],
                        [75, 105],
                        [35, 105],
                        [35, 97]
                      ]
                    },
                    {
                      coords: [
                        [75, 185],
                        [75, 105],
                        [60, 105],
                        [60, 97]
                      ]
                    }
                  ]
                }
              ],
              //冷却罐--> 水泵A -->冷水机
              lineList2 = [
                //冷却罐汇总
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    rewind: false,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor, //lineIconColor,
                    symbolSize: [4,6],
                    period: 4,
                    loop: true
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor2,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [10, 225],
                        [10, 220],
                        [85, 220],
                        [85, 140]
                      ]
                    },
                    {
                      coords: [
                        [35, 225],
                        [35, 220],
                        [85, 220],
                        [85, 140]
                      ]
                    },

                    {
                      coords: [
                        [10, 145],
                        [10, 140],
                        [85, 140],
                        [85, 140]
                      ]
                    },
                    {
                      coords: [
                        [35, 145],
                        [35, 140],
                        [85, 140],
                        [85, 140]
                      ]
                    },
                    {
                      coords: [
                        [60, 145],
                        [60, 140],
                        [85, 140],
                        [85, 140]
                      ]
                    },

                    {
                      coords: [
                        [10, 65],
                        [10, 60],
                        [85, 60],
                        [85, 140]
                      ]
                    },
                    {
                      coords: [
                        [35, 65],
                        [35, 60],
                        [85, 60],
                        [85, 140]
                      ]
                    },
                    {
                      coords: [
                        [60, 65],
                        [60, 60],
                        [85, 60],
                        [85, 140]
                      ]
                    }
                  ]
                },
                //冷却罐 --> 水泵A
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    delay:4000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor2,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [85,141],
                        [100,141]
                      ]
                    },
                  ]
                },
                //水泵A left汇总
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    delay:6000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor2,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [100, 155],
                        [100,261],
                        [110, 261]
                      ]
                    },
                    {
                      coords: [
                        [100, 155],
                        [100,201],
                        [110, 201]
                      ]
                    },
                    {
                      coords: [
                        [100, 155],
                        [100,141],
                        [110, 141]
                      ]
                    },
                    {
                      coords: [
                        [100, 155],
                        [100,81],
                        [110, 81]
                      ]
                    },
                    {
                      coords: [
                        [100, 155],
                        [100,21],
                        [110, 21]
                      ]
                    },
                  ]
                },
                //水泵A right汇总
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    delay:8000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor2,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [110, 261],
                        [120,261],
                        [120, 155]
                      ]
                    },
                    {
                      coords: [
                        [110, 201],
                        [120,201],
                        [120, 155]
                      ]
                    },
                    {
                      coords: [
                        [110, 141],
                        [120,141],
                        [120, 155]
                      ]
                    },
                    {
                      coords: [
                        [110, 81],
                        [120,81],
                        [120, 155]
                      ]
                    },
                    {
                      coords: [
                        [110, 21],
                        [120,21],
                        [120, 155]
                      ]
                    },
                  ]
                },
                //水泵A --> 冷水机
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    delay:10000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor2,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [120, 155],
                        [135, 155]
                      ]
                    },
                  ]
                },
                //冷水机汇总
                {
                  type:'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    delay:12000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor2,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data:[
                    {
                      coords: [
                        [132, 155],
                        [132, 195],
                        [148, 195]
                      ]
                    },
                    {
                      coords: [
                        [132, 155],
                        [132, 155],
                        [148, 155]
                      ]
                    },
                    {
                      coords: [
                        [132, 155],
                        [132, 115],
                        [148, 115]
                      ]
                    }
                  ]
                }
              ],
              //冷水机--> 室内
              lineList11 = [
                //冷水机汇总
                {
                  type:'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 1,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor3,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data:[
                    {
                      coords: [
                        [172, 199],
                        [183, 199],
                        [183, 160]
                      ]
                    },
                    {
                      coords: [
                        [172, 160],
                        [183, 160],
                        [183, 160]
                      ]
                    },
                    {
                      coords: [
                        [172, 119],
                        [183, 119],
                        [183, 160]
                      ]
                    }
                  ]
                },
                //冷水机-->室内
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 1,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    delay:2000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor3,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [183, 160],
                        [185, 160],
                        [185, 295],
                        [244, 295],
                        [244, 150],
                        [247, 150]
                      ]
                    },
                  ]
                },
                //室内汇总
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 1,
                  effect: {
                    show: true,
                    rewind: false,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    loop: true,
                    delay:4000,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor3,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [247, 150],
                        [247, 240],
                        [257, 240]
                      ]
                    },
                    {
                      coords: [
                        [247, 150],
                        [247, 180],
                        [257, 180]
                      ]
                    },
                    {
                      coords: [
                        [247, 150],
                        [247, 120],
                        [257, 120]
                      ]
                    },
                    {
                      coords: [
                        [247, 150],
                        [247, 60],
                        [257, 60]
                      ]
                    },
                  ]
                }
              ],
              //室内 --> 水泵B --> 冷水机
              lineList12 = [
                //室内汇总
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    rewind: false,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    loop: true
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor4,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [282, 240],
                        [293, 240],
                        [293, 150]
                      ]
                    },
                    {
                      coords: [
                        [282, 180],
                        [293, 180],
                        [293, 150]
                      ]
                    },
                    {
                      coords: [
                        [282, 120],
                        [293, 120],
                        [293, 150]
                      ]
                    },
                    {
                      coords: [
                        [282, 60],
                        [293, 60],
                        [293, 150]
                      ]
                    },
                  ]
                },
                //室内 --> 水泵B
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 4,
                    delay:2000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor4,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [293, 150],
                        [296,150],
                        [296,20],
                        [226,20],
                        [226,150],
                        [220,150]
                      ]
                    },
                  ]
                },
                //水泵B right汇总
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    delay:6000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor4,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [220, 155],
                        [220,261],
                        [210, 261]
                      ]
                    },
                    {
                      coords: [
                        [220, 155],
                        [220,201],
                        [210, 201]
                      ]
                    },
                    {
                      coords: [
                        [220, 155],
                        [220,141],
                        [210, 141]
                      ]
                    },
                    {
                      coords: [
                        [220, 155],
                        [220,81],
                        [210, 81]
                      ]
                    },
                    {
                      coords: [
                        [220, 155],
                        [220,21],
                        [210, 21]
                      ]
                    },
                  ]
                },
                //水泵B left汇总
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    delay:8000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor4,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [210, 261],
                        [200,261],
                        [200, 155]
                      ]
                    },
                    {
                      coords: [
                        [210, 201],
                        [200,201],
                        [200, 155]
                      ]
                    },
                    {
                      coords: [
                        [210, 141],
                        [200,141],
                        [200, 155]
                      ]
                    },
                    {
                      coords: [
                        [210, 81],
                        [200,81],
                        [200, 155]
                      ]
                    },
                    {
                      coords: [
                        [210, 21],
                        [200,21],
                        [200, 155]
                      ]
                    },
                  ]
                },
                //水泵B --> 冷水机
                {
                  type: 'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    delay:10000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor4,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data: [
                    {
                      coords: [
                        [200, 155],
                        [180, 155]
                      ]
                    },
                  ]
                },
                //冷水机汇总
                {
                  type:'lines',
                  polyline: true,
                  coordinateSystem: 'cartesian2d',
                  z: 2,
                  effect: {
                    show: true,
                    trailLength: 0,
                    symbol: "arrow",
                    color: lineIconColor,
                    symbolSize: [4,6],
                    period: 2,
                    delay:12000,
                    loop: true,
                  },
                  lineStyle: {
                    normal: {
                      color: lineColor4,
                      width: lineWidth,
                      opacity:lineOpacity
                    }
                  },
                  data:[
                    {
                      coords: [
                        [180, 155],
                        [180, 195],
                        [172, 195]
                      ]
                    },
                    {
                      coords: [
                        [180, 155],
                        [180, 155],
                        [172, 155]
                      ]
                    },
                    {
                      coords: [
                        [180, 155],
                        [180, 115],
                        [172, 115]
                      ]
                    }
                  ]
                }
              ];
              /** 图标 */
            let dataList = [
              //冷水罐
              ...lengqueguan,
              ...lengshuiguanOnoff,
              //水泵A
              ...shuibeng,
              //冷水机
              ...lengshuiji,
              ...lengshuijiOnoff,
              //水泵B
              ...shuibengb,
              //室内
              ...shineiArr,
              ...shineiOnoff
            ],
            option = {
              grid: {
                left: '6%',
                top: '1%',
                bottom:'5%',
              },
              textStyle: {
                color: '#f00',
                fontSize: 16,
                fontWeight: 600,
              },
              backgroundColor:"#333",
              animationDuration: 1500,
              animationEasingUpdate: 'quinticInOut',
              xAxis: {
                show: false,
                type: 'value'
              },
              yAxis: {
                show: false,
                type: 'value'
              },
              series: [
                //内容图
                {
                  type: 'graph',
                  coordinateSystem: 'cartesian2d',
                  legendHoverLink: false,
                  hoverAnimation: true,
                  nodeScaleRatio: false,
                  roam: false,
                  z:3,
                  lineStyle: {//去掉自带的那条线，不要删
                    normal: {
                      width: 0,
                      shadowColor: 'none',
                      color: 'transparent'
                    },
                  },
                  data: dataList,
                },
                //底图
                {
                  type: 'graph',
                  coordinateSystem: 'cartesian2d',
                  legendHoverLink: false,
                  hoverAnimation: false,
                  nodeScaleRatio: false,
                  roam: false,
                  z:0,
                  lineStyle: {//去掉自带的那条线，不要删
                    normal: {
                      width: 0,
                      shadowColor: 'none',
                      color: 'transparent'
                    },
                  },
                  data: [...shineiBg],
                },
                //线条
                ...lineList1,//冷水机 --> 冷却罐
                ...lineList2,//冷却罐 --> 水泵A --> 冷水机
                ...lineList11,//冷水机 --> 室内
                ...lineList12 //室内 --> 水泵B --> 冷水机
              ]
            };
            // 绘制图表
            myChart.setOption(option);
          },
          initData(){
            this.$set(this,'dataAll',this.propsData);
            console.log(this.imgArr);
          }
        },
        created() {

        },
        mounted() {
          this.init();
          window.onresize = () => {
            this.init()
          }
        },
        watch:{
          'propsData':function(newVal,oldVal){
            this.initData();
          }
        }
    }
</script>

<style scoped>

</style>
