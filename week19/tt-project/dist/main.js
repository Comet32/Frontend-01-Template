/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/createElement.js":
/*!******************************!*\
  !*** ./src/createElement.js ***!
  \******************************/
/*! exports provided: createElement, Text, Wrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony import */ var _gesture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gesture */ \"./src/gesture.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\nfunction createElement(Cls, attributes) {\n  var o;\n\n  if (typeof Cls === 'string') {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  } // 递归处理 children 中的 child 有数组的情况\n\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n        if (typeof child === 'string') child = new Text(child);\n\n        if (child instanceof Array) {\n          visit(child); // 不将 child 添加到 o 中\n\n          continue;\n        }\n\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\n\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\n\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      //attribute\n      this.root.setAttribute(name, value);\n\n      if (name.match(/^on([\\s\\S]+)$/)) {\n        var eventName = RegExp.$1.replace(/[\\s\\S]+/, function (c) {\n          return c.toLocaleLowerCase();\n        });\n        this.addEventListener(eventName, value);\n      }\n\n      if (name === 'enableGesture' && value) {\n        Object(_gesture__WEBPACK_IMPORTED_MODULE_0__[\"enableGesture\"])(this.root);\n      }\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this.root.getAttribute(name);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }, {\n    key: \"classList\",\n    get: function get() {\n      return this.root.classList;\n    }\n  }, {\n    key: \"innerText\",\n    set: function set(text) {\n      return this.root.innerText = text;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\n\n\n//# sourceURL=webpack:///./src/createElement.js?");

/***/ }),

/***/ "./src/gesture.js":
/*!************************!*\
  !*** ./src/gesture.js ***!
  \************************/
/*! exports provided: enableGesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enableGesture\", function() { return enableGesture; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n// let ele = document.querySelector('div');\n// enableGesture(document.body);\n// 添加 export 形成模块\nfunction enableGesture(ele) {\n  var contexts = Object.create(null); // 用 MOUSE_SYMBOL 作为 mouse 事件存储的上下文的 key ，避免与 touch 事件中用 `identifier` 作为上下文的 key 产生冲突\n  // 鼠标只需要考虑一个初始位置即可，因为只有一个指针，所以只用 MOUSE_SYMBOL 来表示即可。\n\n  var MOUSE_SYMBOL = Symbol('mouse'); // 不等于 null 则为 undefined ，说明没有 touchstart 事件，是 pc 端。只在 pc 端绑定 mouse 事件\n\n  if (document.ontouchstart !== null) ele.addEventListener('mousedown', function (event) {\n    // 下一次的开始会将之前的覆盖掉\n    contexts[MOUSE_SYMBOL] = Object.create(null);\n    start(event, contexts[MOUSE_SYMBOL]);\n\n    var mousemove = function mousemove(event) {\n      move(event, contexts[MOUSE_SYMBOL]);\n    };\n\n    var mouseup = function mouseup(event) {\n      end(event, contexts[MOUSE_SYMBOL]);\n      document.removeEventListener('mousemove', mousemove);\n      document.removeEventListener('mouseup', mouseup);\n    };\n\n    document.addEventListener('mousemove', mousemove);\n    document.addEventListener('mouseup', mouseup);\n  }); // touch event\n  // touch 天然就有目标锁定的能力\n\n  ele.addEventListener('touchstart', function (event) {\n    var _iterator = _createForOfIteratorHelper(event.changedTouches),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var touch = _step.value;\n        // 创建上下文时，要在行为最开始的创建\n        contexts[touch.identifier] = Object.create(null);\n        start(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  });\n  ele.addEventListener('touchmove', function (event) {\n    var _iterator2 = _createForOfIteratorHelper(event.changedTouches),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var touch = _step2.value;\n        move(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  });\n  ele.addEventListener('touchend', function (event) {\n    var _iterator3 = _createForOfIteratorHelper(event.changedTouches),\n        _step3;\n\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var touch = _step3.value;\n        end(touch, contexts[touch.identifier]); // 删除的时候，需要在行为结束的地方删除\n\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n  }); // touchend 和 touchcancel 有且只会触发一个\n  // 屏幕上突然的弹窗或着手势被识别为系统手势就会触发 touchcancel\n\n  ele.addEventListener('touchcancel', function (event) {\n    var _iterator4 = _createForOfIteratorHelper(event.changedTouches),\n        _step4;\n\n    try {\n      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n        var touch = _step4.value;\n        cancel(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _iterator4.e(err);\n    } finally {\n      _iterator4.f();\n    }\n  }); // 使用 context 主要是为了解决 touch 事件中存在多点触碰的情况，否则是可以在该模块中用唯一的 `startX` 和 `startY` 来表示初始位置\n\n  var start = function start(point, context) {\n    ele.dispatchEvent(new CustomEvent('gesturestart', {\n      startX: point.clientX,\n      startY: point.clientY,\n      clientX: point.clientX,\n      clientY: point.clientY\n    }));\n    context.startX = point.clientX;\n    context.startY = point.clientY;\n    context.moves = []; //三个分支，三个状态\n\n    context.isTap = true;\n    context.isPan = false;\n    context.isPress = false; // 0.5s 之后如果还处于开始阶段则将其状态切换为 Press\n\n    context.timeoutID = setTimeout(function () {\n      // 如果已经是 pan 状态则直接中断后面的状态切换，因为一旦进入 pan 状态也就无法再切换到 press\n      if (context.isPan) return;\n      context.isTap = false;\n      context.isPan = false;\n      context.isPress = true;\n      ele.dispatchEvent(new CustomEvent('pressstart', {}));\n    }, 500);\n  };\n\n  var move = function move(point, context) {\n    var startX = context.startX,\n        startY = context.startY;\n    var dx = point.clientX - startX; // 移动的距离\n\n    var dy = point.clientY - startY; // 这里是计算直角三角形斜边的公式，a**2 + b**2 = c**2\n\n    if (Math.pow(dx, 2) + Math.pow(dy, 2) > 100 && !context.isPan) {\n      if (context.isPress = false) {\n        ele.dispatchEvent(new CustomEvent('presscancel', {}));\n      }\n\n      context.isTap = false;\n      context.isPan = true;\n      context.isPress = false;\n      ele.dispatchEvent(new CustomEvent('panstart', {\n        // pan start 时要存储开始位置，因为已经移动了 10px 的距离\n        startX: startX,\n        startY: startY,\n        clientX: point.clientX,\n        clientY: point.clientY\n      }));\n    } // 如果已经移动超过 10px\n\n\n    if (context.isPan) {\n      context.moves.push({\n        dx: dx,\n        dy: dy,\n        t: Date.now()\n      }); // 过滤掉 300ms 之前的移动记录\n\n      context.moves = context.moves.filter(function (record) {\n        return Date.now() - record.t < 300;\n      });\n      var event = new CustomEvent('pan');\n      Object.assign(event, {\n        // pan start 时要存储开始位置，因为已经移动了 10px 的距离\n        startX: startX,\n        startY: startY,\n        clientX: point.clientX,\n        clientY: point.clientY\n      });\n      ele.dispatchEvent(event);\n    } // console.log('move', { dx, dy });\n\n  };\n\n  var end = function end(point, context) {\n    // 离开屏幕时移动的距离\n    var dx = point.clientX - context.startX;\n    var dy = point.clientY - context.startY;\n\n    if (context.isTap) {\n      ele.dispatchEvent(new CustomEvent('tap', {}));\n    }\n\n    if (context.isPan) {\n      // index 为 0 的 record 是 300ms 的最开始的位置\n      var record = context.moves[0]; // 用 300ms 内移动的距离 / 移动的时间，来获取 300ms 内的速度\n\n      var time = Date.now() - record.t;\n      console.log('time', time);\n      var distance = Math.sqrt(Math.pow(record.dx - dx, 2) + Math.pow(record.dy - dy, 2));\n      var speed = distance / time;\n      var isFlick = speed > 1;\n\n      if (isFlick) {\n        ele.dispatchEvent(new CustomEvent('flick', {\n          detail: {\n            // pan start 时要存储开始位置，因为已经移动了 10px 的距离\n            startX: context.startX,\n            startY: context.startY,\n            clientX: point.clientX,\n            clientY: point.clientY,\n            speed: speed,\n            isFlick: isFlick\n          }\n        }));\n      }\n\n      var event = new CustomEvent('panend');\n      Object.assign(event, {\n        // pan start 时要存储开始位置，因为已经移动了 10px 的距离\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY,\n        speed: speed,\n        isFlick: isFlick\n      });\n      ele.dispatchEvent(event);\n    }\n\n    if (context.isPress) {\n      ele.dispatchEvent(new CustomEvent('pressend', {}));\n    }\n\n    clearTimeout(context.timeoutID);\n  };\n\n  var cancel = function cancel(point, context) {\n    ele.dispatchEvent(new CustomEvent('canceled', {}));\n    clearTimeout(context.timeoutID);\n  };\n}\n\n//# sourceURL=webpack:///./src/gesture.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ \"./src/createElement.js\");\n\nvar component = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", null, \"Hello world!\");\ncomponent.mountTo(document.body); // list.mountTo(document.body)\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });