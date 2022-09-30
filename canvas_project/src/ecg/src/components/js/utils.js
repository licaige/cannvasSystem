
function HexColorToRGB(Hex,alpha){ // 将Hex16进制颜色转换为rgb颜色
    if(!Hex) return '' ;
    let reg = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/ ;
    if(!reg.test(Hex)){
        console.error('HexColorToRGB 方法接收到不正确的 Hex 颜色值，请注意修改！');
        return ''; 
    }
    let hexArr = [] ;
    if(Hex.indexOf('#')>=0){
        hexArr = Hex.slice(1).split('');
    }else{
        hexArr = Hex.split('') ;
    }
    let hex6Str = [] ;
    if(hexArr.length===3){
        // 只有3位的Hex值，则每一位都重复多一次，处理成6位的 ；
        hex6Str = hexArr.map(item=>item+item).join('') ;
    }else if(hexArr.length===6){
        hex6Str = hexArr.join('') ;
    }
    let r = parseInt('0x' + hex6Str.slice(0,2),16) ;
    let g = parseInt('0x' + hex6Str.slice(2,4),16) ;
    let b = parseInt('0x' + hex6Str.slice(4,6),16) ;
    
    // 处理alpha值：
    if(!alpha){
        return 'rgb('+r+','+g+','+b+')' ;
    }else{
        if(isNaN(parseFloat(alpha))){
            console.error('HexColorToRGB 方法接收到不正确的 alpha 值，请注意修改！') ;
            return 'rgb('+r+','+g+','+b+')' ; // 没有有效的alpha值，则返回不带alpha的rgb值 。
        }else{
            if(parseFloat(alpha)>1){
                // alpha值超过1，处理成1；
                alpha = 1 ;
            }else if(parseFloat(alpha)<0){
                // alpha小于0 ，处理成0 ;
                alpha = 0 ;
            }else{
                // alpha介于0到1之间的，不用处理
            }
            return 'rgba('+r+','+g+','+b+','+alpha+')' ;
        }
    }
}

function updateAlpha(rgbaStr,alpha){ // 传入一个rgba的颜色值字符串，更新他的alpha值为新传入的alpha参数值
    if(!rgbaStr){
        console.error('updateAlpha 方法接收到不正确的 rgbaStr 值，请注意修改！') ;
        return rgbaStr ;
    }
    if(rgbaStr.indexOf('rgb')==-1){
        // 没有rgb字符串，说明不是rgb颜色值字符串，尝试用HexColorToRGB进行转换
        let result = HexColorToRGB(rgbaStr,alpha) ;

        // console.log(result)
        if(result) return result ;
        console.error('颜色处理错误，请确认传入的颜色字符串是否正常')
    }
    rgbaStr = rgbaStr.toLowerCase() ;
    let reg = /,([0-9\.]+)\)$/ ;
    return rgbaStr.replace(reg,','+alpha+')') ; 
}

export default{
    HexColorToRGB,
    updateAlpha
}