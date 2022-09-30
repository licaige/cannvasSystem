
/*
用到了wechat-api这个包生成签名
1.安装wechat-api
 cnpm install wechat-api --save
2、引入var API = require('wechat-api');  
3、实例化配置
var api = new API(config.wxappid,config.wxappsecret) ;
4、生成config的参数
        var param = {  
                debug: false,  
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

var express = require('express');  
var bodyParser = require('body-parser');  

var api = new API(config.wxappid,config.wxappsecret)  

var app = new express();

app.use(express.static('./public'));

//使用中间件body-parser获取post参数  
app.use(bodyParser.urlencoded({extended: false}));  
app.use(bodyParser.json());  

app.set('view engine','ejs');


app.get('/',function (req, res) {  
	res.render('index');
})  
  
app.post('/wechat',function (req, res, next) {  
	//使用wechat-api获取JSconfig  
	var param = {  
		debug: false,  
		jsApiList: [
			'checkJsApi',              
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
        
})  

app.listen(8002,function(){  
    console.log('port 8002 is running!');  
});  