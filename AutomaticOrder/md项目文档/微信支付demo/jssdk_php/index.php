<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxffe325df9013a095", "95da884da81a08082b1d9d5136388ceb");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
  <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
</head>
<body>
  
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
   // jsApiList: ['chooseImage', 'getNetworkType','openLocation', 'scanQRCode','onMenuShareTimeline']
    jsApiList: [
        'checkJsApi',
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
        'openCard'
      ]
  });  
  	
  wx.ready(function () {
  	
  	  	wx.getNetworkType({
					success: function (res) {
						var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
						
						console.log(networkType);				
					}
				});
   
				document.getElementById('scanQRCode').onclick = function() {
					wx.scanQRCode({
						needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
						success: function(res) {
							var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						},fail:function(err){
							
							alert(JSON.stringify(err))
						}
					});
				}
				
				
				document.querySelector('#getLocation').onclick=function(){
					
						
					wx.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success: function (res) {
							var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
							var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
							var speed = res.speed; // 速度，以米/每秒计
							var accuracy = res.accuracy; // 位置精度
						}
					});
					
				}
				
				//地图
				document.querySelector('#openLocation').onclick=function(){
					
						
								wx.openLocation({
									latitude: 39.54, // 纬度，浮点数，范围为90 ~ -90
									longitude: 116.23, // 经度，浮点数，范围为180 ~ -180。
									name: '帝都天安门', // 位置名
									address: '天安门的中心', // 地址详情说明
									scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
									infoUrl: 'http://www.163.com' // 在查看位置界面底部显示的超链接,可点击跳转
								});
				
					
				}
				
				
				
				// 2. 分享接口
			  // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
			  document.querySelector('#onMenuShareAppMessage').onclick = function () {
			    wx.onMenuShareAppMessage({
			      title: '互联网之子',
			      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
			   		link: 'http://www.phonegap100.com/article-495-1.html',
			      imgUrl: 'http://www.phonegap100.com/data/attachment/portal/201605/20/213752y6wjjh702wuxk33w.jpg',
			      trigger: function (res) {
			        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
			        alert('用户点击发送给朋友');
			      },
			      success: function (res) {
			        alert('已分享');
			      },
			      cancel: function (res) {
			        alert('已取消');
			      },
			      fail: function (res) {
			        alert(JSON.stringify(res));
			      }
			    });
			    alert('已注册获取“发送给朋友”状态事件');
			  };
			
			  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
			  document.querySelector('#onMenuShareTimeline').onclick = function () {
			    wx.onMenuShareTimeline({
			      title: '锤子安全锤_锤子真的出了个“锤子”：车充＋安全锤',
			      link: 'http://www.phonegap100.com/article-495-1.html',
			      imgUrl: 'http://www.phonegap100.com/data/attachment/portal/201605/20/213752y6wjjh702wuxk33w.jpg',
			      trigger: function (res) {
			        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
			        alert('用户点击分享到朋友圈');
			      },
			      success: function (res) {
			        alert('已分享');
			      },
			      cancel: function (res) {
			        alert('已取消');
			      },
			      fail: function (res) {
			        alert(JSON.stringify(res));
			      }
			    });
			    alert('已注册获取“分享到朋友圈”状态事件');
			  };
			
			  // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
			  document.querySelector('#onMenuShareQQ').onclick = function () {
			    wx.onMenuShareQQ({
			      title: '锤子安全锤_锤子真的出了个“锤子”：车充＋安全锤',
			      link: 'http://www.phonegap100.com/article-495-1.html',
			      imgUrl: 'http://www.phonegap100.com/data/attachment/portal/201605/20/213752y6wjjh702wuxk33w.jpg',	      
			      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
			     
			      trigger: function (res) {
			        alert('用户点击分享到QQ');
			      },
			      complete: function (res) {
			        alert(JSON.stringify(res));
			      },
			      success: function (res) {
			        alert('已分享');
			      },
			      cancel: function (res) {
			        alert('已取消');
			      },
			      fail: function (res) {
			        alert(JSON.stringify(res));
			      }
			    });
			    alert('已注册获取“分享到 QQ”状态事件');
			  };
			  
			  // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
			  document.querySelector('#onMenuShareWeibo').onclick = function () {
			    wx.onMenuShareWeibo({
			      title: '锤子安全锤_锤子真的出了个“锤子”：车充＋安全锤',
			      link: 'http://www.phonegap100.com/article-495-1.html',
			      imgUrl: 'http://www.phonegap100.com/data/attachment/portal/201605/20/213752y6wjjh702wuxk33w.jpg',	      
			      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
			      trigger: function (res) {
			        alert('用户点击分享到微博');
			      },
			      complete: function (res) {
			        alert(JSON.stringify(res));
			      },
			      success: function (res) {
			        alert('已分享');
			      },
			      cancel: function (res) {
			        alert('已取消');
			      },
			      fail: function (res) {
			        alert(JSON.stringify(res));
			      }
			    });
			    alert('已注册获取“分享到微博”状态事件');
			  };
			
			  // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
			  document.querySelector('#onMenuShareQZone').onclick = function () {
			    wx.onMenuShareQZone({
			      title: '锤子安全锤_锤子真的出了个“锤子”：车充＋安全锤',
			      link: 'http://www.phonegap100.com/article-495-1.html',
			      imgUrl: 'http://www.phonegap100.com/data/attachment/portal/201605/20/213752y6wjjh702wuxk33w.jpg',	      
			      desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
			     
			      trigger: function (res) {
			        alert('用户点击分享到QZone');
			      },
			      complete: function (res) {
			        alert(JSON.stringify(res));
			      },
			      success: function (res) {
			        alert('已分享');
			      },
			      cancel: function (res) {
			        alert('已取消');
			      },
			      fail: function (res) {
			        alert(JSON.stringify(res));
			      }
			    });
			    alert('已注册获取“分享到QZone”状态事件');
			  };

				
				
				

				
				
				
			
				
  });
//wx.error(function(res){
//	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//	    
////	    alert(res)
//
//		console.log(res);
//});
</script>


		<button id="scanQRCode">扫一扫</button>



	
		<button id="getLocation">获取位置信息</button>
		
		
		<button id="openLocation">地图</button>
		
		<br />
		
		
		<button id="onMenuShareAppMessage">分享朋友</button>
		
		<button id="onMenuShareTimeline">分享到朋友圈</button>
		
		<button id="onMenuShareQQ">分享到QQ</button>
		
		
		<button id="onMenuShareWeibo">分享到微博</button>

		<button id="onMenuShareQZone">分享到QQ空间</button>
</html>
	