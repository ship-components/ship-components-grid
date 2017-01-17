(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("classnames"), require("masonry-layout"), require("imagesloaded"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "classnames", "masonry-layout", "imagesloaded"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React"), require("classnames"), require("masonry-layout"), require("imagesloaded")) : factory(root["React"], root["classnames"], root["masonry-layout"], root["imagesloaded"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
	
	var _classnames = __webpack_require__(2);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _masonryLayout = __webpack_require__(3);
	
	var _masonryLayout2 = _interopRequireDefault(_masonryLayout);
	
	var _imagesloaded = __webpack_require__(4);
	
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
	
	    // Ensure the right contexts
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this, props));
	
	    _this._resizeHandler = _this._resizeHandler.bind(_this);
	    _this.forceLayout = _this.forceLayout.bind(_this);
	    _this.setupMasonry = _this.setupMasonry.bind(_this);
	    _this.destroyMasonry = _this.destroyMasonry.bind(_this);
	    return _this;
	  }
	
	  /**
	   * Setup
	   */
	
	  _createClass(Grid, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (!isBrowser) {
	        return;
	      }
	
	      // Bind resize so we can make responsive checks
	      window.addEventListener('resize', this._resizeHandler);
	
	      if (typeof this.props.minWidth !== 'number' || this.props.minWidth <= 0) {
	        this.setupMasonry();
	      } else {
	        this._resizeHandler();
	      }
	    }
	
	    /**
	     * Disable masonry if we switch to disable mode
	     */
	
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.masonry && this.props.disabled === false && nextProps.disabled === true) {
	        this.destroyMasonry();
	      } else if (!this.masonry && this.props.disabled === true && nextProps.disabled === false) {
	        this.setupMasonry();
	      }
	    }
	
	    /**
	     * Updates
	     */
	
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (this.props.disabled || !this.masonry || !isBrowser) {
	        return;
	      }
	
	      // reload all items in container (bad for performance - should find a way
	      // to append/prepend by disabling react render)
	      this.masonry.reloadItems();
	
	      if (this.props.imagesLoaded) {
	        // relayout again when images are loaded
	        this.reloadWhenImagesAreLoaded();
	      } else {
	        // relayout after reloading items
	        this.masonry.layout();
	      }
	
	      // force resize event
	      setTimeout(function () {
	        window.dispatchEvent(new Event('resize'));
	      }, 1);
	    }
	
	    /**
	     * Cleanup
	     */
	
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this._resizeHandler);
	      this.destroyMasonry();
	    }
	
	    /**
	     * Setup masonry but only if were not already setup or disabled
	     */
	
	  }, {
	    key: 'setupMasonry',
	    value: function setupMasonry() {
	      if (this.props.disabled || this.masonry) {
	        return;
	      }
	
	      // create masonry for specified container
	      this.masonry = new _masonryLayout2.default(this.refs.container, {
	        transitionDuration: this.props.transitionDuration,
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
	     * Disable and cleanup
	     */
	
	  }, {
	    key: 'destroyMasonry',
	    value: function destroyMasonry() {
	      if (this.masonry) {
	        this.masonry.destroy();
	        delete this.masonry;
	      }
	    }
	
	    /**
	     * Responsive toggle
	     */
	
	  }, {
	    key: '_resizeHandler',
	    value: function _resizeHandler() {
	      if (typeof this.props.minWidth !== 'number' || this.props.minWidth <= 0) {
	        return;
	      }
	      if (window.innerWidth < this.props.minWidth) {
	        this.destroyMasonry();
	      } else {
	        this.setupMasonry();
	      }
	    }
	
	    /**
	     * Used to allow external components to update the grid using refs
	     */
	
	  }, {
	    key: 'forceLayout',
	    value: function forceLayout() {
	      if (this.masonry) {
	        this.masonry.layout();
	      }
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
	
	      (0, _imagesloaded2.default)(this.refs.container, function () {
	        _this2.forceLayout();
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
	  percentPosition: false,
	  transitionDuration: 0,
	  minWidth: 0
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ShipComponentsGrid.js.map