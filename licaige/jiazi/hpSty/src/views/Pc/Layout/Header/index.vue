<template>
  <!--  头部-->
  <div class="header">
    <!--去往首页-->
    <div class="home-page" @click.stop.prevent="goTag('/HomePage')">
      <div class="home-log">我是log</div>
    </div>
    <!--去往解决方案-->
    <div class="solution" @click.stop.prevent="goTag('/Solution')">
      解决方案
    </div>
    <!--去往首页-->
    <div class="product" @click.stop.prevent="goTag('/Product')">产品</div>
    <!--去往生态建设-->
    <div class="construction" @click.stop.prevent="goTag('/Solution')">
      生态建设
    </div>
    <!--去往人才发展-->
    <div class="talent" @click.stop.prevent="goTag('/Talent')">人才发展</div>
    <!--去往公司介绍-->
    <div class="company-profile" @click.stop.prevent="goTag('/CompanyProfile')">
      公司介绍
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    goTag(str) {
      console.log(" this.$router", this.$router);
      console.log(" this.$router", this.$router.routes);
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
  //首页
  .home-page {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 2.56rem;
    padding-right: 7.3rem;
    .home-log {
      width: 1.9rem;
      height: 0.69rem;
      line-height: 0.69rem;
      display: block;
    }
  }
  //解决方案等
  .solution,
  .product,
  .construction,
  .talent {
    width: 0.96rem;
    padding-top: 0.22rem;
    padding-bottom: 0.24rem;
    font-size: 0.18rem;
    color: #3d3d3d;
    font-family: SourceHanSansCN-Regular;
  }
  //公司介绍
  .company-profile {
    flex: 1;
    padding-top: 0.22rem;
    padding-bottom: 0.24rem;
    font-size: 0.18rem;
    color: #3d3d3d;
    font-family: SourceHanSansCN-Regular;
  }
}
</style>
