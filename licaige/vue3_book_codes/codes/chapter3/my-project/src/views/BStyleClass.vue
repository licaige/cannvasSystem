<template>
  <!-- 1.数组 -->
  <div :class="['red', 'default']">
    待我长发及腰，东风笑别菡涛。 参商一面将报，百里关山人笑。
  </div>
  <!-- 2.在数组中使用三元表达式 -->
  <div :class="['default', isActive ? 'active' : '']">
    凛冬月光妖娆，似媚故国人廖。连里塞外相邀，重阳茱萸早消。
  </div>
  <!-- 3.在数组中使用 对象来代替三元表达式，提高代码的可读性 -->
  <div :class="['default', 'italic', { active: isActive }]">
    待我长发及腰，北方佳丽可好。似曾相识含苞，风花雪月明了。
  </div>
  <!-- 4.直接使用对象 -->
  <div :class="{ default: true, italic: true, active: true }">
    心有茂霜无慌，南柯一梦黄粱。相得益彰君郎，红灯澜烛入帐。
  </div>
  <div :class="classObj">
    待我长发及腰，伊人归来可好，我已万国来朝，不见阮郎一笑。
  </div>
  <!-- 5. class和:class共用 -->
  <div class="red bold" :class="classObj">年年月月花相似</div>

  <div :style="{ color: 'blue', 'font-size': '24px' }">
    若我会见到你，事隔经年。我如何贺你，以眼泪，以沉默。
  </div>
  <div :style="styleObj">
    最美的爱情，不是天荒，也不是地老，只是永远在一起。
  </div>
  <div :style="[styleBase, styleOrange]">曾经沧海难为水，除却巫山不是云</div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false,
      classObj: { default: true, italic: true, active: true },
      styleObj: { color: 'green', 'font-size': '18px' },
      styleBase: { 'font-size': '18px' },
      styleOrange: { color: 'orange', background: '#000000' }
    }
  }
}
</script>
<style>
.red {
  color: red;
}
.default {
  font-size: 14px;
  line-height: 24px;
  height: 24px;
}
.active {
  background: green;
  color: white;
}
.italic {
  font-style: italic;
}
.bold {
  font-weight: bold;
}
</style>
