<template>
    <div>
      <canvas ref="canvas" :style="{width: '100%',height: getHeight }"></canvas>
    </div>
</template>

<script>
    export default {
        name: "item1",
        props: {},
        components: {},
        computed: {
          getHeight(){
            let size = this.$store.state.wh.innerHeight; //innerHeight innerWidth
            return `${size - 65}px`;
          }
        },
        data() {
            return {}
        },
        methods: {
          initTest(){
            let testDom = this.$refs.canvas,
              ctxs = testDom.getContext('2d');
            /*ctxs.fillStyle()*/
            /*ctxs.fillRect(10,10,400,400);//绘制矩形
            ctxs.clearRect(20,20,380,380);//清除画布
            ctxs.strokeRect(30,30,360,360);//绘制描边*/

            /**
             *
             */
            /*ctxs.beginPath();
            ctxs.moveTo(50,50);
            ctxs.lineTo(300,50);
            ctxs.lineTo(50,300);
            //ctxs.closePath();
            ctxs.fill()*/

            /*ctxs.beginPath();
            ctxs.moveTo(370,370);
            ctxs.lineTo(370,120);
            ctxs.lineTo(120,370);
            ctxs.closePath();
            ctxs.stroke();*/

            //ctxs.strokeStyle = '#f60';
            //ctxs.lineWidth = 3;
            /*ctxs.arc(50,50,50,0,Math.PI,false);
            ctxs.fill();*/

            /*let x=50,y=50,r=30,b,e,bl;
            for(let i=0;i<4;i++){
              for(let j=0;j<3;j++){
                bl = i%2 == 0?false:true;
                x = 50 + 100 * j;
                y = 50 + 100 * i;
                b = 0;//Math.PI * 0.5 * j;
                e = Math.PI * ((0.5 * j) + 1);
                ctxs.beginPath();
                ctxs.arc(x,y,r,b,e,bl);
                if(i >= 2){
                  ctxs.fill();
                }else {
                  ctxs.stroke();
                }
              }
            };*/
          }
        },
        created() {
        },
        mounted() {
          this.initTest();
        }
    }
</script>

<style scoped>

</style>
