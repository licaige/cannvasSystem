define((function () {
    function Box(parent) {
        this.b=this.createDiv(parent);
    }
    Box.prototype={
        createDiv:function (parent) {
            if(this.b) return this.b;
            var div=document.createElement("div");
            Object.assign(div.style,{
                width:"50px",
                height:'50px',
                backgroundColor:"red"
            });
            parent.appendChild(div);
            return div;
        }
    };
    Box.prototype.constructor=Box;
    return {Box:Box};
})());