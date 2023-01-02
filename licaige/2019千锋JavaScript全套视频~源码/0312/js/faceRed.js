class FaceRed{
    constructor(label,parent){
        this.faceRed=this.initFaceRed(label,parent);
        this.spanList=Array.from(this.faceRed.querySelectorAll(".redStar"));
        this.position=-1;
    }
    initFaceRed(_label,parent){
        if(this.faceRed) return this.faceRed;
        if(!parent) parent=document.body;
        let div=document.createElement("div");
        Object.assign(div.style,{
            paddingTop:"20px",
            float:"left",
            marginLeft:"10px"
        });
        let labelElem=document.createElement("label");
        labelElem.textContent=_label;
        div.appendChild(labelElem);
        Object.assign(labelElem.style,{
            float: "left",
            marginRight:"5px"
        });
        for(let i=0;i<5;i++){
            let span=this.createRed();
            span.className="redStar";
            div.appendChild(span);
        }
        let clear=document.createElement("a");
        Object.assign(clear.style,{
            display: "block",
            visibility: "hidden",
            opacity: 0,
            height: 0,
            clear: "both",
            zoom:1
        });
        div.appendChild(clear);
        parent.appendChild(div);
        div.self=this;
        div.addEventListener("mouseover",this.mouseHandler);
        div.addEventListener("mouseout",this.mouseHandler);
        div.addEventListener("mouseleave",this.mouseLeaveHandler);
        div.addEventListener("click",this.clickHandler);
        return div;
    }
    createRed(){
        let span=document.createElement("span");
        Object.assign(span.style,{
            display: "block",
            float: "left",
            width: "16px",
            height: "16px",
            background: "url('img/commstar.png') 0 0",
            marginTop: "3px",
            cursor: "pointer"
        });
        let face=document.createElement("span");
        Object.assign(face.style,{
            display: "none",
            width: "16px",
            height: "16px",
            background: "url('img/face-red.png') 0 0",
            marginTop: "-18px",
        });
        face.className="faceReds";
        span.appendChild(face);
        return span;
    }
    mouseHandler(e){
        if(e.target.constructor!==HTMLSpanElement) return;
        if(e.target.className==="faceReds") return;
        let index=this.self.spanList.indexOf(e.target);
        if(e.type==="mouseover"){
            if(index>this.self.position){
                this.self.setStarRed(index);
            }else{
                this.self.setStarRed(this.self.position);
            }

            e.target.firstElementChild.style.display="block";
            e.target.firstElementChild.style.backgroundPositionX=-(4-index)*20+"px";
        }else if(e.type==="mouseout"){
            e.target.firstElementChild.style.display="none";
        }
    }
    mouseLeaveHandler(e){
        this.self.setStarRed(this.self.position)
    }
    clickHandler(e){
        if(e.target.constructor!==HTMLSpanElement) return;
        this.self.position=this.self.spanList.indexOf(e.target);
    }
    setStarRed(index){
        for(let i=0;i<this.spanList.length;i++){
            if(i<=index){
                this.spanList[i].style.backgroundPositionY="-16px";
                continue;
            }
            this.spanList[i].style.backgroundPositionY="0px";
        }
    }

}