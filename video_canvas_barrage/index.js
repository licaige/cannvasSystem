/**
 *  为了提升性能，案例中将使用大量的优化技巧，用于提升性能。
 *  为了减少代码的注释量
 *  我把每一种优化技巧给一个特定的标志，各种标志对应的优化技巧如下：
 * 
 *  优化1: 最小语句话数 （比单个变量声明快很多）
 *  优化2: 最小化现场更新 （减少浏览器重绘次数）
 *  优化3: 避免不必要的属性查找 （一旦多次用到对象属性，应该将其存储到局部变量中。
 *      第一次访问该值会是O(n)，然而后续的访问都会是O(1),就会节省很多 O(x)表示算法复杂度，不做过多解释
 *  ）
 *  优化4: 展开循环 （
 *      这个是要重点bb一下的地方
 *      1. 当循环的次数是确定的时候，消除循环并多次使用函数调用往往更快
 *      2. 当循环次数不确定的时候，使用一种Duff装置的技术（有很多中，本案例使用性能最优的一种）
 *         其实Duff装置技术就是消除循环的一种升级方法。（适用于大数据集的操作，不是使用这个技术
 *          就能提搞性能，对于小数据集来说，额外的开销，可能得不偿失）
 *  ）
 *  由于懒，案例中还有很多代码可以，性能就行优化 （案例重点的是自定义播放器的实现和canvas绘制弹幕的实现，主要是展现实现思路，优化性能方面不做过多纠缠）
*/

/**
 * 事件绑定兼容对象的封装
 * 实现跨浏览器的兼容
 */
var EventUtil = {
    // 事件绑定
    addHandler: function (element, type, handler) {
        element.addEventListener && (element.addEventListener(type, handler, false), true)
            || element.attachEvent && (element.attachEvent("on" + type, handler), true)
            || (element["on" + type] = handler);
    },
    // 取消事件绑定
    removeHandler: function (element, type, handler) {
        element.removeEventListener && (element.removeEventListener(type, handler), true)
            || element.detachEvent && (element.detachEvent("on" + type, handler), true)
            || (element["on" + type] = null);
    },
    // 获取事件对象
    getEvent: function (event) {
        return event || window.event;
    },
    // 获取发生事件的元素
    getTarget: function (event) {
        return event.target || event.srcElement
    },
    // 阻止默认事件
    preventDefault: function (event) {
        event.preventDefault && (event.preventDefault(), true) || (event.returnValue = false);
    },
    // 阻止冒泡
    stopPropagation: function (event) {
        event.stopPropagation && (event.stopPropagation(), true) || (event.cancelBubble = true);
    }
};

/**
 * dom引用元素对象的封装
 * 避免全局命名冲突
*/
var domSet = (function () {
    return {
        // 获取声音变化的图标的父元素
        volumeIcons: document.querySelectorAll('.volume-icon img'),
        // 获取声音变化的图标额容器
        volumeIconsContainer: document.querySelector('.volume-icon'),
        // 获取自定义进度条容器
        progress: document.querySelector('.video-progress'),
        // 获取自定义进度条
        customProgress: document.querySelector('.progress'),
        // 获取视频播放器容齐
        playerContainer: document.querySelector('.player-container'),
        // 获取视频播放器控制组件
        playerControls: document.querySelector('.player-controls'),
        // 获取视频播放暂停按钮的容器
        playPaused: document.querySelector('.paused-play'),
        // 获取视频倍速按钮容器
        playBackRate: document.querySelector('.play-back-rate'),
        // 获取画中画按钮 
        pipBtn: document.querySelector('.pip-btn'),
        // 获取媒体总播放时间的标签
        playerDuration: document.querySelector('.player-duration'),
        // 获取媒体当前播放时间
        palyerCurrentTime: document.querySelector('.player-currentTime'),
        // 获取视频进度拖动按钮
        progressBtn: document.querySelector('.progress-btn'),
        // 获取视频每帧的指示元素
        progressPointer: document.querySelector('.progress-pointer'),
        // 获取视频指针显示的video
        poinerPlayer: document.querySelector('#pointer-player'),
        // 获取canvas元素
        drawing: document.querySelector('#drawing'),
        // 获取当前播放进度条
        progressCurrent: document.querySelector('.progress-current'),
        // 获取声音总进度条
        volumeRange: document.querySelector('.volume-range'),
        // 获取声音组件容器
        playerVolumeRange: document.querySelector('.player-volume-range'),
        // 获取声音拖拽按钮
        volumeBtn: document.querySelector('.volume-btn'),
        // 获取声音滑动条容器
        volumeRangeContainer: document.querySelector('.volume-range-container'),
        // 获取声音显示容器
        volumeNumber: document.querySelector('.volume-number'),
        // 获取预览小窗口
        pointerVideo: document.querySelector('.pointer-video'),
        // 获取预览小窗口所对应时间的显示容器
        pointerVideoCurrent: document.querySelector('.pointer-video-current'),
        // 获取当前媒体显示信息容器
        videoInfo: document.querySelector('.aside-header h3'),
        // 获取播放列表容器
        videoList: document.querySelector('.video-list'),
        // 获取网页全屏按钮
        fullscreenBtn: document.querySelector('.fullScreen-btn'),
        // 获取视频全屏按钮
        videoFullBtn: document.querySelector('.into-full'),
        // 获取全屏下的弹幕输入组件
        fullScreenBarrage: document.querySelector('.fullScreen-barrage'),
        // 获取弹幕开关和输入弹幕容器
        playerBarrage: document.querySelectorAll('.player-barrage'),
        // 获取弹幕头像容器
        barrageAvatar: document.querySelectorAll('.barrage-avatar'),
        // 获取可选头像的容器
        avatars: document.querySelectorAll('.avatars'),
        // 获取弹幕头像开关
        switchAvatar: document.querySelector("#switch-avatar"),
        // 获取弹幕悬浮开关
        switchCurour: document.querySelector('#switch-curour')
    }
})();

/**
 * 相关dom元素的属性值对象封装
 * 有些特殊操作元素的相关属性值的保存
 */
var domPros = (function () {
    return {
        //进度条按钮（progress）的clientWidth
        progressBtnCw: 0,
        // 自定义进度条（customProgress）的clientWidth (原因同progress的clientWidht类似)
        customProgressCw: 0,
        // 声音拖拽按钮的clientHeight
        volumeBtnCh: 0,
        // 声音进度条的clientHeight
        volumeRangeCh: 0
    }
})();

/**
 * 视频播放器控制对象属性的封装 
 * 为了防止意外修改播放器的相关属性值，故此所有关于播放器的相关属性和方法都写成私变量
 * 只能通过该对象的特权方法，去获取，修改相关变量或者使用相关函数
 * 好处：1.避免了全局命名冲突 2.减少意外修改相关属性而导致的错误
 */
var playerUtil = (function () {
    /**
     * 使用优化技巧1
     */
    // 播放器的引用
    var player = null,
        // 视频播放倍数
        playbackRate = 1,
        // 视频播放总时间
        duration = 0,
        // 当前声音值
        volume = 0,
        //  播放数据源
        playList = [
            {
                src: 'http://183.66.104.40/mv.music.tc.qq.com/AEeLYj8KLtCm09VZnWvDVciDv8C6q7PeJijW12oUI5kI/D6D5BADD8EB69FBCCA2FE901ECD872712DB5A75719AA68E20867BB93161915B3E5E3FE41DA9096CE16A0A1B60EA9B000ZZqqmusic_default/1049_M0102695002BtpRY267Y021000085311.f30.mp4?fname=1049_M0102695002BtpRY267Y021000085311.f30.mp4',
                singer: '周杰伦',
                name: '疗伤烧肉粽'
            },
            {
                src: 'http://183.66.104.178/mv.music.tc.qq.com/ADYjgb909c8GMYzrEDOeGHFjp05sCp1SegN0b7XwDbMQ/A86B467CC7F768288A93C2075A4938CFD01193E9E0DE7ECFFC389A3291CC8F10BEB708A68568DACC9D629004D83E8E2BZZqqmusic_default/1049_M0101047002r21qi3yJ5pO1000079102.f20.mp4?fname=1049_M0101047002r21qi3yJ5pO1000079102.f20.mp4',
                singer: '周杰伦',
                name: '超跑女神'
            },
            {
                src: 'http://183.66.104.40/mv.music.tc.qq.com/AxqzMBPJZhF0m9PELQY0hQKLUHdkeN_e7AGXYXN56dSo/819D8BDF47F1D7FF9E1574808CEDB729229FA7E1251C090DB69ECC0A9A87F4FD696B6317B4801209C6F24DCFC25441F8ZZqqmusic_default/1049_M2107739004FGQTw2welxX1001541107.f40.mp4?fname=1049_M2107739004FGQTw2welxX1001541107.f40.mp4',
                singer: '周杰伦',
                name: '手语'
            }
        ],
        // 当前播放视频序号
        playerIndex = 2,

        // 定义弹幕组件共享数据对象
        shareData = {
            // 弹幕组件输入框的值
            inputValue: '',
            // 弹幕开关的状态(默认打开)
            barrageBtnState: true,
        },
        // 选中的头像元素
        avatar = null;
    return {
        // 播放器初始化
        init: function (_player, config) {
            this.initVolume(config.currentVolume);
            this.setPlayer(_player);
            // 更换播放源地址
            this.switchSrc();
            // 渲染播放列表
            this.renderingVideoList();
            /**
             * 因为在开始做的时候，没有考虑到全屏的时候弹幕的输入，
             * 所以在视频全屏的时候，重新定义了一个弹幕输入组件。
             * 其实在正常播放的时候和全屏播放的时候应该公用一个弹幕输入组件。
             * 所以说现在的这种做法不好，但是又不想再去修改代码，将就一下。
             * 
             * 不管是在全屏的时候还是在正常播放的时候，只要有弹幕组件的相关操作，那么这两个状态下，
             * 弹幕组件的状态应该保持一致。
             * 通过观察发现，两个弹幕组件操作的应该是相同的数据源，只要数据源发生改变，状态也会发生改变
             * 类似与vue源码中Object.defineProperty操作
             * 故采用这种方式，实现两个弹幕组件的状态共享
            */
            // 共享数据对象响应式化
            toolUtil.observe(shareData);
            // 设置选中的头像元素(默认第一个选中)
            this.setAvatarDom(domSet.avatars[0].firstElementChild.firstElementChild);

        },
        // 设置选中的头像元素
        setAvatarDom: function (dom) {
            avatar = dom;
        },
        // 获取选中的头像元素
        getAvatarDom: function () {
            return avatar;
        },
        // 配置初始值声音大小
        initVolume(currentVolume) {
            /**
             * 其实这里是很有意思的一个地方
             * 那么就是要考虑number的类型和值的问题
             * 如果没有设置初始值就默认值50
             * 但是设置了不是number类型，那么直接给播放器设置该值
             * 就会出现错误，导致程序不能继续执行下去
             * 这种错误是我们能预料到的
             * 所以这里就要进行错误捕获，保证即使输入错误的值，也能保证程序的运行。（
             *  因为单独因为一个声音值的问题，就终端了程序的运行，这对用户来说是不友好的
             * ）；
             * 其实上述错误，应该用不到抛出错误，判断一下number的值和类型，在处理一下给一个默认值也就可以解决，
             * 但是，这么一想，你要用这个东西就要按照我的标准来。（哈哈）
             * 我们知道，不同浏览器对相关的错误显示的方式不一样，
             * 所以我们这里采用自定义错误类型，方便在不同浏览器中达到一致的错误显示信息（let's go!）
             * 为了看效果 可以在init方法的时候，传入的currentVolume类型可以改变一下。
            */
            currentVolume = currentVolume || 50;
            // 自定义错误类型
            var NumberError = function (message) {
                this.message = message;
            };
            // 使用原型链继承，保证可以正确的抛出相关错误 (Error是js中所有错误类型的基类)
            NumberError.prototype = new Error();
            try {
                if (typeof currentVolume !== 'number') {

                    // 不要抛出中文错误提示信息（英语差将就一下）;
                    throw new NumberError('提示: currentVolume有值则必须是number类型');
                }
                // 范围检查
                else {
                    if (!(currentVolume >= 0 && currentVolume <= 100)) {
                        throw new NumberError('提示: currentVolume的取值范围为[0,100]');
                    }
                    this.setVolume(currentVolume / 100);
                }



            } catch (err) {

                console.error(err.message);
                // 采用默认音量
                this.setVolume(50 / 100)
            }

        },
        // 渲染播放列表
        renderingVideoList: function () {
            /**
             * 使用优化技巧1
            */
            var htmlStr = '',
                li = '',
                videoList = domSet.videoList;
            videoList.innerHTML = '';
            for (var i = 0, len = playList.length; i < len; i++) {
                /**
                 * 使用优化技巧2
                */
                /**
                 * 八卦一下
                 * == 与 === 的区别
                 * ==会把变量进行类型的静默转化，
                 * ===不会进行变量的类型转化
                 * 所以推荐使用===
                 * 因为可以避免类型错误（typeError），在一些判断中尤其方便（自己脑补）
                */
                // 这里使用playerIndex（当前播放列表）是为了以后新增播放源，重新入渲染页面提供了便利
                if (i === playerIndex) {
                    li = "<li class='active' data-index=" + i + ">" + "<span></span>" + playList[i].singer + "-" + playList[i].name + "</li>";
                }
                else {
                    li = "<li  data-index=" + i + ">" + "<span></span>" + playList[i].singer + "-" + playList[i].name + "</li>";
                }
                htmlStr += li;
                // videoList.innerHTML = "<ul>" + htmlStr + "</ul>"; //避免！！！
            }
            videoList.innerHTML = "<ul>" + htmlStr + "</ul>";
        },
        // 获取弹幕组件共享数组对象
        getShareData: function () {
            return shareData;
        },
        // 设置播放器实例
        setPlayer: function (_player) {
            player = _player;
            // 通过欺骗用户眼睛 获取相应的dom元素的状态值
            domSet.playerVolumeRange.classList.add('active');
            domSet.playerControls.classList.add('active');
            domPros.volumeBtnCh = domSet.volumeBtn.clientHeight;
            domPros.volumeRangeCh = domSet.volumeRange.clientHeight;
            domSet.playerVolumeRange.classList.remove('active');
            domSet.playerControls.classList.remove('active');
            // 欺骗完成


            toolUtil.setVolumeComponentState();
            player.src = playList[playerIndex].src;
        },
        // 获取播放器实例
        getPlayer: function () {
            return player;
        },
        // 设置当前播放的序号
        setPlayerIndex: function (index) {
            playerIndex = index;
            // 更换播放源地址
            this.switchSrc();
        },
        // 获取当前播放的序号
        getPlayerIndex: function () {
            return playerIndex;
        },
        // 获取播放列表的长度
        getPlayListLen: function () {
            return playList.length;
        },
        switchSrc: function () {
            player.src = playList[playerIndex].src;
            domSet.poinerPlayer.src = playList[playerIndex].src;
            // 修改当前媒体显示信息
            domSet.videoInfo.innerHTML = playList[playerIndex].singer + "-" + playList[playerIndex].name;
        },
        // 获取声音值
        getVolume: function () {
            return volume;
        },
        // 设置音量
        setVolume: function (number) {
            volume = number;
        },
        // 播放暂停
        play_paused: function () {
            player.paused && (player.play(), true) || player.pause();
        },
        // 设置视频播放倍数
        setPlayBackrate: function (_playbackRate) {
            player.playbackRate = _playbackRate;
        },

        // 获取当前媒体的总播放时间
        getDuration: function () {
            return duration;
        },
        setDuration: function (_duration) {
            duration = _duration;
        }
    }
})();

/**
 * 工具函数的的封装（
 * 公用函数
 * 逻辑函数）
 * 减少全局变量的添加
*/
var toolUtil = (function () {
    return {
        /**
         * 由于该例子涉及到很多元素的display元素的修改
         * 封装函数，实现代码复用
         * */
        setDomDisplay: function (element, attr) {
            element.style.display = attr;
        },
        // 全屏方法 （element为要实现全屏的元素）
        requestFullScreen: function (element) {
            // 判断各种浏览器，找到正确的方法
            var requestMethod = element.requestFullScreen || //W3C
                element.webkitRequestFullScreen || //FireFox
                element.mozRequestFullScreen || //Chrome等
                element.msRequestFullScreen; //IE11
            if (requestMethod) {
                requestMethod.call(element);
            } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        },
        // 退出全屏
        exitFull: function () {
            // 判断各种浏览器，找到正确的方法
            var exitMethod = document.exitFullscreen || //W3C
                document.mozCancelFullScreen || //FireFox
                document.webkitExitFullscreen || //Chrome等
                document.webkitExitFullscreen; //IE11
            if (exitMethod) {
                exitMethod.call(document);
            } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        },
        // 检查是否处于全屏状态
        checkFull: function () {
            //使用html5中的API判断是否全屏(返回当前全屏的元素)
            var FullEl = document.fullscreenElement ||
                document.msFullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement;

            //若是不支持Html5中的API，可以使用以最原始的判断方式，但需要将页面的滚动条去掉
            if (FullEl === null) {
                return this.isFullscreenForNoScroll();
            }

            return true;
        },
        // 弹幕组件观察响应式数据
        observe: function (obj) {
            for (var prop in obj) {
                this.definePropertyRect(obj, prop, obj[prop]);
            }
        },
        // 弹幕组件共享数据
        definePropertyRect: function (data, key, val) {
            var playerBarrage = [].slice.call(domSet.playerBarrage);
            Object.defineProperty(data, key, {
                get: function () {
                    return val;
                },
                set: function (_val) {
                    if (key === 'inputValue') {
                        if (val !== _val) {
                            val = _val;
                            // 弹幕更新，同步两个弹幕组件的弹幕
                            playerBarrage.forEach(function (item) {
                                var input = item.lastElementChild.children[1];
                                input.value = val;
                            })
                        }
                        return;
                    }
                    // 打开弹幕
                    if (_val) {
                        playerBarrage.forEach(function (item) {
                            toolUtil.setDomDisplay(item.firstElementChild, 'none');
                            toolUtil.setDomDisplay(item.children[1], 'block');
                        });
                        // canvas清屏
                    }
                    // 关闭弹幕
                    else {
                        playerBarrage.forEach(function (item) {
                            toolUtil.setDomDisplay(item.firstElementChild, 'block');
                            toolUtil.setDomDisplay(item.children[1], 'none');
                        });
                        // canvas绘制
                    }

                }
            })
        },
        /**
            * 支持无滚动条的页面以 Fullscreen api启动的全屏 或是 按f11启动的全屏
            * 不支持有滚动条的页面
            * @returns {boolean}
        */
        isFullscreenForNoScroll: function () {
            /**
             * 使用优化技巧1和优化技巧3
            */
            var explorer = window.navigator.userAgent.toLowerCase(),
                screen = window.screen;
            if (explorer.indexOf('chrome') > 0) {//webkit
                if (document.body.scrollHeight === screen.height && document.body.scrollWidth === screen.width) {
                    return true;
                }
                return false;
            } else {//IE 9+  fireFox
                if (window.outerHeight === screen.height && window.outerWidth === screen.width) {
                    return true;
                }
                return false;
            }
        },

        getElementLeft: function (element) {
            /**
             * 使用优化技巧1
            */
            var actualLeft = element.offsetLeft,
                current = element.offsetParent;
            while (current) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            return actualLeft;
        },
        // 获取元素相对于窗口的顶部的偏移量
        getElementTop: function (element) {
            /**
            * 使用优化技巧1
           */
            var actualTop = element.offsetTop,
                current = element.offsetParent;
            while (current) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            return actualTop;
        },
        // 获取例如 00:00类型的时间字符串
        getTime: function (time) {
            /**
             * 使用优化技巧1
            */
            var hour = parseInt((time) / 3600),
                minute = parseInt((time % 3600) / 60),
                second = Math.ceil(time % 60),
                timeStr = '';
            second < 10 && (second = '0' + second);
            second === 60 && (minute += 1, second = '00');
            timeStr = timeStr + second;

            minute < 10 && (minute = '0' + minute);
            minute === 60 && (hour += 1, minute = '00');


            if (hour > 0) {
                hour < 10 && (hour = '0' + hour);
                timeStr = hour + ':' + timeStr;
            }
            // 逗号操作符  对它的每个操作数求值（从左到右），并返回最后一个操作数的值。
            return (timeStr = minute + ':' + timeStr, timeStr);
        },
        // dom元素计算样式的兼容函数
        getStyle: function (obj, attr) {
            return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj)[attr];
        },
        // 改变播放器当前进度
        moveProgress: function (e) {
            /**
            * 使用优化技巧1
           */
            var event = EventUtil.getEvent(e),

                totalOffsetleft = toolUtil.getElementLeft(domSet.customProgress),
                customProgressCw = domPros.customProgressCw,
                // 范围限制
                left = Math.min(customProgressCw, Math.max(0, event.clientX - totalOffsetleft)),
                _percentage = left / customProgressCw;

            toolUtil.playerProgressComponentChange(_percentage, left);
            // 调整视频的播放 (范围限制)
            playerUtil.getPlayer().currentTime = left / customProgressCw * playerUtil.getDuration();
            toolUtil.pointerMove(e);
        },
        // 进度条指针移动
        pointerMove: function (e) {
            /**
             * 使用优化技巧1
            */
            var event = EventUtil.getEvent(e),
                // 获取鼠标相对于当前元素的位置
                totalOffsetleft = toolUtil.getElementLeft(domSet.customProgress),
                customProgressCw = domPros.customProgressCw,

                // 范围限制
                left = Math.min(customProgressCw, Math.max(0, event.clientX - totalOffsetleft));
            // 显示预览小窗口
            domSet.pointerVideo.classList.add('active');
            domSet.progressPointer.style.left = left + "px";
            // 设置实时预览小窗口显示的内容（不建议这种方式，感觉很卡，我还能想到的是，用canvas来弄，有兴趣自己琢磨）
            var currentTime = (left / customProgressCw * playerUtil.getDuration()).toFixed(2);
            domSet.poinerPlayer.currentTime = currentTime;
            // 设置预览小窗口所对应的时间
            domSet.pointerVideoCurrent.innerHTML = toolUtil.getTime(currentTime);
            // 设置预览小窗口的位置
            var middleWidth = domSet.poinerPlayer.clientWidth / 2;

            left < middleWidth && (domSet.pointerVideo.style.left = 0 + "px", true)
                || (middleWidth <= left && left <= customProgressCw - middleWidth) && (domSet.pointerVideo.style.left = left - middleWidth + 'px', true)
                || (domSet.pointerVideo.style.left = customProgressCw - middleWidth * 2 + 'px')

        },

        // 声音组件相关变化
        playerVolumeComponentChange: function (e) {
            /**
             * 使用优化技巧1
            */
            var event = EventUtil.getEvent(e),
                // 获取当前元素距离窗口顶部的偏移量
                totalOffsetTop = toolUtil.getElementTop(domSet.volumeRange),
                _top = event.clientY - totalOffsetTop,
                volumeRangeCh = domPros.volumeRangeCh;
            // 变化值的区域限制
            _top = Math.min(volumeRangeCh, Math.max(0, _top));
            // 保存当前的信息
            playerUtil.setVolume((volumeRangeCh - _top) / volumeRangeCh);
            // 设置声音组件的状态
            toolUtil.setVolumeComponentState()

        },
        setVolumeComponentState: function () {
            var volume = playerUtil.getVolume();
            // 调整拖拽按钮位置
            domSet.volumeBtn.style.top = domPros.volumeRangeCh * (1 - volume) - domPros.volumeBtnCh / 2 + 'px';
            // 调整当前声音显示高度
            domSet.volumeRange.firstElementChild.style.height = domPros.volumeRangeCh * volume + '%'
            // 修改当前声音显示
            domSet.volumeNumber.innerHTML = parseFloat((volume * 100).toFixed(2)) + '%';
            // 调整播放器声音大小
            playerUtil.getPlayer().volume = volume;
        },
        // 播放器进度条组件变化
        playerProgressComponentChange: function (percentage, left) {
            var customProgressCw = domPros.customProgressCw;
            domSet.progressCurrent.style.width = percentage * 100 + '%';
            var progressBtn = domSet.progressBtn;
            // 1.当left小于等于progressbtn的clientWidth/2的时候
            // 2.当left大于等于总进入条的clientWidth-progressbtn.clientWidht的时候
            left <= domPros.progressBtnCw / 2 && (progressBtn.style.left = 0 + 'px', true)
                || (left >= left - domPros.progressBtnCw) && (progressBtn.style.left = left - domPros.progressBtnCw / 2 + 'px', true)
                || (progressBtn.style.left = customProgressCw - domPros.progressBtnCw + 'px');

        },


    }
})();



// 视频播放器初始化
playerUtil.init(document.querySelector("#player"), {
    currentVolume: 30
});
/**
 * 播放器player的相关操作
*/
// 视频可以播放的时候
EventUtil.addHandler(playerUtil.getPlayer(), 'canplay', function () {
    playerUtil.setDuration(this.duration);
    // 设置总的播放时间
    domSet.playerDuration.innerHTML = toolUtil.getTime(playerUtil.getDuration());
});
// 监听是否正在播放，修改播放与暂停的icon(初始时，用户直接点击进度条播放视频，但是icon没有改变的bug修复)
EventUtil.addHandler(playerUtil.getPlayer(), 'playing', function () {
    // 防止重复修改元素的样式，导致浏览器多次重绘,修改样式的时候需要对当前显示的icon进行判断
    var attrVal = toolUtil.getStyle(domSet.playPaused.lastElementChild, 'display');
    // 如果当前显示的暂停icon就修改
    attrVal === 'none' && (
        toolUtil.setDomDisplay(domSet.playPaused.firstElementChild, 'none'),
        toolUtil.setDomDisplay(domSet.playPaused.lastElementChild, 'block')
    )

});
// 监听播放进度
EventUtil.addHandler(playerUtil.getPlayer(), 'timeupdate', function () {
    domSet.palyerCurrentTime.innerHTML = toolUtil.getTime(this.currentTime);
    // 播放器进度组件相关变化
    var _percentage = (this.currentTime / playerUtil.getDuration()),
        _left = _percentage * domSet.customProgress.clientWidth;
    toolUtil.playerProgressComponentChange(_percentage, _left);

});
// 监听当前媒体播放完 (播放下一曲)
EventUtil.addHandler(playerUtil.getPlayer(), 'ended', function () {
    var index = playerUtil.getPlayerIndex(),
        len = playerUtil.getPlayListLen(),
        _index = (++index) % len;
    playerUtil.setPlayerIndex(_index);
});

// 播放器监听声音的变化（修改icon）
EventUtil.addHandler(playerUtil.getPlayer(), 'volumechange', function () {

    if (this.volume === 0) {
        toolUtil.setDomDisplay(domSet.volumeIcons[0], 'none');
        toolUtil.setDomDisplay(domSet.volumeIcons[1], 'inline-block');
        return;
    }
    // 加上判断条件 防止浏览器多次重绘
    var attrVal = toolUtil.getStyle(domSet.volumeIcons[1], 'display');
    attrVal !== 'none' && (
        toolUtil.setDomDisplay(domSet.volumeIcons[1], 'none'),
        toolUtil.setDomDisplay(domSet.volumeIcons[0], 'inline-block')
    )
});
// 视频画中画切换
EventUtil.addHandler(domSet.pipBtn, 'click', function () {
    playerUtil.getPlayer().requestPictureInPicture();
});
// 监听进入画中画 可以做些什么
EventUtil.addHandler(playerUtil.getPlayer(), 'enterpictureinpicture', function (e) {
    var event = EventUtil.getEvent(e),
        pipWindow = event.pictureInPictureWindow;
    // pipWindow就是一个PictureInPictureWindow对象
    // 我们可以绑定resize事件
    pipWindow.addEventListener('resize', function () {
        // pipWindow.width就是小视频窗口的宽度
        // pipWindow.height就是小视频窗口的高度
        // 可以设置这width，height以此来修改窗口大小
        console.log(pipWindow.width);
        console.log(pipWindow.height);
    });
});
// 监听离开画中画
EventUtil.addHandler(document, 'leavepictureinpicture', function () {
    /**
     * 因为离开画中画模式，视频始终会暂停
     * 出现了在画中画模式中播放视频的时候，退出画中画
     * 此时视频暂停播放，但是此时视频播放器显示的是播放按钮
     * 所以在此修复改bug
    */
    toolUtil.setDomDisplay(domSet.playPaused.firstElementChild, 'block');
    toolUtil.setDomDisplay(domSet.playPaused.lastElementChild, 'none');

});

/**
 *  实时预览小窗口操作
*/
// 阻止预览小窗口的右键默认事件的执行
EventUtil.addHandler(domSet.poinerPlayer, 'contextmenu', function (e) {
    var event = EventUtil.getEvent(e);
    EventUtil.preventDefault(event);
});
// 实时预览指针定位和窗口显示及其定位
EventUtil.addHandler(domSet.customProgress, 'mousemove', function (e) {
    toolUtil.pointerMove(e);
    /**
    * 由于progressBtn的出现是有一定限制条件的（鼠标移入到进度条才会出现），
    * 同时在进度条操作的时候，为了用户体验是给document注册的mousemove事件，
    * 综上两个原因，会出现极端情况下，progress.clientWdith为0（当其隐藏的时候）
    * 会导致视频播放亲进度条组件相关状态变化无法控制
    * 所以在按钮按下的时候，去获取其clientWidth，用于变量保存，以后读取该变量
    * 就可以准确完成进度条组件相关状态的变更。
    * 同时，在第一次获取之后，就不需要在通过progressbtn去获取其clientWidth（
    *  因为通过dom元素去获取其所对应的属性值所消耗的时间大于直接从变量读取值的时间，
    *  性能的小优化
    * ）
   */
    domPros.progressBtnCw <= 0 && (domPros.progressBtnCw = this.firstElementChild.clientWidth);
});


/**
 * 声音组件的相关操作
*/
// 声音按钮按下
EventUtil.addHandler(domSet.volumeBtn, 'mousedown', function () {
    var volumeRangeContainer = domSet.volumeRangeContainer;
    EventUtil.addHandler(volumeRangeContainer, 'mousemove', toolUtil.playerVolumeComponentChange);
    EventUtil.addHandler(volumeRangeContainer, 'mouseup', function () {
        EventUtil.removeHandler(volumeRangeContainer, 'mousemove', toolUtil.playerVolumeComponentChange)
    });
    EventUtil.addHandler(volumeRangeContainer, 'mouseleave', function () {
        EventUtil.removeHandler(volumeRangeContainer, 'mousemove', toolUtil.playerVolumeComponentChange)
    })
});
// 点击调整声音
EventUtil.addHandler(domSet.volumeRange, 'click', toolUtil.playerVolumeComponentChange);
// 点击静音或者恢复之前的声量
EventUtil.addHandler(domSet.volumeIconsContainer, 'click', function (e) {
    var event = EventUtil.getEvent(e),
        target = EventUtil.getTarget(event),
        state = target.dataset.state;
    if (!state) { return }
    toolUtil.setDomDisplay(target, 'none');
    if (state === 'sound') {
        toolUtil.setDomDisplay(target.nextElementSibling, 'inline-block');
        // 调整拖拽按钮位置
        domSet.volumeBtn.style.top = domSet.volumeRange.clientHeight - domSet.volumeBtn.clientHeight / 2 + 'px';
        // 调整当前声音显示高度
        domSet.volumeRange.firstElementChild.style.height = 0 + '%'
        // 修改当前声音显示
        domSet.volumeNumber.innerHTML = 0 + '%';
        // 调整播放器声音大小
        playerUtil.getPlayer().volume = 0;
        return;
    }
    toolUtil.setDomDisplay(target.previousElementSibling, 'inline-block');
    toolUtil.setVolumeComponentState();
});









/**
 * 播放进度条组件相关操作
*/
// 点击播放器进度条，更改播放器进度条组件状态
EventUtil.addHandler(domSet.customProgress, 'click', toolUtil.moveProgress);
// 进入进度条区域，进度条激活
EventUtil.addHandler(domSet.progress, 'mouseenter', function () {
    this.firstElementChild.classList.add('active');
    // 设置custonProgress的clientWidth
    domPros.customProgressCw = domSet.customProgress.clientWidth;
});
// 离开进度条区域， 进度条失活
EventUtil.addHandler(domSet.progress, 'mouseleave', function () {
    this.firstElementChild.classList.remove('active');
    // 预览小窗口消失
    domSet.pointerVideo.classList.remove('active');
});
// 进度按钮按下
EventUtil.addHandler(domSet.progressBtn, 'mousedown', function () {
    // 使用doucment注册mousemove事件，优化用户体验
    EventUtil.addHandler(document, 'mousemove', toolUtil.moveProgress);
    EventUtil.addHandler(document, 'mouseup', function () {
        EventUtil.removeHandler(document, 'mousemove', toolUtil.moveProgress);
        // 预览小窗口消失
        domSet.pointerVideo.classList.remove('active');

    });

});







/**
 * 播放器顶级容器操作部分
*/
// 进入播放器区域，显示播放器控制组件
EventUtil.addHandler(domSet.playerContainer, 'mouseenter', function () {

    domSet.playerControls.classList.add('active');
});
// 离开播放器区域，隐藏播放器控制组件
EventUtil.addHandler(domSet.playerContainer, 'mouseleave', function () {
    domSet.playerControls.classList.remove('active')
});

// 事件委托 优化性能 （播放，暂停部分的事件处理）
EventUtil.addHandler(domSet.playPaused, "click", function (e) {
    var event = EventUtil.getEvent(e),
        target = EventUtil.getTarget(event),
        state = target.dataset.state;

    // 使用逻辑操作符优化性能 下面注释为之前的写法
    !!state && (
        toolUtil.setDomDisplay(target, 'none'),
        state === 'play' && (toolUtil.setDomDisplay(target.nextElementSibling, 'block'), true)
        || toolUtil.setDomDisplay(target.previousElementSibling, 'block'),
        playerUtil.play_paused()
    );
    // if (!state) { return; }
    // toolUtil.setDomDisplay(target, 'none');
    // if (state === 'play') {
    //     // 点击播放
    //     toolUtil.setDomDisplay(target.nextElementSibling, 'block');
    // }
    // // 点击暂停
    // else {
    //     toolUtil.setDomDisplay(target.previousElementSibling, 'block');
    // }
    // playerUtil.play_paused();
})
// 事件委托 优化性能 （视频播放倍速的控制）
EventUtil.addHandler(domSet.playBackRate, "click", function (e) {
    var event = EventUtil.getEvent(e),
        target = EventUtil.getTarget(event),
        state = target.dataset.state;
    if (!state) {
        return;
    }
    // 设置视频播放倍数
    playerUtil.setPlayBackrate(parseFloat(state));
    // 修改倍数页面显示
    var lis = [].slice.call(target.parentNode.children);
    lis.forEach(element => {
        element.classList.remove('active');
    });
    target.classList.add('active');
});


/**
 * 选择弹幕头像相关操作
*/
// 切换弹幕头像
[].slice.call(domSet.avatars).forEach(function (avatar) {
    EventUtil.addHandler(avatar, 'click', function (e) {
        var event = EventUtil.getEvent(),
            target = EventUtil.getTarget(event),
            state = target.dataset.state;
        if (!state) { return };
        [].slice.call(target.parentNode.children).forEach(function (child) {
            child.classList.remove('active');
        });
        target.classList.add('active');
        var src = target.src;
        [].slice.call(domSet.barrageAvatar).forEach(function (_avatar) {

            _avatar.firstElementChild.src = src;
        });
        // 设置选中的头像元素
        playerUtil.setAvatarDom(target);
    });

});


/**
 * 全屏切换相关操作
*/
/**
 * 因为video元素全屏导致，canvas画布无论这样都无法覆盖在video上。所以使用原生的
 * video全屏，会导致在全屏模式下弹幕隐藏不见的bug（video特性所致）
 * 于是换一个思路，我们把存放video元素的父元素全屏，模拟video全屏，实现全屏效果
 * 
*/
// 网页全屏操作
EventUtil.addHandler(domSet.fullscreenBtn, 'click', function (e) {
    var event = EventUtil.getEvent(e),
        target = EventUtil.getTarget(event),
        state = target.dataset.state;
    if (!state) { return }

    if (state === 'full') {
        // 处于视频全屏的时候不能进入网页全屏
        if (!toolUtil.checkFull()) {
            barrageCanvas.deleteFinishBarrage();
            target.previousElementSibling.innerHTML = "退出全屏";
            toolUtil.requestFullScreen(document.documentElement);
            toolUtil.setDomDisplay(target.nextElementSibling, 'inline-block');
            toolUtil.setDomDisplay(target, 'none');
        }
    }
    else {
        barrageCanvas.deleteFinishBarrage();
        toolUtil.exitFull();
        target.previousElementSibling.previousElementSibling.innerHTML = '网页全屏';
        toolUtil.setDomDisplay(target.previousElementSibling, 'inline-block');
        toolUtil.setDomDisplay(target, 'none');
    }
});


// 视频全屏操作
EventUtil.addHandler(domSet.videoFullBtn, 'click', function (e) {
    var event = EventUtil.getEvent(e),
        target = EventUtil.getTarget(event),
        state = target.dataset.state;
    if (!state) { return }

    if (state === 'full') {
        // 处于网页全屏的时候 不能进入视频全屏

        if (!toolUtil.checkFull()) {
            /**
             * 在进行窗口变化的时候，
             * 应该在窗口变化之前，判断并移除已经完成的弹幕
             * 不能在变化完成以后，在进行该操作，不然会得到错误的结果
            */
            barrageCanvas.deleteFinishBarrage();
            target.previousElementSibling.innerHTML = '退出';
            toolUtil.requestFullScreen(domSet.playerContainer);
            toolUtil.setDomDisplay(target.nextElementSibling, 'inline-block');
            toolUtil.setDomDisplay(target, 'none');
            // 显示全屏弹幕输入组件
            toolUtil.setDomDisplay(domSet.fullScreenBarrage, 'flex');
        }

    }

    else {
        barrageCanvas.deleteFinishBarrage();
        toolUtil.exitFull();
        toolUtil.setDomDisplay(target.previousElementSibling, 'inline-block');
        target.previousElementSibling.previousElementSibling.innerHTML = '全屏';
        toolUtil.setDomDisplay(target, 'none');
        // 隐藏全屏弹幕输入组件
        toolUtil.setDomDisplay(domSet.fullScreenBarrage, 'none');
    }

});
/**
 * 1.由于避免增加多个变量，我没有给哪种全屏加上特殊的标志
 * 所以全屏变化的时候，同时修改网页全屏和全屏相关的icon的显示
 * 虽然这样子或造成浏览器的多一次重绘，影响性能（其实问题不大了，哈哈）
 * 
 * 2.因为自定义进入条customProgress的宽度是100%，在全屏的时候，需要重新获取该clientWidth，
 * 以此确保，播放器进度条控制组件相关状态能正常改变
*/
// 监听全屏改变事件 (chrom下，其他浏览器下面的没有写 可以自己加上去)
EventUtil.addHandler(window, 'webkitfullscreenchange', function () {
    barrageCanvas.closeBarrage();
    var timer = barrageCanvas.getTimer();
    if (timer) { clearTimeout(timer); }
    canvasUtil.getCtx().clearRect(0, 0, drawing.width, drawing.height);
    // 由于进入全屏和退出全屏的时候，窗口变化需要一段时间，经测试时间不会超过1000ms
    // 所以在一秒之后在执行函数，确保获取到准确的dom元素的属性
    barrageCanvas.setTimer(
        setTimeout(function () {
            barrageCanvas.newRendingBarrageScreen.call(barrageCanvas);
        }, 1000)
    );

    // 退出了全屏
    if (!toolUtil.checkFull()) {

        // 两个全屏按钮icon的显示的切换
        domSet.fullscreenBtn.firstElementChild.innerHTML = '网页全屏';
        toolUtil.setDomDisplay(domSet.fullscreenBtn.children[1], 'inline-block');
        toolUtil.setDomDisplay(domSet.fullscreenBtn.lastElementChild, 'none');

        domSet.videoFullBtn.firstElementChild.innerHTML = '全屏';
        toolUtil.setDomDisplay(domSet.videoFullBtn.children[1], 'inline-block');
        toolUtil.setDomDisplay(domSet.videoFullBtn.lastElementChild, 'none');

    }
    else {
        /**
         * 这里有一个bug
         * 原因是在全屏还没有实现完成之前（窗口大小还没有完成之前），就保存了数据，导致数据不精确
         * 例如 视频全屏的时候customProgress.clientWidth;应为1440
         * 但是在这里获取之后变为1363，会导致视频全屏的时候，改变视频进度
         * 视频进入拖拽按钮后往后移动少许，并且视屏当前播放位置也会往后移动少许
         * （bug已经修复 写在这里是为了惊醒自己，类似于这种操作以后要注意）
         * 解决办法就是在进入自定义滚动条容器的时候，去获取相关属性值，
         * 因为窗口在变化完成之后，这个时候doucment才会重新聚焦
         * 保证一进入区域，就会获取到正确的值。
        */
        //   domPros.customProgressCw = customProgress.clientWidth;

    }
});


/**
 * 右侧辅助功能相关操作
*/
// 是否开启弹幕头像
EventUtil.addHandler(domSet.switchAvatar, 'change', function (e) {
    var event = EventUtil.getEvent(e),
        target = EventUtil.getTarget(event),
        checked = target.checked;
    barrageCanvas.setShowAvatar(checked);
});
// 是否悬浮弹幕
EventUtil.addHandler(domSet.switchCurour, 'change', function (e) {
    var event = EventUtil.getEvent(e),
        target = EventUtil.getTarget(event),
        checked = target.checked;
    barrageCanvas.setSuspension(checked);
});


/**
 * requestAnimationFrame的兼容
 * 
 * 这里我又要啰嗦几句
 * 查阅资料可知如下信息：
 * 首先了解这个知识点
 * 图像在屏幕上更新的速度，也即屏幕上的图像每秒钟出现的次数，它的单位是赫兹(Hz)。 对于一般笔记本电脑，这个频率大概是60Hz，
 * 所以一般电脑只间隔了16.7ms(1000/60≈16.7)就更新一下页面。
 * 
 * 由于setIntervald的问题（就压根儿不考虑使用它）
 * setTimeout是一个定时器，但是它的执行时间不准确（因为它要在主进程中所有同步任务执行完毕之后
 * 才会在异步队列中取出在主进程中执行，所以导致你设置的执行时间不一定会在那个时间执行
 * 还有刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的屏幕刷新频率可能会不同，也会导致上述问题（也就是所说的掉帧）
 * ）
 * 在看一下 requestAnimationFrame（请求动画帧）,最大的优势是由系统来决定回调函数的执行时机。
 * 具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，
 * 如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，
 * requestAnimationFrame的步伐跟着系统的刷新步伐走。
 * 它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。
 * 除此之外它还有一下好处
 * 1.CPU节能：当页面被隐藏或最小化时，
 * setTimeout 仍然在后台执行动画任务，
 * 由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。
 * 而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，
 * 因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。
 * 2.函数节流：在高频率事件(resize,scroll等)中，
 * 为了防止在一个刷新间隔内发生多次函数执行，
 * 使用requestAnimationFrame可保证每个刷新间隔内，
 * 函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。
 * 一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。
 * 
 * 但是按照前端定理来说，好用的东西一定会有兼容行的问题，下面给出兼容写法
*/
(function () {
    var lastTime = 0,
        vendors = ['webkit', 'moz'];
    /**
     * 注意这个for循环中的条件，是一个骚操作
     * 当requestAnimationFrame可以用的时候就什么都不做
     * 不可用的时候 就用不同浏览器中的实现方法，如果第一个可以用，那么for循环也不会在执行了
     * 直到最后一个
    */
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    /**
     * 如果上面操作过后，还是不支持，那么只能用setTimeout来实现了
     * 打死不用setInterval
    */
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
})();







/**
 *  弹幕组件操作部分
*/
// 事件委托 优化性能 （弹幕开关，发送弹幕部分的事件处理）
[].slice.call(domSet.playerBarrage).forEach(function (item) {
    var shareData = playerUtil.getShareData();
    // 当弹幕输入框有值的时候，弹幕发送按钮激活
    EventUtil.addHandler(item.lastElementChild.children[1], 'input', function () {
        if (this.value.trim()) {
            this.nextElementSibling.classList.add('active');
        }
        else {
            this.nextElementSibling.classList.remove('active');
        }
        // 更新输入框的值
        shareData.inputValue = this.value.trim();
    });
    // 发送弹幕

    EventUtil.addHandler(item, 'click', function (e) {
        var event = EventUtil.getEvent(e),
            target = EventUtil.getTarget(event),
            state = target.dataset.state;
        if (!state) { return }
        switch (state) {
            // 关闭弹幕
            case 'open': {
                shareData.barrageBtnState = true;
                barrageCanvas.setOpenBarrage(true);
                break;
            }
            // 开启弹幕
            case 'close': {
                shareData.barrageBtnState = false;
                barrageCanvas.setOpenBarrage(false);
                break;
            }
            // 点击发送按钮，发送弹幕
            case 'send': {
                var value = item.lastElementChild.children[1].value;
                if (!value.trim()) {
                    return;
                }
                target.classList.remove('active');
                // 增加弹幕
                barrageCanvas.addNewBarrage(new Barrage(value, playerUtil.getAvatarDom()));
                shareData.inputValue = '';
                break;
            }
        }
    });
});





/**
 * 播放列表的相关操作
*/
// 点击切换播放
EventUtil.addHandler(domSet.videoList, 'click', function (e) {
    var event = EventUtil.getEvent(e),
        target = EventUtil.getTarget(event),
        index = target.dataset.index;
    if (!index) { return };
    // 当前播放序号更新
    playerUtil.setPlayerIndex(parseInt(index));
    // 修改播放列表样式
    [].slice.call(target.parentNode.children).forEach(function (child) {
        child.classList.remove('active');
    });
    target.classList.add('active');
})



/**
 * 弹幕操作部分
*/
// 阻止右键菜单显示
EventUtil.addHandler(domSet.drawing, 'contextmenu', function (e) {
    var event = EventUtil.getEvent(e);
    EventUtil.preventDefault(event);
});
EventUtil.addHandler(domSet.drawing, 'mousemove', function (e) {
    var event = EventUtil.getEvent(e),
        totalOffsetleft = toolUtil.getElementLeft(this),
        totalOffsetTop = toolUtil.getElementTop(this),
        // 鼠标在画布中移动的相对位置
        moveTop = event.clientY - totalOffsetTop,
        moveLeft = event.clientX - totalOffsetleft,
        barrageLists = barrageCanvas.getClassificationBarrage(),
        ctx = canvasUtil.getCtx();
    barrageLists.forEach(function (category) {
        category.list.forEach(function (barrage) {
            if (
                moveLeft > barrage.moveX && moveLeft < barrage.moveX + ctx.measureText(barrage.text).width
                && moveTop > category.moveY && moveTop < category.moveY + barrageCanvas.getBarrageHeight()
            ) {
                barrage.isMove = false;
            }
            else barrage.isMove = true;
        });

    })
});


/**
 * canvas工具类封装
*/
var canvasUtil = (function () {
    var ctx = null;
    return {

        // 获取画笔
        getCtx: function () {
            if (domSet.drawing.getContext) {
                ctx = domSet.drawing.getContext("2d");
            }
            return ctx;
        }
    }
})();

// 创建弹幕类 (下面的类的封装，其实就是ts中类的基本封装)
var Barrage = (function () {

    var Barrage = function (text, avatar) {
        // 弹幕文字
        this.text = text;
        // 弹幕是否移动
        this.isMove = true;
        // 弹幕X轴移动距离(默认值从画布最右边出来)
        this.moveX = domSet.drawing.clientWidth;
        this.moveY = 0;
        // 弹幕头像
        this.avatar = avatar;
        // 是否全部进入画布
        inCanvas = false;
    };
    // 判断弹幕是否全部进入画布
    Barrage.prototype.isInCanvas = function () {
        if (this.moveX <= domSet.drawing.width / 2 - canvasUtil.getCtx().measureText(this.text).width) {
            this.inCanvas = true;
        }
    }
    return Barrage;
})();
/**
 * 封装弹幕操作的方法
*/
var barrageCanvas = (function () {
    // ratio
    var ratio = window.devicePixelRatio,
        // 画布
        drawing = domSet.drawing,
        // 画笔
        ctx = canvasUtil.getCtx(),
        // 是否开启弹幕
        openBarrage = true,
        // 弹幕移动速度
        speed = 1,
        // 弹幕触发标志器
        timer = null,
        // 最后一条弹幕是加在那个分类里面的
        lastBarrageIntoIndex = 0,
        // 实际渲染弹幕列表
        classificationBarrage = [


        ],
        // 全部弹幕列表
        barrageLists = [
            new Barrage('抬头看星星，✨，为何出来的是月亮', playerUtil.getAvatarDom()),
            new Barrage('心若在，梦就在'),
            new Barrage('我真的是对你很失望啊'),
            new Barrage('嗨，就是你，我知道你正在看'),
            new Barrage('你微笑浏览，手机里的浪漫'),
            new Barrage('三年之内，神功大成'),
            new Barrage('慈母手中剑，游子身上劈。父见儿位凉，手持七匹狼'),
            new Barrage('真的是一个通过的过程，人总要学着孤独慢慢地长大'),
            new Barrage('曾经的一切，还印在我的心里面'),
            new Barrage('我说的每一个句话，你都已听不见', playerUtil.getAvatarDom()),
            new Barrage('小小的尝试'),
            new Barrage('就算你是一个过客，我也无法割舍不掉'),
            new Barrage('看啦啦啦啦啦啦啦啦啦啦啦啦'),
            new Barrage('去死吧，你你你你牛你你'),

        ],
        // 每条弹幕的高度
        barrageHeight = 0,
        // 设置弹幕可以显示多少行
        barrageLineNum = 0,
        // 是否显示弹幕头像
        showAvatar = false,
        // 弹幕是否悬浮
        suspension = false,
        // 窗口变化的时候timer
        timer = null;
    return {
        init: function () {
            // 文字显示适配
            this.textAdapter();
            // 设置弹幕高度
            this.setBarrageHeight();
            // 设置弹幕显示行数
            this.setBarrageLineNum();
            // 初始化弹幕列表
            this.initBarrageList();
            // 实际弹幕渲染列表装载弹幕
            this.setBarrageList();
            // 初始化弹幕距离左边的距离
            this.initBarrageMoveX();
            // 渲染弹幕
            this.renderingBarrage();


        },
        // 新增弹幕
        addNewBarrage: function (barrage) {
            this.closeBarrage();
            barrageLists.push(barrage);
            this.setBarrageList();
            // 设置新增弹幕的初始moveX
            this.setBarrageMoveX();
            // 渲染弹幕
            this.renderingBarrage();
        },
        // 初始化弹幕列表（弹幕分类）
        initBarrageList: function () {
            classificationBarrage = [];
            for (var i = 0; i < barrageLineNum; i++) {
                if (i === 0) {
                    var barrageItem = {
                        // moveY表示该对象下的弹幕距离顶部的距离
                        moveY: 30,
                        // list表示moveY分类下的所属弹幕
                        list: []
                    };
                }
                else {
                    var barrageItem = {
                        // moveY表示该对象下的弹幕距离顶部的距离
                        moveY: classificationBarrage[i - 1].moveY + barrageHeight + 30,
                        // list表示moveY分类下的所属弹幕
                        list: []
                    };
                }
                classificationBarrage.push(barrageItem);

            }
        },
        // 实际弹幕渲染列表装载弹幕
        setBarrageList: function () {
            /**
             * 1. 如果分类对应下的弹幕数量为0，就加入弹幕
             * 2. 如果分类对应下的弹幕数量不为0，哪个分类下的弹幕数量最少，就加入弹幕
             * 满足上面两个条件 可以实现弹幕渲染的时候，不会在垂直方向上出现断断续续的画面（就一直会从上到下渲染；
             * 所有弹幕集合中，加入一条到对应分类的弹幕集合中去，就要给一个标志，标示该弹幕已经加入过（避免重复加入）
            */

            barrageLists.forEach(function (barrage) {
                classificationBarrage.forEach(function (_barrage, index) {
                    if (!barrage.selected) {
                        if (_barrage.list.length === 0) {
                            _barrage.list.push(barrage);
                            lastBarrageIntoIndex = index;
                            barrage.selected = true;
                        }
                    }
                })
            });

            barrageLists.forEach(function (barrage) {
                // 获取弹幕最少的分类
                var _barrage = barrageCanvas.getBarrageListlow()._barrage;
                var _index = barrageCanvas.getBarrageListlow()._index;
                if (!barrage.selected) {
                    _barrage.list.push(barrage);
                    lastBarrageIntoIndex = _index;
                    barrage.selected = true;
                }
            });

        },
        // 获取弹幕最少的分类
        getBarrageListlow: function () {
            var listNum = classificationBarrage[0].list.length;
            var _index = 0;
            classificationBarrage.forEach(function (barrage, index) {

                if (barrage.list.length < listNum) {
                    listNum = barrage.list.length;
                    _index = index;
                }
            });
            return {
                _barrage: classificationBarrage[_index],
                _index: _index
            };
        },
        // 初始化弹幕距离左边的距离
        initBarrageMoveX: function () {
            classificationBarrage.forEach(function (category) {
                if (category.list.length > 1) {
                    for (var i = 0, len = category.list.length - 1; i < len; i++) {
                        for (var j = i + 1, _len = category.list.length; j < _len; j++) {
                            if (category.list[j].moveX === category.list[i].moveX) {
                                category.list[j].moveX = category.list[i].moveX + ctx.measureText(category.list[i].text).width + 50;
                            }
                        };
                    }
                }
            });


        },
        // 设置新增弹幕的初始moveX
        setBarrageMoveX: function () {
            var categoryBarrage = classificationBarrage[lastBarrageIntoIndex];
            var list = categoryBarrage.list;
            var len = list.length;
            // 如果len === 0 说明是只有一条弹幕（也就是新增的弹幕，那么moveX采用默认值);
            if (len > 1) {
                // 判断倒数第二条弹幕是否全部进入了画布区域内
                inCanvas = list[len - 2].isInCanvas();
                //没有完全进入
                if (!list[len - 2].inCanvas) {
                    list[len - 1].moveX = list[len - 2].moveX + ctx.measureText(list[len - 2]).width + 50;
                } else {
                    // 进入之后判断倒数第二条弹幕的距离画布右边距离够不够每条弹幕之间的间隔
                    // 如果够的话，新弹幕就采用默认的moveX
                    // 不够的话
                    var _width = drawing.width / 2 - list[len - 2].moveX + ctx.measureText(list[len - 2]).width;
                    if (_width < 50) {
                        list[len - 1].moveX = list[len - 2].moveX + ctx.measureText(list[len - 2]).width + 50;
                    }
                }
            }
        },
        // 弹幕文字适配
        textAdapter: function (width) {

            /**
             * 因为canvas绘画是根据px来实现渲染的
              * 所以在不同的屏幕分辨率下，会进行缩放
             * 导致绘制的文本和图像出现模糊的bug
             * 故此给下解决办法解决模糊问题.
             * 首先我们来了解一个概念
             * Window 属性 devicePixelRatio 能够返回当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率。
             * 此值也可以解释为像素大小的比率：一个 CSS 像素的大小与一个物理像素的大小的比值。
             * 简单地说，这告诉浏览器应该使用多少个屏幕的实际像素来绘制单个 CSS 像素。
            */
            // 设置画布的在页面所占位置

            width = width || domSet.drawing.clientWidth;

            drawing.style.width = width + 'px';
            drawing.style.height = drawing.clientHeight + 'px';

            // 画布实际渲染下，在当前设备下的画布区域
            drawing.width = width * ratio;
            drawing.height = drawing.clientHeight * ratio;
            // 因为更改了画布渲染区域的大小，
            // 相当于把实际渲染的东西相当于缩小了ratio倍 所以将渲染的东西放大相应的倍数，达到理想的渲染效果
            ctx.scale(ratio, ratio);

        },
        // 设置弹幕开启与否
        setOpenBarrage: function (flag) {
            openBarrage = flag;
            // 弹幕重新渲染
            flag && (this.newRendingBarrage(), true) || this.closeBarrage();
            ctx.clearRect(0, 0, drawing.width, drawing.height);
        },
        // 屏幕操作引起的弹幕重绘画
        newRendingBarrageScreen: function () {

            this.textAdapter(playerUtil.getPlayer().clientWidth);
            // 通过弹幕开关在此播放弹幕的时候，弹幕应该重新从右到左播放（所有弹幕的moveX应该恢复成默认值）
            this.setBarragePubilcMoveX();
            // 取消弹幕的选中状态
            barrageLists.forEach(function (item) {
                item.selected = false;
            });

            // 格式化实际渲染弹幕容器
            this.initBarrageList();
            // 弹幕分类
            this.setBarrageList();
            // 现在相当于初始化弹幕了（因为没有新弹幕加入的时候，默认的弹幕是经过moveX的计算了的）
            this.initBarrageMoveX();
            // 渲染弹幕
            this.renderingBarrage();
        },
        // 弹幕重新渲染（开关操作）
        newRendingBarrage: function () {
            //  关闭渲染（必须放在第一位，不然弹幕还是在移动，只是看不见，那么movex就会改变，影响后面的计算）
            this.closeBarrage();

            // 之前只要出现在画布中的弹幕（哪怕只有一点点）应该是已经完成状态,(应该移除不再显示)
            this.deleteFinishBarrage();
            // 通过弹幕开关在此播放弹幕的时候，弹幕应该重新从右到左播放（所有弹幕的moveX应该恢复成默认值）
            this.setBarragePubilcMoveX();
            // 取消弹幕的选中状态
            barrageLists.forEach(function (item) {
                item.selected = false;
            });

            // 格式化实际渲染弹幕容器
            this.initBarrageList();
            // 弹幕分类
            this.setBarrageList();
            // 现在相当于初始化弹幕了（因为没有新弹幕加入的时候，默认的弹幕是经过moveX的计算了的）
            this.initBarrageMoveX();
            // 渲染弹幕
            this.renderingBarrage();
        },
        // 删除已经完成播放的弹幕
        deleteFinishBarrage: function () {
            // 防止漏数据
            for (var i = 0; i < barrageLists.length;) {
                if (barrageLists[i].moveX < drawing.width / 2) {
                    barrageLists.splice(i, 1);

                    if (i > 0) { --i; }
                }
                else {
                    ++i;
                }
            }
        },
        // 所有弹幕设置一致的moveX
        setBarragePubilcMoveX: function () {
            /**
            * 由于懒的原因，本案例只在此处使用Duff装置技术，优化性能
            * 前提条件：一个视屏的弹幕应该算的上大数据集
            * 使用优化技巧4
           */
            var newBarrage = new Barrage(''),
                iterations = Math.floor(barrageLists.length / 8),
                leftover = barrageLists.length % 8,
                i = 0;
            if (leftover > 0) {
                do {
                    barrageLists[i++].moveX = newBarrage.moveX;
                } while (--leftover > 0);
            };
            if (iterations > 0) {
                do {
                    // 其实这一段代码就是消除循环
                    barrageLists[i++].moveX = newBarrage.moveX;
                    barrageLists[i++].moveX = newBarrage.moveX;
                    barrageLists[i++].moveX = newBarrage.moveX;
                    barrageLists[i++].moveX = newBarrage.moveX;
                    barrageLists[i++].moveX = newBarrage.moveX;
                    barrageLists[i++].moveX = newBarrage.moveX;
                    barrageLists[i++].moveX = newBarrage.moveX;
                    barrageLists[i++].moveX = newBarrage.moveX;
                } while (--iterations > 0);
            }
            // 为优化前的代码如下    
            // barrageLists.forEach(function (barrage) {
            //     barrage.moveX = newBarrage.moveX;
            // });
            // 手动解除引用，减少内存消耗(防止内存溢出)
            newBarrage = null;
        },
        // 绘制弹幕
        renderingBarrage: function () {

            if (openBarrage) {
                var barrageLen = 0;
                classificationBarrage.forEach(function (category) {
                    barrageLen += category.list.length;
                });
                if (barrageLen === 0) {
                    barrageCanvas.closeBarrage();
                    // 清楚画布
                    ctx.clearRect(0, 0, drawing.width, drawing.height);
                    console.log('关闭弹幕');
                    return;
                }
                console.log('播放弹幕');
                ctx.font = "normal small-caps bold 16px arial";
                ctx.fillStyle = "#fff";
                // 不要改动 改动之后弹幕出现位置错误（如果你知道怎样控制可以修改）
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                ctx.clearRect(0, 0, drawing.width, drawing.height);
                classificationBarrage.forEach(function (barrage) {
                    for (var i = 0; i < barrage.list.length;) {
                        var item = barrage.list[i];
                        // 保存绘制文字的属性
                        ctx.save();
                        ctx.fillText(item.text, item.moveX, barrage.moveY);
                        if (item.avatar && showAvatar) {
                            // 要绘制的头像
                            var avatar = item.avatar,
                                //绘制的头像宽度
                                avatar_width = avatar.width,
                                //绘制的头像高度
                                avatar_heigth = avatar.height,
                                //绘制的头像在画布上的位置
                                avatar_x = item.moveX - 30,
                                //绘制的头像在画布上的位置
                                avatar_y = barrage.moveY - (avatar_heigth - barrageHeight) / 2;
                            // 开始绘制
                            ctx.beginPath();
                            //先画个圆  前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
                            ctx.arc(avatar_width / 2 + avatar_x, avatar_heigth / 2 + avatar_y, avatar_width / 2, 0, Math.PI * 2, false);
                            //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
                            ctx.clip();
                            // 绘制头像
                            ctx.drawImage(avatar, avatar_x, avatar_y, avatar_width, avatar_heigth);
                            //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制（可以继续绘制弹幕文字）
                            ctx.closePath();
                            ctx.restore();

                        }
                        // 弹幕悬浮与否
                        if (!suspension) {
                            item.moveX = item.moveX - speed;
                        } else {
                            if (item.isMove) {
                                item.moveX = item.moveX - speed;
                            }
                        }
                        // 如果该条弹幕播放完成 ，则移除该条弹幕
                        if (item.moveX < 0 && item.moveX <= -ctx.measureText(item.text).width - 10) {
                            // 该条弹幕已经完成播放(移除)
                            barrage.list.splice(i, 1);
                            if (i > 0) { --i }
                        }
                        else { ++i }
                    }
                });

                timer = window.requestAnimationFrame(barrageCanvas.renderingBarrage);
            }

        },
        // 关闭弹幕
        closeBarrage: function () {
            window.cancelAnimationFrame(timer);
        },
        // 设置每条弹幕的高度
        setBarrageHeight: function () {
            ctx.font = "normal small-caps bold 16px arial";
            ctx.fillStyle = "#fff";
            // 不要改动 改动之后弹幕出现位置错误（如果你知道怎样控制可以修改）
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            var reg = /\d+/;
            barrageHeight = parseFloat(ctx.font.match(reg)[0]);
        },
        // 获取弹幕的高度
        getBarrageHeight: function () {
            return barrageHeight;
        },
        // 设置弹幕可以显示多少行
        setBarrageLineNum: function () {
            /**
            * 为了美化
            * 给每一条弹幕加上上下30的间距
            */
            barrageLineNum = Math.floor(drawing.clientHeight / (barrageHeight + 60));
        },
        // 设置弹幕头像播放状态
        setShowAvatar: function (value) {
            showAvatar = value;
        },
        // 获取实际渲染弹幕列表
        getClassificationBarrage: function () {
            return classificationBarrage;
        },
        // 设置弹幕是否悬浮
        setSuspension: function (value) {
            suspension = value;
        },
        // 获取timer
        getTimer: function () {
            return timer;
        },
        // 设置timer
        setTimer: function (_timer) {
            timer = _timer
        }
    }

})();










// 画布初始化
barrageCanvas.init();




// 有趣的一个小知识 页面隐藏和显示进行的操作 (注意：全屏操作会触发此方法)
EventUtil.addHandler(document, 'visibilitychange', function () {
    barrageCanvas.closeBarrage();
    var timer = barrageCanvas.getTimer();
    if (timer) { clearTimeout(timer); }
    canvasUtil.getCtx().clearRect(0, 0, drawing.width, drawing.height);
    // 由于进入全屏和退出全屏的时候，窗口变化需要一段时间，经测试时间不会超过1000ms
    // 所以在一秒之后在执行函数，确保获取到准确的dom元素的属性
    barrageCanvas.setTimer(
        setTimeout(function () {
            barrageCanvas.newRendingBarrageScreen.call(barrageCanvas);
        }, 1000)
    );
    if (this.hidden) {
        this.title = '(/≧▽≦/)lvxx';
        // 清楚弹幕放在这里，避免清楚错误
        barrageCanvas.deleteFinishBarrage();
    }
    else {
        this.title = '(/≧▽≦/)ydb';
    }
});







