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
        },
        dragElem:function (elem) {
            elem.addEventListener("mousedown",this.mouseHandler);
            elem.style.position="absolute";
            elem.self=this;
        },
        removeDrag:function (elem) {
            elem.removeEventListener("mousedown",this.mouseHandler);
            elem.self=null;
        },
        mouseHandler:function (e) {
            switch (e.type){
                case "mousedown":
                    e.preventDefault();
                    document.addEventListener("mousemove",this.self.mouseHandler);
                    document.addEventListener("mouseup",this.self.mouseHandler);
                    this.x1=e.offsetX;
                    this.y1=e.offsetY;
                    document.elem=this;
                    break;
                case "mousemove":
                    this.elem.style.left=e.clientX-this.elem.x1+"px";
                    this.elem.style.top=e.clientY-this.elem.y1+"px";
                    var evt=new Event("elemMove");
                    this.elem.dispatchEvent(evt);
                    break;
                case "mouseup":
                    //this  是mouseup的侦听对象,document
                    //elem  就是document.elem--->(line 56)this--->mousedown对应的侦听对象是div
                    //self  div.self--->(line 42)this---> 当前的对象Utils
                    //mouseHandler 是Utils下面的函数
                    document.removeEventListener("mousemove",this.elem.self.mouseHandler);
                    document.removeEventListener("mouseup",this.elem.self.mouseHandler);
                    break;
            }
        },
        getRandomPosition:function (elem) {
            var w=document.documentElement.clientWidth-elem.offsetWidth;
            var h=document.documentElement.clientHeight-elem.offsetHeight;
            elem.style.position="absolute";
            elem.style.left=Math.random()*w+"px";
            elem.style.top=Math.random()*h+"px";
        },
        hitTest:function (elem0,elem1) {
            var range0=elem0.getBoundingClientRect();
            var range1=elem1.getBoundingClientRect();
            if(range0.left>=range1.left && range0.left<=range1.right && range0.top>=range1.top && range0.top<=range1.bottom){
                return true;
            }
            if(range0.right>=range1.left && range0.right<=range1.right && range0.top>=range1.top && range0.top<=range1.bottom){
                return true;
            }
            if(range0.left>=range1.left && range0.left<=range1.right && range0.bottom>=range1.top && range0.bottom<=range1.bottom){
                return true;
            }
            if(range0.right>=range1.left && range0.right<=range1.right && range0.bottom>=range1.top && range0.bottom<=range1.bottom){
                return true;
            }
            return false;
        }
    }
})();
