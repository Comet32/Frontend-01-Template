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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./carousel.vue":
/*!**********************!*\
  !*** ./carousel.vue ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./my-loader.js):\\n/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/my-loader.js:3\\nexport default function (source, map) {\\n^^^^^^\\n\\nSyntaxError: Unexpected token 'export'\\n    at new Script (vm.js:88:7)\\n    at NativeCompileCache._moduleCompile (/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/v8-compile-cache/v8-compile-cache.js:242:18)\\n    at Module._compile (/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/v8-compile-cache/v8-compile-cache.js:186:36)\\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1153:10)\\n    at Module.load (internal/modules/cjs/loader.js:977:32)\\n    at Function.Module._load (internal/modules/cjs/loader.js:877:14)\\n    at Module.require (internal/modules/cjs/loader.js:1019:19)\\n    at require (/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)\\n    at loadLoader (/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/loader-runner/lib/loadLoader.js:18:17)\\n    at iteratePitchingLoaders (/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\\n    at runLoaders (/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/loader-runner/lib/LoaderRunner.js:365:2)\\n    at NormalModule.doBuild (/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/webpack/lib/NormalModule.js:295:3)\\n    at NormalModule.build (/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/webpack/lib/NormalModule.js:446:15)\\n    at Compilation.buildModule (/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/webpack/lib/Compilation.js:739:10)\\n    at /Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/webpack/lib/Compilation.js:981:14\\n    at /Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/webpack/lib/NormalModuleFactory.js:409:6\\n    at /Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/webpack/lib/NormalModuleFactory.js:155:13\\n    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:4:1)\\n    at /Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/webpack/lib/NormalModuleFactory.js:138:29\\n    at /Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week15/component-project/node_modules/webpack/lib/NormalModuleFactory.js:346:9\\n    at processTicksAndRejections (internal/process/task_queues.js:79:11)\");\n\n//# sourceURL=webpack:///./carousel.vue?");

/***/ }),

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: createElement, Text, Wrapper, Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n// import { Text, Wrapper } from './Components.js';\nfunction createElement(Cls, attributes) {\n  var o;\n\n  if (typeof Cls === 'string') {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  } // 递归处理 children 中的 child 有数组的情况\n\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n        if (typeof child === 'string') child = new Text(child);\n\n        if (child instanceof Array) {\n          visit(child); // 不将 child 添加到 o 中\n\n          continue;\n        }\n\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\n\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\n\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      //attribute\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\nvar Carousel = /*#__PURE__*/function () {\n  function Carousel(config) {\n    _classCallCheck(this, Carousel);\n\n    this.children = [];\n    this.props = {};\n    this.attr = new Map();\n  }\n\n  _createClass(Carousel, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      //attribute\n      this.props[name] = value;\n      this.attr.set(name, value);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this = this;\n\n      var position = 0;\n      var children = this.props.data.map(function (url) {\n        var element = createElement(\"img\", {\n          src: url\n        });\n        element.addEventListener('dragstart', function (e) {\n          return e.preventDefault();\n        });\n        return element;\n      });\n      var root = createElement(\"div\", {\n        \"class\": \"carousel\"\n      }, children);\n\n      var nextPic = function nextPic() {\n        // 这里利用取余让 position 只在 0 ~ this.props.data.length - 1 之间自增1并循环\n        var nextPosition = (position + 1) % _this.props.data.length;\n        var current = children[position];\n        var next = children[nextPosition];\n        current.style.transition = 'ease 0s';\n        next.style.transition = 'ease 0s'; // 起始位置\n\n        current.style.transform = \"translateX(\".concat(-100 * position, \"%)\");\n        next.style.transform = \"translateX(\".concat(-100 * nextPosition + 100, \"%)\");\n        setTimeout(function () {\n          current.style.transition = ''; // means use css rule\n\n          next.style.transition = ''; // 终止位置\n\n          current.style.transform = \"translateX(\".concat(-100 * position - 100, \"%)\");\n          next.style.transform = \"translateX(\".concat(-100 * nextPosition, \"%)\");\n          position = nextPosition;\n        }, 16);\n        setTimeout(nextPic, 3000);\n      };\n\n      setTimeout(nextPic, 3000);\n      root.addEventListener('mousedown', function (event) {\n        // event 中有很多表示鼠标位置的值，推荐使用 `clientX` 和 `clientY`，\b相当于可视区域的坐标，非常准确并且没有歧义，和浏览器窗口里面的可渲染区域一一对应。\n        // 点击鼠标时开始位置\n        var startX = event.clientX;\n\n        var _root$root$getBoundin = root.root.getBoundingClientRect(),\n            width = _root$root$getBoundin.width; // 由于 `position - 1` 可能会出现负数，这样我们便无法获取 `childNodes` 中的元素，因此加上一个 length 来避免这样的问题\n\n\n        var prevPos = (position - 1 + _this.props.data.length) % _this.props.data.length;\n        var nextPos = (position + 1) % _this.props.data.length;\n        var prev = children[prevPos];\n        var current = children[position];\n        var next = children[nextPos];\n\n        var move = function move(event) {\n          // 拖动瞬间的基本位置值\n          var prevBase = -width * prevPos - width;\n          var currentBase = -width * position;\n          var nextBase = -width * nextPos + width;\n          prev.style.transition = 'ease 0s';\n          current.style.transition = 'ease 0s';\n          next.style.transition = 'ease 0s';\n          prev.style.transform = \"translateX(\".concat(prevBase, \"px)\");\n          current.style.transform = \"translateX(\".concat(currentBase, \"px)\");\n          next.style.transform = \"translateX(\".concat(nextBase, \"px)\"); // 移动量\n\n          var moveX = event.clientX - startX;\n          var x = moveX;\n          prev.style.transform = \"translateX(\".concat(prevBase + x, \"px)\");\n          current.style.transform = \"translateX(\".concat(currentBase + x, \"px)\");\n          next.style.transform = \"translateX(\".concat(nextBase + x, \"px)\");\n        };\n\n        var up = function up(event) {\n          // 偏移量，相对于视觉上图像的编译量\n          var offset = 0;\n\n          if (event.clientX - startX > width / 2) {\n            offset = 1;\n          } else if (event.clientX - startX < -width / 2) {\n            offset = -1;\n          } // 添加动画\n\n\n          prev.style.transition = '';\n          current.style.transition = '';\n          next.style.transition = '';\n          prev.style.transform = \"translateX(\".concat(-width * (prevPos - offset) - width, \"px)\");\n          current.style.transform = \"translateX(\".concat(-width * (position - offset), \"px)\");\n          next.style.transform = \"translateX(\".concat(-width * (nextPos - offset) + width, \"px)\");\n          position = (position - offset + _this.props.data.length) % _this.props.data.length;\n          document.removeEventListener('mousemove', move);\n          document.removeEventListener('mouseup', up);\n        };\n\n        document.addEventListener('mousemove', move);\n        document.addEventListener('mouseup', up);\n      });\n      return root;\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      this.render().mountTo(parent);\n    }\n  }]);\n\n  return Carousel;\n}();\n\n\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ \"./createElement.js\");\n/* harmony import */ var _carousel_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.vue */ \"./carousel.vue\");\n/* harmony import */ var _carousel_vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_carousel_vue__WEBPACK_IMPORTED_MODULE_1__);\n // 这里看到没有调用的透明变量是 VSC 给我们的提示，其实是调用了的。\n\n\nvar imgUrls = ['https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg', 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg', 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg', 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'];\nvar component = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(_carousel_vue__WEBPACK_IMPORTED_MODULE_1__[\"Carousel\"], {\n  data: imgUrls\n});\ncomponent.mountTo(document.body);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });