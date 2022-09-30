<template>
    <div>
      <v-stage :config="configStage">
        <v-layer>
          <!-- 冷却罐 -->
          <v-text :config="{x:80,y:90, text: '冷却罐1',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengquetaObj, x:100, y:100, width:64, height:94}"/>
          <v-text :config="{x:120,y:160, text: '22℃',fill:'#ffd419', fontSize: 14}"/>

          <v-text :config="{x:180,y:90, text: '冷却罐2',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengquetaObj, x:200, y:100, width:64, height:94}"/>
          <v-text :config="{x:220,y:160, text: '22℃',fill:'#ffd419', fontSize: 14}"/>

          <v-text :config="{x:80,y:290, text: '冷却罐3',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengquetaObj, x:100, y:300, width:64, height:94}"/>
          <v-text :config="{x:120,y:360, text: '22℃',fill:'#ffd419', fontSize: 14}"/>

          <v-text :config="{x:180,y:290, text: '冷却罐4',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengquetaObj, x:200, y:300, width:64, height:94}"/>
          <v-text :config="{x:220,y:360, text: '22℃',fill:'#ffd419', fontSize: 14}"/>

          <v-text :config="{x:280,y:290, text: '冷却罐5',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengquetaObj, x:300, y:300, width:64, height:94}"/>
          <v-text :config="{x:320,y:360, text: '22℃',fill:'#ffd419', fontSize: 14}"/>

          <v-text :config="{x:80,y:490, text: '冷却罐6',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengquetaObj, x:100, y:500, width:64, height:94}"/>
          <v-text :config="{x:120,y:560, text: '22℃',fill:'#ffd419', fontSize: 14}"/>

          <v-text :config="{x:180,y:490, text: '冷却罐7',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengquetaObj, x:200, y:500, width:64, height:94}"/>
          <v-text :config="{x:220,y:560, text: '22℃',fill:'#ffd419', fontSize: 14}"/>

          <v-text :config="{x:280,y:490, text: '冷却罐8',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengquetaObj, x:300, y:500, width:64, height:94}"/>
          <v-text :config="{x:320,y:560, text: '22℃',fill:'#ffd419', fontSize: 14}"/>

          <!-- 水泵1 -->
          <v-text :config="{x:480,y:60, text: '水泵1',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:shuibeng_noObj, x:480, y:75, width:44, height:78}"/>

          <v-text :config="{x:480,y:190, text: '水泵2',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:shuibeng_offObj, x:480, y:205, width:44, height:78}"/>

          <v-text :config="{x:480,y:320, text: '水泵3',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:shuibeng_offObj, x:480, y:335, width:44, height:78}"/>

          <v-text :config="{x:480,y:450, text: '水泵4',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:shuibeng_noObj, x:480, y:465, width:44, height:78}"/>

          <v-text :config="{x:480,y:580, text: '水泵5',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:shuibeng_offObj, x:480, y:595, width:44, height:78}"/>

          <!-- 冷水机 -->
          <v-text :config="{x:700,y:215, text: '冷水机1',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengjiObj, x:650, y:230, width:140, height:78}"/>

          <v-text :config="{x:700,y:330, text: '冷水机2',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengjiObj, x:650, y:345,width:140, height:78 }"/>

          <v-text :config="{x:700,y:455, text: '冷水机3',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:lengjiObj, x:650, y:470,width:140, height:78}"/>

          <!-- 水泵2 -->
          <v-text :config="{x:960,y:60, text: 'B水泵1',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:shuibeng_noObj, x:960, y:75, width:44, height:78}"/>

          <v-text :config="{x:960,y:190, text: 'B水泵2',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:shuibeng_offObj, x:960, y:205,width:44, height:78}"/>

          <v-text :config="{x:960,y:320, text: 'B水泵3',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:shuibeng_offObj, x:960, y:335,width:44, height:78}"/>

          <v-text :config="{x:960,y:450, text: 'B水泵4',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:shuibeng_noObj, x:960, y:465,width:44, height:78}"/>

          <v-text :config="{x:960,y:580, text: 'B水泵5',fill:'#fff', fontSize: 12}"/>
          <v-image :config="{ image:shuibeng_offObj, x:960, y:595,width:44, height:78}"/>

          <!-- 室内图 -->
          <v-text :config="{x:1160,y:45, text: '室内图',fill:'#fff', fontSize: 12}"/>
          <v-rect :config="{x: 1160,y: 65,width: 160,height: 600,fill: '#666' }"/>

          <v-text :config="{x:1230,y:75, text: '3栋',fill:'#fff', fontSize: 12}"/>
          <v-text :config="{x:1230,y:155, text: '24.7℃',fill:'#ffd419', fontSize: 12}"/>
          <v-image :config="{ image:shineiObj, x:1170, y:90,width: 144,height: 94}"/>

          <v-text :config="{x:1230,y:225, text: '4栋',fill:'#fff', fontSize: 12}"/>
          <v-text :config="{x:1230,y:305, text: '24.7℃',fill:'#ffd419', fontSize: 12}"/>
          <v-image :config="{ image:shineiObj, x:1170, y:240,width: 144,height: 94}"/>

          <v-text :config="{x:1230,y:375, text: '5栋',fill:'#fff', fontSize: 12}"/>
          <v-text :config="{x:1230,y:455, text: '24.7℃',fill:'#ffd419', fontSize: 12}"/>
          <v-image :config="{ image:shineiObj, x:1170, y:390,width: 144,height: 94}"/>

          <v-text :config="{x:1230,y:525, text: '6栋',fill:'#fff', fontSize: 12}"/>
          <v-text :config="{x:1230,y:605, text: '24.7℃',fill:'#ffd419', fontSize: 12}"/>
          <v-image :config="{ image:shineiObj, x:1170, y:540}"/>

          <!-- red line   b12223、fc654a-->
          <!--b12223-->
          <v-line :config="{x: 132,y: 104,transformsEnabled:'all',points: [0,0, 0,-20, 260,-20, 260, 180],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:124, y:88,width:12,height:10}"/>
          <v-line :config="{x: 232,y: 104,points: [0,0, 0,-20, 160,-20, 160, 180],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:224, y:88,width:12,height:10}"/>

          <v-line :config="{x: 132,y: 304,points: [0,0, 0,-20, 270,-20, 270, -18, 270,-270, 480,-270, 480,83],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:124, y:288,width:12,height:10}"/>
          <v-line :config="{x: 232,y: 304,points: [0,0, 0,-20, 160,-20, 160, -20],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:224, y:288,width:12,height:10}"/>
          <v-line :config="{x: 332,y: 304,points: [0,0, 0,-20, 60,-20, 60, -20],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:324, y:288,width:12,height:10}"/>

          <v-line :config="{x: 132,y: 504,points: [0,0, 0,-20, 260,-20, 260, -220],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:124, y:488,width:12,height:10}"/>
          <v-line :config="{x: 232,y: 504,points: [0,0, 0,-20, 160,-20, 160, -220],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:224, y:488,width:12,height:10}"/>
          <v-line :config="{x: 332,y: 504,points: [0,0, 0,-20, 60,-20, 60, -220],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:324, y:488,width:12,height:10}"/>

          <v-line :config="{x: 650,y: 512,points: [0,0, -20,0, -20,-128],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:650, y:504,width:12,height:10,rotation:(0,90)}"/>
          <v-line :config="{x: 650,y: 387,points: [0,0, -40,0],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:650, y:380,width:12,height:10,rotation:(0,90)}"/>
          <v-line :config="{x: 650,y: 272,points: [0,0, -20,0, -20,128],tension: 0,closed: false,stroke: '#b12223',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:650, y:264,width:12,height:10,rotation:(0,90)}"/>
          <!--fc654a-->
          <v-line :config="{x: 132,y: 190,points: [0,0, 0,10, 280,10, 280, 210, 348,210],tension: 0,closed: false,stroke: '#fc654a',strokeWidth:4}"/>
          <v-line :config="{x: 232,y: 190,points: [0,0, 0,10, 180,10, 180, 195],tension: 0,closed: false,stroke: '#fc654a',strokeWidth:4}"/>

          <v-line :config="{x: 132,y: 390,points: [0,0, 0,10, 280,10, 280, 10, 280,-10],tension: 0,closed: false,stroke: '#fc654a',strokeWidth:4}"/>
          <v-line :config="{x: 232,y: 390,points: [0,0, 0,10, 180,10, 180, 10],tension: 0,closed: false,stroke: '#fc654a',strokeWidth:4}"/>
          <v-line :config="{x: 332,y: 390,points: [0,0, 0,10, 80,10, 80, 10],tension: 0,closed: false,stroke: '#fc654a',strokeWidth:4}"/>

          <v-line :config="{x: 132,y: 590,points: [0,0, 0,10, 280,10, 280, 10, 280,-200],tension: 0,closed: false,stroke: '#fc654a',strokeWidth:4}"/>
          <v-line :config="{x: 232,y: 590,points: [0,0, 0,10, 180,10, 180, 10],tension: 0,closed: false,stroke: '#fc654a',strokeWidth:4}"/>
          <v-line :config="{x: 332,y: 590,points: [0,0, 0,10, 80,10, 80, 10],tension: 0,closed: false,stroke: '#fc654a',strokeWidth:4}"/>

          <v-line :config="{x:480,y:140,points:[0,0,-10,0,-10,240],closed:false,stroke:'#fc654a',strokeWidth:4}"/>
          <v-line :config="{x:480,y:270,points:[0,0,-10,0,-10,130],closed:false,stroke:'#fc654a',strokeWidth:4}"/>
          <v-line :config="{x:480,y:530,points:[0,0,-10,0,-10,-150],closed:false,stroke:'#fc654a',strokeWidth:4}"/>
          <v-line :config="{x:480,y:660,points:[0,0,-10,0,-10,-130],closed:false,stroke:'#fc654a',strokeWidth:4}"/>

          <v-line :config="{x:523,y:140,points:[0,0,10,0,10,240],closed:false,stroke:'#fc654a',strokeWidth:4}"/>
          <v-line :config="{x:523,y:270,points:[0,0,10,0,10,130],closed:false,stroke:'#fc654a',strokeWidth:4}"/>
          <v-line :config="{x:523,y:400,points:[0,0,79,0],closed:false,stroke:'#fc654a',strokeWidth:4}"/>
          <v-line :config="{x:523,y:530,points:[0,0,10,0,10,-130],closed:false,stroke:'#fc654a',strokeWidth:4}"/>
          <v-line :config="{x:523,y:660,points:[0,0,10,0,10,-160],closed:false,stroke:'#fc654a',strokeWidth:4}"/>

          <v-line :config="{x:650,y:285,points:[0,0,-50,0,-50,130],closed:false,stroke:'#fc654a',strokeWidth:4}"/>
          <v-line :config="{x:650,y:400,points:[0,0,-50,0],closed:false,stroke:'#fc654a',strokeWidth:4}"/>
          <v-line :config="{x:650,y:525,points:[0,0,-50,0,-50,-120],closed:false,stroke:'#fc654a',strokeWidth:4}"/>
          <!-- blue line  4e82ab、4267e0-->
          <!--4e82ab-->
          <v-line :config="{x: 790,y: 512,points: [0,0, 30,0, 30,-128],tension: 0,closed: false,stroke: '#4e82ab',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:800, y:504,width:12,height:10,rotation:(0,90)}"/>
          <v-line :config="{x: 790,y: 387,points: [0,0, 40,0, 40,-348, 340,-348, 340,-22],tension: 0,closed: false,stroke: '#4e82ab',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:800, y:380,width:12,height:10,rotation:(0,90)}"/>
          <v-line :config="{x: 790,y: 272,points: [0,0, 30,0, 30,128],tension: 0,closed: false,stroke: '#4e82ab',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:800, y:264,width:12,height:10,rotation:(0,90)}"/>

          <v-line :config="{x: 1170,y: 133,points: [0,0, -20,0, -20,230,-40,230],tension: 0,closed: false,stroke: '#4e82ab',strokeWidth:4}"/>
          <v-line :config="{x: 1170,y: 283,points: [0,0, -20,0],tension: 0,closed: false,stroke: '#4e82ab',strokeWidth:4}"/>
          <v-line :config="{x: 1170,y: 433,points: [0,0, -20,0],tension: 0,closed: false,stroke: '#4e82ab',strokeWidth:4}"/>
          <v-line :config="{x: 1170,y: 583,points: [0,0, -20,0, -20,-230],tension: 0,closed: false,stroke: '#4e82ab',strokeWidth:4}"/>

          <!--4267e0-->
          <v-line :config="{x: 790,y: 525,points: [0,0, 20,0, 20,-128],tension: 0,closed: false,stroke: '#4267e0',strokeWidth:4}"/>
          <v-line :config="{x: 790,y: 400,points: [0,0, 170,0],tension: 0,closed: false,stroke: '#4267e0',strokeWidth:4}"/>
          <v-line :config="{x: 790,y: 285,points: [0,0, 20,0, 20,128],tension: 0,closed: false,stroke: '#4267e0',strokeWidth:4}"/>

          <v-line :config="{x:960,y:140,points:[0,0,-10,0,-10,240],closed:false,stroke:'#4267e0',strokeWidth:4}"/>
          <v-line :config="{x:960,y:270,points:[0,0,-10,0,-10,130],closed:false,stroke:'#4267e0',strokeWidth:4}"/>
          <v-line :config="{x:960,y:400,points:[0,0,-10,0],closed:false,stroke:'#4267e0',strokeWidth:4}"/>
          <v-line :config="{x:960,y:530,points:[0,0,-10,0,-10,-130],closed:false,stroke:'#4267e0',strokeWidth:4}"/>
          <v-line :config="{x:960,y:660,points:[0,0,-10,0,-10,-160],closed:false,stroke:'#4267e0',strokeWidth:4}"/>

          <v-line :config="{x:1005,y:140,points:[0,0,10,0,10,240],closed:false,stroke:'#4267e0',strokeWidth:4}"/>
          <v-line :config="{x:1005,y:270,points:[0,0,10,0,10,130],closed:false,stroke:'#4267e0',strokeWidth:4}"/>
          <v-line :config="{x:1005,y:400,points:[0,0,20,0,20,280,340,280,340,-35],closed:false,stroke:'#4267e0',strokeWidth:4}"/>
          <v-line :config="{x:1005,y:530,points:[0,0,10,0,10,-130],closed:false,stroke:'#4267e0',strokeWidth:4}"/>
          <v-line :config="{x:1005,y:660,points:[0,0,10,0,10,-160],closed:false,stroke:'#4267e0',strokeWidth:4}"/>

          <v-line :config="{x: 1310,y: 133,points: [0,0, 20,0, 20,230,37,230],tension: 0,closed: false,stroke: '#4267e0',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:1320, y:125,width:12,height:10,rotation:(0,90)}"/>
          <v-line :config="{x: 1310,y: 283,points: [0,0, 20,0],tension: 0,closed: false,stroke: '#4267e0',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:1320, y:275,width:12,height:10,rotation:(0,90)}"/>
          <v-line :config="{x: 1310,y: 433,points: [0,0, 20,0],tension: 0,closed: false,stroke: '#4267e0',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:1320, y:425,width:12,height:10,rotation:(0,90)}"/>
          <v-line :config="{x: 1310,y: 583,points: [0,0, 20,0, 20,-230],tension: 0,closed: false,stroke: '#4267e0',strokeWidth:4}"/>
          <v-image :config="{ image:offNoObj, x:1320, y:575,width:12,height:10,rotation:(0,90)}"/>
        </v-layer>
      </v-stage>
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
              lengquetaObj:null,
              lengjiObj:null,
              offNoObj:null,
              shineiObj:null,
              shuibeng_noObj:null,
              shuibeng_offObj:null,
              dataAll:{}
            }
        },
        methods: {
          init(){
            this.initImge();
            this.initData();
          },
          //初始化图标
          initImge(){
            const vm = this;
            let arr = [ 'lengqueta','lengji','offNo','shinei','shuibeng_no','shuibeng_off' ];
            arr.map(item => {
              let dom = item + 'Obj';
              let image = new Image();
              image.src = vm.imgArr[item];
              image.onload = () => {
                vm[dom] = image;
                // console.log(vm[dom]);
              }
            })
          },
          initData(){
            this.$set(this,'dataAll',this.propsData);
            console.log(this.dataAll);
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
