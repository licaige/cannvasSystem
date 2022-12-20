<template>
  <div class="container">
    <h3 class="title">SQL Editor</h3>
    <code-editor
        :options="options"
        :value="content"
        @contentChange="contentChange"
        style="height: 600px; width: 600px;"
    ></code-editor>
  </div>
</template>

<script>
/**
 * @language : javascript, php, python, sql,...
 * @theme : vs, hc-black, or vs-dark
 * @readOnly : true or false
 */
import CodeEditor from "@/components/common/CodeEditor";
export default {
  name: "SQLEditor",
  components: {
    CodeEditor
  },
  data() {
    return {
      content: "",
      options: {
        language: "sql",
        theme: 'vs',
        readOnly: false
      }
    };
  },
  created() {},
  methods: {
    // 绑定编辑器value值的变化
    contentChange(val) {
      this.content = val;
    }
  }
};
</script>


<style scoped lang="scss">
.container {
  text-align: left;
  padding: 10px;
}
</style>
