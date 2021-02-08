(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scroll"] = factory();
	else
		root["CoCreate"] = root["CoCreate"] || {}, root["CoCreate"]["scroll"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "../CoCreate-components/CoCreate-scroll/src/CoCreate-scroll.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../CoCreate-components/CoCreate-scroll/src/CoCreate-scroll.js":
/*!*********************************************************************!*\
  !*** ../CoCreate-components/CoCreate-scroll/src/CoCreate-scroll.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar CoCreateScroll = {\n  delta: 3,\n  observer: null,\n  init: function init() {\n    this.__initIntersectionObserver();\n\n    this.initElement(document);\n  },\n  initElement: function initElement(container) {\n    var mainContainer = container || document;\n    var self = this;\n\n    if (!mainContainer.querySelectorAll) {\n      return;\n    }\n\n    var elements = mainContainer.querySelectorAll(\"[data-scroll]\");\n\n    if (elements.length === 0 && mainContainer != document && mainContainer.hasAttributes(\"[data-scroll]\")) {\n      elements = [mainContainer];\n    }\n\n    elements.forEach(function (element) {\n      return self.__initElementEvent(element);\n    });\n  },\n  __initElementEvent: function __initElementEvent(element) {\n    var self = this;\n\n    var upSize = this.__getSize(element.dataset['scroll_up']);\n\n    var downSize = this.__getSize(element.dataset['scroll_down']);\n\n    var attrName = element.dataset['scroll_attribute'] || 'class';\n    var targetSelector = element.dataset['scroll_target'];\n    var intersectValue = element.dataset['scroll_intersect'];\n    var values = element.getAttribute('data-scroll') || \"\";\n    values = values.split(\",\").map(function (x) {\n      return x.trim();\n    });\n    var scrollInfo = {\n      attrName: attrName,\n      values: values,\n      upSize: upSize,\n      downSize: downSize,\n      scrollTop: element.dataset['scroll_top'],\n      scrollBottom: element.dataset['scroll_bottom'],\n      scrolling: element.dataset['scrolling']\n    };\n    var elements = [element];\n\n    if (targetSelector) {\n      elements = document.querySelectorAll(targetSelector);\n    }\n\n    elements.forEach(function (el) {\n      el.scrollStatus = {\n        currentPos: 0\n      };\n    });\n    var timer = null;\n    window.addEventListener('scroll', function (event) {\n      if (!element.scrollStatus) return;\n\n      if (Math.abs(window.scrollY - element.scrollStatus.currentPos) <= self.delta) {\n        return;\n      }\n\n      if (timer != null) {\n        clearTimeout(timer);\n      }\n\n      elements.forEach(function (el) {\n        self.__runScrollEvent(el, scrollInfo);\n\n        self.__setScrolling(el, scrollInfo, false);\n      });\n      timer = setTimeout(function () {\n        elements.forEach(function (el) {\n          self.__setScrolling(el, scrollInfo, true);\n        });\n      }, 500);\n    });\n\n    if (intersectValue && window.IntersectionObserver && this.observer) {\n      this.observer.observe(element);\n    }\n  },\n  __initIntersectionObserver: function __initIntersectionObserver() {\n    var self = this;\n    this.observer = new IntersectionObserver(function (entries) {\n      entries.forEach(function (entry) {\n        var element = entry.target;\n        var attrName = element.dataset['scroll_attribute'] || 'class';\n        var targetSelector = element.dataset['scroll_target'];\n        var intersectValue = element.dataset['scroll_intersect'];\n        var targetElements = [element];\n\n        if (targetSelector) {\n          targetElements = document.querySelectorAll(targetSelector);\n        }\n\n        if (entry.isIntersecting > 0) {\n          targetElements.forEach(function (el) {\n            return self.__addAttributeValue(el, attrName, intersectValue);\n          });\n        } else {\n          targetElements.forEach(function (el) {\n            return self.__removeAttrbuteValue(el, attrName, intersectValue);\n          });\n        }\n      });\n    });\n  },\n  __setScrolling: function __setScrolling(element, info) {\n    var stopped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n    var scrolling = info.scrolling,\n        attrName = info.attrName;\n\n    if (stopped) {\n      this.__removeAttrbuteValue(element, attrName, scrolling);\n    } else {\n      this.__addAttributeValue(element, attrName, scrolling);\n    }\n  },\n  __runScrollEvent: function __runScrollEvent(element, info) {\n    var currentPos = element.scrollStatus.currentPos;\n    var scrollY = window.scrollY;\n    var upSize = info.upSize,\n        downSize = info.downSize,\n        attrName = info.attrName,\n        values = info.values,\n        scrollTop = info.scrollTop,\n        scrollBottom = info.scrollBottom;\n\n    if (upSize < currentPos - scrollY) {\n      this.__addAttributeValue(element, attrName, values[0]);\n\n      this.__removeAttrbuteValue(element, attrName, values[1]);\n    } else if (downSize < scrollY - currentPos) {\n      this.__removeAttrbuteValue(element, attrName, values[0]);\n\n      this.__addAttributeValue(element, attrName, values[1]);\n    } //. scroll top case\n\n\n    if (scrollY <= this.delta) {\n      this.__removeAttrbuteValue(element, attrName, values[0]);\n\n      this.__removeAttrbuteValue(element, attrName, values[1]);\n\n      this.__addAttributeValue(element, attrName, scrollTop);\n    } else {\n      this.__removeAttrbuteValue(element, attrName, scrollTop);\n    } //. scroll bottom case\n\n\n    if (window.innerHeight + scrollY >= document.body.scrollHeight - this.delta) {\n      // this.__removeAttrbuteValue(element, attrName, values[0]);\n      // this.__removeAttrbuteValue(element, attrName, values[1]);\n      this.__addAttributeValue(element, attrName, scrollBottom);\n    } else {\n      this.__removeAttrbuteValue(element, attrName, scrollBottom);\n    }\n\n    element.scrollStatus.currentPos = scrollY;\n  },\n  __addAttributeValue: function __addAttributeValue(element, attrName, value) {\n    if (!value) return;\n    var check = new RegExp(\"(\\\\s|^)\" + value + \"(\\\\s|$)\");\n    var attrValue = element.getAttribute(attrName) || \"\";\n\n    if (!check.test(attrValue)) {\n      attrValue += \" \" + value;\n      element.setAttribute(attrName, attrValue);\n    }\n  },\n  __removeAttrbuteValue: function __removeAttrbuteValue(element, attrName, value) {\n    if (!value) return;\n    var check = new RegExp(\"(\\\\s|^)\" + value + \"(\\\\s|$)\");\n    var attrValue = element.getAttribute(attrName) || \"\";\n\n    if (check.test(attrValue)) {\n      attrValue = attrValue.replace(check, \" \").trim();\n      element.setAttribute(attrName, attrValue);\n    }\n  },\n  __getSize: function __getSize(attrValue, isWidth) {\n    var size = 0;\n\n    if (!attrValue) {\n      return 0;\n    }\n\n    if (attrValue.includes('%')) {\n      size = attrValue.replace('%', '').trim();\n      size = Number(size) || 0;\n      size = isWidth ? window.innerWidth / size : window.innerHeight / size;\n    } else {\n      size = attrValue.replace('px', '').trim();\n      size = Number(size) || 0;\n    }\n\n    return size;\n  }\n};\nCoCreateScroll.init();\n/* harmony default export */ __webpack_exports__[\"default\"] = (CoCreateScroll);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db0NyZWF0ZS5zY3JvbGwvLi4vQ29DcmVhdGUtY29tcG9uZW50cy9Db0NyZWF0ZS1zY3JvbGwvc3JjL0NvQ3JlYXRlLXNjcm9sbC5qcz9mZDNkIl0sIm5hbWVzIjpbIkNvQ3JlYXRlU2Nyb2xsIiwiZGVsdGEiLCJvYnNlcnZlciIsImluaXQiLCJfX2luaXRJbnRlcnNlY3Rpb25PYnNlcnZlciIsImluaXRFbGVtZW50IiwiZG9jdW1lbnQiLCJjb250YWluZXIiLCJtYWluQ29udGFpbmVyIiwic2VsZiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbGVtZW50cyIsImxlbmd0aCIsImhhc0F0dHJpYnV0ZXMiLCJmb3JFYWNoIiwiZWxlbWVudCIsIl9faW5pdEVsZW1lbnRFdmVudCIsInVwU2l6ZSIsIl9fZ2V0U2l6ZSIsImRhdGFzZXQiLCJkb3duU2l6ZSIsImF0dHJOYW1lIiwidGFyZ2V0U2VsZWN0b3IiLCJpbnRlcnNlY3RWYWx1ZSIsInZhbHVlcyIsImdldEF0dHJpYnV0ZSIsInNwbGl0IiwibWFwIiwieCIsInRyaW0iLCJzY3JvbGxJbmZvIiwic2Nyb2xsVG9wIiwic2Nyb2xsQm90dG9tIiwic2Nyb2xsaW5nIiwiZWwiLCJzY3JvbGxTdGF0dXMiLCJjdXJyZW50UG9zIiwidGltZXIiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJNYXRoIiwiYWJzIiwic2Nyb2xsWSIsImNsZWFyVGltZW91dCIsIl9fcnVuU2Nyb2xsRXZlbnQiLCJfX3NldFNjcm9sbGluZyIsInNldFRpbWVvdXQiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiLCJlbnRyaWVzIiwiZW50cnkiLCJ0YXJnZXQiLCJ0YXJnZXRFbGVtZW50cyIsImlzSW50ZXJzZWN0aW5nIiwiX19hZGRBdHRyaWJ1dGVWYWx1ZSIsIl9fcmVtb3ZlQXR0cmJ1dGVWYWx1ZSIsImluZm8iLCJzdG9wcGVkIiwiaW5uZXJIZWlnaHQiLCJib2R5Iiwic2Nyb2xsSGVpZ2h0IiwidmFsdWUiLCJjaGVjayIsIlJlZ0V4cCIsImF0dHJWYWx1ZSIsInRlc3QiLCJzZXRBdHRyaWJ1dGUiLCJyZXBsYWNlIiwiaXNXaWR0aCIsInNpemUiLCJpbmNsdWRlcyIsIk51bWJlciIsImlubmVyV2lkdGgiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsSUFBTUEsY0FBYyxHQUFHO0FBQ3RCQyxPQUFLLEVBQUUsQ0FEZTtBQUV0QkMsVUFBUSxFQUFFLElBRlk7QUFHdEJDLE1BQUksRUFBRSxnQkFBVztBQUNoQixTQUFLQywwQkFBTDs7QUFDQSxTQUFLQyxXQUFMLENBQWlCQyxRQUFqQjtBQUNBLEdBTnFCO0FBUXRCRCxhQUFXLEVBQUUscUJBQVNFLFNBQVQsRUFBb0I7QUFDaEMsUUFBSUMsYUFBYSxHQUFHRCxTQUFTLElBQUlELFFBQWpDO0FBQ0EsUUFBTUcsSUFBSSxHQUFHLElBQWI7O0FBQ0EsUUFBSSxDQUFDRCxhQUFhLENBQUNFLGdCQUFuQixFQUFxQztBQUNwQztBQUNBOztBQUVELFFBQUlDLFFBQVEsR0FBR0gsYUFBYSxDQUFDRSxnQkFBZCxpQkFBZjs7QUFDQSxRQUFJQyxRQUFRLENBQUNDLE1BQVQsS0FBb0IsQ0FBcEIsSUFBeUJKLGFBQWEsSUFBSUYsUUFBMUMsSUFBc0RFLGFBQWEsQ0FBQ0ssYUFBZCxpQkFBMUQsRUFBd0c7QUFDdkdGLGNBQVEsR0FBRyxDQUFDSCxhQUFELENBQVg7QUFDQTs7QUFFREcsWUFBUSxDQUFDRyxPQUFULENBQWlCLFVBQUNDLE9BQUQ7QUFBQSxhQUFhTixJQUFJLENBQUNPLGtCQUFMLENBQXdCRCxPQUF4QixDQUFiO0FBQUEsS0FBakI7QUFDQSxHQXJCcUI7QUF1QnRCQyxvQkFBa0IsRUFBRSw0QkFBU0QsT0FBVCxFQUFrQjtBQUNyQyxRQUFNTixJQUFJLEdBQUcsSUFBYjs7QUFDQSxRQUFNUSxNQUFNLEdBQUcsS0FBS0MsU0FBTCxDQUFlSCxPQUFPLENBQUNJLE9BQVIsQ0FBZ0IsV0FBaEIsQ0FBZixDQUFmOztBQUNBLFFBQU1DLFFBQVEsR0FBRyxLQUFL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RUFBNkI7QUFDNUJELFVBQUksR0FBR0wsU0FBUyxDQUFDRyxPQUFWLENBQWtCLEdBQWxCLEVBQXVCLEVBQXZCLEVBQTJCdkMsSUFBM0IsRUFBUDtBQUNBeUMsVUFBSSxHQUFHRSxNQUFNLENBQUNGLElBQUQsQ0FBTixJQUFnQixDQUF2QjtBQUVBQSxVQUFJLEdBQUdELE9BQU8sR0FBRy9CLE1BQU0sQ0FBQ21DLFVBQVAsR0FBb0JILElBQXZCLEdBQThCaEMsTUFBTSxDQUFDcUIsV0FBUCxHQUFxQlcsSUFBakU7QUFFQSxLQU5ELE1BTU87QUFDTkEsVUFBSSxHQUFHTCxTQUFTLENBQUNHLE9BQVYsQ0FBa0IsSUFBbEIsRUFBd0IsRUFBeEIsRUFBNEJ2QyxJQUE1QixFQUFQO0FBQ0F5QyxVQUFJLEdBQUdFLE1BQU0sQ0FBQ0YsSUFBRCxDQUFOLElBQWdCLENBQXZCO0FBQ0E7O0FBRUQsV0FBT0EsSUFBUDtBQUNBO0FBN0xxQixDQUF2QjtBQW1NQXRFLGNBQWMsQ0FBQ0csSUFBZjtBQUVlSCw2RUFBZiIsImZpbGUiOiIuLi9Db0NyZWF0ZS1jb21wb25lbnRzL0NvQ3JlYXRlLXNjcm9sbC9zcmMvQ29DcmVhdGUtc2Nyb2xsLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ29DcmVhdGVTY3JvbGwgPSB7XG5cdGRlbHRhOiAzLFxuXHRvYnNlcnZlcjogbnVsbCxcblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5fX2luaXRJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuXHRcdHRoaXMuaW5pdEVsZW1lbnQoZG9jdW1lbnQpXG5cdH0sXG5cdFxuXHRpbml0RWxlbWVudDogZnVuY3Rpb24oY29udGFpbmVyKSB7XG5cdFx0bGV0IG1haW5Db250YWluZXIgPSBjb250YWluZXIgfHwgZG9jdW1lbnQ7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0aWYgKCFtYWluQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0XG5cdFx0bGV0IGVsZW1lbnRzID0gbWFpbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1zY3JvbGxdYCk7XG5cdFx0aWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCAmJiBtYWluQ29udGFpbmVyICE9IGRvY3VtZW50ICYmIG1haW5Db250YWluZXIuaGFzQXR0cmlidXRlcyhgW2RhdGEtc2Nyb2xsXWApKSB7XG5cdFx0XHRlbGVtZW50cyA9IFttYWluQ29udGFpbmVyXTtcblx0XHR9XG5cdFx0XG5cdFx0ZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4gc2VsZi5fX2luaXRFbGVtZW50RXZlbnQoZWxlbWVudCkpO1xuXHR9LFxuXHRcblx0X19pbml0RWxlbWVudEV2ZW50OiBmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0Y29uc3QgdXBTaXplID0gdGhpcy5fX2dldFNpemUoZWxlbWVudC5kYXRhc2V0WydzY3JvbGxfdXAnXSk7XG5cdFx0Y29uc3QgZG93blNpemUgPSB0aGlzLl9fZ2V0U2l6ZShlbGVtZW50LmRhdGFzZXRbJ3Njcm9sbF9kb3duJ10pO1xuXHRcdGNvbnN0IGF0dHJOYW1lID0gZWxlbWVudC5kYXRhc2V0WydzY3JvbGxfYXR0cmlidXRlJ10gfHwgJ2NsYXNzJztcblx0XHRjb25zdCB0YXJnZXRTZWxlY3RvciA9IGVsZW1lbnQuZGF0YXNldFsnc2Nyb2xsX3RhcmdldCddO1xuXHRcdGNvbnN0IGludGVyc2VjdFZhbHVlID0gZWxlbWVudC5kYXRhc2V0WydzY3JvbGxfaW50ZXJzZWN0J11cblx0XHRcblx0XHRsZXQgdmFsdWVzID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsJykgfHwgXCJcIjtcblx0XHR2YWx1ZXMgPSB2YWx1ZXMuc3BsaXQoXCIsXCIpLm1hcCh4ID0+IHgudHJpbSgpKTtcblx0XHRcblx0XHRsZXQgc2Nyb2xsSW5mbyA9IHtcblx0XHRcdGF0dHJOYW1lOiBhdHRyTmFtZSxcblx0XHRcdHZhbHVlczogdmFsdWVzLFxuXHRcdFx0dXBTaXplOiB1cFNpemUsXG5cdFx0XHRkb3duU2l6ZTogZG93blNpemUsXG5cdFx0XHRzY3JvbGxUb3A6IGVsZW1lbnQuZGF0YXNldFsnc2Nyb2xsX3RvcCddLFxuXHRcdFx0c2Nyb2xsQm90dG9tOiBlbGVtZW50LmRhdGFzZXRbJ3Njcm9sbF9ib3R0b20nXSxcblx0XHRcdHNjcm9sbGluZzogZWxlbWVudC5kYXRhc2V0WydzY3JvbGxpbmcnXVxuXHRcdH1cblxuXHRcdGxldCBlbGVtZW50cyA9IFtlbGVtZW50XVxuXHRcdGlmICh0YXJnZXRTZWxlY3Rvcikge1xuXHRcdFx0ZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldFNlbGVjdG9yKTtcblx0XHR9XG5cdFx0XG5cdFx0ZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRlbC5zY3JvbGxTdGF0dXMgPSB7Y3VycmVudFBvczogMH1cblx0XHR9KVxuXHRcdFxuXHRcdGxldCB0aW1lciA9IG51bGw7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRpZiAoIWVsZW1lbnQuc2Nyb2xsU3RhdHVzKSByZXR1cm47XG5cdFx0XHRpZiAoTWF0aC5hYnMod2luZG93LnNjcm9sbFkgLSBlbGVtZW50LnNjcm9sbFN0YXR1cy5jdXJyZW50UG9zKSA8PSBzZWxmLmRlbHRhKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKHRpbWVyICE9IG51bGwpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKVxuXHRcdFx0fVxuXG5cdFx0XHRlbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdFx0XHRzZWxmLl9fcnVuU2Nyb2xsRXZlbnQoZWwsIHNjcm9sbEluZm8pO1xuXHRcdFx0XHRzZWxmLl9fc2V0U2Nyb2xsaW5nKGVsLCBzY3JvbGxJbmZvLCBmYWxzZSk7XG5cdFx0XHR9KVxuXHRcdFx0XG5cdFx0XHR0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGVsZW1lbnRzLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHRcdFx0c2VsZi5fX3NldFNjcm9sbGluZyhlbCwgc2Nyb2xsSW5mbywgdHJ1ZSk7XG5cdFx0XHRcdH0pXG5cdFx0XHR9LCA1MDApXG5cdFx0fSk7XG5cdFx0XG5cdFx0aWYgKGludGVyc2VjdFZhbHVlICYmIHdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlciAmJiB0aGlzLm9ic2VydmVyKSB7XG5cdFx0XHR0aGlzLm9ic2VydmVyLm9ic2VydmUoZWxlbWVudClcblx0XHR9XG5cdH0sXG5cdFxuXHRfX2luaXRJbnRlcnNlY3Rpb25PYnNlcnZlcjogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0dGhpcy5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihlbnRyaWVzID0+IHtcblx0XHRcdGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG5cdFx0XHRcdGxldCBlbGVtZW50ID0gZW50cnkudGFyZ2V0O1xuXHRcdFx0XHRjb25zdCBhdHRyTmFtZSA9IGVsZW1lbnQuZGF0YXNldFsnc2Nyb2xsX2F0dHJpYnV0ZSddIHx8ICdjbGFzcyc7XG5cdFx0XHRcdGNvbnN0IHRhcmdldFNlbGVjdG9yID0gZWxlbWVudC5kYXRhc2V0WydzY3JvbGxfdGFyZ2V0J107XG5cdFx0XHRcdGNvbnN0IGludGVyc2VjdFZhbHVlID0gZWxlbWVudC5kYXRhc2V0WydzY3JvbGxfaW50ZXJzZWN0J11cblx0XHRcblx0XHRcdFx0bGV0IHRhcmdldEVsZW1lbnRzID0gW2VsZW1lbnRdXG5cdFx0XHRcdGlmICh0YXJnZXRTZWxlY3Rvcikge1xuXHRcdFx0XHRcdHRhcmdldEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0YXJnZXRTZWxlY3Rvcik7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoZW50cnkuaXNJbnRlcnNlY3RpbmcgPiAwKSB7XG5cdFx0XHRcdFx0dGFyZ2V0RWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHNlbGYuX19hZGRBdHRyaWJ1dGVWYWx1ZShlbCwgYXR0ck5hbWUsIGludGVyc2VjdFZhbHVlKSlcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0YXJnZXRFbGVtZW50cy5mb3JFYWNoKChlbCkgPT4gc2VsZi5fX3JlbW92ZUF0dHJidXRlVmFsdWUoZWwsIGF0dHJOYW1lLCBpbnRlcnNlY3RWYWx1ZSkpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSk7XG5cdH0sXG5cdFxuXHRfX3NldFNjcm9sbGluZzogZnVuY3Rpb24oZWxlbWVudCwgaW5mbywgc3RvcHBlZCA9IGZhbHNlKSB7XG5cdFx0Y29uc3Qge3Njcm9sbGluZywgYXR0ck5hbWV9ID0gaW5mbztcblx0XHRpZiAoc3RvcHBlZCkge1xuXHRcdFx0dGhpcy5fX3JlbW92ZUF0dHJidXRlVmFsdWUoZWxlbWVudCwgYXR0ck5hbWUsIHNjcm9sbGluZylcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fX2FkZEF0dHJpYnV0ZVZhbHVlKGVsZW1lbnQsIGF0dHJOYW1lLCBzY3JvbGxpbmcpXG5cdFx0fVxuXHR9LFxuXHRcblx0X19ydW5TY3JvbGxFdmVudDogZnVuY3Rpb24oZWxlbWVudCwgaW5mbykge1xuXHRcdFxuXHRcdGNvbnN0IGN1cnJlbnRQb3MgPSBlbGVtZW50LnNjcm9sbFN0YXR1cy5jdXJyZW50UG9zO1xuXHRcdGNvbnN0IHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcblx0XHRjb25zdCB7dXBTaXplLCBkb3duU2l6ZSwgYXR0ck5hbWUsIHZhbHVlcywgc2Nyb2xsVG9wLCBzY3JvbGxCb3R0b219ID0gaW5mbztcblxuXHRcdGlmICh1cFNpemUgPCAoY3VycmVudFBvcyAtIHNjcm9sbFkpKSB7XG5cdFx0XHR0aGlzLl9fYWRkQXR0cmlidXRlVmFsdWUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlc1swXSk7XG5cdFx0XHR0aGlzLl9fcmVtb3ZlQXR0cmJ1dGVWYWx1ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWVzWzFdKTtcblx0XHR9IGVsc2UgaWYgKGRvd25TaXplIDwgKHNjcm9sbFkgLSBjdXJyZW50UG9zKSkge1xuXHRcdFx0dGhpcy5fX3JlbW92ZUF0dHJidXRlVmFsdWUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlc1swXSk7XG5cdFx0XHR0aGlzLl9fYWRkQXR0cmlidXRlVmFsdWUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlc1sxXSk7XG5cdFx0fVxuXHRcdFxuXHRcdC8vLiBzY3JvbGwgdG9wIGNhc2Vcblx0XHRpZiAoc2Nyb2xsWSA8PSB0aGlzLmRlbHRhKSB7XG5cdFx0XHR0aGlzLl9fcmVtb3ZlQXR0cmJ1dGVWYWx1ZShlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWVzWzBdKTtcblx0XHRcdHRoaXMuX19yZW1vdmVBdHRyYnV0ZVZhbHVlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZXNbMV0pO1xuXG5cdFx0XHR0aGlzLl9fYWRkQXR0cmlidXRlVmFsdWUoZWxlbWVudCwgYXR0ck5hbWUsIHNjcm9sbFRvcCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX19yZW1vdmVBdHRyYnV0ZVZhbHVlKGVsZW1lbnQsIGF0dHJOYW1lLCBzY3JvbGxUb3ApO1xuXHRcdH1cblx0XHRcblx0XHQvLy4gc2Nyb2xsIGJvdHRvbSBjYXNlXG5cdFx0aWYgKCh3aW5kb3cuaW5uZXJIZWlnaHQgKyBzY3JvbGxZKSA+PSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCAtIHRoaXMuZGVsdGEpIHtcblx0XHRcdC8vIHRoaXMuX19yZW1vdmVBdHRyYnV0ZVZhbHVlKGVsZW1lbnQsIGF0dHJOYW1lLCB2YWx1ZXNbMF0pO1xuXHRcdFx0Ly8gdGhpcy5fX3JlbW92ZUF0dHJidXRlVmFsdWUoZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlc1sxXSk7XG5cdFx0XHRcblx0XHRcdHRoaXMuX19hZGRBdHRyaWJ1dGVWYWx1ZShlbGVtZW50LCBhdHRyTmFtZSwgc2Nyb2xsQm90dG9tKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fX3JlbW92ZUF0dHJidXRlVmFsdWUoZWxlbWVudCwgYXR0ck5hbWUsIHNjcm9sbEJvdHRvbSk7XG5cdFx0fVxuXHRcdFxuXHRcdGVsZW1lbnQuc2Nyb2xsU3RhdHVzLmN1cnJlbnRQb3MgPSBzY3JvbGxZXHRcblx0fSxcblxuXHRfX2FkZEF0dHJpYnV0ZVZhbHVlOiBmdW5jdGlvbihlbGVtZW50LCBhdHRyTmFtZSwgdmFsdWUpe1xuXHRcdGlmICghdmFsdWUpIHJldHVyblxuXHRcdGxldCBjaGVjayA9IG5ldyBSZWdFeHAoXCIoXFxcXHN8XilcIiArIHZhbHVlICsgXCIoXFxcXHN8JClcIik7XG5cdFx0bGV0IGF0dHJWYWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSB8fCBcIlwiO1xuXHRcdFxuXHRcdGlmKCFjaGVjay50ZXN0KGF0dHJWYWx1ZSkpIHtcblx0XHRcdGF0dHJWYWx1ZSArPSBcIiBcIiArIHZhbHVlO1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG5cdFx0fVx0XHRcblx0fSxcblx0XG5cdF9fcmVtb3ZlQXR0cmJ1dGVWYWx1ZTogZnVuY3Rpb24oZWxlbWVudCwgYXR0ck5hbWUsIHZhbHVlKSB7XG5cdFx0aWYgKCF2YWx1ZSkgcmV0dXJuIFxuXHRcdGxldCBjaGVjayA9IG5ldyBSZWdFeHAoXCIoXFxcXHN8XilcIiArIHZhbHVlICsgXCIoXFxcXHN8JClcIik7XG5cdFx0bGV0IGF0dHJWYWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSB8fCBcIlwiO1xuXHRcdFxuXHRcdGlmKGNoZWNrLnRlc3QoYXR0clZhbHVlKSkge1xuXHRcdFx0YXR0clZhbHVlID0gYXR0clZhbHVlLnJlcGxhY2UoY2hlY2ssIFwiIFwiKS50cmltKCk7XG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcblx0XHR9XG5cdH0sXG5cdFxuXHRfX2dldFNpemU6IGZ1bmN0aW9uKGF0dHJWYWx1ZSwgaXNXaWR0aCkge1xuXHRcdGxldCBzaXplID0gMDtcblx0XHRpZiAoIWF0dHJWYWx1ZSkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChhdHRyVmFsdWUuaW5jbHVkZXMoJyUnKSkge1xuXHRcdFx0c2l6ZSA9IGF0dHJWYWx1ZS5yZXBsYWNlKCclJywgJycpLnRyaW0oKTtcblx0XHRcdHNpemUgPSBOdW1iZXIoc2l6ZSkgfHwgMDtcblx0XHRcdFxuXHRcdFx0c2l6ZSA9IGlzV2lkdGggPyB3aW5kb3cuaW5uZXJXaWR0aCAvIHNpemUgOiB3aW5kb3cuaW5uZXJIZWlnaHQgLyBzaXplO1xuXHRcdFx0XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNpemUgPSBhdHRyVmFsdWUucmVwbGFjZSgncHgnLCAnJykudHJpbSgpO1xuXHRcdFx0c2l6ZSA9IE51bWJlcihzaXplKSB8fCAwO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gc2l6ZTtcblx0fVxuXHRcblxuXHRcbn1cblxuQ29DcmVhdGVTY3JvbGwuaW5pdCgpO1xuXG5leHBvcnQgZGVmYXVsdCBDb0NyZWF0ZVNjcm9sbDsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../CoCreate-components/CoCreate-scroll/src/CoCreate-scroll.js\n");

/***/ })

/******/ })["default"];
});