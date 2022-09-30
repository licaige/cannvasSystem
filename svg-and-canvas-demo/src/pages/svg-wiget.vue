<template>
  <div class="lignth-box">
    <div>
      <SvgPause />
    </div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { random } from "@/utils";
import SvgPause from '@/comps/svgPause.vue'
const SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
const svg = document.getElementById("svg");


export default {
  name: "svg-light",
  setup(props) {
    onMounted(() => {
      
    });
  },
  components: {
    SvgPause
  }
};
</script>
<style scoped>
.lignth-box {
  position: relative;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
