# what is v-tree?

> 基于vue树形菜单
![](https://s1.ax1x.com/2018/12/06/FlXuP1.png)

***en:A demo path: v-tree/src/components/vTreeDemo.Vue***

***zh:一个demo的路径: v-tree/src/components/vTreeDemo.Vue***

## Explain：

zh:单选、复选、复选是/否级联选择（默认级联选中）、是否展示下拉虚线、点击节点回调函数，返回true 选中并触发选中事件，false相反，  
节点选中事件，返回选中节点信息和上个选中节点信息，选中/取消选中复选框事件，将返回所有选中复选框数据  
异步加载数据

vue自定义变量和函数说明

Default single selection
``` bash
:treeNode     type:json    default:[]
```
标准json tree节点，name属性必填
``` bash
:allOpen      type:boolean    default:false
```
开启/关闭所有节点
``` bash
:nodeTrigger     type:boolean     default:false
``` 
点击节点是否触发节点事件
``` bash
@call    type:Function     parameter:inside treeNode,You can change it and the page will be re-rendered.
```
初始化回调函数 参数为节点数据的深拷贝，你可以修改此数据，tree将会重新渲染
``` bash
:beforeClick    type:Function     parameter:Current node information(参数：当前节点信息)
```
击节点前触发回调函数，return false 无法触发clickNode事件
``` bash
:clickNode    type:Function     parameter 1:Current node information,parameter 2:Last selected node information(上一个选中的节点信息)
```
点击节点 回调函数
``` bash
:checkBox    type:boolean     default:false
```
开启/关闭复选框
``` bash
:checkBoxType    type:boolean     default:true
```
开启/关闭级联选中  
``` bash
@checkBoxCall    type:Function     parameter:All selected node sets(所有选中的节点集合)
```
选中/取消选中复选框回调函数
``` bash
:async    type:boolean     default:false
```
是否开启异步 默认关闭
``` bash
:asyncCall    type:Function     parameter 1:Current node information,parameter 2:callback function,Receive an array parameter  
Example:

asyncCall(data, call) {    //data:Current node information
        setTimeout(function () {
          let hm = '' + (new Date()).getTime();
          let addNode = [
            {id: hm, name: "children node" + hm.substr(hm.length - 4, hm.length)},
          ];
          call(addNode);  //callback function
        }, 800);
      }
```
异步回调函数function(data,call)，data:current node， call 回调执行，接收一个数组参数

一个完整的示例：
``` bash
    <Tree
        :treeNode="treeNode"
        :allOpen="allOpen"
        :nodeTrigger="nodeTrigger"
        :checkBox="checkBox"
        :beforeClick="beforeClick"
        :checkBoxType="checkBoxType"
        :clickNode="clickNode"
        :hiddenLine="hiddenLine"
        @checkBoxCall="asyncCheckBoxCall"
        @call='callAsync'
        :async="async"
        :asyncCall="asyncCall"
    />
```

## Pull Request


## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8089
npm run dev
```
