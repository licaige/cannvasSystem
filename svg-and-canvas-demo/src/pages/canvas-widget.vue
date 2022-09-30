<template>
  <div class="lignth-box">
    <div>
      <CanvasCircle />
    </div>
    <div>
      <CanvasPolyline />
    </div>
    <div>1</div>
    <div>1</div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { random } from "@/utils";
import CanvasCircle from '@/comps/canvas-circle.vue'
import CanvasPolyline from '@/comps/canvas-polyline.vue'


</script>
<style scoped>
.lignth-box {
  position: relative;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
}
</style>
