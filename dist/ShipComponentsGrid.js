(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("react-dom"), require("classnames"), require("masonry-layout"), require("imagesloaded"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "react-dom", "classnames", "masonry-layout", "imagesloaded"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React"), require("react-dom"), require("classnames"), require("masonry-layout"), require("imagesloaded")) : factory(root["React"], root["react-dom"], root["classnames"], root["masonry-layout"], root["imagesloaded"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _masonryLayout = __webpack_require__(4);
	
	var _masonryLayout2 = _interopRequireDefault(_masonryLayout);
	
	var _imagesloaded = __webpack_require__(5);
	
	var _imagesloaded2 = _interopRequireDefault(_imagesloaded);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}
	
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	
	/**
	 * Used for server rendering
	 * @type {Boolean}
	 */
	var isBrowser = typeof window !== 'undefined';
	
	/**
	 * Masonry React Component for dynampic grids
	 */
	
	var Grid = function (_Component) {
	  _inherits(Grid, _Component);
	
	  function Grid(props) {
	    _classCallCheck(this, Grid);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this, props));
	
	    _this.forceLayout = _this.forceLayout.bind(_this);
	    return _this;
	  }
	
	  /**
	   * Setup
	   * @return {[type]} [description]
	   */
	
	  _createClass(Grid, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.masonry || this.props.disabled || !isBrowser) {
	        return;
	      }
	
	      var el = _reactDom2.default.findDOMNode(this.refs.container);
	
	      // create masonry for specified container
	      this.masonry = new _masonryLayout2.default(el, {
	        transitionDuration: 0,
	        fitWidth: this.props.fitWidth,
	        itemSelector: this.props.itemSelector,
	        columnWidth: this.props.columnWidth,
	        percentPosition: this.props.percentPosition
	      });
	
	      // relayout when images are loaded
	      if (this.props.imagesLoaded) {
	        this.reloadWhenImagesAreLoaded();
	      } else {
	        this.masonry.layout();
	      }
	    }
	
	    /**
	     * Update
	     */
	
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (!this.masonry || !isBrowser) {
	        return;
	      }
	
	      // reload all items in container (bad for performance - should find a way
	      // to append/prepend by disabling react render)
	      this.masonry.reloadItems();
	
	      // relayout after reloading items
	      this.masonry.layout();
	
	      // relayout again when images are loaded
	      if (this.props.imagesLoaded) {
	        this.reloadWhenImagesAreLoaded();
	      }
	
	      // force resize event
	      setTimeout(function () {
	        window.dispatchEvent(new Event('resize'));
	      }, 1);
	    }
	
	    /**
	     * Allow external components to froce the layout to update
	     */
	
	  }, {
	    key: 'forceLayout',
	    value: function forceLayout() {
	      this.masonry.layout();
	    }
	
	    /**
	     * Check if images are loaded yet
	     */
	
	  }, {
	    key: 'reloadWhenImagesAreLoaded',
	    value: function reloadWhenImagesAreLoaded() {
	      var _this2 = this;
	
	      if (!isBrowser) {
	        return;
	      }
	
	      var el = _reactDom2.default.findDOMNode(this.refs.container);
	      (0, _imagesloaded2.default)(el, function () {
	        _this2.masonry.layout();
	      });
	    }
	
	    /**
	     * Render
	     * @return {React}
	     */
	
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      return _react2.default.createElement(this.props.component, {
	        className: (0, _classnames2.default)('ship-components-grid', this.props.className),
	        ref: 'container'
	      }, _react2.default.Children.map(this.props.children, function (child) {
	        if (!child) {
	          return child;
	        }
	
	        // Inject itemSelector class
	        return _react2.default.cloneElement(child, {
	          className: (0, _classnames2.default)(child.props.className, _this3.props.itemSelector.substr(1, _this3.props.itemSelector.length - 1))
	        });
	      }));
	    }
	  }]);
	
	  return Grid;
	}(_react.Component);
	
	/**
	 * Defaults
	 * @type {Object}
	 */
	
	exports.default = Grid;
	Grid.defaultProps = {
	  imagesLoaded: false,
	  fitWidth: false,
	  itemSelector: '.ship-components-grid--item',
	  component: 'div',
	  percentPosition: false
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ShipComponentsGrid.js.map