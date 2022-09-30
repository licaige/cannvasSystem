const bodyObj = document.querySelector('body')


/**
 * 弹出提示框toast
 */
export function toast(arg, time=1200){
    var toast = document.querySelector('#toast')
    //判断是否存在该提示框语句
    if(toast){
        return false;
    }else{
        var str = `
            <div style="width:100%">
                <div style="
                    padding:15px 12px;
                    background:rgba(0,0,0,0.7);
                    color:#fff;
                    text-align:center;
                    font-weight:500;
                    font-size:14px;
                    border-radius:5px;
                    max-width:90%;
                    line-height:18px;
                    position:fixed;
                    top:50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index:9000;
                ">
                    ${arg}
                </div>
            </div>
        `
        //添加 li
　　　　var divObj = document.createElement("div")
　　　　//设置 li 属性，如 id
        divObj.setAttribute("id", "toast")
        //给元素添加内容
        divObj.innerHTML = str

        //给页面添加元素
        bodyObj.appendChild(divObj);
        //删除元素
        setTimeout(function(){
            bodyObj.removeChild(divObj)
        }, time);
    }
}


/**
 * 加载指示器：indicator
 */
export function indicator(arg, time=null){
    var indicator = document.querySelector('#indicator')
    if(arg){
        //判断是否存在该提示框语句
        if(indicator){
            return false;   //判断是否存在该提示框语句
        }else{
            var str = `
                <div style="
                    padding:10px;  background:rgba(0,0,0,0.7);  box-shadow: rgba(0,0,0,0.05) 0 0 3px 1px ;
                    color:#666; border-radius:3px;  max-width:80%;  position:fixed; top:50%; left: 50%;
                    transform: translate(-50%, -50%); z-index:100;
                ">
                    <img width="30" height="30" src="./src/common/toast/indicator.gif">
                </div>
            `
            //创建 元素
    　　　　var divObj = document.createElement("div")
    　　　　//设置 li 属性，如 id
            divObj.setAttribute("id", "indicator")
            //给元素添加内容
            divObj.innerHTML = str
            //给页面添加元素
            bodyObj.appendChild(divObj);

            //如果用户给出了时间，此事件一过就删除此加载对象
            if(time) {
                //删除元素
                setTimeout(function(){
                    bodyObj.removeChild(document.querySelector('#indicator'))
                }, time);
            }
        }
    }else {
        //删除元素
        if(indicator){
            bodyObj.removeChild(indicator)
        }
    }
}
