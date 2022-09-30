window.onload = function() {


	var that;
	// 铅笔
	class Pencil {
		constructor(id, size, color) {
			this.canvas = document.getElementById(id);
			this.pensize = size;
			this.pencolor = color;
			that = this;
			this.Init();
		}

		// 1.初始化铅笔 Init()
		Init() {
			if (this.canvas.getContext) {
				this.pen = this.canvas.getContext("2d");
				this.pen.strokeStyle = this.pencolor;
				this.pen.lineWidth = this.pensize;
			}

			// this.Draw();
		}
		// 2.改变铅笔粗细
		Changesize() {
			var add = document.getElementById("add");
			var reduce = document.getElementById("reduce");
			var size = document.getElementById("size");
			var sizevalue = document.getElementById("sizevalue");
			var error = document.getElementById("error");
			add.onclick = function() {
				if (that.pensize < size.max) {
					size.value++;
					that.pensize++;
					that.Init();
					sizevalue.innerText = that.pensize + "px";
					reduce.style.backgroundColor = "#f9f9f9";
				} else {
					this.style.backgroundColor = "red";
					error.play();
				}
			}

			reduce.onclick = function() {
				if (that.pensize > 0) {
					size.value--;
					that.pensize--;
					that.Init();
					sizevalue.innerText = that.pensize + "px";
					add.style.backgroundColor = "#f9f9f9";
				} else {
					this.style.backgroundColor = "red";
					error.play();
				}
			}
		}
		// 3.改变铅笔的颜色 ChangeColor()
		ChangeColor() {
			var incolor = document.getElementById("incolor");
			var colorgreen = document.getElementById("colorgreen");
			var licolors = document.getElementById("licolors").children; //li数组

			incolor.onchange = function() {
				that.pencolor = incolor.value;
				colorgreen.style.backgroundColor = incolor.value;
				that.Init();
			}
			//为li标签绑定click事件
			for (var i = 0; i < licolors.length; i++) {
				licolors[i].onclick = licolorfn;
			}

			function licolorfn() {
				that.pencolor = this.style.backgroundColor;
				colorgreen.style.backgroundColor = this.style.backgroundColor;
				that.Init();
			}
			//为li标签绑定click事件
		}

		// 4.改变铅笔画的图形ChangeShape()
		ChangeShape() {
			var line = document.getElementById("line");
			var arc = document.getElementById("arc");
			var react = document.getElementById("react");
			var spot = document.getElementById("spot");
			var vertical = document.getElementById("vertical");
			vertical.onclick = function() {
				that.Draw("vertical");
			}
			spot.onclick = function() {
				that.Draw("spot");
			}
			line.onclick = function() {
				that.Draw("line");
			}
			arc.onclick = function() {
				that.Draw("arc");
			}
			react.onclick = function() {
				that.Draw("react");
			}


		}
		// 5.铅笔画图 Draw()
		Draw(type) {
			that.Init();
			this.canvas.onmousedown = function(event) {
				var e = event || window.event;
				var x1 = e.clientX - this.offsetLeft;
				var y1 = e.clientY - this.offsetTop + document.documentElement.scrollTop;

				// document.documentElement.scrollTop 获取当前滚动条距离顶部的位置
				that.pen.beginPath();
				that.pen.moveTo(x1, y1);
				this.onmousemove = function(event) {
					var e = event || window.event;
					var x2 = e.clientX - this.offsetLeft;
					var y2 = e.clientY - this.offsetTop + document.documentElement.scrollTop;

					switch (type) {
						case "vertical":
							that.pen.lineTo(x1, y2);
							break;
						case "spot":
							that.pen.lineTo(x2, y2);
							break;
						case "arc":
							Drawarc(x1, y1, x2, y2);
							break;
						case "react":
							Drawreact(x1, y1, x2 - x1, y2 - y1);
							break;
						case "line":
							that.pen.lineTo(x2, y1);
							break;
					}
					that.pen.stroke();
				}
				this.onmouseup = function() {
					this.onmousemove = null;
				}
			}

			function Drawarc(x1, y1, x2, y2) {

				var r1 = Math.sqrt((x2 - x1 - that.pensize) * (x2 - x1 - that.pensize) + (y2 - y1 - that.pensize) * (y2 - y1 -
					that.pensize));
				var r2 = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
				that.pen.arc(x1, y1, r2, 0, Math.PI * 2, true);
				that.canvas.onmouseup = function() {
					that.pen.globalCompositeOperation = "destination-out";
					that.pen.arc(x1, y1, r1, 0, Math.PI * 2, true);
					that.pen.fill();
					this.onmousemove = null;
					that.pen.globalCompositeOperation = "lighter"
				}

			}

			function Drawreact(x1, y1, width, height) {
				that.pen.fillStyle = that.pencolor;
				that.pen.lineWidth = that.pensize;
				that.pen.fillRect(x1, y1, Math.abs(width), Math.abs(height));
				that.canvas.onmouseup = function() {
					that.pen.globalCompositeOperation = "destination-out";
					that.pen.fillRect(x1 + that.pensize, y1 + that.pensize, Math.abs(width) - that.pensize * 2, Math.abs(height) -
						that.pensize * 2)
					this.onmousemove = null;
					that.pen.globalCompositeOperation = "lighter"
				}
			}
		}
		// 6.橡皮擦
		Ereaser() {
			console.log(that.pen.globalCompositeOperation);
			var ereaser = document.getElementById("ereaser");
			var reset = document.getElementById("reset");
			var cancel = document.getElementById("cancel");

			ereaser.onclick = function() {
				that.pen.globalCompositeOperation = "destination-out";
				that.Draw("spot");
			}
			reset.onclick = function() {
				that.pen.globalCompositeOperation = "destination-out";
				that.pen.fillRect(0, 0, that.canvas.width, that.canvas.height);
			}
			cancel.onclick = function() {
				that.pen.globalCompositeOperation = "lighter";
			}
		}

	}
	var pen = new Pencil("canvas", 10, "red");
	pen.Draw("spot");
	pen.Changesize();
	pen.ChangeColor();
	pen.Ereaser();
	pen.ChangeShape();
	//画板对象
	class Drawmap {
		constructor(arg) {
			this.Init();
		}
		Init() {
			var sizevalue = document.getElementById("sizevalue");
			sizevalue.innerText = pen.pensize + "px";
		}
	}
	new Drawmap();
}
