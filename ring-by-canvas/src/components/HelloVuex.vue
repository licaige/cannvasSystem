<template>
  <div class="hello">
    <h2>{{message}}</h2>
    <h3>{{$store.state.count}}</h3>
    <svg-icon icon-class="1"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'HelloVuex',
  props: {
    count: Number,
  },
  data(){
      return {
          message:"我是Hellovuex组件"
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
