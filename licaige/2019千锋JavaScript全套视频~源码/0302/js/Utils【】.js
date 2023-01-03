var Utils=(function () {
    return {
        setStyle:function (elem,style) {
            for(var prop in style){
                elem.style[prop]=style[prop];
            }
        },
        randomColor:function (alpha) {
            if(alpha>1 || isNaN(alpha) || alpha<0){
                alpha=1;
            }
            var color="rgba(";
            for(var i=0;i<3;i++){
                color+=parseInt(Math.random()*256);
                color+=",";
            }
            color+=alpha+")";
            return color;
        },
        loadImage:function (arr,callback) {
            var img=new Image();
            img.arr=arr;
            img.callback=callback;
            img.imgList=[];
            img.num=0;
            img.addEventListener("load",this.loadHandler);
            img.src=arr[img.num];
        },
        loadHandler:function (e) {
            this.imgList.push(this.cloneNode(false));
            this.num++;
            if(this.num>this.arr.length-1){
                this.callback(this.imgList);
                this.removeEventListener("load",Utils.loadHandler);
                return;
            }
            this.src=this.arr[this.num];
        }
    }
})();
