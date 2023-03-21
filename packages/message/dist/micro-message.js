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
 * @property {boolean} [pop] 是否冒泡
 * @property { string | 'main' } target 发送消息的目标
 * @property { string } [sourceCode] 冒泡消息来源
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
  !*** ./src/index.js + 24 modules ***!
  \***********************************/
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Tools": () => (/* reexport */ tool_namespaceObject),
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
  "isObject": () => (isObject),
  "onLoad": () => (onLoad),
  "onMessage": () => (onMessage),
  "onPageHide": () => (onPageHide),
  "requestDom": () => (requestDom),
  "toObj": () => (toObj)
});

// NAMESPACE OBJECT: ./src/tool.js
var tool_namespaceObject = {};
__webpack_require__.r(tool_namespaceObject);
__webpack_require__.d(tool_namespaceObject, {
  "getConfig": () => (getConfig),
  "onCallback": () => (onCallback),
  "onState": () => (onState),
  "sendCallback": () => (sendCallback)
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
 * @param {IGenericFunction<IMessageEventResponse<*>,*>} cb 回调函数
 * @returns {onCallback} 取消回调的函数
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
;// CONCATENATED MODULE: ./src/util/validator.js
var _toString = Object.prototype.toString;
function isObject(t) {
  return _toString.call(t) === '[object Object]';
}
;// CONCATENATED MODULE: ./src/util/index.js





function toObj(t) {
  return Object.assign({}, t);
}
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
;// CONCATENATED MODULE: ./src/tool.js
function tool_typeof(obj) { "@babel/helpers - typeof"; return tool_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, tool_typeof(obj); }




/**
 * @description 发送回调消息
 * @param { string } target 目标应用CODE
 * @param { function } cb 回调函数
 * @param { object | null} params 回调函数参数
 * @returns { promise }
 */
function sendCallback(target, cb, params) {
  if (typeof cb !== 'function' || params === undefined) {
    throw Error('callback or params type error');
  }
  if (!target) {
    throw Error('missing target');
  }
  return connector.$send({
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
function onCallback(context, cb) {
  if (typeof cb !== 'function') {
    throw Error("onCallback callback param error,current type is ".concat(tool_typeof(cb)));
  }
  var onCancel = connector.on(function (msg) {
    if (msg.type === 'callback') {
      var data = msg.data;
      if (data.params !== null) {
        var paramsName = Object.keys(data.params);
        var paramsValue = Object.values(data.params);
        var func = Function.apply(void 0, paramsName.concat(["(".concat(data.callback, ")(").concat(paramsName.join(','), ")")]));
        cb({
          exec: function exec(ctx) {
            func.apply(ctx, paramsValue);
          },
          responser: responser
        });
      } else {
        var _func = Function("(".concat(data.callback, ")()"));
        cb({
          exec: function exec(ctx) {
            _func.apply(ctx);
          },
          responser: responser
        });
      }
    }
  });
  if (context) {
    context.$on('hook:beforeDestory', onCancel);
  }
  return onCancel;
}

/**
 * @description 获取主应用全局配置
 * @returns {Promise<object>}
 */
function getConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$timeout = options.timeout,
    timeout = _options$timeout === void 0 ? 3 * 1000 : _options$timeout;
  var sendOk = false;
  return new Promise(function (resolve, reject) {
    var id = esm_browser_v4();
    connector.$send({
      target: 'main',
      type: 'config',
      id: id
    });
    var cancel = connector.$on(undefined, function (_ref) {
      var data = _ref.data;
      if (isObject(data) && data.id === id) {
        cancel();
        sendOk = true;
        resolve(data.data);
      }
    });
    setTimeout(function () {
      if (!sendOk) {
        reject('getConfig error');
        cancel();
      }
    }, timeout);
  });
}

/**
 * @description 接收消息 T为消息的具体格式
 * @template T
 * @param {IGenericFunction<T,any>} cb 接收消息的回调函数
 * @param { Vue.Component } context 组件上下文
 * @returns {cancelCallback} 取消回调的函数
 */
function onState(context, cb) {
  if (typeof cb !== 'function') {
    throw Error("onState callback param error,current type is ".concat(tool_typeof(cb)));
  }
  connector.$send({
    target: 'parent',
    type: 'getState'
  }).then(function (res) {
    cb(res.data);
  });
  return connector.$on(context, function (_ref2) {
    var data = _ref2.data;
    if (data.type === 'setState') {
      cb(data.data);
    }
  });
}
;// CONCATENATED MODULE: ./src/core/Message.js
function Message_typeof(obj) { "@babel/helpers - typeof"; return Message_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Message_typeof(obj); }
function Message_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Message_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Message_toPropertyKey(descriptor.key), descriptor); } }
function Message_createClass(Constructor, protoProps, staticProps) { if (protoProps) Message_defineProperties(Constructor.prototype, protoProps); if (staticProps) Message_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Message_toPropertyKey(arg) { var key = Message_toPrimitive(arg, "string"); return Message_typeof(key) === "symbol" ? key : String(key); }
function Message_toPrimitive(input, hint) { if (Message_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Message_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/**
 * @description Message类只提供发送消息和接受消息的方法，只确保发送的消息属于当前命名空间
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
    this.belong = options.namespace || 'gislife';
  }
  /**
   * todo 包裹原生消息发生函数，保证消息唯一性,局部性;
   * @description 发送消息
   * @param {(IMessage<*>&IPostMessageSyntax<*>) | IPostMessageSyntax<*>} msg
   * @param {HTMLIFrameElement.contentWindow} target
   * @returns { Promise<IMessage<*> & IPostMessageSyntax<*>> }
   */
  Message_createClass(Message, [{
    key: "_postMessage",
    value: function _postMessage(msg, target) {
      var _this = this;
      var timeout = msg.timeout || this.timeout;
      var isSendOK = false;
      var id = esm_browser_v4();
      if (target) {
        var sendRes;
        if (msg && msg.id) {
          sendRes = Object.assign(msg, {
            belong: this.belong
          });
        } else {
          sendRes = Object.assign({
            id: id,
            belong: this.belong
          }, msg);
        }
        return new Promise(function (resolve, reject) {
          target.postMessage(sendRes, '*');
          var cancel = _this.__on(function (data) {
            if (isObject(data) && data.id === id && data.belong === _this.belong) {
              isSendOK = true;
              cancel();
              resolve(data);
            }
          });
          setTimeout(function () {
            if (!isSendOK) {
              console.warn('message missing response or response timeout !!!!!!!');
              cancel();
              reject();
            }
          }, timeout);
        });
      } else {
        throw Error("_postmessage target not exist named ".concat(msg.target || msg.data.target, ", message type is ").concat(msg.type, ", source is ").concat(this.appCode));
      }
    }

    /**
     * todo 发送消息
     * @description 发送消息
     * @param {Window} target
     * @param {(IMessage<*>&IPostMessageSyntax<*>) | IPostMessageSyntax<*>} msg 消息体
     * @returns { Promise<IMessage<*> & IPostMessageSyntax<*>> } 回复的消息
     */
  }, {
    key: "__send",
    value: function __send(target, msg) {
      return this._postMessage(msg, target);
    }
    /**
     * @description 监听消息 只监听当前命名空间的消息,且非回复消息
     * @param {IGenericFunction<IMessage<*>&IPostMessageSyntax<*>,void>} cb 接收到消息的回调函数
     * @returns {cancelCallback} 取消监听事件的函数
     */
  }, {
    key: "__on",
    value: function __on(cb) {
      var _this2 = this;
      return onMessage(function (event) {
        if (isObject(event.data) && event.data.belong === _this2.belong) {
          cb(event.data);
        }
      });
    }
  }]);
  return Message;
}();
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
    //*消息转发
    _this._passive();
    //*维护注册表
    _this._maintainRegister();
    return _this;
  }

  /**
   * !消息派发的主要逻辑
   * todo 如果消息没有target 默认target为 main
   * @description 为每条消息带上popSource
   * @param {?Window} target
   * @param {(IMessage<*>&IPostMessageSyntax<*>) | IPostMessageSyntax<*>} msg
   * @returns {Promise<IPostMessageSyntax<T>>}
   */
  Channel_createClass(Channel, [{
    key: "send",
    value: function send(target, msg) {
      var _this2 = this;
      msg.sourceCode = msg.sourceCode === undefined ? this.appCode : msg.sourceCode;
      msg.popSource = msg.popSource === undefined ? this.appCode : msg.popSource;
      msg.pop = this.appCode === 'main' ? false : msg.pop === undefined ? true : false;
      if (target) {
        return Channel_get(Channel_getPrototypeOf(Channel.prototype), "__send", this).call(this, target, msg);
      } else {
        //todo 如果target不存在，则向全局发送消息
        if (window.parent !== window && msg.pop === true) {
          Channel_get(Channel_getPrototypeOf(Channel.prototype), "__send", this).call(this, window.parent, msg);
        }
        microAppMap.forEach(function (value, key) {
          Channel_get(Channel_getPrototypeOf(Channel.prototype), "__send", _this2).call(_this2, value.contentWindow, Object.assign(msg, {
            pop: false
          }));
        });
        return Promise.resolve(undefined);
      }
    }
    /**
     * todo 响应自己的消息，如果不是自己的消息则传递消息
     * @description 监听消息，并在自动取消监听
     * @param {IGenericFunction<IMessage<*>&IPostMessageSyntax<*>,void>} cb 监听到消息的回调函数
     * @param { Vue.Component } context 组件上下文
     * @returns {cancelCallback} 取消监听的回调函数
     */
  }, {
    key: "on",
    value: function on(cb) {
      var _this3 = this;
      return Channel_get(Channel_getPrototypeOf(Channel.prototype), "__on", this).call(this, function (res) {
        if (res.target === _this3.appCode || res.target === 'parent') {
          cb(res);
        }
      });
    }

    /**
     * !应用注册的主要逻辑
     * @description 设置当前应用的AppCode
     * @param {string} val
     * @returns {void}
     */
  }, {
    key: "setAppCode",
    value: function setAppCode(val) {
      this.appCode = val;
      // todo 当前应用不是子应用，则向主应用注册
      // todo 自动向父级注册
      if (window.parent !== window) {
        this.send(window.parent, {
          target: 'parent',
          type: 'register',
          sourceCode: this.appCode,
          pop: false
        });
      }
    }

    /**
     * @description 取消注册子应用
     * @param {string} appCode 子应用Code
     */
  }, {
    key: "unRegisterApp",
    value: function unRegisterApp(appCode) {
      return microAppMap["delete"](appCode);
    }
    /**
     * @typedef {[string,HTMLIFrameElement] } targetLike
     * @param {targetLike | undefined} target
     */
  }, {
    key: "getApp",
    value: function getApp(target) {
      console.warn('------------------register---------------\n');
      return microAppMap.get(target);
    }
    /**
     * @description 注册子应用
     * @param {string} appCode 子应用Code
     * @param {HTMLIFrameElement} target 子应用Iframe元素
     */
  }, {
    key: "registerApp",
    value: function registerApp(appCode, target) {
      microAppMap.set(appCode, target);
    }

    /**
     * @param {microAppCode} microAppCode
     * @returns {object | undefined}
     */
  }, {
    key: "getState",
    value: function getState(microAppCode) {
      return stateMap.get(microAppCode);
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
     * @description 消息传递
     * @returns
     */
  }, {
    key: "_passive",
    value: function _passive() {
      var _this4 = this;
      return Channel_get(Channel_getPrototypeOf(Channel.prototype), "__on", this).call(this, function (msg) {
        // todo 不属于当前appCode的消息传递
        if (msg.target !== _this4.appCode && msg.target !== 'parent') {
          msg.popSource = _this4.appCode;
          // todo 向main發送的消息只向上传递
          if (msg.target === 'main' && window.parent !== window) {
            _this4.send(window.parent, Object.assign(msg, {
              pop: true
            }));
            return;
          }

          // todo 向全局发送的消息，或者向非当前子应用的消息全局传递
          if (msg.target === 'global' || msg.target !== _this4.appCode) {
            //! 如果传递到根节点还未找到
            if (_this4.appCode === 'main') msg.pop = false;
            // todo sibling
            microAppMap.forEach(function (tar, tarCode) {
              if (tarCode !== msg.popSource) {
                _this4.send(tar.contentWindow, Object.assign(msg, {
                  popSource: _this4.appCode,
                  pop: false
                }));
              }
            });
            //todo parent
            if (msg.pop === true && window.parent !== window) {
              _this4.send(window.parent, Object.assign(msg, {
                pop: true
              }));
            }
          }
        }
      });
    }
    /**
     * @description 默认注册事件
     * @returns
     */
  }, {
    key: "_maintainRegister",
    value: function _maintainRegister() {
      var _this5 = this;
      return this.on(function (msg) {
        var microAppCode = msg.sourceCode;
        if (msg.type === 'register' && msg.target === 'parent') {
          //todo 注册
          var el = document.getElementById('gislife-' + microAppCode);
          if (el) {
            _this5.registerApp(microAppCode, el);
          } else {
            throw Error("register error, can not find element named ".concat(microAppCode, "}"));
          }
        }
      });
    }
    /**
     * @description 是否是主应用
     * @returns {boolean}
     */
  }, {
    key: "isMain",
    value: function isMain() {
      return this.appCode === 'main';
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
  function ApplicationChannel(target) {
    var _this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    ApplicationChannel_classCallCheck(this, ApplicationChannel);
    _this = _super.call(this, target, options);
    _this.DEFAULT_GLOBAL_CONFIG = options.configField || 'URL_CONFIG';
    _this._statePersistence();
    return _this;
  }
  /**
   * @description 处理多条件参数
   * @param {IPostMessageSyntax<*> | (IPostMessageSyntax<*> & IMessage<*>)} msg
   * @returns {Promise<IPostMessageSyntax<*> & IMessage<*>>}
   */
  ApplicationChannel_createClass(ApplicationChannel, [{
    key: "$send",
    value: function $send(msg) {
      var target;
      if (!msg.target || !msg.type) throw Error('message syntax error');
      //todo main parent发送
      if (msg.target === 'main' || msg.target === 'parent') {
        if (window.parent === window && msg.target === 'main') {
          throw Error('can not send message to myself');
        }
        return ApplicationChannel_get(ApplicationChannel_getPrototypeOf(ApplicationChannel.prototype), "send", this).call(this, window.parent, msg);
      } else {
        if (msg.type === 'setState') {
          stateMap.set(msg.target, msg.data);
        }
        var targetEl = this.getApp(msg.target);
        if (!targetEl) {
          console.warn("current layer target not exist target named ".concat(msg.target));
        } else {
          target = targetEl.contentWindow;
        }
        return ApplicationChannel_get(ApplicationChannel_getPrototypeOf(ApplicationChannel.prototype), "send", this).call(this, target, msg);
      }
    }
    /**
     * @param {Vue.Component} context
     * @param {PostMessageType | IGenericFunction<{data:IMessage<IPostMessageSyntax<IUserData>>,responser:function},any>} type
     * @param {IGenericFunction<IPostMessageSyntax<IUserData>,any> | IGenericFunction<IUserData,any>} cb
     */
  }, {
    key: "$on",
    value: function $on(context, type, cb) {
      var _this2 = this;
      var onCancel;
      if (cb && typeof cb !== 'function') {
        throw Error("$on callback param error,current type is ".concat(ApplicationChannel_typeof(cb)));
      }
      if (typeof type !== 'string' && typeof type !== 'function') {
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
          var responser = _this2._getResponse(msg);
          type({
            data: msg,
            responser: responser,
            rawData: msg
          });
        });
        return onCancel;
      } else {
        onCancel = ApplicationChannel_get(ApplicationChannel_getPrototypeOf(ApplicationChannel.prototype), "on", this).call(this, function (msg) {
          if (msg.type === type) {
            var responser = _this2._getResponse(msg);
            cb({
              data: msg.data,
              responser: responser,
              rawData: msg
            });
          }
        });
      }
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
      if (typeof cb !== 'function') {
        throw Error("onCallback callback param error,current type is ".concat(ApplicationChannel_typeof(cb)));
      }
      var onCancel = this.$on(null, function (_ref) {
        var data = _ref.data,
          responser = _ref.responser;
        var msg = data;
        if (msg.type === 'callback') {
          var _data = msg.data;
          if (_data.params !== null) {
            var paramsName = Object.keys(_data.params);
            var paramsValue = Object.values(_data.params);
            var func = Function.apply(void 0, paramsName.concat(["(".concat(_data.callback, ")(").concat(paramsName.join(','), ")")]));
            cb({
              exec: function exec(ctx) {
                func.apply(ctx, paramsValue);
              },
              responser: responser
            });
          } else {
            var _func = Function("(".concat(_data.callback, ")()"));
            cb({
              exec: function exec(ctx) {
                _func.apply(ctx);
              },
              responser: responser
            });
          }
        }
      });
      if (context) {
        context.$on('hook:beforeDestory', onCancel);
      }
      return onCancel;
    }

    /**
     * @description 获取主应用全局配置
     * @returns {Promise<object>}
     */
  }, {
    key: "getConfig",
    value: function getConfig() {
      var _this3 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$timeout = options.timeout,
        timeout = _options$timeout === void 0 ? 3 * 1000 : _options$timeout;
      var sendOk = false;
      return new Promise(function (resolve, reject) {
        var id = esm_browser_v4();
        _this3.$send({
          target: 'main',
          type: 'config',
          id: id
        });
        var cancel = _this3.$on(undefined, function (_ref2) {
          var data = _ref2.data;
          if (isObject(data) && data.id === id) {
            cancel();
            sendOk = true;
            resolve(data.data);
          }
        });
        setTimeout(function () {
          if (!sendOk) {
            reject('getConfig error');
            cancel();
          }
        }, timeout);
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
    value: function onState(context, cb) {
      if (typeof cb !== 'function') {
        throw Error("onState callback param error,current type is ".concat(ApplicationChannel_typeof(cb)));
      }
      this.$send({
        target: 'parent',
        type: 'getState'
      }).then(function (res) {
        cb(res.data);
      });
      return this.$on(context, function (_ref3) {
        var data = _ref3.data;
        if (data.type === 'setState') {
          cb(data.data);
        }
      });
    }
    /**
     * @param {IMessage<*>&IPostMessageSyntax<*>} msg
     * @returns {IGenericFunction<IMessage<IPostMessageSyntax<*>>,IMessage<IPostMessageSyntax<*>>>}
     */
  }, {
    key: "_getResponse",
    value: function _getResponse(msg) {
      var _this4 = this;
      return function (data) {
        msg.target = msg.sourceCode;
        msg.sourceCode = _this4.appCode;
        msg.popSource = _this4.appCode;
        return _this4.$send(Object.assign(msg, {
          data: data
        }));
      };
    }
    /**
     * @description main
     * @param {Channel} instance
     */
  }, {
    key: "applicationBootstrap",
    value: function applicationBootstrap() {
      if (window.parent !== window) {
        // TODO 获取子应用AppCode
        /**@type ParamsType */
        var params = getParams(window.location);
        // ! 子应用
        this.setAppCode(params.microAppCode);
      } else {
        // ! 主应用
        this.setAppCode('main');
      }
    }
    /**
     * @description AppCode
     * @returns {string} microAppCode
     */
  }, {
    key: "getMicroAppCode",
    value: function getMicroAppCode() {
      return this.appCode;
    }
    /**
     *
     * @param {string} key
     */
  }, {
    key: "setGlobalConfigField",
    value: function setGlobalConfigField(key) {
      if (key) this.DEFAULT_GLOBAL_CONFIG = key;
    }
  }, {
    key: "_statePersistence",
    value: function _statePersistence() {
      this.$on(null, 'getState', function (_ref4) {
        var responser = _ref4.responser,
          rawData = _ref4.rawData;
        var state = stateMap.get(rawData.sourceCode);
        if (state) responser(state);
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
      handler: function handler(val, oldVal) {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return requestDom(_this.id, function (el) {
                  return el && el.contentWindow;
                });
              case 2:
                if (val != oldVal) {
                  _this.$connector.$send({
                    target: _this.microAppCode,
                    type: 'setState',
                    data: val
                  });
                }
              case 3:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      }
    }
  },
  destroyed: function destroyed() {
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
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (options.configKey) {
      connector.setGlobalConfigField(configKey);
    }
    connector.applicationBootstrap();
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