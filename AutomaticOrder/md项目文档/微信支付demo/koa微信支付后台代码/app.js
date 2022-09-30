
//引入 koa模块
var Koa=require('koa'),
    router = require('koa-router')(),
    views = require('koa-views'),
    jsonp = require('koa-jsonp'),
    static = require('koa-static');
    var app=new Koa();

//jssdk  微信支付需要引入的模块
var config = require('./module/config');  
var API = require('wechat-api');  
var api = new API(config.wxappid,config.wxappsecret)  
//引入统一下单的api
var wechatPay = require('./module/wechatPay');  

const xmlParser = require('koa-xml-body');
var koaBodyparser = require('koa-bodyparser');

app.use(jsonp());
app.use(xmlParser());
app.use(koaBodyparser());

// app.use(static(__dirname+'/public'));   //koa静态资源中间件可以配置多个
//配置模板引擎中间件  --第三方中间件
//app.use(views('views', { map: {html: 'ejs' }}));   //这样配置也可以  注意如果这样配置的话 模板的后缀名是.html
app.use(views('views',{
    extension:'ejs'  /*应用ejs模板引擎*/
}))

//写一个中间件配置公共的信息
app.use(async (ctx,next)=>{
    ctx.state.userinfo='张三';
    await next();/*继续向下匹配路由*/
})

router.get('/',async (ctx)=>{
    var returnUrl=ctx.query.returnUrl || 'http://t.apiying.com/#/success';    
    var order_id=ctx.query.order_id || '';
    console.log(ctx.query)
    console.log('-------------------------')
    await ctx.render('index',{
        returnUrl:returnUrl,      
        order_id:order_id
    });
})

router.post('/wechat',async (ctx)=> {  
    //使用wechat-api获取JSconfig  
    // console.log(ctx.request.body.url)
    var param = {  
        debug: false,  
        jsApiList: ['checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'],  
        url: ctx.request.body.url  
    };  
    /*api.getTicket(function(err,result){ 
            console.log(err); 
            console.log(result); 
    });*/

    var data= await new Promise(function(resove,reject){
        api.getJsConfig(param, function(err,result){  
            resove(result)
        });  
    });
    ctx.body=data;
})  


//获取openid返回客户端
router.get('/getOpenId',async function(ctx){
    var code=ctx.query.code;
    // console.log(code);   
    var data= await new Promise(function(resove,reject){
        var pay=new wechatPay();        //openid    
        pay.getAccessToken(code,function(err,data){
            // console.log(data);
            // res.json(data);
            resove(data);              
        })
    });
    ctx.body=data;

})


router.get('/order',async (ctx)=> {  
    //使用wechat-api获取JSconfig  
    console.log(ctx.query.order_id);

    //根据订单号获取订单信息

    //使用wechat-api获取JSconfig 
    var openid=ctx.query.openid;                
    var pay=new wechatPay();
    var data= await new Promise(function(resove,reject){
        pay.createOrder({
            openid:openid,
            notify_url : 'http://b.itying.com/notifyUrl', //微信支付完成后的回调
            out_trade_no : new Date().getTime(), //订单号
            attach : '名称',
            body : '购买信息',
            total_fee : '1', // 此处的额度为分
            spbill_create_ip :  ctx.request.ip.replace(/::ffff:/, '')
        }, function (error, responseData) {                
            if(error){
                console.log(error);
                reject(error);
            }
            // res.json(responseData);        /*签名字段*/
            resove(responseData);
        });  
    });
    ctx.body=data;
})  


router.post('/notifyUrl',(ctx)=> {  
    //使用wechat-api获取JSconfig  

    //接受xml
    var pay=new wechatPay();
    const notifyObj = ctx.request.body.xml;
    // var notifyObj=req.body.xml;
    var signObj={};
    for(var attr in notifyObj){
        if(attr !='sign'){
            signObj[attr]=notifyObj[attr][0]
        }
    }
    console.log(pay.getSign(signObj));
    console.log('--------------------------');
    console.log(ctx.request.body.xml.sign[0]);
})  

app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(8002);






