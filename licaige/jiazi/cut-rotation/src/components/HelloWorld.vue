<template>
  <div class="view">
    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>
    <li>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </li>
    <a class="pre">《 </a>
    <a class="next"> 》</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {}
  },
  mounted () {
    $(function () {
      let index = 0
      /* 设置节流阀 */
      let flag = true
      /* 点击左边按钮 */
      $('.pre').on('click', function () {
        if (flag) {
          flag = false
          index--
          /* 遍历每一个li，让其逆时针按X轴旋转90度 */
          $('li').each(function (key, value) { // key: 0 1 2 3 4
            $(this).css({
              'transform': 'rotateX(' + (index * 90) + 'deg)',
              'transition-delay': key * 0.1 + 's'
            })
          })
          setTimeout(function () {
            flag = true
          }, 500)
        }
      })
      /* 点击右边按钮 */
      $('.next').on('click', function () {
        if (flag) {
          flag = false
          index++
          /* 遍历每一个li，让其顺时针按X轴旋转90度 */
          $('li').each(function (key, value) { // key: 0 1 2 3 4
            $(this).css({
              'transform': 'rotateX(' + (index * 90) + 'deg)',
              'transition-delay': key * 0.1 + 's'
            })
          })
          setTimeout(function () {
            flag = true
          }, 500)
        }
      })
    })
  }
}
</script>

<style scoped>
  /* 设置宽度为400px，高度为300px */
.view {
  margin: 100px auto;
  width: 400px;
  height: 280px;
  /*transform-style: preserve-3d;*/
  /*transform: rotate3d(1,1,0,-30deg);*/
  position: relative;
}
  /* 让每个li 继承父节点的 20% */
.view li {
  width: 20%;
  height: 100%;
  list-style: none;
  float: left;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.6s;
}
.view li span {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.view li span:nth-child(1) {
  background: url("../assets/1.jpg") no-repeat;
  transform: translateZ(140px);
}
.view li span:nth-child(2) {
  background: url("../assets/2.jpg") no-repeat;
  transform: translateY(140px) rotateX(-90deg);
}
.view li span:nth-child(3) {
  background: url("../assets/3.jpg") no-repeat;
  transform: translateZ(-140px) rotateX(180deg);
}
.view li span:nth-child(4) {
  background: url("../assets/4.jpg") no-repeat;
  transform: translateY(-140px) rotateX(90deg);
}
  .view li:nth-child(1) span {
    background-position: 0 0;
  }
  .view li:nth-child(2) span {
    background-position: -80px 0;
  }
  .view li:nth-child(3) span {
    background-position: -160px 0;
  }
  .view li:nth-child(4) span {
    background-position: -240px 0;
  }
  .view li:nth-child(5) span {
    background-position: -320px 0;
  }
  .pre,
  .next{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
  .pre {
    left: 0;
  }
  .next {
    right: 0;
  }
</style>
