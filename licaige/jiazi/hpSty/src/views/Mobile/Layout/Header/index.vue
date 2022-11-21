<template>
  <!--  头部-->
  <div class="header"></div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    goTag(str) {
      this.$router.push(str);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 0.72rem;
  &:hover {
    cursor: pointer;
  }
}
</style>
