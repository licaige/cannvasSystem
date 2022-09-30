/*
用到了wechat-api这个包生成签名

1.安装wechat-api
	cnpm install wechat-api --save
2、引入var API = require('wechat-api');  
3、实例化配置
	var api = new API(config.wxappid,config.wxappsecret) ;
4、生成config的参数
	var param = {  
		debug: false,    调试模式
		jsApiList: ['checkJsApi',              
				'chooseImage',            
				'getNetworkType',
				'openLocation',
				'getLocation',             
				'scanQRCode'
		],  
		url: req.body.url  
	};  
	api.getJsConfig(param, function(err,result){  
		res.send(result);  
	}); 
*/
var config = require('./module/config');  
var API = require('wechat-api');  
//引入统一下单的api
var wechatPay = require('./module/wechatPay');  

var express = require('express');  
var bodyParser = require('body-parser');  
var xmlparser = require('express-xml-bodyparser');
var request = require('request');
var sha1 = require("sha1"); //引入加密模块
var api = new API(config.wxappid,config.wxappsecret)  
var app = new express();

//xmlparser
app.use(xmlparser());
app.use(express.static('./public'));
//使用中间件body-parser获取post参数  
app.use(bodyParser.urlencoded({extended: false}));  
app.use(bodyParser.json());  

app.set('view engine','ejs'); 



/* 验证Token */
/*
	app.get("/", (req, res, next)=> {
		var config = {
			"appID": "wx26dfbe6c27861585",
			"appsecret": "ed68beb2a04158353a5283ca19f9de86",
			"token": "wechat"   
		}
		// 获取微信服务器发送的数据
		var signature = req.query.signature,
		timestamp = req.query.timestamp,
			nonce = req.query.nonce,
		echostr = req.query.echostr;
		// token、timestamp、nonce三个参数进行字典序排序
		var arr = [config.token, timestamp, nonce].sort().join('');
		// sha1加密    
		var result = sha1(arr);
		if(result === signature){
			res.send(echostr);
		}else{
			res.send('mismatch');
		}
	})
*/


app.post('/wechat',function (req, res, next) {  
	//使用wechat-api获取JSconfig  
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
		url: req.body.url  
	};  
	/*api.getTicket(function(err,result){ 
		console.log(err); 
		console.log(result); 
	});*/  
	api.getJsConfig(param, function(err,result){  
		// console.log(err)
		// console.log(result)
		res.send(result);  
	});  
	// console.log('执行');
})  

//获取openid返回客户端
app.get('/getOpenId',function(req, res){
	var code=req.query.code;
	var pay=new wechatPay();
	//openid
	pay.getAccessToken(code,function(err,data){
		console.log(data);
		res.json(data);
	})
})
 
app.get('/',function (req, res) {  
	//使用wechat-api获取JSconfig  

	//使用wechat-api获取JSconfig             
	res.render('index');   
})  


app.get('/order',function (req, res) {  
	//使用wechat-api获取JSconfig  

	//使用wechat-api获取JSconfig 
	var openid=req.query.openid;
	var pay=new wechatPay();
	pay.createOrder({
		openid:openid,
		notify_url : 'http://api.kgm0515.top/notifyUrl', //微信支付完成后的回调
		out_trade_no : new Date().getTime(), //订单号
		attach : '名称',
		body : '购买信息',
		total_fee : '1', // 此处的额度为分
		spbill_create_ip : req.connection.remoteAddress.replace(/::ffff:/, ''),
	}, function (error, responseData) {                
		if(error){
				console.log(error);
		}
		res.json(responseData);        /*签名字段*/
	});          
})  

app.post('/notifyUrl',function (req, res) {  
	//使用wechat-api获取JSconfig  

	//接受xml
	var pay=new wechatPay();
	var notifyObj=req.body.xml;
	var signObj={};
	for(var attr in notifyObj){
		if(attr !='sign'){
			signObj[attr]=notifyObj[attr][0]
		}
	}
	console.log(pay.getSign(signObj));
	console.log('--------------------------');
	console.log(req.body.xml.sign[0]);
})  

app.listen(8002,function(){  
    console.log('port 8002 is running!');  
});  