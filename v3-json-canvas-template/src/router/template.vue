<template>
  <div>
    <div
      v-if="!isEdit"
      style="
        margin: 0px;
        position: fixed;
        right: 30px;
        top: 10px;
        z-index: 1000;
      "
    >
      <KButton @Click="closeCanvas">编辑</KButton>
    </div>
    <KJsonEdit
      :layout="layout"
      :mock="mock"
      @close-canvas="closeCanvas"
      @submit-option="submitOption"
      v-if="isEdit"
    />
    <KJsonParse :layout="layout" :mock="mock" :editor="false" v-else />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeMount,
  onBeforeUpdate,
  reactive,
  toRefs,
} from "vue";
import Kui from "v3-json-canvas";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "JsonTest",
  setup() {
    const state = reactive({
      isEdit: false,
      layout: Kui.getBasicLayout(), // 初始化布局容器
      mock: {}, // 远程数据
      path: "", // 当前路由
    });
    const router = useRouter();
    onBeforeUpdate(() => {
      getPath();
    });
    onBeforeMount(() => {
      getPath();
    });
    // 获取当前路由
    function getPath() {
      const temp = (router.currentRoute as any)._value.path;
      if (temp !== state.path) {
        state.path = (router.currentRoute as any)._value.path;
        state.layout = {};
        nextTick(() => {
          requestData();
        });
      }
    }
    // 请求数据
    async function requestData() {
      try {
        state.layout = await require(`../json${state.path}/layout.json`);
        state.mock = (await require(`../json${state.path}/mock.json`)) || {};
      } catch (error) {
        console.log(error);
        // ...
      }
    }
    // 关闭画布
    function closeCanvas() {
      state.isEdit = !state.isEdit;
    }
    // 提交
    function submitOption(arg: { mock: any; layout: any }) {
      state.mock = arg.mock || {};
      state.layout = arg.layout;
      console.log("提交数据：", arg);
    }
    return {
      closeCanvas,
      submitOption,
      ...toRefs(state),
    };
  },
});
</script>
