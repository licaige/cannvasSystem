(function () {
    Object.prototype.addProto=function (sourceObj) {
        var names=Object.getOwnPropertyNames(sourceObj);
        for(var i=0;i<names.length;i++){
            var desc=Object.getOwnPropertyDescriptor(sourceObj,names[i]);
            if(typeof desc.value==="object" && desc.value!==null){
                var obj=new desc.value.constructor();
                obj.addProto(desc.value);//把obj当成引用对象带入递归函数继续给obj赋值
                Object.defineProperty(this,names[i],{
                    enumerable:desc.enumerable,
                    writable:desc.writable,
                    configurable:desc.configurable,
                    value:obj
                });
                continue;
            }
            Object.defineProperty(this,names[i],desc);
        }
        return this;
    };
    Function.prototype.extendClass=function (supClass) {
        function F() {}
        F.prototype=supClass.prototype;
        this.prototype=new F();
        this.prototype.constructor=this;
        this.superClass=supClass.prototype;
        if(supClass.prototype.constructor===Object.prototype.constructor){
            supClass.prototype.constructor=supClass;
        }
    }
})();