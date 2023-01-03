/*
var obj=require("./a");
var Box=require("./b");
obj.b();
var b=new Box(document.body);*/
/*
require(["a"],function (obj) {
    obj.b();
});
require(["b"],function ({Box}) {
    var b=new Box(document.body);

});*/
require(["a","c"],function (obj,{Box}) {
    obj.b();
    var b=new Box(document.body);
    b.plays();
});