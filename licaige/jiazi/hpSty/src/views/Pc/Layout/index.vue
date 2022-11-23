<template>
  <div class="layout">
    <hp-header></hp-header>
    <!--视口-->
    <router-view></router-view>
    <hp-footer></hp-footer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
export default {
  name: "Layout",
  components: {
    HpHeader: Header,
    HpFooter: Footer,
  },
};
</script>

<style lang="scss" scoped>
.layout {
}
</style>
