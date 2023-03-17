(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["micro-message"] = factory();
	else
		root["micro-message"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/Channel.type.js":
/*!**********************************!*\
  !*** ./src/core/Channel.type.js ***!
  \**********************************/
/***/ (() => {

/**
 * @description 消息类型
 * @typedef PostMessageTypeInner
 * @type { 'register'| 'unregister'  }
 * @description 业务事件类型
 * @typedef PostMessageTypeWork
 * @type { 'state' | 'config' |'callback'|'emit'| '*' }
 *
 * @typedef { PostMessageTypeInner | PostMessageTypeWork } PostMessageType
 */

/**
 * @description 消息发送对象
 * @typedef  { 'main' | 'parent' | 'global' |'*'} IPostTarget
 */

/**
 * @description message消息格式
 * @template T
 * @typedef IPostMessageSyntax
 * @type {object}
 * @property {boolean} [pop=true] 是否冒泡
 * @property { string | 'main' } [target='main'] 发送消息的目标
 * @property { string } sourceCode 冒泡消息来源
 * @property { PostMessageType } type 消息类型
 * @property { T } data 发送的消息
 */

/**
 * @description generic function
 * @template P,T
 * @callback IGenericFunction
 * @param {P} response
 * @returns {T}
 */

/**
 * @typedef {object} ChannelOptsRest
 * @property { string } [localStorageName='globalConfig'] 本地存储namespace
 * @property { string } [appCode] 子应用的CODE
 *
 * @typedef {ChannelOptsRest & MessageOpts} ChannelOpts
 */

/**
 * @description 微应用CODE
 * @typedef {string} microAppCode
 * @description 微应用CONTEXT
 * @typedef { HTMLIFrameElement } microAppContext
 */

/**
 * @description 用户发送的的数据
 * @typedef {*} IUserData
 */

/**
 * @template T
 * @typedef {IGenericFunction<IPostMessageSyntax<T>,void>} onCallback
 */

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-2.use[1]!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/microApp.vue?vue&type=style&index=0&id=0179a1d4&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-2.use[1]!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/microApp.vue?vue&type=style&index=0&id=0179a1d4&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./src/index.js + 23 modules ***!
  \***********************************/
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Utils": () => (/* reexport */ util_namespaceObject),
  "connector": () => (/* binding */ connector),
  "default": () => (/* binding */ src)
});

// NAMESPACE OBJECT: ./src/util/index.js
var util_namespaceObject = {};
__webpack_require__.r(util_namespaceObject);
__webpack_require__.d(util_namespaceObject, {
  "ChainRunner": () => (ChainRunner),
  "getParams": () => (getParams),
  "onLoad": () => (onLoad),
  "onMessage": () => (onMessage),
  "onPageHide": () => (onPageHide),
  "requestDom": () => (requestDom)
});

// EXTERNAL MODULE: ./src/core/Channel.type.js
var Channel_type = __webpack_require__("./src/core/Channel.type.js");
;// CONCATENATED MODULE: ./src/util/onEvent.js

/**
 * @description 监听pagehide事件
 * @param {Function} cb 回调函数
 * @returns {Function} 取消回调的函数
 */
function onPageHide(cb) {
  console.log('page hide-------------------------------');
  window.addEventListener('pagehide', cb);
  return function () {
    return window.removeEventListener('pagehide', cb);
  };
}

/**
 * @description 监听load事件
 * @param {Function} cb 回调函数
 * @returns {Function} 取消回调的函数
 */
function onLoad(cb) {
  window.addEventListener('load', cb);
  return function () {
    return window.removeEventListener('load', cb);
  };
}

/**
 * @description 监听message事件
 * @param {IGenericFunction<IMessageEventResponse,*>} cb 回调函数
 * @returns {Function} 取消回调的函数
 */
function onMessage(cb) {
  window.addEventListener('message', cb);
  return function () {
    return window.removeEventListener('message', cb);
  };
}
;// CONCATENATED MODULE: ./src/util/requestDom.js
/**
 * @callback judgeCallback
 * @param {?HTMLIFrameElement}
 * @returns {boolean}
 */

/**
 *
 * @param {string} id 目标元素id
 * @param {?judgeCallback} judgeCb 确定元素获取成功的judge函数
 * @param {'requestAnimationFrame' | 'setTimeout'} [type='requestAnimationFrame'] 轮询函数类型
 * @returns {promise<HTMLIFrameElement | null>}
 */
function requestDom(id) {
  var judgeCb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (el) {
    return Boolean(el);
  };
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'requestAnimationFrame';
  function getDom(id, callback, type) {
    if (document && window && window.requestAnimationFrame) {
      var el = document.getElementById(id);
      if (!judgeCb(el)) {
        if (type === 'requestAnimationFrame') {
          requestAnimationFrame(function () {
            getDom(id, callback, type);
          });
        }
        if (type === 'setTimeout') {
          setTimeout(function () {
            getDom(id, callback, type);
          });
        }
      } else {
        return callback(el);
      }
    } else {
      throw Error("browser don't support");
    }
  }
  var resolver;
  return new Promise(function (resolve) {
    resolver = resolve;
    getDom(id, function (el) {
      setTimeout(function () {
        resolver(el);
      });
    }, type);
  });
}
;// CONCATENATED MODULE: ./src/util/volume.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ArrayVolume = /*#__PURE__*/function () {
  function ArrayVolume(length) {
    _classCallCheck(this, ArrayVolume);
    this.queue = length === void 0 ? [] : new Array(length);
  }
  /**
   * 加入一个回调函数到执行队列
   * @param { Function } callback 回调函数
   * @param { number } priority 优先级
   * @returns { Function } remove函数 从队列中移除回调
   */
  _createClass(ArrayVolume, [{
    key: "push",
    value: function push(callback) {
      var _this = this;
      var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (priority === 0) {
        this.queue.push(callback);
      }
      if (priority === 1) {
        this.queue.unshift(callback);
      }
      return function () {
        return _this.queue.splice(_this.queue.findIndex(function (fn) {
          return fn === callback;
        }), 1);
      };
    }
  }]);
  return ArrayVolume;
}();
/**
 * @template T
 */
var ChainRunner = /*#__PURE__*/function (_ArrayVolume) {
  _inherits(ChainRunner, _ArrayVolume);
  var _super = _createSuper(ChainRunner);
  function ChainRunner() {
    _classCallCheck(this, ChainRunner);
    return _super.call(this);
  }
  /**
   * @description 加入一个回调函数到执行队列
   * @param { IGenericFunction<T,T> } callback 回调函数
   * @param { number } [priority=1] 优先级
   * @returns { cancelCallback } remove函数 从队列中移除回调
   */
  _createClass(ChainRunner, [{
    key: "push",
    value: function push(callback) {
      var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return _get(_getPrototypeOf(ChainRunner.prototype), "push", this).call(this, callback, priority);
    }
    /**
     * @description 加入一个回调函数到执行队列
     * @param { IGenericFunction<T,T> } callback 回调函数
     * @returns { cancelCallback } remove函数 从队列中移除回调
     */
  }, {
    key: "use",
    value: function use(callback) {
      return this.push(callback);
    }
    /**
     * @description 链式执行回调队列中的回调函数
     * @param  {*} result 执行参数
     * @returns {T}
     */
  }, {
    key: "run",
    value: function run(result) {
      var res = result;
      var _iterator = _createForOfIteratorHelper(this.queue),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var fn = _step.value;
          res = fn(res);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return res;
    }
  }]);
  return ChainRunner;
}(ArrayVolume);
;// CONCATENATED MODULE: ./src/util/getParams.js
/**
 * @description 获取URL search参数
 * @param {Location} location
 * @returns {object}
 */
function getParams(location) {
  var search = location.search.slice(1);
  var result = {};
  search.split('&').map(function (p) {
    return p.split('=');
  }).forEach(function (item) {
    result[item[0]] = item[1];
  });
  return result;
}
;// CONCATENATED MODULE: ./src/util/index.js




;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/native.js
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const esm_browser_native = ({
  randomUUID
});
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_browser_validate = (validate);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_browser_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = (stringify);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js




function v4(options, buf, offset) {
  if (esm_browser_native.randomUUID && !buf && !options) {
    return esm_browser_native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
;// CONCATENATED MODULE: ./src/core/Message.js
function Message_typeof(obj) { "@babel/helpers - typeof"; return Message_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Message_typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = Message_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function Message_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Message_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Message_toPropertyKey(descriptor.key), descriptor); } }
function Message_createClass(Constructor, protoProps, staticProps) { if (protoProps) Message_defineProperties(Constructor.prototype, protoProps); if (staticProps) Message_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Message_toPropertyKey(arg) { var key = Message_toPrimitive(arg, "string"); return Message_typeof(key) === "symbol" ? key : String(key); }
function Message_toPrimitive(input, hint) { if (Message_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Message_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/**
 * @class
 */
var Message = /*#__PURE__*/function () {
  /**
   * @description 初始化一个Channel
   * @constructor
   * @param {Window | WindowContent} targetWindow
   * @param {MessageOpts} options Channel初始化options
   */
  function Message(targetWindow) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Message_classCallCheck(this, Message);
    this.appCode = '';
    this.targetOrigin = options.targetOrigin || '*';
    this.timeout = options.timeout || 3 * 1000;
    this.tag = options.namespace || 'gislife';
    /**@description 默认回复响应的拦截器 */
    /**@type ChainRunner<IMessage<IPostMessageSyntax<*>>> */
    this.defaultResponseInterceptor = new ChainRunner();
    /**@description 请求拦截器 */
    /**@type ChainRunner<IPostMessageSyntax<*>> */
    this.requestInterceptor = new ChainRunner();
    this._cancel = this._initResponse();
  }
  /**
   * @description 初始化消息默认回复事件
   * @returns {cancelCallback} 取消默认回复事件
   */
  Message_createClass(Message, [{
    key: "_initResponse",
    value: function _initResponse() {
      var _this = this;
      return onMessage(function (e) {
        var _e$data;
        if (((_e$data = e.data) === null || _e$data === void 0 ? void 0 : _e$data.response) === false) {
          console.log('this.defaultResponseInterceptor.run(e.data)', _this.defaultResponseInterceptor.run(e.data));
          e.source.postMessage(_objectSpread(_objectSpread({}, _this.defaultResponseInterceptor.run(e.data)), {}, {
            response: true
          }), e.origin);
        }
      });
    }
    /**
     * todo 包裹原生消息发生函数，保证消息唯一性,局部性;
     * @description 发送消息
     * @param {IPostMessageSyntax<T>} msg
     * @param {HTMLIFrameElement.contentWindow} target
     * @returns { Promise<IMessage<IPostMessageSyntax<T>>&{response:true}> }
     */
  }, {
    key: "_postMessage",
    value: function _postMessage(msg, target) {
      var _this2 = this;
      var timeout = msg.timeout || this.timeout;
      var isSendOK = false;
      if (target) {
        var resolvor, rejector;
        var id = esm_browser_v4();
        var cancel = onMessage(function (res) {
          var data = res.data;
          if ((data === null || data === void 0 ? void 0 : data.id) === id && data.belong === _this2.tag) {
            isSendOK = true;
            resolvor(data.data);
            cancel();
          }
        });
        return new Promise(function (resolve, reject) {
          resolvor = resolve;
          rejector = reject;
          /** @type IPostMessageSyntax<*> */
          var res = _this2.requestInterceptor.run(msg);
          console.log('before send res-----------------', res);
          var data = JSON.stringify(res);
          console.log('before send-----------------', data);
          debugger;
          target.postMessage({
            id: id,
            data: data,
            belong: _this2.tag,
            response: false
          }, '*');
          setTimeout(function () {
            if (!isSendOK) {
              rejector('-----postMessage timeout,target maybe not ready');
              cancel();
            }
          }, timeout);
        });
      } else {
        return Promise.reject('missing target');
      }
    }

    /**
     * todo 发送消息
     * @description 发送消息
     * @param {Window} target
     * @param {IPostMessageSyntax<T>} msg 消息体
     * @returns { Promise<T> } 确认消息发送成功的回调
     */
  }, {
    key: "send",
    value: function send(target, msg) {
      return this._postMessage(msg, target).then(function (res) {
        return res;
      }, function (err) {
        return Promise.reject(err);
      });
    }
    /**
     * @description 监听消息 只监听接受消息
     * @param {IGenericFunction<IPostMessageSyntax<*>,void>} cb 接收到消息的回调函数
     * @returns {cancelCallback} 取消监听事件的函数
     */
  }, {
    key: "on",
    value: function on(cb) {
      var _this3 = this;
      return onMessage(function (event) {
        if (typeof event.data !== 'string' && event.data.type !== 'webpackOk' && !event.data['devtoolsEnabled'] && Message_typeof(event.data) !== 'object') {
          var _event$data, _event$data2;
          console.log('before parse---------------', event.data);
          event.data.data = event.data.data ? JSON.parse(event.data) : {};
          if ((event === null || event === void 0 ? void 0 : (_event$data = event.data) === null || _event$data === void 0 ? void 0 : _event$data.belong) === _this3.tag && ((_event$data2 = event.data) === null || _event$data2 === void 0 ? void 0 : _event$data2.response) === false) {
            console.log('after response---------------------', event.data, _this3.appCode);
            cb(event.data.data);
          }
        }
      });
    }
    /**
     * 销毁连接器
     */
  }, {
    key: "destory",
    value: function destory() {
      this._cancel();
    }
  }]);
  return Message;
}();
;// CONCATENATED MODULE: ./src/core/Channel.default.js
/**@description 支持的事件类型的集合 */
var SUPPORT_MESSAGE_TYPE = ['state', 'config', 'callback', 'emit', 'register', 'unregister'];
var DEFAULT_GLOBAL_CONFIG = 'URL_CONFIG';
;// CONCATENATED MODULE: ./src/core/Channel.js
function Channel_typeof(obj) { "@babel/helpers - typeof"; return Channel_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Channel_typeof(obj); }
function Channel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Channel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Channel_toPropertyKey(descriptor.key), descriptor); } }
function Channel_createClass(Constructor, protoProps, staticProps) { if (protoProps) Channel_defineProperties(Constructor.prototype, protoProps); if (staticProps) Channel_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Channel_toPropertyKey(arg) { var key = Channel_toPrimitive(arg, "string"); return Channel_typeof(key) === "symbol" ? key : String(key); }
function Channel_toPrimitive(input, hint) { if (Channel_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Channel_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function Channel_get() { if (typeof Reflect !== "undefined" && Reflect.get) { Channel_get = Reflect.get.bind(); } else { Channel_get = function _get(target, property, receiver) { var base = Channel_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return Channel_get.apply(this, arguments); }
function Channel_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = Channel_getPrototypeOf(object); if (object === null) break; } return object; }
function Channel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) Channel_setPrototypeOf(subClass, superClass); }
function Channel_setPrototypeOf(o, p) { Channel_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Channel_setPrototypeOf(o, p); }
function Channel_createSuper(Derived) { var hasNativeReflectConstruct = Channel_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Channel_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Channel_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Channel_possibleConstructorReturn(this, result); }; }
function Channel_possibleConstructorReturn(self, call) { if (call && (Channel_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return Channel_assertThisInitialized(self); }
function Channel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function Channel_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function Channel_getPrototypeOf(o) { Channel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Channel_getPrototypeOf(o); }




/**@type {Map<microAppCode,microAppContext>} */
var microAppMap = new Map();
/**@type {WeakMap<microAppContext,microAppCode>} */
var microAppElMap = new WeakMap();
/**
 * @typedef {Map<microAppContext,object>} IStateMap
 * @description 组件状态Map
 * @type {IStateMap}
 */
var stateMap = new Map();

/**
 * @class Channel
 */
var Channel = /*#__PURE__*/function (_Message) {
  Channel_inherits(Channel, _Message);
  var _super = Channel_createSuper(Channel);
  /**
   * @description 新建一个目标连接频道
   * @constructor
   * @param { Window | windowContent} target 目标上下文
   * @param {ChannelOpts} options 其它参数
   */
  function Channel(target) {
    var _this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Channel_classCallCheck(this, Channel);
    _this = _super.call(this, target, options);
    _this.appCode = options.appCode;
    _this.localStorageName = options.localStorageName || 'globalConfig';
    _this._configResponse(Channel_assertThisInitialized(_this));
    _this._stateResponse(Channel_assertThisInitialized(_this));
    return _this;
  }

  /**
   * !应用注册的主要逻辑
   * @description 设置当前应用的AppCode
   * @param {string} val
   * @returns {void}
   */
  Channel_createClass(Channel, [{
    key: "setAppCode",
    value: function setAppCode(val) {
      var _this$__pageHideCance,
        _this$__maintainCance,
        _this2 = this;
      this.appCode = val;
      // todo 当前应用不是子应用，则向主应用注册
      (_this$__pageHideCance = this.__pageHideCancel) === null || _this$__pageHideCance === void 0 ? void 0 : _this$__pageHideCance.call(this);
      (_this$__maintainCance = this.__maintainCancel) === null || _this$__maintainCance === void 0 ? void 0 : _this$__maintainCance.call(this);
      // todo 自动向父级注册
      if (window.parent !== window) {
        window.parent.postMessage('message', '*');
        this.send(window.parent, {
          target: 'parent',
          type: 'register'
        }) //todo 自动拉取全局应用配置
        .then(function (res) {
          return _this2.send(window.parent, {
            target: 'main',
            type: 'config'
          });
        }) //todo 本地持久化
        .then(function (res) {
          localStorage.setItem(_this2.localStorageName, JSON.stringify(res.data));
        });
      }
      // todo 维护子应用注册表
      this.__maintainCancel = this.on(function (res) {
        var microAppCode = res.sourceCode;
        if (res.type === 'register') {
          //todo 注册
          var el = document.getElementById('gislife-' + microAppCode);
          if (el) {
            _this2.registerApp(microAppCode, el);
          } else {
            console.error('register error, can not find element');
          }
        }
      });
      // todo 消息派发的主要逻辑
      this.__cancelPassive = this._onPassive();
    }

    /**
     * !消息派发的主要逻辑
     * todo 如果消息没有target 默认target为 main
     * @description 为每条消息带上popSource
     * @param {IPostMessageSyntax<T>} msg
     * @param {?Window} target
     * @returns {Promise<IPostMessageSyntax<T>>}
     */
  }, {
    key: "send",
    value: function send(target, msg) {
      var _this3 = this;
      msg.sourceCode = msg.sourceCode === undefined ? this.appCode : msg.sourceCode;
      msg.pop = msg.pop === undefined ? true : msg.pop;
      //todo 如果target不存在于当前Map则向全局发送消息
      if (!target) {
        var parent = window.parent !== window ? [window.parent] : [];
        var sibling = [];
        microAppMap.forEach(function (value, key) {
          sibling.push(value.contentWindow);
        });
        return Promise.all(parent.concat(sibling).map(function (tar) {
          return Channel_get(Channel_getPrototypeOf(Channel.prototype), "send", _this3).call(_this3, tar, msg);
        }));
      } else {
        // todo如果target是'main'则直接向上传递消息；
        return Channel_get(Channel_getPrototypeOf(Channel.prototype), "send", this).call(this, target, msg);
      }
    }
    /**
     * todo 响应自己的消息，如果不是自己的消息则传递消息
     * @description 监听消息，并在自动取消监听
     * @param {IGenericFunction<IPostMessageSyntax<*>,void>} cb 监听到消息的回调函数
     * @param { Vue.Component } context 组件上下文
     * @returns {cancelCallback} 取消监听的回调函数
     */
  }, {
    key: "on",
    value: function on(cb) {
      var _this4 = this;
      return Channel_get(Channel_getPrototypeOf(Channel.prototype), "on", this).call(this, function (msg) {
        // todo 如果消息的目标是当前目标或者为'parent'，则直接响应消息
        if (msg.target === _this4.appCode || msg.target === 'parent' || msg.target === 'global') {
          cb(msg);
        }
      });
    }

    /**
     * @description 注册子应用
     * @param {string} appCode 子应用Code
     * @param {HTMLIFrameElement} target 子应用Iframe元素
     */
  }, {
    key: "registerApp",
    value: function registerApp(appCode, target) {
      if (microAppMap.has(appCode)) return;
      console.log('registerApp---------------', appCode, microAppMap);
      microAppMap.set(appCode, target);
      microAppElMap.set(target, appCode);
    }
    /**
     * @description 取消注册子应用
     * @param {string} appCode 子应用Code
     */
  }, {
    key: "unRegisterApp",
    value: function unRegisterApp(appCode) {
      console.log('unRegisterApp---------------', appCode, microAppMap);
      return microAppMap["delete"](appCode);
    }
    /**
     * @typedef {[string,HTMLIFrameElement] } targetLike
     * @param {targetLike | undefined} target
     */
  }, {
    key: "getApp",
    value: function getApp(target) {
      var res;
      if (target instanceof HTMLIFrameElement) {
        var tarCode = microAppElMap.get(target);
        if (tarCode) res = [tarCode, tar];
      }
      if (typeof target === 'string') {
        var _tar = microAppMap.get(target);
        if (_tar) res = [target, _tar];
      }
      console.log('getApp---------------------', target, res, microAppMap);
      if (!res) console.warn('getApp error,target named:', target, microAppMap);
      return res;
    }
    /**
     * @description 销毁实例，取消事件监听
     */
  }, {
    key: "destory",
    value: function destory() {
      this.__maintainCancel();
      this.__pageHideCancel();
      Channel_get(Channel_getPrototypeOf(Channel.prototype), "destory", this).call(this);
    }

    /**
     * @param {microAppCode} microAppCode
     * @returns {object | undefined}
     */
  }, {
    key: "getState",
    value: function getState(microAppCode) {
      var res;
      res = stateMap.get(microAppCode);
      return res;
    }
    /**
     *
     * @param {microAppCode} microAppCode
     * @param {object} state
     * @returns {IStateMap}
     */
  }, {
    key: "setState",
    value: function setState(microAppCode, state) {
      return stateMap.set(microAppCode, state);
    }
    /**
     * @description
     * @param {Channel} context
     */
  }, {
    key: "_configResponse",
    value: function _configResponse(context) {
      var _this5 = this;
      context.defaultResponseInterceptor.push(function (data) {
        var _data$data;
        if ((data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.type) === 'config') {
          //todo 传递config
          var config = JSON.parse(localStorage.getItem(_this5.localStorageName));
          data.data.data = window[DEFAULT_GLOBAL_CONFIG] || config;
        }
        return data;
      });
    }
  }, {
    key: "_onPassive",
    value: function _onPassive() {
      var _this6 = this;
      return Channel_get(Channel_getPrototypeOf(Channel.prototype), "on", this).call(this, function (msg) {
        // todo 传递消息
        if (msg.target !== 'parent' && msg.target !== _this6.appCode && msg.type !== 'state') {
          if (_this6.appCode === 'main') msg.pop = false;
          // todo 如果是main,则向上传递；如果不是，则全局传递
          if (msg.target === 'main') {
            if (window.parent !== window) _this6.send(window.parent, msg);
          } else {
            // todo 如果不是，则需要向sibling和parent同时传递
            microAppMap.forEach(function (tar, tarCode) {
              if (tarCode !== msg.sourceCode) {
                _this6.send(tar.contentWindow, msg);
              }
            });
            if (window.parent !== window && msg.pop === true) {
              _this6.send(window.parent, msg);
            }
          }
        }
      });
    }

    /**
     * @description 响应onStaet第一次请求数据
     * @param {Channel} context
     */
  }, {
    key: "_stateResponse",
    value: function _stateResponse(context) {
      return context.defaultResponseInterceptor.use(function (msg) {
        if (msg.data.type === 'state') {
          msg.data.data = stateMap.get(msg.data.sourceCode);
        }
        return msg;
      });
    }
  }]);
  return Channel;
}(Message);
;// CONCATENATED MODULE: ./src/ApplicationChannel.js
function ApplicationChannel_typeof(obj) { "@babel/helpers - typeof"; return ApplicationChannel_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, ApplicationChannel_typeof(obj); }
function ApplicationChannel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function ApplicationChannel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, ApplicationChannel_toPropertyKey(descriptor.key), descriptor); } }
function ApplicationChannel_createClass(Constructor, protoProps, staticProps) { if (protoProps) ApplicationChannel_defineProperties(Constructor.prototype, protoProps); if (staticProps) ApplicationChannel_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function ApplicationChannel_toPropertyKey(arg) { var key = ApplicationChannel_toPrimitive(arg, "string"); return ApplicationChannel_typeof(key) === "symbol" ? key : String(key); }
function ApplicationChannel_toPrimitive(input, hint) { if (ApplicationChannel_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (ApplicationChannel_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function ApplicationChannel_get() { if (typeof Reflect !== "undefined" && Reflect.get) { ApplicationChannel_get = Reflect.get.bind(); } else { ApplicationChannel_get = function _get(target, property, receiver) { var base = ApplicationChannel_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return ApplicationChannel_get.apply(this, arguments); }
function ApplicationChannel_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = ApplicationChannel_getPrototypeOf(object); if (object === null) break; } return object; }
function ApplicationChannel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) ApplicationChannel_setPrototypeOf(subClass, superClass); }
function ApplicationChannel_setPrototypeOf(o, p) { ApplicationChannel_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ApplicationChannel_setPrototypeOf(o, p); }
function ApplicationChannel_createSuper(Derived) { var hasNativeReflectConstruct = ApplicationChannel_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = ApplicationChannel_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = ApplicationChannel_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return ApplicationChannel_possibleConstructorReturn(this, result); }; }
function ApplicationChannel_possibleConstructorReturn(self, call) { if (call && (ApplicationChannel_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return ApplicationChannel_assertThisInitialized(self); }
function ApplicationChannel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function ApplicationChannel_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function ApplicationChannel_getPrototypeOf(o) { ApplicationChannel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ApplicationChannel_getPrototypeOf(o); }



/**
 * @class ApplicationChannel
 */
var ApplicationChannel = /*#__PURE__*/function (_Channel) {
  ApplicationChannel_inherits(ApplicationChannel, _Channel);
  var _super = ApplicationChannel_createSuper(ApplicationChannel);
  /**
   * @description 新建一个目标连接频道
   * @constructor
   * @param { window | windowContent} target 目标上下文
   * @param {ChannelOpts} options 其它参数
   */
  function ApplicationChannel(target, options) {
    ApplicationChannel_classCallCheck(this, ApplicationChannel);
    return _super.call(this, target, options);
  }
  /**
   * @description 处理多条件参数
   * @param {IPostMessageSyntax<T> & {target:HTMLIFrameElement}} msg
   * @returns {Promise<IPostMessageSyntax<T>>}
   */
  ApplicationChannel_createClass(ApplicationChannel, [{
    key: "$send",
    value: function $send(msg) {
      var target;
      if (!msg.target || !msg.type) throw Error('message syntax error');
      var msgTarget = msg.target;
      //todo main parent发送
      if ((msgTarget === 'main' || msgTarget === 'parent') && window.parent !== window) {
        target = window.parent;
        return ApplicationChannel_get(ApplicationChannel_getPrototypeOf(ApplicationChannel.prototype), "send", this).call(this, target, msg);
      }
      // todo如果target是HTMLIFrameElement
      // todo直接发送消息，且将target自动替换为对应的appCode
      var targetLike = this.getApp(msgTarget);
      if (msgTarget instanceof HTMLIFrameElement && targetLike) {
        msg.target = targetLike[0];
        target = msgTarget.contentWindow;
      }
      //todo 如果target是appCode则在map中找到对的HTMLIFrameElement
      if (typeof msgTarget === 'string' && targetLike) {
        /**@type HTMLIFrameElement */
        var tar = targetLike[1];
        target = tar.contentWindow;
      }
      if (!target) console.warn('current layer target not exist', msg);
      return ApplicationChannel_get(ApplicationChannel_getPrototypeOf(ApplicationChannel.prototype), "send", this).call(this, target, msg);
    }
    /**
     * @param {Vue.Component} context
     * @param {PostMessageType | IGenericFunction<IPostMessageSyntax<IUserData>,any>} type
     * @param {IGenericFunction<IPostMessageSyntax<IUserData>,any> | IGenericFunction<IUserData,any>} cb
     */
  }, {
    key: "$on",
    value: function $on(context, type, cb) {
      var onCancel;
      if (!(typeof type === 'string' || typeof type === 'function')) {
        throw Error('type parma type error');
      }
      if (context) {
        context.$on('hook:beforeDestory', function () {
          var _onCancel;
          (_onCancel = onCancel) === null || _onCancel === void 0 ? void 0 : _onCancel();
        });
      }
      if (typeof type === 'function') {
        onCancel = ApplicationChannel_get(ApplicationChannel_getPrototypeOf(ApplicationChannel.prototype), "on", this).call(this, function (msg) {
          type(msg);
        });
        return onCancel;
      }
      onCancel = ApplicationChannel_get(ApplicationChannel_getPrototypeOf(ApplicationChannel.prototype), "on", this).call(this, function (msg) {
        if (msg.type === type) {
          cb(msg.data);
        }
      });
      return onCancel;
    }

    /**
     * @description 发送回调消息
     * @param { string } target 目标应用CODE
     * @param { function } cb 回调函数
     * @param { object | null} params 回调函数参数
     * @returns { promise }
     */
  }, {
    key: "sendCallback",
    value: function sendCallback(target, cb, params) {
      if (typeof cb !== 'function' || params === undefined) {
        throw Error('callback or params type error');
      }
      if (!target) {
        throw Error('missing target');
      }
      return this.$send({
        type: 'callback',
        target: target,
        data: {
          callback: cb.toString(),
          params: params
        }
      });
    }
    /**
     * @description 接收消息
     * @param {IGenericFunction<Function,any>} cb 接收消息的回调函数
     * @param { Vue.Component } context 组件上下文
     * @returns {cancelCallback} 取消回调的函数
     */
  }, {
    key: "onCallback",
    value: function onCallback(context, cb) {
      return this.$on(context, function (msg) {
        if (msg.type === 'callback') {
          var data = msg.data;
          if (data.params !== null) {
            var paramsName = Object.keys(data.params);
            var paramsValue = Object.values(data.params);
            var func = Function.apply(void 0, paramsName.concat(["(".concat(data.callback, ")(").concat(paramsName.join(','), ")")]));
            cb(function (ctx) {
              func.apply(ctx, paramsValue);
            });
          } else {
            var _func = Function("(".concat(data.callback, ")()"));
            cb(function (ctx) {
              _func.apply(ctx);
            });
          }
        }
      });
    }

    /**
     * @description 获取远程全局配置
     * @returns {Promise<object>}
     */
  }, {
    key: "getConfig",
    value: function getConfig() {
      var cfg = localStorage.getItem(this.localStorageName);
      if (cfg) {
        var config = JSON.parse(cfg);
        return Promise.resolve(config);
      } else {
        return this.$send({
          type: 'config',
          target: 'main'
        });
      }
    }
    /**
     * @description 发送配置，只能以code方式发送，为了避免子应用未注册造成的消息丢失
     * @param {string} microAppCode
     * @param {object} state
     */
  }, {
    key: "sendState",
    value: function sendState(microAppCode, state) {
      this.setState(microAppCode, state);
      return this.$send({
        type: 'state',
        target: microAppCode,
        data: state
      });
    }
    /**
     * @description 接收消息 T为消息的具体格式
     * @template T
     * @param {IGenericFunction<T,any>} cb 接收消息的回调函数
     * @param { Vue.Component } context 组件上下文
     * @returns {cancelCallback} 取消回调的函数
     */
  }, {
    key: "onState",
    value: function onState(cb, context) {
      this.$send({
        target: 'parent',
        type: 'state'
      }).then(function (res) {
        return cb(res.data);
      });
      return this.$on(context, function (msg) {
        if (msg.type === 'state') {
          var data = msg.data;
          cb(data);
        }
      });
    }
  }]);
  return ApplicationChannel;
}(Channel);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/microApp.vue?vue&type=template&id=0179a1d4&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("iframe", {
    ref: "window",
    staticClass: "gislife-micro-app",
    "class": _vm.classNmae,
    attrs: {
      title: _vm.id,
      src: _vm.buildSrc(_vm.src),
      id: _vm.id
    }
  });
};
var staticRenderFns = [];
render._withStripped = true;

;// CONCATENATED MODULE: ./src/microApp.vue?vue&type=template&id=0179a1d4&

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/microApp.vue?vue&type=script&lang=js&
function microAppvue_type_script_lang_js_typeof(obj) { "@babel/helpers - typeof"; return microAppvue_type_script_lang_js_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, microAppvue_type_script_lang_js_typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == microAppvue_type_script_lang_js_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* harmony default export */ const microAppvue_type_script_lang_js_ = ({
  name: "microApp",
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true
    },
    microAppCode: {
      type: String,
      required: true
    },
    state: {
      type: Object
    },
    classNmae: String
  },
  data: function data() {
    return {
      id: 'gislife-' + this.microAppCode
    };
  },
  watch: {
    state: {
      deep: true,
      immediate: true,
      handler: function handler(val) {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var connector;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return requestDom(_this.id, function (el) {
                  return el && el.contentWindow;
                });
              case 2:
                /**@type ConnectChannel */
                connector = _this.$connector;
                connector.sendState(_this.microAppCode, val);
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$connector.unRegisterApp(this.microAppCode);
  },
  methods: {
    buildSrc: function buildSrc(src) {
      var hasParam = src.includes('?');
      return src + (hasParam ? '&' : '?') + 'microAppCode=' + this.microAppCode;
    }
  }
});
;// CONCATENATED MODULE: ./src/microApp.vue?vue&type=script&lang=js&
 /* harmony default export */ const src_microAppvue_type_script_lang_js_ = (microAppvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-2.use[1]!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/microApp.vue?vue&type=style&index=0&id=0179a1d4&lang=css&
var microAppvue_type_style_index_0_id_0179a1d4_lang_css_ = __webpack_require__("./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-2.use[1]!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/microApp.vue?vue&type=style&index=0&id=0179a1d4&lang=css&");
var microAppvue_type_style_index_0_id_0179a1d4_lang_css_default = /*#__PURE__*/__webpack_require__.n(microAppvue_type_style_index_0_id_0179a1d4_lang_css_);
;// CONCATENATED MODULE: ./node_modules/style-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-2.use[1]!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-2.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/microApp.vue?vue&type=style&index=0&id=0179a1d4&lang=css&

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()((microAppvue_type_style_index_0_id_0179a1d4_lang_css_default()), options);




       /* harmony default export */ const lib_vue_loader_options_src_microAppvue_type_style_index_0_id_0179a1d4_lang_css_ = ((microAppvue_type_style_index_0_id_0179a1d4_lang_css_default()) && (microAppvue_type_style_index_0_id_0179a1d4_lang_css_default()).locals ? (microAppvue_type_style_index_0_id_0179a1d4_lang_css_default()).locals : undefined);

;// CONCATENATED MODULE: ./src/microApp.vue?vue&type=style&index=0&id=0179a1d4&lang=css&

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/microApp.vue



;


/* normalize component */

var component = normalizeComponent(
  src_microAppvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/microApp.vue"
/* harmony default export */ const microApp = (component.exports);
;// CONCATENATED MODULE: ./src/index.js
/**
 * @author dengtao
 * @version 1.0.0
 */




/**
 * @typedef ParamsType
 * @type {object}
 * @property {string} appCode
 * @property {string} microAppCode
 */
var connector = new ApplicationChannel();

/* harmony default export */ const src = ({
  install: function install(vue) {
    if (window.parent !== window) {
      // TODO 获取子应用AppCode
      /**@type ParamsType */
      var params = getParams(window.location);
      // ! 子应用
      connector.setAppCode(params.microAppCode);
    } else {
      // ! 主应用
      connector.setAppCode('main');
    }
    Object.defineProperty(vue.prototype, '$connector', {
      get: function get() {
        return connector;
      },
      set: function set(v) {
        throw Error("$connector can't set value");
      }
    });
    vue.component(microApp.name, microApp);
  }
});
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=micro-message.js.map