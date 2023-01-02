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
        }
    }
})();
