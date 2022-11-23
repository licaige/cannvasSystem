<template>
  <!--  首页-->
  <div class="home-page" @click.stop.prevent="goDetail">我是首页</div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {};
  },
  methods: {
    goDetail() {
      this.$router.push("/HomePageDetail");
    },
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  width: 100%;
  box-sizing: border-box;
}
</style>
