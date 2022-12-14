let getRandom = function(min, max) {
	let ret = Math.ceil(((Math.random() * (max - min)) + min) * 100) / 100;
	// console.log(`get random min: ${min}, max: ${max}, result: ${ret}`);
	return ret;
}



let rem = new Rem();
rem.getWindowSize();

let appData = {
	lastRenderTime: 0,
	renderInterval: 1000 / 120,
	imgWrapperWidth: 850,
	piecesNum: 10,
	level: 8,
	piecesCenterPoint: null,
	timeoutMouseMoveHandler: null,
	timeoutMouseMoveStep: 1000 / 20,
	bgUrl: '../assets/bg.jpg',
	showImage: true,
	imgs: ['./assets/bg.jpg']
};

let appView = {
	listPieces: [],
	$wrapper: $('.wrapper'),
	$pieces: $('.pieces'),
	$cbox: $('#cbox'),
	init: function() {
		appView.loadImg();
		appView.initPieces();
		appView.$cbox.change(function(evt) {
			// console.log(evt);
			console.log(this);
			appData.showImage = this.checked;

			if (!appData.showImage) {
				appView.listPieces.forEach($ele => {
					$ele.removeClass('hide').addClass('hide');
				});
			} else {
				appView.listPieces.forEach($ele => {
					$ele.removeClass('hide');
				});
			}
		});
		setTimeout(() => {
			appView.initPiecesRotate();
		}, 1000);

		appView.$pieces.one('click', () => {
			$("body").off('mousemove', appView.bodyMoveHandler);

			appView.listPieces.forEach($ele => {
				// parseInt($ele.attr('lv')) * 100 + getRandom(-100, 100)
				let rx = 360 * 1.5;
				let ry = 360 * 1.5;
				let rz = 360 * 1.5;
				setTimeout(() => {
					$ele.css({
						transform: `translateZ(-100rem)`,
						transition: '.5s ease',
						opacity: 0
					});
				}, parseInt($ele.attr('lv')) * 100 + getRandom(-100, 100));
			});

			setTimeout(() => {
				appView.init();
			}, appData.level * 150);
		})
	},
	loadImg: function() {
		let imageLoad = new ImageLoad;
		imageLoad.queueImage(appData.imgs).imageLoadingProgressCallback(function(a) {
				var a = Math.floor(a); // 获取当前载入图片的百分比
				console.log(`=== imageLoad: ${a}%`);
			},
			function() {
				console.log(`=== imageLoad: loading complete`);
				appView.$wrapper.css('visibility', 'visible');
			});
	},
	initPiecesRotate: function() {
		$("body").bind('mousemove', appView.bodyMoveHandler);
	},
	bodyMoveHandler: function(event) {
		if (appData.timeoutMouseMoveHandler != null) {
			return;
		}

		appData.timeoutMouseMoveHandler = setTimeout(() => {
			clearTimeout(appData.timeoutMouseMoveHandler);
			appData.timeoutMouseMoveHandler = null;
		}, appData.timeoutMouseMoveStep);

		appView.renderPieces(event);
	},
	/*
	 * 初始化所有碎片 
	 * */
	initPieces: function() {
		let pr = document.getElementsByClassName('pieces');
		let {
			x,
			y,
			width,
			height
		} = pr[0].getBoundingClientRect();
		appData.piecesCenterPoint = {
			x: (x + width / 2),
			y: (y + width / 2)
		}

		// 将所有图片平均分成n层,即第0，1，2...n-1层，层数标记为lv
		// lv的功能如下
		// lv越低，距离图片中心就越近，图片尺寸越大
		// lv越高，距离图片中心就越远，图片尺寸越小

		appView.listPieces = [];
		const {
			piecesNum,
			level,
			imgWrapperWidth,
			showImage
		} = appData;
		// const stepPieces = Math.floor(piecesNum / level);
		const stepPieces = piecesNum;
		const stepWidth = Math.round(imgWrapperWidth / 2 / level); // 设定每一层图片宽度的标准值


		for (let i = 0; i < level; i++) {
			// 设置半径和尺寸
			let w = stepWidth * (1 + (level - 1 - i) * 0.1);
			if (w < 10) {
				w = 10;
			}

			let maxR = imgWrapperWidth / 2 - stepWidth * (level - 1 - i);
			let minR = maxR - w;
			if (i == 0) {
				minR = 0;
			}

			let count = Math.floor(12 * maxR / w);
			console.log(`=== lv${i}, pieces: ${count}`);

			// console.log(`maxR: ${maxR}, minR: ${minR}`);

			for (let j = 0; j < count; j++) {
				let $piece = $(`<div class="piece" lv="${i}"></div>`);
				appView.setPieceStyle($piece, maxR, minR, w);
				appView.listPieces.push($piece);
			}
		}

		let $pieces = $('.pieces');
		$pieces.empty();
		for (let $item of appView.listPieces) {
			$pieces.append($item);

			// const shapeIndex = Math.floor(getRandom(1, 4));
			// switch (shapeIndex) {
			// 	case 1:
			// 		$item.addClass('heart');
			// 		break;
			// 	case 2:
			// 		$item.addClass('circle');
			// 		break;
			// 	case 3:
			// 		$item.addClass('polygon');
			// 		break;
			// 	default:
			// 		break;
			// }

			if (!showImage) {
				$item.addClass('hide');
			}

			$item.addClass('fade-in');
			setTimeout(() => {
				$item.removeClass('fade-in');
			}, getRandom(100, 500))
		}
	},
	setPieceStyle: function($ele, maxR, minR, width) {
		const {
			imgWrapperWidth
		} = appData;

		// 设置尺寸
		const w = getRandom(width * 0.9, width * 1.1);
		$ele.css({
			width: w + 'px',
			height: w + 'px',
		});

		// 设置位置
		const r = getRandom(minR, maxR);
		const deg = getRandom(0, 2) * Math.PI;

		let leftPos = imgWrapperWidth / 2 + Math.cos(deg) * r - w / 2;
		let topPos = imgWrapperWidth / 2 - Math.sin(deg) * r - w / 2;

		$ele.css({
			left: leftPos,
			top: topPos,
		});

		// 塞入子元素
		let $child = $(`<div class="piece-child"></div>`);
		$child.css({
			'background-position': `${-leftPos}px ${-topPos}px`,
		});

		$ele.append($child);
	},
	renderPieces: function(event) {
		const {
			pageX,
			pageY
		} = event;
		const {
			x,
			y
		} = appData.piecesCenterPoint;

		const {
			imgWrapperWidth
		} = appData;

		let dx = pageX - x;
		if (dx > imgWrapperWidth) {
			dx = imgWrapperWidth
		} else if (dx < -imgWrapperWidth) {
			dx = -imgWrapperWidth;
		}

		let dxPercent = Math.round(dx / imgWrapperWidth * 100) / 100;

		let dy = pageY - y;
		if (dy > imgWrapperWidth) {
			dy = imgWrapperWidth;
		} else if (dy < -imgWrapperWidth) {
			dy = -imgWrapperWidth;
		}

		let dyPercent = Math.round(dy / imgWrapperWidth * 100) / 100;

		appView.listPieces.forEach($ele => {
			let lv = appData.level - parseInt($ele.attr('lv'));
			$ele.css({
				transform: `translateX(${lv*dxPercent}rem) translateY(${lv*dyPercent}rem)`
			});
		})
	}
};

$(document).ready(function() {
	appView.init();
});
