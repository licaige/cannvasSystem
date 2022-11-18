<template>
  <div id="app" >
    <!--    <router-view />-->
    <router-view v-if="showPage == 1" name="m" ></router-view>
    <router-view v-if="showPage == 2" name="pc" ></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      showPage: ''
    }
  },
  created () {
    if (this._isMobile()) {
      this.showPage = 1
    } else {
      this.showPage = 2
    }
    console.log(this.showPage)
  },
  methods: {
    _isMobile () {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      return flag
    }
  }
}
</script>

<style scoped>

</style>
