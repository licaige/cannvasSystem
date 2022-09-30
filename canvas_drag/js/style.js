/*
 * @Author: l.zcq 
 * @Date: 2018-07-04 16:27:03 
 * @Last Modified by:   l.zcq 
 * @Last Modified time: 2018-07-04 16:27:03 
 */
(function(H){
	
	window.Drag = function(opt){
		//必选参数
		this.inChild = null;
		this.child = [];
		this.eventBox = opt.eventBox;
		//可选参数
		this.dragStartCallback = opt.dragStartCallback;
		this.dragMoveCallback = opt.dragMoveCallback;
		this.dragEndCallback = opt.dragEndCallback;
		//不可配置参数
		//this.pinchStatus = false;
		this.init();
		return this;
	};
	
	
	function dragDown(e){
		//console.log(e)
		//this.inChild = e.target;
		this.inChild = e.currentTarget;
	}
	
	Drag.prototype = {
		
		constructor: 'Drag',
		
		removeChildByIndex: function(i){console.log(i)
			var len = this.child.length;
			this.child[i].removeEventListener('mousedown',this.child[i].dragDown)
			this.child[i].dragDown = null;
			this.child = this.child.slice(0,i).concat(this.child.slice(i+1,len));	
		},
		
		removeChild: function(child){
			var len = this.child.length;
			for (var i = 0; i<len; i++) {
				if (child == this.child[i]) {
					this.removeChildByIndex(i);
					break;
				}
			}
		},
		
		removeAllChild: function(){console.log(this.child)
			var len = this.child.length;
			for (var i = 0; i<len; i++) {
				this.child[i].removeEventListener('mousedown',this.child[i].dragDown)
				this.child[i].dragDown = null;
			}
			this.inChild = null;
			this.child = [];
		},
		
		addChild: function(){
			var self = this;
			for (var i in arguments) {
				arguments[i].xStart = arguments[i].x;
				arguments[i].yStart = arguments[i].y;	
				arguments[i].scaleStartX = arguments[i].scaleX;
				arguments[i].scaleStartY = arguments[i].scaleY;
				arguments[i].rotationStart = arguments[i].rotation = 0;
				self.child.push(arguments[i]);
				
				arguments[i].dragDown = self.bind(self,dragDown)
				arguments[i].addEventListener('mousedown', arguments[i].dragDown,false)
			}
		},
		
		setInChild: function(obj){
			this.inChild = obj;
		},
		
		setInChildByIndex: function(index){
			this.inChild = this.child[index];
		},
		
		init: function(){
			var self = this,
				mc = null;
			
			var s_x = 0, s_y = 0;
			
			mc = new Hammer(self.eventBox);
			mc.on("panstart", function (e) {
				if(!self.inChild)return false;
				s_x = self.inChild.x;
				s_y = self.inChild.y;
				if(self.dragStartCallback)self.dragStartCallback()
			});
			mc.on("panmove", function (e) {
				if(!self.inChild)return false;
				self.inChild.x = s_x + e.deltaX;
				self.inChild.y = s_y + e.deltaY;
				if(self.dragMoveCallback)self.dragMoveCallback()
			});
			mc.on("panend", function (e) {
				if(!self.inChild)return false;
				self.inChild = null;
				if(self.dragEndCallback)self.dragEndCallback()
			});
			
			
			
			mc.get('pinch').set({ enable: true });
			mc.on("pinchstart", function (e) {
				if(!self.inChild)return false;
				s_x = self.inChild.x;
				s_y = self.inChild.y;
				s_scaleX = self.inChild.scaleX;
				s_scaleY = self.inChild.scaleY;
				s_rotation = self.inChild.rotation;
				
				if(self.dragStartCallback)self.dragStartCallback()
			});
			mc.on("pinchmove", function (e) {
				if(!self.inChild)return false;
				
				self.inChild.x = s_x + (e.deltaX||0);
				self.inChild.y = s_y + (e.deltaY||0);
				self.inChild.scaleX = e.scale*s_scaleX;
				self.inChild.scaleY = e.scale*s_scaleY;
				self.inChild.rotation = e.rotation+s_rotation;
				
				if(self.dragMoveCallback)self.dragMoveCallback();
			});
			mc.on("pinchend", function (e) {
				if(!self.inChild)return false;
				self.inChild = null;
				if(self.dragEndCallback)self.dragEndCallback()
			});
		},
		
		reset : function(){
			var self = this;
			
			for(var i=0,len=self.child.length;i<len;i++){
				var thisChild = self.child[i];
				thisChild.x = thisChild.xStart;
				thisChild.y = thisChild.yStart;
				
				thisChild.scaleX = thisChild.scaleStartX;
				thisChild.scaleY = thisChild.scaleStartY;
				thisChild.rotation = thisChild.rotationStart;
			}
		},
		
		bind:function(obj,handler){
			return function(){
				return handler.apply(obj,arguments);
			}
		}
	}
	
}(Hammer));

var canEle = document.getElementById('cjCanvas');
//if(!canNode||!canNode.getContext){return false};

var stage = new createjs.Stage(canEle);//实例化一个stage对象
if(createjs.Touch.isSupported())createjs.Touch.enable(stage);
createjs.Ticker.addEventListener("tick", tick);
function tick(){
    stage.update();
}

//拖拽回调
var D = new Drag({
    eventBox : canEle,//canvas对象
    dragStartCallback : function(){},//开始拖拽
    dragMoveCallback : function(){},//正在拖拽
    dragEndCallback : function(){}//结束拖拽
});