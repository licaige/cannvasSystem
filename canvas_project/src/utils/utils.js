
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
    if(alpha===undefined||alpha===null||alpha===''){
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
    if(/^rgb\(/.test(rgbaStr)){ // rgb颜色，需要在最后加多一段alpha
        rgbaStr = rgbaStr.toLowerCase() ;
        let reg = /\)$/ ;
        let result = rgbaStr.replace(reg,','+alpha+')') ; 
        return result ;
    }else if(/^rgba\(/.test(rgbaStr)){ // rgba颜色，本身已有alpha段，本次替换其alpha段
        rgbaStr = rgbaStr.toLowerCase() ;
        let reg = /,([0-9\.]+)\)$/ ;
        let result = rgbaStr.replace(reg,','+alpha+')') ; 
        return result ;
    }    
}

function colorChange(color,speed){ // 颜色改变的rgb更新
    if(!color) {
        console.error('colorChange 方法的 color 参数是必须的，请注意传入');
        return color;
    }
    let changeSpeed = speed || 1 ;
    if(color.indexOf('rgb')==-1){
        color = HexColorToRGB(color,1) ;
    }
    color.replace(/\s+/g,'');
    let arr = color.split('(')[1].split(')')[0].split(',') ;
    let r = parseInt(arr[0]) ;
    let g = parseInt(arr[1]) ;
    let b = parseInt(arr[2]) ;
    let a = parseFloat(arr[3]) ;
    if(isNaN(a)){
        a = 1 ;
    }
    if(r>0&&g>0&&b>0){
        // 3个都大于0，则使其中一个先为0 ：
        r -= changeSpeed ;
        if(r<0){
            r = 0 ;
        }
    }else{ // 不全>0 ;
        if(r==0){ 
            if(g==255){
                if(b == 0){
                    r += changeSpeed ;
                }else{
                    b -= changeSpeed ;
                    if(b<0){
                        b = 0 ;
                    }
                }
            }else{
                g += changeSpeed ;
                if(g>255){
                    g = 255 ;
                }
            }
        }else if(g==0){
            if(r==255){
                if(b == 255){
                    r -= changeSpeed ;
                }else{
                    b += changeSpeed ;
                    if(b>255){
                        b = 255 ;
                    }
                }
            }else{
                r -= changeSpeed ;
                if(r<0){
                    r = 0 ;
                }
            }
        }else if(b==0){
            if(g==255){
                if(r == 255){
                    g-=changeSpeed ;
                }else{
                    r += changeSpeed ;
                    if(r>255){
                        r = 255 ;
                    }
                }
            }else{
                g -= changeSpeed ;
                if(g<0){
                    g = 0 ;
                }
            }
        }
    }
    return 'rgba('+r+','+g+','+b+','+a+')' ;
}

function colorBright(color,persent){ // 使颜色亮度改变一定的百分比,[参数2]是0到1之间的小数（正数则亮度增加，反之亮度降低），例如0.3,表示亮度增加30%，但最终最大亮度不会超过100%）
    if(!color) {
        console.error('colorBright 方法的 color 参数是必须的，请注意传入');
        return color;
    }
    let realPersent = parseFloat(persent) ;
    if(isNaN(realPersent)){
        console.error('colorBright 方法的 persent 参数无效，未能改变亮度');
        return color;
    }
    if(color.indexOf('rgb')==-1){
        color = HexColorToRGB(color,1) ;
    }
    color.replace(/\s+/g,'');
    let arr = color.split('(')[1].split(')')[0].split(',') ;
    let r = parseInt(arr[0]) ;
    let g = parseInt(arr[1]) ;
    let b = parseInt(arr[2]) ;
    let a = parseFloat(arr[3]) ;
    if(isNaN(a)){
        a = 1 ;
    }
    // 改变亮度：
    r = r?Math.floor(r*(1+realPersent)):50 ;
    g = g?Math.floor(g*(1+realPersent)):50 ;
    b = b?Math.floor(b*(1+realPersent)):50 ;
    r = r>255?255:r ;
    g = g>255?255:g ;
    b = b>255?255:b ;
    return 'rgba('+r+','+g+','+b+','+a+')' ;
}

function isPointInPolygon(polyData,pointData,isOnsideTrue){ // 判断点是否在多边形内（象限法）.参数一为多边形坐标组成的2维数组，参数2为判断的点数据组成的1维数组，参数3表示当判断的点在多边形的某边上或者某个顶点上时，视为在多边形内（true）还是视为在多边形外（false），默认为true
    // 由于canvas的纵坐标轴是向下为正，因此和一般数学上的坐标轴的四个象限略有不同，注意区分
    // 参数举例 参数1，多边形的点坐标组成的二维数组：[[100,60],[200,60],[200,120],[120,100],[100,120],[100,60]] ,注意第一个点和最后一个点的坐标是一样的，即多边形是闭合的
    // 参数举例 参数2，参考点的数据一维数组：[120,80] 

    // 以参考点（需要判断的点为原点，画坐标轴，x正向向右，y正向向下(canvas内如此)，因此右下为第一象限，左下为第二象限，左上为第三象限，右上为第四象限）；且由于坐标轴原点改变，因此，多边形数据的坐标做对应修正
    if(isOnsideTrue!==false){ // 只要没有显式传入false，都视为true
      isOnsideTrue = true ;
    }
    let newPolyData = polyData.map(point=>{ // 多边形每个点的坐标修正，变成以参考点为[0,0]原点的坐标系内的点
      return [point[0]-pointData[0],point[1]-pointData[1]] ;
    })
    let resultNum = 0  ; // 象限法计算结果
    let result = '' ; // 最终结果布尔值
    for(let i=0;i<newPolyData.length;i++){
      if(newPolyData[i+1]===undefined){
        // 下一个点不存在了，则本次查看的点是最后一个点（由于多边形是闭合的，最后一个点的坐标也就是第一个点的坐标），不再进行判断
        break ;
      }
      // 进行象限法判断
      let x1 = newPolyData[i][0] ; // 当前判断的点的坐标x值
      let y1 = newPolyData[i][1] ; // 当前判断的点的坐标y值
      let x2 = newPolyData[i+1][0] ; // 下一个点的坐标x值
      let y2 = newPolyData[i+1][1] ; // 下一个点的坐标y值
      if(x1===0&&y1===0){
        // 当前判断的多边形的顶点，正好是坐标轴原点，即参考点正好是多边形的一个顶点，则直接返回结果即可
        resultNum = NaN ;
        result = isOnsideTrue ;
        break ;
      }
      // 判断象限
      let A1 , A2 // 两个点所在象限值
      if(x1>0&&y1>=0){ // 第一象限
        A1 = 1 ; // 第一象限
      }else if(y1>0&&x1<=0){
        A1 = 2 ; // 第二象限
      }else if(y1<=0&&x1<0){
        A1 = 3 ; // 第三象限
      }else if(y1<0&&x1>=0){
        A1 = 4 ; // 第四象限
      }

      if(x2>0&&y2>=0){ // 第一象限
        A2 = 1 ; // 第一象限
      }else if(y2>0&&x2<=0){
        A2 = 2 ; // 第二象限
      }else if(y2<=0&&x2<0){
        A2 = 3 ; // 第三象限
      }else if(y2<0&&x2>=0){
        A2 = 4 ; // 第四象限
      }

      // 则象限差
      let d = A2 - A1 ; 
      // 判断象限差
      if(Math.abs(d)===0||Math.abs(d)===1){
        // 同象限或相邻象限，直接取值求和
        resultNum+=d ;
      }else if(Math.abs(d)===2){
        // 差了2个象限（即对角象限，如1对3，2对4），此时需要根据坐标的二阶行列式的取值来确定正负号
        let k = x1*y2 - x2*y1 ;
        if(k == 0){
          // 点1和点2的连线正好经过坐标轴原点，即参考点在某条边上，可以直接返回结果，无需继续判断
          result = isOnsideTrue ; 
          // 将象限计算值置为NaN,将其无效化
          resultNum = NaN ;
          break ; 
        }else if(k<0){
          // k小于0，则象限差值取负号
          resultNum += (- Math.abs(d)); 
        }else{
          // k大于0 ，则象限差值取正号
          resultNum += Math.abs(d); 
        }
      }else if(Math.abs(d)===3){
        // 间隔3个象限，即第一象限和第四象限（其实第一象限和第四象限是相邻的两个象限，他们的差值绝对值最终应取1，只是需要判断正负号，到底是正1还是负1）
        if(A2==4){
          // 如果点2在第四象限，则点1在第一象限，从4到1，取-1 
          resultNum += -1 ;
        }else if(A2==1){
          // 如果点2在第一象限，则点1在第四象限，从1到4，取1
          resultNum += 1 ;
        }
      }
    }

    // 最终结果判断
    if(isNaN(resultNum)){
      // 计算象限值置为了NaN，说明出现判断点在某边上的特殊情况，此时已将最终结果判断好了，直接返回
      return result ;
    }else{
      // resultNum 不是NaN的，则应根据resultNum的值来判断最终的结果值
      if(Math.abs(resultNum)===4){
        // 结果值的绝对值为4，说明最终总计算值刚好4个象限转了一圈（即多边形上的各点与参考点形成的圆心角和位360度），则参考点在多边形内
        result = true ;
      }else if(Math.abs(resultNum)===0){
        // 最终结果值为0 ；则象限有正有负，参考点在多边形外
        result = false ;
      }
      return result ;
    }
}

function downloadImgFromBase64(base64,fileName){ // 将base64的图片数据，转化为图片并下载到本地
    if(!base64) return false ;
    let reg = /^data:(.*?);base64,/ ; // base64数据的开头，匹配正则
    let type = base64.match(reg)[1] ; // 从base64中得到文件的mime类型，例如 'image/png' ;
    let suffix = '.'+type.split('/')[1] ; // 文件后缀，如 '.png' ;
    // 方式1：直接将base64作为锚点的href属性值，并设置download属性
    /* let alink = document.createElement('A') ;
    alink.href = base64 ; 
    alink.download = fileName?fileName+suffix:'file'+suffix ;
    alink.click() ;
    return false  */

    // 如果不适用上面的方式(例如需要对图片进行压缩，裁剪，图片合并等操作)，则需要借助canvas绘制图片再保存成blob,然后使用alink的download属性进行下载
    let img,canvas,width,height,ctx ; // 各个变量，分别表示图片元素，canvas元素，图片/canvas宽度，图片/canvas高度，ctx画布绘制环境上下文
    img = document.createElement('IMG') ;
    img.src = base64 ;
    img.onerror = ()=>{
        console.error('图片加载失败,传入正确的base64数据') ;
        return false ;
    }
    img.onload = ()=>{
        width = img.width ;
        height = img.height ;
        canvas = document.createElement('CANVAS') ;
        canvas.width = width ;
        canvas.height = height ;
        if(canvas.getContext){
            ctx = canvas.getContext("2d") ;
        }else{
            console.error('浏览器不支持canvas操作，请使用支持canvas的浏览器');
            return fasle ;
        }
        ctx.drawImage(img,0,0,width,height) ;

        // 方法2：canvas保存为blob，再创建url，使用alink保存
        canvas.toBlob(blob=>{
            console.log(blob)
            let url = URL.createObjectURL(blob) ;
            let a = document.createElement('A') ;
            a.setAttribute('download',fileName?fileName+suffix:'file'+suffix) ;
            a.setAttribute('href',url);
            a.click() ;
        })
    }
}
export default{
    HexColorToRGB,
    updateAlpha,
    colorChange,
    colorBright,
    isPointInPolygon,
    downloadImgFromBase64
}