<template>
  <div class="box">
    <div>{{!play ? '开始' : '暂停'}}，请点击</div>
    <svg :xmlns="SVG_NS" width="400" height="400" viewBox="-50 -50 100 100" @click="togglePay">
      <path id="play-path" :d="pathMap.to" fill="blue">
        <animate
          id="play-path-ani"
          attributeName="d"
          :from="play ? pathMap.from : pathMap.to"
          :to="!play ? pathMap.from : pathMap.to"
          dur="0.3s"
          begin="1s"
          fill="freeze"
        >
      </animate>
      </path>
      
    </svg>
  </div>
</template>
<script>
import { ref } from "vue";
const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";
const pathMap = {
  to: "M 12,26 16.33,26 16.33,10 12,10 z M 20.66,26 25,26 25,10 20.66,10 z",
  from: "M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
};


export default {
  name: "SvgPause",
  setup(props) {
    const play = ref(false);

    function togglePay() {
      console.log('click', play.value)
      play.value = !play.value;
      let ani = document.querySelector('#play-path-ani');
      console.log(ani);
      ani.beginElement();
    }

    return {
      play,
      SVG_NS,
      XLINK_NS,
      pathMap,
      togglePay
    }
  },
};
</script>
<style scoped>
.lignth-box {
  position: relative;
  height: 100%;
}
</style>
