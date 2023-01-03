class GoodsItem{
    constructor(_props,parent){
        this.props=_props;
        this.goods=this.initGoods(parent);
        this.render(_props);
    }
    initGoods(parent){
        if(this.goods) return this.goods;
        let div=document.createElement("div");
        Object.assign(div.style,{
            width: "290px",
            height: "390px",
            marginLeft: "10px",
            marginBottom: "20px",
            backgroundColor: "white",
            position: "relative",
            float:"left"
        });
        this.createImgGoods(div);
        this.createPriceCon(div);
        parent.appendChild(div);
        return div;
    }
    createImgGoods(parent){
        let div=document.createElement("div");
        Object.assign(div.style,{
            textAlign: "center",
            height: "330px",
            width: "100%",
            position: "relative"
        });
        this.goodsImg=new Image();
        Object.assign(this.goodsImg.style,{
            marginTop: "20px",
            transition: "all 1s",
            width:"230px",
            height:"200px"
        });
        this.goodsInfo=document.createElement("p");
        Object.assign(this.goodsInfo.style,{
            fontSize: "14px",
            width: "230px",
            overflow: "hidden",
            height: "40px",
            left: 0,
            right: 0,
            margin: "auto",
            position: "absolute",
            lineHeight: "22px",
            bottom: "10px"
        });
        div.appendChild(this.goodsImg);
        div.appendChild(this.goodsInfo);
        div.addEventListener("mouseenter",this.mouseHandler);
        div.addEventListener("mouseleave",this.mouseHandler);
        parent.appendChild(div);
    }
    createPriceCon(parent){
        let div=document.createElement("div");
        Object.assign(div.style,{
            border: "2px solid #e01222",
            height: "58px",
            width: "286px",
            bottom: 0,
            position: "absolute"
        });
        let priceDiv=document.createElement("div");
        this.goodsBn=document.createElement("div");
        Object.assign(this.goodsBn.style,{
            width: "87px",
            height: "58px",
            position: "absolute",
            right: 0,
            top:0,
            color: "white",
            fontSize: "16px",
            textAlign: "center",
            lineHeight: "58px",
            cursor: "pointer",
            backgroundColor: "#e01222"
    });
        this.goodsBn.textContent="立即抢购";
        this.createPriceDiv(priceDiv);
        div.appendChild(priceDiv);
        div.appendChild(this.goodsBn);
        this.goodsBn.addEventListener("click",this.clickHandler);
        this.goodsBn.self=this;
        parent.appendChild(div);
    }
    createPriceDiv(parent){
        let priceDivs=document.createElement("div");
        let soldDivs=document.createElement("div");
        this.nowPrice=document.createElement("span");
        this.initPrice=document.createElement("span");
        priceDivs.appendChild(this.nowPrice);
        priceDivs.appendChild(this.initPrice);
        this.percent=document.createElement("span");
        let percentCon=document.createElement("span");
        this.soldPercent=document.createElement("span");
        percentCon.appendChild(this.soldPercent);
        soldDivs.appendChild(this.percent);
        soldDivs.appendChild(percentCon);
        Object.assign(this.percent.style,{
            fontSize: "16px",
            marginLeft:"10px",
            lineHeight:"10px"
        });
        Object.assign(this.nowPrice.style,{
            fontSize: "24px",
            color: "#e01222",
            marginLeft: "5px",
            lineHeight: "35px"
        });
        Object.assign(this.initPrice.style,{
            fontSize: "14px",
            textDecoration: "line-through",
            marginLeft: "5px"
        });
        Object.assign(percentCon.style,{
            display: "inline-block",
            width: "100px",
            height: "10px",
            border: "1px solid #e01222",
            marginLeft:"20px",
            marginTop:"5px",
            position: "absolute"
        });
        Object.assign(this.soldPercent.style,{
            position: "absolute",
            width: "0%",
            height: "10px",
            top:0,
            bottom: 0,
            backgroundColor: "#e01222"
        });
        parent.appendChild(priceDivs);
        parent.appendChild(soldDivs);
    }
    mouseHandler(e){
        if(e.type==="mouseenter"){
            this.firstElementChild.style.marginTop="0px";
        }else if(e.type==="mouseleave"){
            this.firstElementChild.style.marginTop="20px";
        }
    }
    clickHandler(e){
        let evt=new Event(GoodsItem.ADD_SHOPPING_LIST_EVENT);
        evt.data=this.self.props;
        document.dispatchEvent(evt);
    }
    render(_props){
        this.goodsImg.src=_props.icon;
        this.goodsInfo.textContent=_props.goods;
        this.nowPrice.textContent="￥"+_props.nowPrice;
        this.initPrice.textContent="￥"+_props.initPrice;
        this.goodsBn.id=_props.id;
        if(_props.sold>1) return;
        this.percent.textContent=(_props.sold*100).toFixed(2)+"%";
        this.soldPercent.style.width=_props.sold*100+"%";

    }

    static get ADD_SHOPPING_LIST_EVENT(){
        return "add_shopping_list_event";
    }
}

class StepNumber{
    constructor(_data,parent){
	if(_data.num>=99){
	   _data.num=99;
	}
        this.data=_data;
        this.step=_data.num
        this.stepNumber=this.initCreateStep(parent);
    }
    initCreateStep(parent){
        if(this.stepNumber) return this.stepNumber;
        let div=document.createElement("div");
        Object.assign(div.style,{
            position:"relative"
        });
        let leftBn=document.createElement("button");
        let input=document.createElement("input");
        let rightBn=document.createElement("button");
        leftBn.textContent="-";
        rightBn.textContent="+";
        let bnStyle={
            width:"25px",
            height:"25px",
            backgroundColor:"#FFFFFF",
            outline:"none",
            cursor: "pointer",
            position:"relative",
            border:"1px solid #CCCCCC"
        };
        Object.assign(leftBn.style,bnStyle);
        Object.assign(rightBn.style,bnStyle);
        Object.assign(input.style,{
            width:"50px",
            height:"21px",
            border:"1px solid #CCCCCC",
            borderLeft:"none",
            borderRight:"none",
            outline:"none",
            position:"relative",
            textAlign:"center"
        });
        input.value=this.step;
        div.appendChild(leftBn);
        div.appendChild(input);
        div.appendChild(rightBn);
        leftBn.self=rightBn.self=input.self=this;
        leftBn.addEventListener("click",this.bnClickHandler);
        rightBn.addEventListener("click",this.bnClickHandler);
        input.addEventListener("input",this.inputHandler);
        parent.appendChild(div);
        return div;
    }
    bnClickHandler(e){
        if(this.textContent==="+"){
            if(this.self.step===99)return;
            this.self.setData(this.self.step+1);
        }else if(this.textContent==="-"){
            if(this.self.step===1)return;
            this.self.setData(this.self.step-1);
        }
    }
    inputHandler(e){
        let num=Number(this.value.replace(/\D/,""));
        if(num>99) num=99;
        if(num<1) num=1;
        this.self.setData(num);
    }
    setData(num){
        this.step=num;
        this.stepNumber.children[1].value=num;
        if(this.id)return;
        this.id=setTimeout(this.getOutData,500,this)
    }
    getOutData(self){
            let evt=new Event(StepNumber.CHANGE_STEP_NUMBER_EVENT);
            evt.data=self.data;
            evt.num=self.step;
            document.dispatchEvent(evt);
            clearTimeout(self.id);
            self.id=0;
    }
    static get CHANGE_STEP_NUMBER_EVENT(){
        return "change_step_number_event";
    }
}