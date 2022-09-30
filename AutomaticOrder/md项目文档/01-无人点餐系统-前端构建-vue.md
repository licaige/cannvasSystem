#### 1、安装ruby和sass/scss

1. 安装ruby程序

2. 安装sass，在命令行输入以下命令：

   ​	1.删除原gem源：gem sources --remove https://rubygems.org/

   ​	2.添加国内源：gem sources -a http://gems.ruby-china.com

   ​	3.输入安装sass命令：gem install sass

   ​	4.查看sass版本： sass -v

   ​	5.查看安装源：gem sources -l

#### 2、vue项目环境搭建

1. 请先安装 node.js
2. 搭建vue的开发环境，全局安装vue脚手架：
   1. npm install  --global vue-cli  / npm i -G vue-cli
3. 创建项目：
   1. 初始化：vue init webpack vue-demo01
   2. 进入项目目录：cd vue-demo01
   3. 安装此项目依赖：npm install
   4. 运行项目：npm run dev
4. 另一种创建项目方式(简化版本)
   1. vue init webpack-simple vue-demo01
5. 直接自己配置webpack.config.js(我后面有源码)

#### 3、配置路由：vue-router

1. 安装路由：npm install vue-router --save

2. 创建 router.js文件，保存路由配置

   ```
   /** 引入路由 */
   import VueRouter from 'vue-router'
   
   /** 引入组件 */
   const Start =r => require([ './components/Start.vue'], r)
   const Home =r => require([ './components/Home.vue'], r)
   const Hot =r => require([ './components/Hot.vue'], r)
   const Order =r => require([ './components/Order.vue'], r)
   const Pcontent =r => require([ './components/Pcontent.vue'], r)
   const Search =r => require([ './components/Search.vue'], r)
   const Cart =r => require([ './components/Cart.vue'], r)
   
   /** 配置路由 */
   const routes = [
   	{ path: '/start', name: 'Start', component: Start ,meta: {title: '欢迎点餐'}},
   	{ path: '/home', name: 'Home', component: Home ,meta: {title: '点餐页面'}},
   	{ path: '/hot', name: 'Hot', component: Hot ,meta: {title: '热门菜品'}},
   	{ path: '/order', name: 'Order', component: Order ,meta: {title: '订单页面'}},
   	{ path: '/pcontent', name: 'Pcontent', component: Pcontent ,meta: {title: '菜品详情'}},
   	{ path: '/search', name: 'Search', component: Search ,meta: {title: '菜品搜索'}},
   	{ path: '/cart', name: 'Cart', component: Cart ,meta: {title: '购物车'}},
   	{ path: '*', redirect:'/start'},
   ]
   
   /** 实例化Vue-router,传入 `routes` 配置 */
   const router = new VueRouter({
   	routes // (缩写) 相当于 routes: routes
   })
   
   router.beforeEach((to, from, next) => {
       /** 可以写业务逻辑代码 */
       /* 路由发生变化修改页面title */
   	if (to.meta.title) {
   		document.title = to.meta.title
   	}
   	next()
   })
   
   router.afterEach(function (to) {
       /** 可以写业务逻辑代码 */
   })
   
   //导出路由对象
   export default router
   ```

3. 修改 main.js 文件，挂载路由

   ```
   /** 引入vue和根组件 */
   import Vue from 'vue'
   import App from './App.vue'
   
   /** 引入路由 */
   import VueRouter from 'vue-router'
   Vue.use(VueRouter)
   //导入自己的router.js路由模块
   import router from './router.js'
   
   /** 挂载路由 */
   new Vue({
     el: '#app',
     render: h => h(App),	 //渲染app页面到index.html首页
     router,				//挂载自己的路由对象
   })
   
   /** 需要把 <router-view></router-view> 放到根组件：App.vue中 */
   ```

4. App.vue 页面示例

   ```
   <template>
   	<div id="app">
   		<router-view></router-view>
   	</div>
   </template>
   <script>
   	export default {
   		// 引入公共的scss（全局需要使用，所以在根组件中引入）
   		import './assets/css/basic.scss'
   		data () {
   			return {
   				msg: 'Welcome to Your Vue.js App'
   			}
   		},
   		components: {}
   	}
   </script>
   <style lang="scss">
   </style>
   
   ```

#### 4、接口请求工具：axios

1. 安装：npm install axios --save

2. axios 在main.js 中的配置

   ```
   /** 导入axios */
   import Axios from 'axios'
   Vue.prototype.$ajax = Axios//挂载原型
   Axios.defaults.baseURL = "http://api.*******.com"   //配置接口请求根目录 
   Axios.defaults.timeout = 5000;                        //响应时间
   Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' //配置请求头 	
   Axios.interceptors.request.use(function(config){	//拦截器，请求发起之前,显示
   	// 逻辑代码
   	return config
   });
   Axios.interceptors.response.use(function(config){	//拦截器，请求发起之前，隐藏
   	// 逻辑代码
   	return config
   });
   ```

3. 安装 babel-polyfill，

   ```
   /* 可以把es6语法转化成es5的语法，这样杰克请求才能使用：async...await模式获取数据 */
   npm i babel-plugin-transform-runtime -D
   ```

4. 配置  .bebalrc 文件

   ```
   {
     "presets": [
       ["env", { "modules": false }],
       "stage-3"
     ],
     "plugins": [
       "transform-runtime"
      ]
   }
   ```

5. axios 请求接口的方式，async...await..方式调用接口

   ```
   /* async...await..方式调用接口 */
   <script>
       export default {
           data() {
               return {}
           },
           mounted() {
               this.getProductData()	//调用方法，请求接口数据
           },
           methods: {
               /** 请求数据 */
               async getProductData() {
                   try {
                       var result = await this.$ajax.get('/productlist')
                       console.log(result)
                   } catch (err){
                       console.log(err)
                   }
                   
               }
           }
       }
   </script>
   ```

6. 

#### 5、安装移动端调试工具

1. 安装vConsole：npm install vconsole -D

2. 在 main.js 文件中配置

   ```
   //移动端调试工具
   import VConsole from 'vconsole'
   var vConsole = new VConsole()
   ```

#### 6、配置vue-socket.io

1. 安装：npm install vue-socket.io --save 

2. 在 main.js 中引用 scoket.io 并配置

   ```
   /** 配置socket.io */
   import VueSocketio from 'vue-socket.io'
   Vue.use(VueSocketio, Config.api)		// 引用服务器地址
   ```

3. 测试是否建立连接，在 main.js 的vue实例中添加代码，刷新页面，控制台会打印出相应内容

   ```
   new Vue({
   	el: '#app',
   	sockets:{					// 测试scoket是否与服务器建立连接，测试完毕删除此段代码
   		connect: function(){
   			console.log('socket已经建立连接了')
   		},
   	},
   	render: h => h(App),		//渲染app页面到index.html首页
   	router,						//挂载自己的路由对象
   })
   ```

4. 在vue实例页面定义sockets，sockets里面的方法表示接收到服务器里面的消息，然后写自己的逻辑

   ```
   <script>
       export default {
           data() {
               return {}
           },
           created() {
               this.fn()
           },
           /* 接收服务器广播过来的 addcart */
           sockets:{
               addcart: function(){
                   // 收到服务器广播了，下面写自己的路基代码
                   this.fn()
               },
           },
           methods: {
               fn() {}
           }
       }
   </script>
   ```

5. 给服务器发送消息：this.$socket.emit('emit_method', val); 

   ```
   <script>
       export default {
           data() {
               return {}
           },
           created() {
               this.fn()
           },
           methods: {
               fn() {
   				// 给服务器发送 scoket 数据， 这代码写在methods的方法里面
   				this.$socket.emit('addcart', '随便写什么');
               }
           }
       }
   </script>
   ```

   

#### 7、调用打印机api接口

1. 登录网址：http://www.feieyun.com/open/index.html

2. 注册开发者账号，自动进入登录中心：http://admin.feieyun.com/index.php

3. 打印机管理，添加打印机。

4. 接口网站，点解SDK下载，下载nodejs版本

   1. 打开api_nodejs_demo.js,配置基本信息

      ```
      var USER = "498213945@qq.com";//必填，飞鹅云 www.feieyun.cn后台注册的账号名
      var UKEY = "75Z765pGpDFDnPwB";//必填，飞鹅云后台注册账号后生成的UKEY
      
      // 打开下面两句话，调用打印机的打印接口
      //提示：调用打印接口之前，必须登录后台在该账号下添加打印机，或者通过API接口，把打印机添加到该账号下面
      var sn = "xxxxx";//打印机编号（9位数字），必填，查看打印机底部标签
      print(sn);
      
      
      ```

#### 8、支付宝支付接口开发

1. 创建支付宝应用：登录网址：https://open.alipay.com/developmentAccess/developmentAccess.htm

    1. 在“立即接入”下面选择“支付应用”，

    2. 页面跳转到"蚂蚁金服开发平台"，登录。https://openhome.alipay.com/platform/appManage.htm

    3. 在导航栏“开发者中心”，选择“网页&移动应用”，创建自己的应用。完善应用信息。

    4. 上传图片，设置接口加密方式，（下载生成RSA密钥工具，生成自己的公钥。密钥格式是“非java适用”，点击生成密钥，工具会自动保存公钥和私钥）

    5. 设置应用公钥，把刚刚生成的应用公钥填入。获得支付宝公钥，保存起来。

    6. 提交审核，等待一个工作日。

    7. 在导航栏“开发者中心”，选择“网页&移动应用”，查看自己提交的应用信息。

    8. 审核成功后，注意，支付宝支付应用需要注册商户号并签约才能使用，不然支付的时候会提示："错误代码 insufficient-isv-permissions 错误原因: ISV权限不足，建议在开发者中心检查对应功能是否已经添加 !"

       

2. nodejs支付宝SDK插件：alipay-mobile
    1. githuab 支付宝开发文档地址：https://github.com/htzhanglong/alipay

    2. 安装插件，npm i alipay-mobile -S

    3. 服务器端接口文件中：food.js(接口文件)
        ```
        //自己的配置文件
        const config = require('../../model/config')
        //支付宝
        const Alipay = require('alipay-mobile');
        const assert=require('assert');
        
        /** 支付宝的支付接口 */
        router.post('/doPay',(ctx)=>{
            const options = config.aliPayOptions   
            const service = new Alipay(options); 
        
            /** 获取客户端传过来的参数 */
            var requestData=ctx.request.body;		   // 获取post数据
            var out_trade_no=requestData.serial         // 支付的订单编号
            var subject="kgm无人点餐";                   // 标题
            var total_amount=requestData.total_price    // 总价钱
            var return_url=requestData.return_url       // 前端付款成功后的跳转页面
            const data = {
                subject: subject,					// 标题
                out_trade_no:out_trade_no,			 // 支付的订单编号
                total_amount:total_amount			 // 总价钱
            }
            const basicParams = {
                // 前端付款成功的回跳地址（提示付款成功页面 ）
                "return_url":return_url,
                //异步通知地址，服务器处理逻辑，修改数据库的订单数据
        		"notify_url": "http://koa.kgm0515.top/api/food/alipayNotify",
            }
            
            // 向支付宝发送请求，支付宝调用“/alipayNotify”接口，并给前端返回一个支付宝支付的链接地址
            return service.createWebOrderURL(data, basicParams)
            .then(result => {
                // 向前端返回数据
                assert(result.code == 0, result.message)
                assert(result.message == 'success', result.message)       
                ctx.body={result:result};
                // ctx.redirect(result.data);        
            })
        })
        
        /** 支付宝会主动调用这个接口 */
        router.post('/alipayNotify',async ctx=>{  
            console.log('alipayNotify:支付宝主动调用的:',ctx.request.body);   
            const options = config.aliPayOptions
            const service = new Alipay(options);
            const params = ctx.request.body;
            
            //验证订单是否正确
            const result = await service.makeNotifyResponse(params);      
            if(result.code==0){
                if(params.trade_status=='TRADE_SUCCESS'){
                    console.log('成功')
                    var out_trade_no_arr=params.out_trade_no.split('_')			
                    var serial=out_trade_no_arr[0]
                    // 修改数据库的订单状态。pay_status=>1:已付款，pay_type=>2:支付宝支付
                    var modifyPayStatus = await DB.query('update food_order set pay_status=?,pay_type=? where serial=?', [1, 2,serial])
                }        
                console.log('success');
            }
        })
        
        ```

    4. 服务器端配置文件：config.js

        ```
        /** api配置文件 */
        const config = {
             // 启动端口
            port: 8001,
            // mysql 数据库配置信息
            DB:{
                host     : 'localhost',
                user     : 'root',
                password : 'root',
                database : 'koacms',
                port     :  3306
            },
        
            // 支付宝支付接口配置
            aliPayOptions: {
                // 自己应用的appid，本地生成的
                app_id: '2018083061144960',
                // 自己应用的私钥，本地生成的
                appPrivKeyFile: "MIIEogIBAAKCAQEAqnNdSnmbA……………………………………………………",
                // 蚂蚁金服的公钥，支付宝公钥
                alipayPubKeyFile: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AM…………………………"
            }
        }
        
        /** 导出配置文件 */
        module.exports = config
        ```

        

    5. 前端 请求服务器接口“order.vue”

        ```
        /** 请求支付接口 */
        async doPay() {
            var roomid = this.roomid
            var serial = this.serial 
            try {
            	// 'http://localhost:8000/api/food/doPay'请求服务器的支付接口地址
                var result = await this.$ajax.post('api/food/doPay', {  
                    roomid,		serial,                    // 订单编号，桌号
                    total_price: _this.orderInfo.price,     // 总价钱
                    return_url: 'http://localhost:8000/#/success' // 支付成功后的（支付成功页面）
                })
                // 请求到了服务器给的，支付宝的支付接口了
                console.log(result.data.result.data) 
                // 页面跳转到支付宝地址去
                if(result.data.result.message=='success'){
                	location.href=result.data.result.data        
                }
            } catch (error) {
            	console.log(error)
            }
        }
        ```

        

#### 9、微信支付接口开发

1. 微信JSSDK准备工作

   1. 必须要有企业营业执照、对公账户
   2. 需要获取的内容：
      - appid：微信公众平台APPID
      - appsecret：微信公众平台appsecret
      - MCHID：微信支付商户号（必须配置，打开邮件可以查看）
      - KEY：API密钥，参考开户邮件设置（登录商户平台进行设置）

2. 注册公众平台账户，申请微信支付

   1. 注册微信公众平台账户：https://mp.weixin.qq.com

3. 申请开通微信支付功能，必须是企业公众号才能有这个功能

   1. 第一步：注册公众号（类型须为：服务号、政府或媒体订阅号、企业号）。

      ​	请根据营业执照类型选择以下主体注册：个体工商户| 企业/公司| 政府| 媒体| 其他类型。

   2. 第二步：认证公众号。

      ​	公众号认证后才可申请微信支付，认证费：300元/次，查看认证流程。

   3. 第三步：提交资料申请微信支付。

      ​	登录公众平台，点击左侧菜单【微信支付】，开始填写资料等待审核，审核时间为48小时内。

   4. 第四步：开户成功，进行账户验证。

      ​	资料审核通过后，开户信息会通过邮件、公众号发送给联系人，请按照指引填写财付通备付金汇入的随机金额，完成账户验证。（查看验证方法）

   5. 第五步：在线签署协议

4. 获取 appid appsecret  和商户号  商户key

   1. 微信公众号里面获取appid  appsecret  （找到：基本配置）appid:直接获取，
      appsecret  点击重置会生成一串数字字母组合的字符串 （保存）

   2. 商户ID和商户Key如何获取：

      商户ID:申请完成支付以后  邮件里面可以看到  或者点击 微信支付里面可以看到
      	商户key:需要登录商户平台   账户中心->api安全->设置密钥 （32位密码 自己随便写   注意设置完成保存）

      微信商户平台:https://pay.weixin.qq.com

5. JS-SDK

   1. JS-SDK文档地址：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115

   2. 配置微信JSSDK支付之前的准备工作***重要：

      - 公众号里面的配置
        	1、配置JS安全域名:  公众号设置->功能设置->JS接口安全域名       	      koa.kgm0515.com
        	2、支付需要配置支付域名：公众号设置->功能设置->网页授权域名         * 支付的时候配置的
        	3、配置IP白名单：基本配置->IP白名单  

      - 商户平台里面配置支付目录：

        ​	1、商户平台>产品中心>开发配置->配置公众号支付授权目录         * 支付的时候配置的

   3. jssdk获取签名的流程：

      1. 获取access_token，通过下面地址获取（传入自己的appid和secret）

         https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

         https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx26dfbe6c27861585 &secret=ed68beb2a04158353a5283ca19f9de86 

        {"access_token":"13_I41czb8YRmIyxwhx3tRTsFwRs_Wfdj4lWWtAVpmIt_qZ6EV6lGCgNCIhC7mvSgk4T7WMFuc6AjWYCoN_lx1cs25oTTrVLOM5DO-AOgm3USHkHrK1xcAPNQDHPmQZZVeAGADDZ","expires_in":7200}

      2. 采用http GET方式请求获得jsapi_ticket (传入刚刚获取的access_token)

         https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi

         https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=13_I41czb8YRmIyxwhx3tRTsFwRs_Wfdj4lWWtAVpmIt_qZ6EV6lGCgNCIhC7mvSgk4T7WMFuc6AjWYCoN_lx1cs25oTTrVLOM5DO-AOgm3USHkHrK1xcAPNQDHPmQZZVeAGADDZ&type=jsapi

         {"errcode":0,"errmsg":"ok","ticket":"kgt8ON7yVITDhtdwci0qeUdBag23LObvZYtMGDMEKd9qw7IMR5M-NEUhhA41zkWRvGvHDLOl77BJyDgCGe8Eig","expires_in":7200}

      3. 根据jsapi_ticket 获取签名（通过这个地址的工具生成）
        http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign

        我的签名signature：28292fa4a306157a9b3392efe05671af7fc11e87


6. JSSDK微信支付：
    1. 微信支付的三大步骤:
        1. 获取用户openID: 
            1. 在关注者与公众号产生消息交互后,公众号可获得关注者的OpenID,对于不同公众号,同一用户的openid不同id
            2. 用户同意授权，获取code   https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4518345b2ab754e1&redirect_uri=http://www.jxy-edu.com/result.jsp&response_type=code&scope=snsapi_userinfo#wechat_redirect
        2. 通过获取的code,返回当前关注者在当前服务号唯一的openId  https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx26dfbe6c27861585&secret=ed68beb2a04158353a5283ca19f9de86&grant_type=authorization_code
        3. 获取prepay_id 和 paySign

    2. 微信支付文档

        1. 微信支付文档：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_1

        	. 获取code和openid文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842		

           ```
           	https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx26dfbe6c27861585&redirect_uri=http://api.kgm0515.top&response_type=code&scope=snsapi_userinfo#wechat_redirect
           	跳转页面获取用户code 和 openid(下面的不需要用户同意)
           	https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx26dfbe6c27861585&redirect_uri=http://api.kgm0515.top?cid=123&name=zhangsan&response_type=code&scope=snsapi_base#wechat_redirect
           
           ```

           ​			

        

7. 微信支付在vue+koa前后端分离项目中的运用

    1. 前端 config.js 文件

       ```
       var config = {
           socketApi: 'http://39.128.124.0:8001',    // 请求socket根地址 (后面不带斜线的)
           api: 'http://39.128.124.0:8001/',         // 请求后端接口的根地址 
           apiPayUrl: 'http://koa.****.top/api',  // (微信支付页面)请求接口的根地址(后面不带斜线的) 
           wxappid: "wxasda34556547665s",           // (用于微信支付)微信appid
           return_url: 'http://food.****.top/#/success',  // （支付宝）前端支付成功的跳转地址
       }
       
       export default config
       ```

    2. 前端订单页面 order.vue(点击“微信支付按钮，触发下面这个方法”)

       ```
       /** 请求微信支付 */
       doWechatPay(){
       	var serial = this.serial 
           // 跳转到后端集成了微信支付sdk页面的url地址
           //（参数1：serial订单编号；参数2：wxappid商户的微信appid；参数3：apiurl接口url地址）
           location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+config.wxappid+'&redirect_uri='+config.apiurl+'?serial='+serial+'&response_type=code&scope=snsapi_base#wechat_redirect';
       }
       ```

    3. 后端 配置文件：config.js

       ```
       /** 配置文件 */
       const config = {
            // 启动端口
           port: 8001,
           
           // 数据库配置信息
           DB:{
               host     : 'localhost',
               user     : 'root',
               password : 'root',
               database : 'koacms',
               port     :  3306
           },
       
           // 支付宝支付接口配置
           aliPayOptions: {
               // 自己应用的appid，本地生成的
               app_id: '2018083061144960',
               // 自己应用的私钥，本地生成的
               appPrivKeyFile: "MIIEogIBAAKCAQEAqnNdSnmbA************",
               // 蚂蚁金服的公钥，支付宝公钥
               alipayPubKeyFile: "MIIBIjANBgkqhkiG********************"
           },
       
           // 微信支付接口配置
           mch_id: '1502539541',
           wxappid: "wx26dfbe6c27861585",
           wxappsecret:'ed68beb2a04158353a5283ca19f9de86',
           wxpaykey: 'sdfdsfsfds4565555555555555555555555654'
       
       }
       
       /** 导出配置文件 */
       module.exports = config
       ```


#### 10、windows系统Nginx配置

1. nginx.conf 配置内容

   ```
   
   #user  nobody;
   worker_processes  1;
   #error_log  logs/error.log;
   #error_log  logs/error.log  notice;
   #error_log  logs/error.log  info;
   #pid        logs/nginx.pid;
   events {
       worker_connections  1024;
   }
   
   http {
       include       mime.types;
       default_type  application/octet-stream;
       #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
       #                  '$status $body_bytes_sent "$http_referer" '
       #                  '"$http_user_agent" "$http_x_forwarded_for"';
       #access_log  logs/access.log  main;
       sendfile        on;
       #tcp_nopush     on;
       #keepalive_timeout  0;
       keepalive_timeout  65;
       #gzip  on;
   	
   	
   	# 后端接口+管理系统
   	upstream backa {
   		#ip_hash;
   		server 127.0.0.1:8001;        
   	}
   	
   	# 前端代码部署
   	upstream backe {
   		#ip_hash;
   		server 127.0.0.1:8005;
   	}
   
       server {
           listen       80;
           server_name  koa.kgm0515.top;
           #charset koi8-r;
           #access_log  logs/host.access.log  main;
           #location / {
           #    root   html;
           #     index  index.html index.htm;
           # }
   		location / {
   			#设置主机头和客户端真实地址，以便服务器获取客户端真实IP
   			proxy_set_header Host $host;
   			proxy_set_header X-Real-IP $remote_addr;
   			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   			#禁用缓存
   			proxy_buffering off; 
   			#反向代理的地址
   			proxy_pass http://backa;     
   		}
           #error_page  404              /404.html;
           # redirect server error pages to the static page /50x.html
           #
           error_page   500 502 503 504  /50x.html;
           location = /50x.html {
               root   html;
           }
       }
   
   	server {
           listen       80;
           server_name  food.kgm0515.top;
           #charset koi8-r;
           #access_log  logs/host.access.log  main;
           location / {
                root   D:/Project/food;
   			index  index.html index.htm;
           }
   		location ~/api/v1 {
   			#设置主机头和客户端真实地址，以便服务器获取客户端真实IP
   			proxy_set_header Host $host;
   			proxy_set_header X-Real-IP $remote_addr;
   			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   			#禁用缓存
   			proxy_buffering off; 
   			#反向代理的地址
   			proxy_pass http://backe;     
   		}
           #error_page  404              /404.html;
           # redirect server error pages to the static page /50x.html
           #
           error_page   500 502 503 504  /50x.html;
           location = /50x.html {
               root   html;
           }
       }
   }
   ```

#### 11、Wepack打包

1. package.json

   ```
   {
     "name": "01.webpack-study",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "dev": "webpack-dev-server",
       "dev1": "webpack-dev-server --host 192.168.169.149",
       "dev2": "webpack-dev-server --open --port 6003 --hot --host 192.168.169.149",
       "json-server": "json-server data.json -p 5000 -H 192.168.169.149",
       "json-server1": "json-server client.json -p 5000 -H 192.168.169.149"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "devDependencies": {
       "autoprefixer-loader": "^3.2.0",
       "babel-core": "^6.26.3",
       "babel-loader": "^7.1.4",
       "babel-plugin-component": "^1.1.1",
       "babel-plugin-transform-remove-strict-mode": "0.0.2",
       "babel-plugin-transform-runtime": "^6.23.0",
       "babel-preset-env": "^1.7.0",
       "babel-preset-stage-0": "^6.24.1",
       "css-loader": "^0.28.11",
       "extract-text-webpack-plugin": "^3.0.2",
       "file-loader": "^1.1.5",
       "html-webpack-plugin": "^2.30.1",
       "less": "^2.7.3",
       "less-loader": "^4.0.5",
       "style-loader": "^0.19.1",
       "stylus": "^0.54.5",
       "stylus-loader": "^3.0.2",
       "uglifyjs-webpack-plugin": "^1.2.7",
       "url-loader": "^0.6.2",
       "vconsole": "^3.2.0",
       "vue-loader": "^13.0.5",
       "vue-template-compiler": "^2.5.16",
       "webpack": "^3.8.1",
       "webpack-dev-server": "^2.9.3"
     },
     "dependencies": {
       "axios": "^0.18.0",
       "better-scroll": "^1.11.1",
       "bootstrap": "^3.3.7",
       "create-keyframe-animation": "^0.1.0",
       "express": "^4.16.3",
       "fastclick": "^1.0.6",
       "js-md5": "^0.7.3",
       "jsonp": "^0.2.1",
       "mint-ui": "^2.2.13",
       "mobile-detect": "^1.4.2",
       "moment": "^2.22.1",
       "vue": "^2.5.16",
       "vue-amap": "^0.5.8",
       "vue-lazyload": "^1.0.3",
       "vue-preview": "^1.1.3",
       "vue-resource": "^1.5.0",
       "vue-router": "^3.0.1",
       "vue-socket.io": "^2.1.1-b",
       "vue2-datepick": "^3.0.6",
       "vuex": "^2.5.0"
     }
   }
   
   ```

2. webpack.config.js(测试的时候用)

   ```
   //webpack是基于弄得进行构建的，支持node代码
   //导入路径模块
   var path = require('path')  
   
   //启用热更新的第1步
   const webpack = require('webpack')
   
   //更具指定模板页面，在内存中生成一份html,同时把打包好的bundle.js自动注入该html
   //配置插件，需要在plugins节点中,
   var htmlWebpackPlugin = require('html-webpack-plugin')
   
   //导出一个配置对象
   module.exports = {
       entry: path.join(__dirname, './src/main.js'),   //入口文件
       output: {   //指定输出选项
           path: path.join(__dirname, './dist'),   //输出路径
           filename: 'bundle.js'   //指定输出文件的名称
       },
       //启用热更新第2步，使用 webpack-dev-server这个工具来实现自动打包编译的功能
       // 想要正常运行，需要本地安装webpack
       devServer: {
           open: true,             //自动打开浏览器
           port: 6003,             //运行端口
           // contentBase: 'src',     //指定托管的根目录
           hot: true,              //启动热更新，第一步
       },
       plugins: [  //所有webpak 插件的配置节点
           new webpack.HotModuleReplacementPlugin(),   //new一个热更新的模块对象，把bundle.js自动引入html,启用热更新的第3步
           new htmlWebpackPlugin({
               template: path.join(__dirname, './src/index.html'), //指定模板文件路径
               filename: 'index.html'  //设置生成的内存页面名称
           })
       ],
       module: {   //配置所有第三方loader模块的
           rules: [    //第三方模块的匹配规则
               { test: /\.css$/, use: ['style-loader', 'css-loader'] },                    //处理css文件
               { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},     //处理less文件
               // { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},  //处理scss文件
               { test: /\.styl(us)?$/,use: ['style-loader', 'css-loader','stylus-loader']},      //处理stylus文件
               { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=17066&name=[hash:8]-[name].[ext]'}, //处理url地址,limit传参：比这个文件小的图片就不转成base64位图片,[hash:8]-[name].[ext]：8位哈希值-图片名.图片后缀。
               { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},  //处理字体文件的loader
               { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}, //解析ES6语法，必须把node_modules目录排除掉，
               { test: /\.vue$/, use: 'vue-loader' },  //解析vue文件
           ]
       },
       resolve: {
           alias: {    //修改vue被导入时候的路径
               "vue$": "vue/dist/vue.js"
           }
       }
   }
   
   /* 
   输入“webpack”命令开始打包
   
   项目初始化json文件 :        
       npm init -y
   自动打包并运行(修改自动更新，可以在内存自动生成bundle.js)  :             
       npm i webpack-dev-server@2.9.3 -D
   本地安装webpack :
       npm i webpack@3.8.1 -D
   安装"html-webpack-plugin": "^2.30.1" (在内存自动生成html文件)：
       npm i html-webpack-plugin@2.30.1 -D
   修改package.json选项的配置文件;script, 命令行运行：npm run dev
       "dev": "webpack-dev-server --open --port 8080 --contentBase src --hot"
   安装解析css文件的依赖包
       npm i style-loader@0.19.0 css-loader@0.28.7 -D
   安装解析less文件的依赖包
       npm i less-loader@4.0.5 -D
       npm i less@2.7.3 -D
   安装解析sass文件的依赖包
       npm i sass-loader@6.0.6 -D
       npm i node-sass@4.0.0 -D    //这个插件安装不了
   安装解析stylus文件的依赖包
       npm install stylus-loader stylus --save-dev
   
   安装处理url地址的依赖包
       npm i url-loader@0.6.2 -D
       npm i file-loader@1.1.5 -D
   安装字体图标，安装bootstrap
       npm i bootstrap@3.3.7 -S
   安装babel,用于转化ES6语法
       //babel转换工具： npm i babel-core babel-loader babel-plugin-transform-runtime -D
       //babel语法：    npm i babel-preset-env babel-preset-stage-0 -D
       //创建: .babelrc, 配置如下
           {
               "presets": ["env", "stage-0"],
               "plugins": ["transform-runtime"]
           }
   安装vue的依赖包
       npm i vue-loader@13.0.5 -D
       npm i vue-template-compiler@2.5.16 -D //版本要和vue相同才行
   安装路由模块
       npm i vue-router -S
   按需引入Mint-ui ,需要安装下面
       npm install babel-plugin-component -D
       然后，将 .babelrc 修改为：
           {
               "presets": ["env", "stage-0"],
               "plugins": [
                   "transform-runtime",
                   ["component", [
                       {
                       "libraryName": "mint-ui",
                       "style": true
                       }
                   ]]
               ]
           }
   安装vue-resource
       npm i vue-resource -S
   
   安装： babel-plugin-transform-remove-strict-mode 移除webpack的严格模式，这样才可以使用 mui
       npm install babel-plugin-transform-remove-strict-mode -D
       在文件夹根目录下找到 .babelrc 文件，修改：
           {
               "plugins": ["transform-remove-strict-mode"]
           }
   
   安装VUE的图片预览插件： npm i vue-preview -S
   
   安装VUEX:   npm i vuex -S
   
   安装fastclick: npm i fastclick -S
   
   安装：图片懒加载插件vue-lazyload
       npm install vue-lazyload -D
   
   安装移动端调试工具  vConsole:
       npm install vconsole -D
   
   安装js创建css3动画的插件： create-keyframe-animation
       npm install create-keyframe-animation
   
   使用json-server模拟REST API
       首先你的电脑中需要安装nodejs，建议使用最新版本。然后全局安装json server.
       全局安装：           npm install json-server -g 
       运行(端口号)：      json-server data.json -p 5003 -H 192.168.169.149    //公司
   */
   ```

3. webpack.config.js(部署上线的时候用来打包)

   ```
   //webpack是基于弄得进行构建的，支持node代码
   //导入路径模块
   const path = require('path')  
   //启用热更新的第1步
   const webpack = require('webpack')
   //依据指定模板页面，在内存中生成一份html,同时把打包好的bundle.js自动注入该html
   //配置插件，需要在plugins节点中,
   const htmlWebpackPlugin = require('html-webpack-plugin')
   //为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
   const ExtractTextPlugin = require("extract-text-webpack-plugin")
   //引入代码压缩，代码丑化
   const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
   
   //导出一个配置对象
   module.exports = {
       entry: {    //入口文件,公共块入口
           main: path.join(__dirname, './src/main.js') ,
           vendors: [
               "axios",
               "better-scroll",
               "fastclick",
               "moment",
               "vue",
               "vue-amap",
               "vue-lazyload",
               "vue-preview",
               "vue-router",
               "vue2-datepick",
               "vuex",
               "mobile-detect",
           ]
       },
       output: {   //指定输出选项
           //输出路径
           path: path.join(__dirname, './dist'),  
           //设置资源路径的请求地址,以前也网站也可以设置未www.baidu.com/
           // publicPath: './',
           //指定输出文件的名称
           filename: 'js/[name].[hash:6].js',   
       },
       //启用热更新第2步，使用 webpack-dev-server这个工具来实现自动打包编译的功能
       // 想要正常运行，需要本地安装webpack
       devServer: {
           open: true,             //自动打开浏览器
           port: 6003,             //运行端口
           // contentBase: 'src',     //指定托管的根目录
           hot: true,              //启动热更新，第一步
       },
       plugins: [  //所有webpak 插件的配置节点
           //new一个热更新的模块对象，把bundle.js自动引入html,启用热更新的第3步
           new webpack.HotModuleReplacementPlugin(),   
           //指定模板文件路径
           new htmlWebpackPlugin({
               template: path.join(__dirname, './src/index.html'), 
               filename: 'index.html'  //设置生成的内存页面名称
           }),
           //配置，为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
           new ExtractTextPlugin("css/[name].[contenthash:6].css"),        
           //提取公共模块，默认会把所有入口节点的公共代码提取出来,生成一个common.js
           new webpack.optimize.CommonsChunkPlugin({   //单独抽取出来后要记录公共模块和main.js的依赖关系
               //manifest:记录公共模块和main.js的依赖关系，会多生成两个js文件
               names: ['vendors', 'manifest']
           }), 
           //代码压缩，代码丑化
           new UglifyJsPlugin()
       ],
       module: {   //配置所有第三方loader模块的
           rules: [    //第三方模块的匹配规则
               { //处理css文件
                   test: /\.css$/, 
                   use: ExtractTextPlugin.extract({    //分离css
                       fallback: "style-loader",
                       use: [
                           "css-loader",
                           "autoprefixer-loader"
                       ]
                   })
               },                    
               { //处理less文件
                   test: /\.less$/, 
                   use: ExtractTextPlugin.extract({
                       fallback: 'style-loader',
                       use: [
                           'css-loader',
                           'autoprefixer-loader',
                           'less-loader'
                       ]
                   })
               },     
               { //处理stylus文件
                   test: /\.styl(us)?$/,
                   use: ExtractTextPlugin.extract({
                       fallback: 'style-loader',
                       use: [
                           'css-loader',
                           'autoprefixer-loader',
                           'stylus-loader'
                       ]
                   })
               },      
               { //处理url地址,limit传参：比这个文件小的图片就不转成base64位图片,[hash:8]-[name].[ext]：8位哈希值-图片名.图片后缀。
                   test: /\.(jpg|png|svg|ttf|woff|woff2|gif|bmp|jpeg)$/, 
                   // use: 'url-loader?limit=17066&name=[hash:8]-[name].[ext]',
                   loader: 'url-loader',
                   options: {
                       limit:4096, //4096字节以上生成文件，否则base64
                       name:'src/common/image/[name].[ext]'
                   }
               }, 
               { //处理字体文件的loader
                   test: /\.(ttf|eot|svg|woff|woff2)$/, 
                   use: 'url-loader'
               },  
               { //解析ES6语法，必须把node_modules目录排除掉，
                   test: /\.js$/, 
                   use: 'babel-loader', 
                   exclude: /node_modules/
               }, 
               { //解析vue文件
                   test: /\.vue$/, 
                   use: 'vue-loader' 
               },  
           ]
       },
       resolve: {
           alias: {    //修改vue被导入时候的路径
               "vue$": "vue/dist/vue.js"
           }
       },
       externals: {
           'AMap': 'AMap'
       }
   }
   
   /* 
   输入“webpack”命令开始打包
   
   项目初始化json文件 :        
       npm init -y
   自动打包并运行(修改自动更新，可以在内存自动生成bundle.js)  :             
       npm i webpack-dev-server@2.9.3 -D
   本地安装webpack :
       npm i webpack@3.8.1 -D
   安装"html-webpack-plugin": "^2.30.1" (在内存自动生成html文件)：
       npm i html-webpack-plugin@2.30.1 -D
   修改package.json选项的配置文件;script, 命令行运行：npm run dev
       "dev": "webpack-dev-server --open --port 8080 --contentBase src --hot"
   安装解析css文件的依赖包
       npm i style-loader@0.19.0 css-loader@0.28.7 -D
   安装解析less文件的依赖包
       npm i less-loader@4.0.5 -D
       npm i less@2.7.3 -D
   安装解析sass文件的依赖包
       npm i sass-loader@6.0.6 -D
       npm i node-sass@4.0.0 -D    //这个插件安装不了
   安装解析stylus文件的依赖包
       npm install stylus-loader stylus --save-dev
   
   安装处理url地址的依赖包
       npm i url-loader@0.6.2 -D
       npm i file-loader@1.1.5 -D
   安装字体图标，安装bootstrap
       npm i bootstrap@3.3.7 -S
   安装babel,用于转化ES6语法
       //babel转换工具： npm i babel-core babel-loader babel-plugin-transform-runtime -D
       //babel语法：    npm i babel-preset-env babel-preset-stage-0 -D
       //创建: .babelrc, 配置如下
           {
               "presets": ["env", "stage-0"],
               "plugins": ["transform-runtime"]
           }
   安装vue的依赖包
       npm i vue-loader@13.0.5 -D
       npm i vue-template-compiler@2.5.16 -D //版本要和vue相同才行
   安装路由模块
       npm i vue-router -S
   按需引入Mint-ui ,需要安装下面
       npm install babel-plugin-component -D
       然后，将 .babelrc 修改为：
           {
               "presets": ["env", "stage-0"],
               "plugins": [
                   "transform-runtime",
                   ["component", [
                       {
                       "libraryName": "mint-ui",
                       "style": true
                       }
                   ]]
               ]
           }
   
   
   安装extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
       npm install --save-dev extract-text-webpack-plugin
   
   安装npm install --save-dev autoprefixer-loader我们在写css样式时，有些情况下需要加样式前缀以兼容不同的浏览器
   
       npm install --save-dev autoprefixer-loader
   安装npm i -D uglifyjs-webpack-plugin    代码压缩
       npm i -D uglifyjs-webpack-plugin
   安装vue-resource
       npm i vue-resource -S
   安装： babel-plugin-transform-remove-strict-mode 移除webpack的严格模式，这样才可以使用 mui
       npm install babel-plugin-transform-remove-strict-mode -D
       在文件夹根目录下找到 .babelrc 文件，修改：
           {
               "plugins": ["transform-remove-strict-mode"]
           }
   安装VUE的图片预览插件： npm i vue-preview -S
   安装VUEX:   npm i vuex -S
   安装fastclick: npm i fastclick -S
   安装：图片懒加载插件vue-lazyload
       npm install vue-lazyload -D
   安装移动端调试工具  vConsole:
       npm install vconsole -D
   安装js创建css3动画的插件： create-keyframe-animation
       npm install create-keyframe-animation
   安装高德地图插件： npm install vue-amap --save
   安装日期插件:   npm i vue2-datepick --save
   安装检测手机版本和型号的插件：  npm install mobile-detect --save
   安装md5加密： npm install --save js-md5
   */
   
   ```

   