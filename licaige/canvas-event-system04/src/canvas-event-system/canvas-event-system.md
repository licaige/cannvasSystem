## 一环境搭建
要在 canvas 上实现事件系统，我们必须先做些准备工作 —— 首先我们得往 canvas 上填充些“内容”，没有内容，
谈何事件监听，下文我们将这些可绑定事件的内容称之为元素。同时，为简明扼要，笔者这里仅实现了形状(Shape) 这一类元素；
当我们有了一个个元素后，我们还需要一个容器去管理它们，这个容器则是 —— 舞台(Stage)，舞台如同上帝一般，
负责元素们的渲染、事件管理及事件触发，接下来我们先初始化这两大类。
## API 设计
在实现细节前，笔者是这样设想事件系统的：我们可以通过 new 操作符生成一个个的 Shape 实例，
并可在实例上监听各类事件，然后再将它们add进Stage即可。
## 构建 Shape
由于不同形状间有许多相似的逻辑，因此我们先实现一个Base基类，然后让诸如Rect、Circle等形状继承此类
## 鼠标的命中问题
我们先对 canvas 画布内的每个元素添加唯一的 id，并设计一种 id 与 rgba 互相转换的算法，
然后再建立一个与当前画布等大的“影子画布”（不必显示在页面上），我们将用户能看见的画布称为 A，影子画布为 B，
每当在 A 上渲染一个元素的时候，同步在 B 上的相同位置渲染一个等大的元素，并以其 id 所转换的 rgba 值填充。
这样，当鼠标处于 A 上时，可通过当前坐标和 getImageData 可找到 B 上对应点的 rgba 值，将 rgba 反转为 id，
即可知晓被选中的元素
为此，首先我们需要一个函数 createId 生成 id，两个转换函数 idToRgba 和 rgbaToId
这个地方，就可以理解成为影分身的概念
## 事件模拟
由于 handleCreator(actionType) 同时处理了三个鼠标事件，因此只要鼠标在 canvas 上，它的一举一动、经过了哪些元素都会被捕获到，
当然，要实现事件的触发，我们必须通过一些操作“组合”，去判断当前的事件类型，由于篇幅关系，笔者主要模拟了以下几种事件：
mousedown = mousedown
mouesmove = mousemove
mouseup = mouseup
click = mousedown + mouseup
mouseenter(id1) = mousemove(id2) + mousemove(id1)
mouseleave(id2) = mousemove(id2) + mousemove(id1)



