#### 1、创建数据库表

1. 商品清单表：food_list

   ```
   DROP TABLE IF EXISTS `food_list`;
   CREATE TABLE `food_list` (
     `id` int(15) NOT NULL AUTO_INCREMENT,
     `pid` int(15) unsigned NOT NULL COMMENT '所属菜品分类',
     `title` varchar(50) NOT NULL DEFAULT '未命名' COMMENT '菜品名称',
     `price` float(15,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '菜品价格',
     `pic` char(50) NOT NULL DEFAULT '' COMMENT '图片',
     `description` char(200) NOT NULL DEFAULT '未描述' COMMENT '菜品描述',
     `keywords` char(50) DEFAULT '暂无' COMMENT '关键字',
     `is_hot` int(15) unsigned DEFAULT '0' COMMENT '是否热门',
     `is_new` int(15) unsigned DEFAULT '0' COMMENT '是否新品',
     `sort` int(15) unsigned DEFAULT '0' COMMENT '菜品排序',
     `status` int(15) unsigned DEFAULT '1' COMMENT '食品状态',
     `content` longtext COMMENT '对食品的文本描述',
     PRIMARY KEY (`id`)
   ) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
   ```

2. 商品分类表：food_cate

   ```
   DROP TABLE IF EXISTS `food_cate`;
   CREATE TABLE `food_cate` (
     `id` int(15) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类id',
     `pid` int(15) unsigned NOT NULL DEFAULT '0' COMMENT '所属分类，关联自身',
     `title` varchar(50) NOT NULL COMMENT '分类标题',
     `sort` int(15) unsigned DEFAULT '0' COMMENT '排序',
     `status` int(15) unsigned DEFAULT '1' COMMENT '是否启用',
     `description` varchar(250) DEFAULT '暂无描述' COMMENT '分类描述',
     `keywords` varchar(50) DEFAULT '暂未描述' COMMENT '关键字',
     PRIMARY KEY (`id`)
   ) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
   ```

3. 食品订单表：food_order

   ```
   DROP TABLE IF EXISTS `food_order`;
   CREATE TABLE `food_order` (
     `id` int(15) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
     `serial` varchar(50) NOT NULL COMMENT '订单编号',
     `roomid` varchar(50) NOT NULL DEFAULT '0' COMMENT '桌子编号',
     `p_num` int(15) unsigned NOT NULL DEFAULT '0' COMMENT '用餐人数',
     `p_mark` varchar(50) DEFAULT '无' COMMENT '用户要求',
     `price` float(15,2) DEFAULT '0.00' COMMENT '订单总价',
     `content_num` int(15) unsigned DEFAULT '0' COMMENT '用户确认下单的菜的数量',
     `content_order` mediumtext COMMENT '用户确认下单的数据',
     `content` varchar(200) DEFAULT '' COMMENT '购物车中的订单',
     `status` int(15) unsigned DEFAULT '0' COMMENT '订单状态，0 未受理， 1 已受理， 2 已取消',
     `pay_status` int(15) unsigned DEFAULT '0' COMMENT '支付状态： 0 未支付， 1 已支付',
     `pay_type` int(15) unsigned DEFAULT '0' COMMENT '支付方式： 1 微信支付， 2 支付宝支付',
     `add_time` varchar(15) DEFAULT '0' COMMENT '下单时间',
     PRIMARY KEY (`id`)
   ) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
   ```


####2、接口文件

1. 接口代码

   ```
   const router = require('koa-router')()
   const DB = require('../../model/mysqlDB')
   const tools = require('../../model/tools')
   const config = require('../../model/config')
   const feiyun = require('../../model/feiyun.js')
   
   
   //支付宝
   const Alipay = require('alipay-mobile');
   const assert=require('assert');
   
   /** 支付宝的支付接口 */
   router.post('/doPay',(ctx)=>{
       const options = config.aliPayOptions 
       const service = new Alipay(options); 
   
       /** 获取客户端传过来的参数 */
       var requestData=ctx.request.body;
       var roomid=requestData.roomid;
       // var out_trade_no=requestData.serial+'_tb'+tools.getOrderId();
       var out_trade_no=requestData.serial         // 订单编号
       var subject="kgm无人点餐";                   // 标题
       var total_amount=requestData.total_price    // 总价钱
       var return_url=requestData.return_url       // 前端付款成功后的跳转页面
   
       const data = {
           subject: subject,
           out_trade_no:out_trade_no,
           total_amount:total_amount
       }
       const basicParams = {
           // 前端付款成功的回跳地址（付款成功页面 ）
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
       const service = new Alipay(options)
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
   
   /** 进入系统，用户扫描二维码，判断此桌子是否在使用中 */
   router.get('/roomidIsUsed', async (ctx, next) => {  
       var roomid = ctx.query.roomid
       try {
           var hasOrder = await DB.query('select * from food_order where roomid=? and status!=2 and pay_status!=1 order by add_time DESC limit 0,50', [roomid])
           if(hasOrder.length>0) { //已经存在此订单，直接返回订单信息
               ctx.body = tools.returnJson('用餐中', true, hasOrder[0])
           } else {    // 不存在此订单，需要创建订单
               ctx.body = tools.returnJson('闲置中', false)
           }
       } catch (error) {
           console.log(error)
           await next()
       }
   })
   
   /** 用户扫描二维码下单，保存下单桌号，用餐人数，客户需求, 用户修改基础信息 */
   router.post('/addPeopleInfo', async (ctx, next)=>{    
       var body = ctx.request.body
       var roomid = body.roomid
       var p_mark = body.p_mark
       var p_num = parseInt(body.p_num)
       try {
           // 在数据库查找当前桌号是否存在没有完成的订单（限制查询前20个数据）
           var hasOrder = await DB.query('select * from food_order where roomid=? and status!=2 and pay_status!=1 order by add_time DESC limit 0,50', [roomid])
           if(hasOrder.length>0) { //已经存在此订单，直接返回订单信息
               var result = await DB.query('update food_order set p_mark=?,p_num=? where serial=?', [p_mark,p_num,hasOrder[0].serial])
               ctx.body = tools.returnJson('修改成功', true, result)
           } else {    // 不存在此订单，需要创建订单
               // 生成订单编号
               let serial = 'food_'+tools.getMilliSecond()
               let add_time = tools.getMilliSecond()
               // 插入数据库
               var result = await DB.query(`INSERT INTO food_order (serial,roomid,p_mark,p_num,add_time) VALUES (?,?,?,?,?)`,[serial,roomid,p_mark,p_num,add_time])
               // 查询此订单
               var lookOrder =await DB.query(`select * from food_order where id=?`,[result.insertId])
               ctx.body = tools.returnJson('创建订单成功', true, lookOrder[0])
           }
       } catch (error) {
           console.log(error)
           await next()
       }
   })
   
   /** 获取所有菜品列表 */
   router.get('/productlist', async (ctx, next) => {  
       try {
           // 获取菜品分类
           var cate = await DB.query('select * from food_cate where status=1')
           // 获取所有分类下面的菜单列表
           for (let i = 0; i < cate.length; i++) {
               let temp = await DB.query('select id,pid,title,price,pic,description from food_list where pid=?',[cate[i].id])
               cate[i].list = temp
           }
           ctx.body = tools.returnJson('获取数据成功', true, cate)
       } catch (error) {
           console.log(error)
           await next()
       }
   })
   
   /** 获取某一个菜的详情 */
   router.get('/productcontent', async (ctx, next) => {  
       var id = parseInt(ctx.query.id)
       try {
           var result = (await DB.query('select * from food_list where id=?', [id]))[0]
           ctx.body = tools.returnJson('获取数据成功', true, result)
       } catch (error) {
           console.log(error)
           await next()
       }
   })
   
   /** 往菜单里面添加菜 */
   router.post('/addcart', async (ctx, next) => {  
       var body = ctx.request.body
       var serial = body.serial
       var num = parseInt(body.num)
       var food_id = parseInt(body.food_id)
       try {   //查找此桌子编号的订单
           var result = (await DB.query('select * from food_order where serial=?', [serial]))[0]
           // 把字符串转化为数组
           var foodContent = result.content ? JSON.parse(result.content):[]
           // 添加菜或者添加数量
           if(foodContent.length==0){  //没有任何元素
               foodContent = [[food_id,num]]
           }else{  // 遍历元素
               let flag = true
               for (let i = 0; i < foodContent.length; i++) {
                   if(foodContent[i][0]==food_id) {    //已存在此菜，只增加数量
                       foodContent[i][1]+=num
                       flag = false
                       break
                   }
               }
               //不存在该菜，添加新菜
               if(flag){
                   foodContent.push([food_id, num])
               }
           }
           // 保存到数据库
           var saveFood = await DB.query('update food_order set content=? where serial=?', [JSON.stringify(foodContent),serial])
           ctx.body = tools.returnJson('保存成功', true)
       } catch (error) {
           console.log(error)
           await next()
       }
   })
   
   /** 计算菜的总数量 */
   router.get('/cartCount', async (ctx, next) => {  
       var serial = ctx.query.serial
       try {// 查找订单
           var result = (await DB.query('select * from food_order where serial=?', [serial]))[0]
           // 把字符串转化为数组
           var foodContent = result.content ? JSON.parse(result.content):[]
           // 总数量
           var mount = 0
           if(foodContent.length){
               foodContent.forEach(item => {
                   mount+=parseInt(item[1])
               });
           }
           ctx.body = tools.returnJson('获取购物车数据成功', true, mount)
       } catch (error) {
           console.log(error)
           await next()
       }
   })
   
   /** 获取购物车数据 */
   router.get('/cartList', async (ctx, next)=>{
       var serial = ctx.query.serial
       try{
           // 查询最新一条订单
           var result = (await DB.query('select * from food_order where serial=?', [serial]))[0]
           if(result){
               // 获取用户点的菜品信息
               var foodInfo =  await tools.getFoodArr(result.content)
               ctx.body = tools.returnJson('购物车数据', true, foodInfo)
           }
       }catch(err){
           console.log(err);
           await next()
       }
   })
   
   /** 增加一件数量 */
   router.get('/incCart', async (ctx, next)=>{
       var serial = ctx.query.serial
       var food_id = parseInt(ctx.query.food_id)
       try{    // 查询最新一条订单
           var result = (await DB.query('select * from food_order where serial=?', [serial]))[0]
           // 把字符串转化为数组
           var foodContent = result.content ? JSON.parse(result.content):[]
           for (let i = 0; i < foodContent.length; i++) {
               if(foodContent[i][0]==food_id){
                   foodContent[i][1]++
               }
           }
           var saveFood = await DB.query('update food_order set content=? where id=?', [JSON.stringify(foodContent),result.id])
           ctx.body = tools.returnJson('增加成功', true)
       }catch(err){
           console.log(err);
           await next()
       }
   })
   
   /** 减少一件数量 */
   router.get('/decCart', async (ctx, next)=>{
       var serial = ctx.query.serial
       var food_id = parseInt(ctx.query.food_id)
       try{    // 查询最新一条订单
           var result = (await DB.query('select * from food_order where serial=?', [serial]))[0]
           // 把字符串转化为数组
           var foodContent = result.content ? JSON.parse(result.content):[]
           for (let i = 0; i < foodContent.length; i++) {
               if(foodContent[i][0]==food_id){
                   if(foodContent[i][1]==1){   //删除元素
                       foodContent.splice(i,1)
                   }else{
                       foodContent[i][1]-- 
                   }
               }
           }
           var saveFood = await DB.query('update food_order set content=? where id=?', [JSON.stringify(foodContent),result.id])
           ctx.body = tools.returnJson('减少成功', true)
       }catch(err){
           console.log(err);
           await next()
       }
   })
   
   /** 获取最热门的菜 */
   router.get('/getHotFood', async (ctx, next)=>{
       try{
           var result = await DB.query('select * from food_list where status=1 and is_hot=1 order by sort DESC limit 0,10')
           if(result.length>0){
               ctx.body = tools.returnJson('获取最热门的菜品成功', true, result)
           }
       }catch(err){
           console.log(err);
           await next()
       }
   })
   
   /** 获取最新推荐的菜 */
   router.get('/getNewFood', async (ctx, next)=>{
       try{
           var result = await DB.query('select * from food_list where status=1 and is_new=1 order by sort DESC limit 0,10')
           if(result.length>0){
               ctx.body = tools.returnJson('获取最新推荐的菜品成功', true, result)
           }
       }catch(err){
           console.log(err);
           await next()
       }
   })
   
   
   /** 按关键字搜索菜 */
   router.get('/searchFood', async (ctx, next)=>{
       var key = ctx.query.key
       try{
           var result = await DB.query(`select * from food_list where title like '%${key}%'  order by sort DESC`)
           if(result.length>0){
               ctx.body = tools.returnJson('按关键字搜索成功', true, result)
           }else{
               ctx.body = tools.returnJson('按关键字搜索成功', true, [])
           }
       }catch(err){
           console.log(err);
           await next()
       }
   })
   
   /** 提交订单 , 清空购物车数据*/
   router.post('/addOrder', async (ctx, next)=>{
       var {serial,order} = ctx.request.body
       order = JSON.parse(order)  
   
       try {
           // 查找订单中已经存在的订单数据
           var already = await DB.query('select * from food_order where serial=?',[serial])
   
           /** 下面调用打印机方法 */
           var roomid = already[0].roomid       // 房间号
           var p_mark = already[0].p_mark       // 用户要求
           var print_price = 0                  // 此次打印的价格
           for (let i = 0; i < order.length; i++) {
               print_price+=parseInt(order[i].price)*parseInt(order[i].mount)
           }
           var orderInfo = tools.getOrderPrintInfo(print_price,p_mark,roomid,order)
           
           feiyun.print('918502453',orderInfo)      //参数1：打印机编号
           /** 上面是调用打印机方法 */
   
           // 下面是保存到订单中的操作===
           var already_order = already[0].content_order?(JSON.parse(already[0].content_order)):[]  
           // 结合两个数组，去除重复的
           for (let i = 0; i < already_order.length; i++) {
               let flag = 'init'
               for (let j = 0; j < order.length; j++) {
                   // 如果点的菜有重复的
                   if(already_order[i].id==order[j].id){
                       already_order[i].mount+=order[j].mount
                       flag=j
                   }
               }
               // 删除已经重复的元素
               if(flag!='init'){
                   order.splice(flag,1)
               }
           }
           order = already_order.concat(order)     // 拼合新添加的数据
   
           var total_price = 0     // 订单总价钱
           var total_num = 0       // 订单总数量
           for (let i = 0; i < order.length; i++) {
               total_price+=order[i].price*parseInt(order[i].mount)
               total_num+=parseInt(order[i].mount)
           }
   
           // 保存用户提交的订单菜单，修改成已受理状态，价钱，清除用户购物车的数据
           order = JSON.stringify(order)
           var result = await DB.query('update food_order set price=?,content_num=?,content_order=?,content=?,status=? where serial=?', [total_price, total_num, order, '',1,serial])
           ctx.body = tools.returnJson('下单成功', true)
       } catch (error) {
           console.log(error)
           ctx.body = tools.returnJson('保存失败', false)
       }
   })
   
   /** 删除订单的一个菜 */
   router.get('/deleteOneFood', async (ctx, next)=>{
       var {id, serial} = ctx.query
       try{
           // 查找菜单
           var result = await DB.query('select * from food_order where serial=?',[serial])
           if(result.length>0){
               var content_order = JSON.parse(result[0].content_order)
               for (let i = 0; i < content_order.length; i++) {
                   if(content_order[i].id==id){    // 删除这个菜
                       content_order.splice(i, 1)
                   }
               }
           }
           var total_price = 0     // 订单总价钱
           var total_num = 0       // 订单总数量
           for (let i = 0; i < content_order.length; i++) {
               total_price+=parseInt(content_order[i].price)*parseInt(content_order[i].mount)
               total_num+=parseInt(content_order[i].mount)
           }
           // 重新保存订单
           var saveOrder = await DB.query('update food_order set price=?,content_num=?,content_order=? where serial=?', [total_price,total_num,JSON.stringify(content_order),serial])
           ctx.body = tools.returnJson('删除成功', true, saveOrder)
       }catch(err){
           console.log(err);
           await next()
       }
   })
   
   module.exports = router.routes()
   ```

#### 3、socket.io无刷新同步数据 

1. 安装 koa-socket

   ```
   npm i koa-socket --save
   ```

2. 创建socket.js文件

   ```
   /**
    * Created by Administrator on 2018/4/19 0019.
    */
   const IO = require( 'koa-socket' );
   const url=require('url');
   const io = new IO();
   
   var socketIo={
       init:function(app) {
           io.attach(app);
           /*注册启动*/
           app._io.on('connection', socket => {
               console.log('连接成功');
               var requestUrl = socket.request.url;
               var roomid = url.parse(requestUrl, true).query.roomid; // 获取房间ID
               
   		    socket.join(roomid);
               //监听客户端发送的请求
               socket.on('addcart', function (data) {	
                   console.log('addcart');
                   //用户加入房间
                   //socket.emit('addcart',data);	/*单项发送数据*/
                   //app._io.emit('addcart',data);   /*广播数据*/
                   //对房间内的用户发送消息
                   //  app._io.to(roomid).emit('addcart','有人加入购物车了');//包括自己
                   socket.broadcast.to(roomid).emit('addcart', 'addcart');//不包括自己
               });
           })
       }
   }
   module.exports=socketIo;
   ```

3. 在服务器入口文件 app.js 中配置

   ```
   const socketIo = require('./model/socket')      // 引入socket.js
   
   /** 实例化 */
   const app = new Koa()
   
   /** 初始化 socket */
   SocketIo.init(app)
   
   ```


#### 4、配置飞云打印机接口

1. http://www.feieyun.com/open/index.html，点解SDK下载，下载nodejs版本，修改内部配置

2. 进入koa项目后台，安装 crypto 模块

   ```
   npm i crypto -S
   ```

3. 再接口文件中引入sdk下载的文件
