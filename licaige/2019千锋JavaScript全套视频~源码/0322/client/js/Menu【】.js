class Menu{
    constructor(parent){
        this.menu=this.createMenu(parent);
        this.menu.self=this;
        this.selectContent="";
    }
    createMenu(parent){
        if(this.menu) return this.menu;
        let div=document.createElement("div");
        Object.assign(div.style,{
            position: "relative",
            float:"left"
        });
        let bn=document.createElement("button");
        Object.assign(bn.style,{
            width: "120px",
            height: "30px",
            backgroundColor: "transparent",
            border: "1px solid #000000",
            boxShadow: "1px 1px 1px #999999",
            position: "relative"
        });
        this.createButton(bn);
        this.createMenuList(div);
        div.appendChild(bn);
        parent.appendChild(div);
        div.self=this;
        div.addEventListener("mouseleave",this.mouseLeaveHandler);
        return div;
    }
    createButton(bn){
        this.menuTitle=document.createElement("span");
        Object.assign(this.menuTitle.style,{
            marginRight: "20px",
            fontSize: "16px"
        });
        let triangle=document.createElement("span");
        Object.assign(triangle.style,{
            display: "inline-block",
            width: "0",
            height: "0",
            borderTop:"10px solid #000000",
            borderLeft:"8px solid transparent",
            borderRight:"8px solid transparent",
            position: "absolute",
            right:"10px",
            top:"10px"
        });
        bn.appendChild(this.menuTitle);
        bn.appendChild(triangle);
        bn.self=this;
        bn.addEventListener("click",this.openMenuHandler);
    }
    createMenuList(div){
        if(this.ulList){
            this.ulList.removeEventListener("click",this.ulClickHandler);
            this.ulList.removeEventListener("mouseover",this.ulClickHandler);
            this.ulList.removeEventListener("mouseout",this.ulClickHandler);
            this.ulList.remove();
            this.ulList=null;
        }
        this.ulList=document.createElement("ul");
        Object.assign(this.ulList.style,{
            width: "118px",
            overflow:"auto",
            listStyle: "none",
            border: "1px solid #000000",
            position: "absolute",
            top:"30px",
            boxShadow: "1px 1px 1px #999999",
            display: "none",
            margin:0,
            padding:0
        });
        if(this.data){
            for(let i=0;i<this.data.length;i++){
                if(i===0){
                    this.menuTitle.textContent=this.data[i];
                }
                let li=document.createElement("li");
                li.textContent=this.data[i];
                this.ulList.appendChild(li);
                Object.assign(li.style,{
                    backgroundColor: "#FFFFFF",
                    lineHeight: "30px",
                    cursor: "default",
                    textAlign: "center",
                    paddingRight: "10px",
                    borderBottom:"1px solid #000000"
                });
            }
            Object.assign(this.ulList.lastElementChild.style,{
                borderBottom: "none"
            });
            if(this.data.length>8){
                this.ulList.style.height="200px"
            }
        }

        this.ulList.self=this;
        this.ulList.addEventListener("click",this.ulClickHandler);
        this.ulList.addEventListener("mouseover",this.ulClickHandler);
        this.ulList.addEventListener("mouseout",this.ulClickHandler);
        div.appendChild(this.ulList);
    }
    openMenuHandler(e){
        this.self.ulList.style.display="block";
    }
    mouseLeaveHandler(e){
        this.self.ulList.style.display="none";
    }
    ulClickHandler(e){
        if(e.target.constructor!==HTMLLIElement) return;
        if(e.type==="click"){
            this.self.menuTitle.textContent=e.target.textContent;
            this.style.display="none";
            let index=Array.from(this.self.ulList.children).indexOf(e.target);
            let evt=new Event(Menu.SELECT_CHANGE_EVENT);
            this.self.selectContent=evt.selectContent=e.target.textContent;
            evt.selectIndex=index;
            this.self.menu.dispatchEvent(evt);
        }else if(e.type==="mouseover"){
            e.target.style.backgroundColor="#CCCCCC";
        }else if(e.type==="mouseout"){
            e.target.style.backgroundColor="#FFFFFF";
        }

    }
    setData(_data){
        if(!_data || _data.length===0) return;
        this.data=_data;
        this.createMenuList(this.menu);
        let evt=new Event(Menu.SELECT_CHANGE_EVENT);
        this.selectContent=evt.selectContent=this.data[0];
        evt.selectIndex=0;
        this.menu.dispatchEvent(evt);
    }

    static get SELECT_CHANGE_EVENT(){
        return "select_change_event";
    }
}