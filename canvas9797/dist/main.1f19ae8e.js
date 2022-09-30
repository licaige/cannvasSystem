// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var draw = {
  //检测当前屏幕是否支持触摸
  isTouchDevice: "ontouchstart" in document.documentElement,
  features: document.querySelector('#features'),
  pencil: document.querySelector('#pencil'),
  rubber: document.querySelector('#rubber'),
  clean: document.querySelector('#clean'),
  download: document.querySelector('#download'),
  colors: document.querySelector('#colors'),
  lineStyle: document.querySelector('#line-style'),
  //设置鼠标按钮的开关
  painting: false,
  //储存上一次的坐标
  last: [],
  //储存canvas展示的区域
  ctx: undefined,
  //获取canvas的DOM节点
  canvas: undefined,
  //默认的功能,颜色,笔迹
  featuresMap: ['pencil', 'rubber'],
  currentFeature: 'pencil',
  colorMap: ['black', 'red', 'yellow', 'green', 'blue'],
  currentColor: 'black',
  lineStyleMap: {
    big: 10,
    normal: 6,
    small: 2
  },
  currentLineStyle: 'big',
  //橡皮擦功能是否开启
  onRubber: false,
  //储存当前viewport宽高
  viewportWidth: document.documentElement.clientWidth,
  viewportHeight: document.documentElement.clientHeight,
  init: function init() {
    draw.initStyle(); //获取画板的节点

    draw.canvas = document.getElementById("canvas"); //获取canvas的content,图像将在这里被渲染

    draw.ctx = draw.canvas.getContext("2d"); //将canvas的宽高设置为屏幕宽高

    draw.canvas.width = draw.viewportWidth;
    draw.canvas.height = draw.viewportHeight; //初始化canvas画笔

    draw.initCanvas(); //触摸画线或者鼠标画线

    draw.isTouchDevice ? draw.bindTouchEvents() : draw.bindMouseEvents();
    draw.bindFeatureEvents();
    draw.bindColorEvents();
    draw.bindLineStyleEvents();
  },
  initCanvas: function initCanvas() {
    //填充颜色
    draw.ctx.fillStyle = draw.currentColor; //边框

    draw.ctx.strokeStyle = draw.currentColor; //线宽

    draw.ctx.lineWidth = draw.lineStyleMap[draw.currentLineStyle]; //设置转折圆角

    draw.ctx.lineCap = "round";
  },
  initFeatureStyle: function initFeatureStyle() {
    var featuresChildren = draw.features.children;

    for (var i = 0; i < featuresChildren.length; i++) {
      if (featuresChildren[i].id === draw.currentFeature) {
        featuresChildren[i].classList.add('active');
      } else {
        featuresChildren[i].classList.remove('active');
      }
    }
  },
  initColorStyle: function initColorStyle() {
    var colorsChildren = draw.colors.children;

    for (var i = 0; i < colorsChildren.length; i++) {
      if (colorsChildren[i].id === draw.currentColor) {
        colorsChildren[i].classList.add('active');
      } else {
        colorsChildren[i].classList.remove('active');
      }
    }
  },
  initLineStyle: function initLineStyle() {
    var lineStyleChildren = draw.lineStyle.children;

    for (var i = 0; i < lineStyleChildren.length; i++) {
      if (lineStyleChildren[i].id === draw.currentLineStyle) {
        lineStyleChildren[i].classList.add('active');
      } else {
        lineStyleChildren[i].classList.remove('active');
      }
    }
  },
  initStyle: function initStyle() {
    //初始化Features的样式
    draw.initFeatureStyle(); //初始化画笔的颜色的样式

    draw.initColorStyle(); //初始化线宽的样式

    draw.initLineStyle();
  },
  drawLine: function drawLine(x1, y1, x2, y2) {
    draw.ctx.beginPath();
    draw.ctx.moveTo(x1, y1);
    draw.ctx.lineTo(x2, y2);
    draw.ctx.stroke();
  },
  bindMouseEvents: function bindMouseEvents() {
    //检测鼠标按下事件
    draw.canvas.onmousedown = function (e) {
      draw.onMouseDown(e);
    }; //检测鼠标弹起事件


    draw.canvas.onmouseup = function () {
      draw.painting = false;
    }; //鼠标移动时检测鼠标是否按下,如果按下就开始画图


    draw.canvas.onmousemove = function (e) {
      draw.onMouseMove(e);
    };
  },
  bindTouchEvents: function bindTouchEvents() {
    //获取当前触摸开始的坐标
    draw.canvas.ontouchstart = function (e) {
      draw.onTouchStart(e);
    }; //获取当前的坐标,并将开始坐标和当前坐标之间画线,将当前坐标赋值到上次坐标


    draw.canvas.addEventListener('touchmove', function (e) {
      //阻止iOS页面滑动
      e.preventDefault();
      draw.onTouchMove(e);
    }, {
      passive: false
    });
  },
  bindFeatureEvents: function bindFeatureEvents() {
    draw.pencil.onclick = function (e) {
      draw.currentFeature = e.currentTarget.id;
      draw.initFeatureStyle(); //关闭橡皮擦

      draw.onRubber = false;
    };

    draw.rubber.onclick = function (e) {
      draw.currentFeature = e.currentTarget.id;
      draw.initFeatureStyle(); //开启橡皮擦

      draw.onRubber = true;
    };

    draw.clean.onclick = function () {
      //增加清除功能
      draw.ctx.clearRect(0, 0, draw.canvas.width, draw.canvas.height);
    };

    draw.download.onclick = function () {
      //增加背景颜色
      draw.ctx.save();
      draw.ctx.globalCompositeOperation = 'destination-over';
      draw.ctx.fillStyle = "#FAF9DE";
      draw.ctx.fillRect(0, 0, draw.viewportWidth, draw.viewportHeight); //增加下载功能

      var MIME_TYPE = "image/png";
      var imgURL = draw.canvas.toDataURL("image/png");
      var dlLink = document.createElement('a');
      dlLink.download = '我的canvas画板';
      dlLink.href = imgURL;
      dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
    };
  },
  bindColorEvents: function bindColorEvents() {
    draw.colors.onclick = function (e) {
      if (draw.colorMap.indexOf(e.target.id) >= 0) {
        draw.currentColor = e.target.id;
        draw.initColorStyle();
        draw.initCanvas();
      }
    };
  },
  bindLineStyleEvents: function bindLineStyleEvents() {
    draw.lineStyle.onclick = function (e) {
      if (Object.keys(draw.lineStyleMap).indexOf(e.target.id) >= 0) {
        draw.currentLineStyle = e.target.id;
        draw.initLineStyle();
        draw.initCanvas();
      }
    };
  },
  getCurrentTouchXY: function getCurrentTouchXY(e) {
    return [e.touches[0].clientX, e.touches[0].clientY];
  },
  onTouchStart: function onTouchStart(e) {
    draw.last = draw.getCurrentTouchXY(e);
  },
  onTouchMove: function onTouchMove(e) {
    var _draw$getCurrentTouch = draw.getCurrentTouchXY(e),
        _draw$getCurrentTouch2 = _slicedToArray(_draw$getCurrentTouch, 2),
        x = _draw$getCurrentTouch2[0],
        y = _draw$getCurrentTouch2[1];

    if (draw.onRubber) {
      draw.ctx.clearRect(draw.last[0] - 5, draw.last[1] - 5, 20, 20);
    } else {
      draw.drawLine(draw.last[0], draw.last[1], x, y);
    }

    draw.last = [x, y];
  },
  onMouseDown: function onMouseDown(e) {
    draw.painting = true;
    draw.last = [e.clientX, e.clientY];
  },
  onMouseMove: function onMouseMove(e) {
    if (draw.painting === true) {
      if (draw.onRubber) {
        draw.ctx.clearRect(draw.last[0] - 5, draw.last[1] - 5, 20, 20);
      } else {
        draw.drawLine(draw.last[0], draw.last[1], e.clientX, e.clientY);
      }

      draw.last = [e.clientX, e.clientY];
    }
  }
};
draw.init();
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55462" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map