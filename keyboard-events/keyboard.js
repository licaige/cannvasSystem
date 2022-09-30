/**
 * 兼容Android、iOS各浏览器
 * H5键盘监控弹出（KeyboardUp）、收起（KeyboardDown）事件定义
 * auth: huaicheng151201@163.com
 * time: 2020.11.20
 * 用法：
 * 与click事件的绑定用法无异，如：
    window.addEventListener("KeyboardUp",function() {
        //键盘弹起来了
    },false);
    window.addEventListener("KeyboardDown",function() {
        //键盘收起来了
    },false);
 *
 */
;(function(window){
    if(!window || !navigator) return;
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    var KeyboardUpEvent = document.createEvent("KeyboardEvent");
    KeyboardUpEvent.initEvent("KeyboardUp",true,true);

    var KeyboardDownEvent = document.createEvent("KeyboardEvent");
    KeyboardDownEvent.initEvent("KeyboardDown",true,true);

    if(isAndroid) {
        var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
        window.onresize = function () {
            var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (resizeHeight - 0 < originalHeight - 0) {
                document.dispatchEvent(KeyboardUpEvent);
            } else {
                document.dispatchEvent(KeyboardDownEvent);
            }
        }
    } else if(isiOS){
        document.body.addEventListener('focusin', () => {
            document.dispatchEvent(KeyboardUpEvent);
        })
        document.body.addEventListener('focusout', () => {
            document.dispatchEvent(KeyboardDownEvent);
        })
    } else {
        throw "无法识别浏览器机型，请检查navigator.userAgent是否被重新定义过."
    }
})(window);