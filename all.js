var Uralsib =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Configuration
 */

var secure = window.location.protocol === 'https:';

module.exports = {
    name: 'likely',
    prefix: 'likely__',
    secure: secure,
    protocol: secure ? 'https:' : 'http:',
    storageKey: 'likelyServices',
    breakpoint: 680
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(0);

var div = document.createElement('div'),
    gid = 0;

var dom = module.exports = {
    /**
     * Wrap SVG coords from data object into SVG tag
     *
     * @param {String} coords
     */
    wrapSVG: function (coords) {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" ' + 'viewBox="0 0 16 16"><path d="M' + coords + 'z"/></svg>';
    },

    /**
     * Create node from HTML
     *
     * @param {String} html
     */
    createNode: function (html) {
        div.innerHTML = html;

        return div.children[0];
    },

    /**
     * Load script
     *
     * @param {String} url
     */
    getScript: function (url) {
        var script = document.createElement('script'),
            head   = document.head;

        script.type = 'text/javascript';
        script.src  = url;

        head.appendChild(script);
        head.removeChild(script);
    },

    /**
     * Get JSON
     *
     * @param {String} url
     * @param {Function} callback
     */
    getJSON: function (url, callback) {
        var name = encodeURIComponent('random_fun_' + (++gid));

        url = url.replace(
            /callback=(\?)/,
            'callback=' + name
        );

        window[name] = callback;

        dom.getScript(url);
    },

    /**
     * Find first node by selector
     *
     * @param {String} selector
     * @param {Node} node
     * @return {Node}
     */
    find: function (selector, node) {
        return (node || document).querySelector(selector);
    },

    /**
     * Find all nodes by selector
     *
     * @param {String} selector
     * @param {Node} node
     * @return {NodeList}
     */
    findAll: function (selector, node) {
        return (node || document).querySelectorAll(selector);
    },

    /**
     * Check mobile media query
     */
    isMobile: function() {
        return !window.matchMedia('(min-width: ' + config.breakpoint + 'px)').matches;
    },

    /**
     * Open the popup
     *
     * @param {String} url
     * @param {String} winId
     * @param {Number} width,
     * @param {Number} height
     */
    openPopup: function (url, winId, width, height) {
        var left = Math.round(screen.width / 2 - width / 2),
            top  = 0;

        if (screen.height > height) {
            top = Math.round(screen.height / 3 - height / 2);
        }

        var options = 'left='    + left +
                      ',top='    + top +
                      ',width='  + width +
                      ',height=' + height +
                      ',personalbar=0,toolbar=0,scrollbars=1,resizable=1';

        var win = window.open(url, winId, options);

        // if (!win) {
        //     location.href = url;
        //     return location.href;
        // }

        // win.focus();

        return win;
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var bool = {yes: true, no: false},
    rUrl = /(https?|ftp):\/\/[^\s\/$.?#].[^\s]*/gi;

/**
 * @internal
 */
var utils = {
    /**
     * Simple $.each, only for objects
     *
     * @param {Object} object
     * @param {Function} callback
     */
    each: function (object, callback) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                callback(object[key], key);
            }
        }
    },

    /**
     * Convert array-like object to array
     *
     * @param {Object} arrayLike
     * @return {Array}
     */
    toArray: function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    },

    /**
     * Merge given dictionaries (objects) into one object
     *
     * @param {Object} ...objects
     * @return {Object}
     */
    merge: function () {
        var result = {};

        for (var i = 0; i < arguments.length; i ++) {
            var arg = arguments[i];

            if (arg) {
                for (var key in arg) {
                    result[key] = arg[key];
                }
            }
        }

        return result;
    },

    /**
     * Extend one (target) object by other (subject)
     *
     * @param {Object} target
     * @param {Object} subject
     */
    extend: function (target, subject) {
        for (var key in subject) {
            target[key] = subject[key];
        }
    },

    /**
     * Check new flexbox syntax support
     */
    flexboxSupport: function(element, name){
        var d = document, f = 'flex', fw = '-webkit-'+f, e = d.createElement('b'), c;

        try {
            e.style.display = fw;
            e.style.display = f;
            c = (e.style.display == f || e.style.display == fw) ? f : 'no-'+f;
        } catch(e) {
            c = 'no-'+f;
        }

        element.className += ' ' + name + '--' + c;
    },

    /**
     * Return node.dataset or plain object for IE 10without setters
     * based on https://gist.github.com/brettz9/4093766#file_html5_dataset.js
     *
     * @param {Node} node
     * @return {Object}
     */
    getDataset: function (node) {
        if (typeof node.dataset === 'object') {
            return node.dataset;
        }

        var i,
            dataset = {},
            attributes = node.attributes,
            attribute,
            attributeName;

        var toUpperCase = function (n0) {
            return n0.charAt(1).toUpperCase();
        };

        for (i = attributes.length - 1; i >= 0; i--) {
            attribute = attributes[i];
            if (attribute && attribute.name &&
                (/^data-\w[\w\-]*$/).test(attribute.name)) {
                    attributeName = attribute.name.substr(5).replace(/-./g, toUpperCase);
                    dataset[attributeName] = attribute.value;
                }
        }

        return dataset;
    },

    /**
     * Convert "yes" and "no" to true and false.
     *
     * @param {Node} node
     */
    bools: function (node) {
        var result = {},
            data   = utils.getDataset(node);

        for (var key in data) {
            var value = data[key];

            result[key] = bool[value] || value;
        }

        return result;
    },

    /**
     * Map object keys in string to its values
     *
     * @param {String} text
     * @param {Object} data
     * @return {String}
     */
    template: function (text, data) {
        return !text ? '' : text.replace(/\{([^\}]+)\}/g, function (value, key) {
            return key in data ? data[key] : value;
        });
    },

    /**
     * Map object keys in URL to its values
     *
     * @param {String} text
     * @param {Object} data
     * @return {String}
     */
    makeUrl: function (text, data) {
        for (var key in data) {
            data[key] = encodeURIComponent(data[key]);
        }

        return utils.template(text, data);
    },

    /**
     * Create query string out of data
     *
     * @param {Object} data
     * @return {String}
     */
    query: function (data) {
        var filter = encodeURIComponent,
            query  = [];

        for (var key in data) {
            if (typeof data[key] === 'object') continue;

            query.push(filter(key) + '=' + filter(data[key]));
        }

        return query.join('&');
    },

    /**
     * Set value in object using dot-notation
     *
     * @param {Object} object
     * @param {String} key
     * @param {Object} value
     */
    set: function (object, key, value) {
        var frags = key.split('.'),
            last  = null;

        frags.forEach(function (key, index) {
            if (typeof object[key] === 'undefined') {
                object[key] = {};
            }

            if (index !== frags.length - 1) {
                object = object[key];
            }

            last = key;
        });

        object[last] = value;
    }
};

module.exports = utils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Social network services
 */

var Service = __webpack_require__(20),
    utils   = __webpack_require__(2),
    svg     = __webpack_require__(21);

var services = {
    odnoklassniki: __webpack_require__(22),
    vkontakte:     __webpack_require__(23),
    facebook:      __webpack_require__(24),
    twitter:       __webpack_require__(25),
    gplus:         __webpack_require__(26),
    pocket:        __webpack_require__(27),
    telegram:      __webpack_require__(28),
    whatsapp:      __webpack_require__(29),
    viber:         __webpack_require__(30),
    email:         __webpack_require__(31),
    more:          __webpack_require__(32)
};

utils.each(services, function (service, key) {
    Service(service);

    service.svgi = svg[key];
    service.name = key;
});

module.exports = services;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'Uralsib', // уникальное имя спецпроекта. Оно же — название главного класса. Используется на странице, куда интегрируется спецпроект
  analyticsCategory: 'Uralsib',
  sendPageView: false, // отключаем, если спецпроект не на отдельной странице
  listenedEvents: ['click', 'input'] // слушаем события (click, input, change, etc.). Обычно нужен только click
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendPageView = exports.sendEvent = undefined;

var _config = __webpack_require__(4);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONSOLE_STYLE = 'color: #E87E04';

/**
 * Send analytics events via GTM
 * @param {String} label - event label
 * @param {String} action - event action ("Click" by default)
 */
var sendEvent = exports.sendEvent = function sendEvent(label) {
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Click';

    var value = _config2.default.analyticsCategory + ' \u2014 ' + label + ' \u2014 ' + action;

    if (false) {}

    if (window.dataLayer !== undefined && _config2.default.analyticsCategory) {
        window.dataLayer.push({
            event: 'data_event',
            data_description: value
        });
    }
};

/**
 * Send pageview event via GTM
 */
var sendPageView = exports.sendPageView = function sendPageView() {
    if (false) {}

    if (window.dataLayer !== undefined) {
        window.dataLayer.push({
            event: 'Page — View',
            post_details: {},
            section: 'special',
            tags: [],
            title: document.title,
            url: window.location.pathname
        });
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Make html element
 * @param {String} tagName
 * @param {Array|String} classNames - array of classnames or string for single classname
 * @param {Object} attributes - object with html attributes
 */
var makeElement = exports.makeElement = function makeElement(tagName) {
    var classNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    tagName = tagName.toLowerCase();

    var element = document.createElement(tagName);

    if (classNames) {
        if ((typeof classNames === 'undefined' ? 'undefined' : _typeof(classNames)) === 'object') {
            classNames.forEach(function (cname) {
                element.classList.add(cname);
            });
        } else if (typeof classNames === 'string') {
            element.classList.add(classNames);
        }
    }

    for (var attr in attributes) {
        if (attr === 'data') {
            var dataAttributes = attributes[attr];

            for (var _attr in dataAttributes) {
                element.dataset[_attr] = dataAttributes[_attr];
            }
        } else {
            element[attr] = attributes[attr];
        }
    }

    return element;
};

/**
 * Cache elements with [data-view] attribute and put them in given object
 * @param {Object} obj - object
 */
var cacheElements = exports.cacheElements = function cacheElements(obj) {
    var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'view';

    var newObj = {},
        elements = document.querySelectorAll('[data-' + attr + ']');

    Array.prototype.forEach.call(elements, function (el) {
        var name = el.dataset[attr];
        newObj[name] = el;
    });

    Object.assign(obj, newObj);
};

/**
 * Get all siblings of specified element, excluding this element
 * @param {Element} element
 */
var getSiblings = exports.getSiblings = function getSiblings(element) {
    var siblings = [],
        sibling = element.parentNode.firstChild;

    for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType !== 1 || sibling === element) continue;
        siblings.push(sibling);
    }

    return siblings;
};

/**
 * Remove all children from element
 * @param {Element} parent
 */
var removeChildren = exports.removeChildren = function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

/**
 * Remove specified element from its parent
 * @param {Element} element
 */
var removeElement = exports.removeElement = function removeElement(element) {
    if (element) {
        element.parentNode.removeChild(element);
    }
};

/**
 * Transform html string to node
 * @param {String} html
 */
var htmlStringToNode = exports.htmlStringToNode = function htmlStringToNode(html) {
    var el = document.createElement('div');

    el.innerHTML = html;

    return el.firstChild;
};

/**
 * Prepend source element before first child of target element
 * @param {Element} parent
 * @param {Element} el
 */
var prepend = exports.prepend = function prepend(parent, el) {
    parent.insertBefore(el, parent.firstChild);
};

/** Quick check if element is in DOM */
var isElementInDom = exports.isElementInDom = function isElementInDom(el) {
    return el.parentNode;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var isAvailable = function() {

    try {
        window.localStorage.setItem('isStorageAvailable', 1);
        window.localStorage.removeItem('isStorageAvailable');
        return true;
    } catch (e) {
        return false;
    }

};

var storage = {

    /**
     * Get item from localStorage
     * @param {String} key
     */
    getItem: function(key){

        if (isAvailable()) {

            var item = window.localStorage.getItem(key);

            try {
                JSON.parse(item);
            } catch (e) {
                return item;
            }

            return JSON.parse(item);

        }

    },

    /**
     * Save item in localStorage
     * @param {String} key
     * @param {String} value
     */
    setItem: function(key, value) {

        value = (typeof value === 'string') ? value : JSON.stringify(value);

        if (isAvailable()) {
            window.localStorage.setItem(key, value);
        }

    },

    /**
     * Remove item from localStorage
     * @param {String} key
     */
    removeItem: function(key) {

        if (isAvailable()) {
            window.localStorage.removeItem(key);
        }

    }

};

module.exports = storage;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function requestAnimate(options) {

    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        var progress = options.timing(timeFraction);

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function one(node, type, callback) {
    type = type.split(' ');

    var _loop = function _loop(i) {
        var func = function func(e) {
            for (var j = 0; j < type.length; j++) {
                e.currentTarget.removeEventListener(type[j], func);
            }
            return callback(e);
        };
        node.addEventListener(type[i], func, false);
    };

    for (var i = 0; i < type.length; i++) {
        _loop(i);
    }
}

function animate(elem, className) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return new Promise(function (resolve, reject) {
        one(elem, 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            if (duration) {
                elem.style.animationDuration = '';
            }
            if (delay) {
                elem.style.animationDelay = '';
            }
            elem.classList.remove(className);
            elem.classList.remove('animated');

            resolve();
        });

        if (duration) {
            elem.style.animationDuration = duration;
        }
        if (delay) {
            elem.style.animationDelay = delay;
        }

        elem.classList.add(className);
        elem.classList.add('animated');
    });
}

exports.animate = animate;
exports.requestAnimate = requestAnimate;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _special = __webpack_require__(10);

var _special2 = _interopRequireDefault(_special);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.Special = _special2.default; // Тут используется CommonJS модуль, чтобы можно было использовать название класса как глобальную переменную
/**
 * Entry point
 */

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(11);

var _base = __webpack_require__(13);

var _base2 = _interopRequireDefault(_base);

var _data = __webpack_require__(14);

var _data2 = _interopRequireDefault(_data);

var _svg = __webpack_require__(15);

var _svg2 = _interopRequireDefault(_svg);

var _dom = __webpack_require__(6);

var _share = __webpack_require__(16);

var Share = _interopRequireWildcard(_share);

var _animate = __webpack_require__(8);

var _swipe = __webpack_require__(35);

var _swipe2 = _interopRequireDefault(_swipe);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import * as Analytics from './lib/analytics';

var CSS = {
  main: 'uralsib'
};

var EL = {};

var Special = function (_BaseSpecial) {
  _inherits(Special, _BaseSpecial);

  function Special() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Special);

    var _this = _possibleConstructorReturn(this, (Special.__proto__ || Object.getPrototypeOf(Special)).call(this));

    Object.assign(_this.params, params);
    _this.saveParams();

    if (_data2.default && params.data) {
      Object.assign(_data2.default, params.data);
    }

    if (_this.params.css) {
      _this.loadStyles(_this.params.css).then(function () {
        return _this.init();
      });
    } else {
      _this.init();
    }
    return _this;
  }

  _createClass(Special, [{
    key: 'createElements',
    value: function createElements() {
      var _this2 = this;

      EL.bgMovie = (0, _dom.makeElement)('img', CSS.main + '__bg-movie', {
        src: _data2.default.bg.movie,
        srcset: _data2.default.bg.movie2x + ' 2x'
      });
      EL.bgBusiness = (0, _dom.makeElement)('img', CSS.main + '__bg-business', {
        src: _data2.default.bg.business,
        srcset: _data2.default.bg.business2x + ' 2x'
      });

      EL.logo = (0, _dom.makeElement)('a', CSS.main + '__logo', {
        href: 'https://www.uralsib.ru/',
        target: '_blank',
        innerHTML: _svg2.default.logo
      });

      EL.enter = (0, _dom.makeElement)('div', CSS.main + '-enter');

      if (this.params.isFeed) {
        EL.eTitle = (0, _dom.makeElement)('a', CSS.main + '-enter__title', {
          href: 'https://vc.ru/special/uralsib',
          innerHTML: _data2.default.title
        });
      } else {
        EL.eTitle = (0, _dom.makeElement)('div', CSS.main + '-enter__title', {
          innerHTML: _data2.default.title
        });
      }

      EL.eDesc = (0, _dom.makeElement)('div', CSS.main + '-enter__description', {
        innerHTML: _data2.default.description
      });
      EL.eStartBtn = (0, _dom.makeElement)('button', CSS.main + '-enter__start-btn', {
        textContent: 'Начать',
        data: {
          click: 'start'
        }
      });

      EL.enter.appendChild(EL.bgMovie);
      EL.enter.appendChild(EL.bgBusiness);
      EL.enter.appendChild(EL.eTitle);
      EL.enter.appendChild(EL.eDesc);
      EL.enter.appendChild(EL.eStartBtn);

      EL.q = (0, _dom.makeElement)('div', CSS.main + '-q');
      EL.qPages = (0, _dom.makeElement)('div', CSS.main + '-q__pages');
      EL.qOptionL = (0, _dom.makeElement)('div', [CSS.main + '-q__option', CSS.main + '-q__option--left'], {
        innerHTML: '<div class="' + CSS.main + '-q__option-icon">' + _svg2.default.movie + '</div><div class="' + CSS.main + '-q__option-caption">\u0424\u0438\u043B\u044C\u043C</div>',
        data: {
          type: 'left'
        }
      });
      EL.qOptionR = (0, _dom.makeElement)('div', [CSS.main + '-q__option', CSS.main + '-q__option--right'], {
        innerHTML: '<div class="' + CSS.main + '-q__option-icon">' + _svg2.default.case + '</div><div class="' + CSS.main + '-q__option-caption">\u0411\u0438\u0437\u043D\u0435\u0441</div>',
        data: {
          type: 'right'
        }
      });
      EL.qCards = (0, _dom.makeElement)('div', CSS.main + '-q__cards');
      EL.qCard = (0, _dom.makeElement)('div', CSS.main + '-q__card');
      EL.card = (0, _dom.makeElement)('div', CSS.main + '-card');
      EL.cHintL = (0, _dom.makeElement)('div', [CSS.main + '-card__hint', CSS.main + '-card__hint--left'], {
        innerHTML: '<div class="' + CSS.main + '-card__hint-icon">' + _svg2.default.movie + '</div><div class="' + CSS.main + '-card__hint-caption">\u0424\u0438\u043B\u044C\u043C</div>'
      });
      EL.cHintR = (0, _dom.makeElement)('div', [CSS.main + '-card__hint', CSS.main + '-card__hint--right'], {
        innerHTML: '<div class="' + CSS.main + '-card__hint-icon">' + _svg2.default.case + '</div><div class="' + CSS.main + '-card__hint-caption">\u0411\u0438\u0437\u043D\u0435\u0441</div>'
      });
      EL.cHead = (0, _dom.makeElement)('div', CSS.main + '-card__head');
      EL.cBottom = (0, _dom.makeElement)('div', CSS.main + '-card__bottom');
      EL.cImg = (0, _dom.makeElement)('img', CSS.main + '-card__img');
      EL.cText = (0, _dom.makeElement)('div', CSS.main + '-card__text');
      EL.cAnswer = (0, _dom.makeElement)('div', [CSS.main + '-card__answer', CSS.main + '-card-answer']);
      EL.cAnswerInfo = (0, _dom.makeElement)('div', CSS.main + '-card-answer__info');
      EL.cAnswerInfoImg = (0, _dom.makeElement)('img', CSS.main + '-card-answer__info-img');
      EL.cAnswerInfoBio = (0, _dom.makeElement)('div', CSS.main + '-card-answer__info-bio');
      EL.cAnswerTitle = (0, _dom.makeElement)('div', CSS.main + '-card-answer__title');
      EL.cAnswerText = (0, _dom.makeElement)('div', CSS.main + '-card-answer__text');
      EL.cAnswerNextBtn = (0, _dom.makeElement)('button', CSS.main + '-card-answer__next-btn', {
        innerHTML: '<span>\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</span>' + _svg2.default.arrow,
        data: {
          click: 'continue'
        }
      });

      EL.qOptionL.addEventListener('click', function () {
        _this2.answer('left');
      });
      EL.qOptionR.addEventListener('click', function () {
        _this2.answer('right');
      });

      EL.cHead.appendChild(EL.cImg);

      EL.cAnswerInfo.appendChild(EL.cAnswerInfoImg);
      EL.cAnswerInfo.appendChild(EL.cAnswerInfoBio);

      EL.cAnswer.appendChild(EL.cAnswerInfo);
      EL.cAnswer.appendChild(EL.cAnswerTitle);
      EL.cAnswer.appendChild(EL.cAnswerText);
      EL.cAnswer.appendChild(EL.cAnswerNextBtn);

      EL.card.appendChild(EL.cHead);
      EL.card.appendChild(EL.cBottom);
      EL.card.appendChild(EL.cHintL);
      EL.card.appendChild(EL.cHintR);

      EL.qCard.appendChild(EL.card);

      EL.q.appendChild(EL.qPages);
      EL.q.appendChild(EL.qOptionL);
      EL.q.appendChild(EL.qOptionR);
      EL.q.appendChild(EL.qCards);
      EL.q.appendChild(EL.qCard);

      (0, _swipe2.default)(EL.card, function (t) {
        _this2.answer(t);
      });

      EL.result = (0, _dom.makeElement)('div', CSS.main + '-result');
      EL.rText = (0, _dom.makeElement)('div', CSS.main + '-result__text');
      EL.rBtn = (0, _dom.makeElement)('button', CSS.main + '-result__btn', {
        textContent: 'Есть своя идея',
        data: {
          click: 'showOffer'
        }
      });
      EL.rTitle = (0, _dom.makeElement)('div', CSS.main + '-result__title');
      EL.rSubtitle = (0, _dom.makeElement)('div', CSS.main + '-result__subtitle');
      EL.rShare = (0, _dom.makeElement)('div', CSS.main + '-result__share');
      EL.rImg = (0, _dom.makeElement)('img', CSS.main + '-result__img');

      EL.result.appendChild(EL.rText);
      EL.result.appendChild(EL.rBtn);
      EL.result.appendChild(EL.rTitle);
      EL.result.appendChild(EL.rSubtitle);
      EL.result.appendChild(EL.rShare);
      EL.result.appendChild(EL.rImg);

      EL.offer = (0, _dom.makeElement)('div', CSS.main + '-offer');
      EL.oIcon = (0, _dom.makeElement)('div', CSS.main + '-offer__icon', {
        innerHTML: _svg2.default.hat
      });
      EL.oText = (0, _dom.makeElement)('div', CSS.main + '-offer__text', {
        innerHTML: 'Каждая бизнес-идея требует тщательного планирования. Банк «Уралсиб» <a href="https://www.youtube.com/watch?v=8eMP8kr4xYc" target="_blank">пригласил</a> эксперта рассказать, с чего начать своё дело и как детально оценить возможности.'
      });
      EL.oBlock = (0, _dom.makeElement)('div', CSS.main + '-offer__block');
      EL.oBlockIcon = (0, _dom.makeElement)('div', CSS.main + '-offer__block-icon', {
        innerHTML: _svg2.default.payment
      });
      EL.oBlockText = (0, _dom.makeElement)('div', CSS.main + '-offer__block-text', {
        innerHTML: 'Начинающие предприниматели могут зарегистрировать свой бизнес на сайте «Уралсиба» и получить год обслуживания расчётного счёта бесплатно.'
      });
      EL.oBlockBtn = (0, _dom.makeElement)('a', CSS.main + '-offer__block-btn', {
        href: 'https://old.uralsib.ru/smallbusiness/start.wbp',
        target: '_blank',
        textContent: 'Подробности'
      });
      EL.oBackBtn = (0, _dom.makeElement)('div', CSS.main + '-offer__back-btn', {
        innerHTML: _svg2.default.arrow + '<span>\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430\u0437\u0430\u0434</span>',
        data: {
          click: 'backToResult'
        }
      });
      EL.oImg = (0, _dom.makeElement)('img', CSS.main + '-offer__img', {
        src: 'https://leonardo.osnova.io/0c3fb28c-a09f-0c60-0f90-b7ce8bfb3618/',
        srcset: 'https://leonardo.osnova.io/3872df09-cbb2-95a2-3c7e-002b01cc0822/ 2x'
      });

      EL.oBlock.appendChild(EL.oBlockIcon);
      EL.oBlock.appendChild(EL.oBlockText);
      EL.oBlock.appendChild(EL.oBlockBtn);

      EL.offer.appendChild(EL.oBlock);
      EL.offer.appendChild(EL.oIcon);
      EL.offer.appendChild(EL.oText);
      EL.offer.appendChild(EL.oBackBtn);
      EL.offer.appendChild(EL.oImg);

      EL.help = (0, _dom.makeElement)('div', CSS.main + '-help');
      EL.hInner = (0, _dom.makeElement)('div', CSS.main + '-help__inner');
      EL.hIcon = (0, _dom.makeElement)('div', CSS.main + '-help__icon', {
        innerHTML: _svg2.default.swipe
      });
      EL.hText = (0, _dom.makeElement)('div', CSS.main + '-help__text', {
        innerHTML: '<p>Свайпайте карточку вправо, если считаете, что это ситуация из бизнеса.</p><p>Влево — если из фильма.</p>'
      });
      EL.hBtn = (0, _dom.makeElement)('button', CSS.main + '-help__btn', {
        textContent: 'Понятно',
        data: {
          click: 'hideHelp'
        }
      });

      EL.hInner.appendChild(EL.hIcon);
      EL.hInner.appendChild(EL.hText);
      EL.hInner.appendChild(EL.hBtn);

      EL.help.appendChild(EL.hInner);
    }
  }, {
    key: 'hideHelp',
    value: function hideHelp() {
      var _this3 = this;

      (0, _animate.animate)(EL.help, 'fadeOut', '200ms').then(function () {
        _this3.container.removeChild(EL.help);
      });
    }
  }, {
    key: 'showCount',
    value: function showCount() {
      var index = this.activeIndex + 1;
      if (index === _data2.default.questions.length) {
        EL.qCards.innerHTML = '';
      } else if (index > _data2.default.questions.length / 2) {
        EL.qCards.innerHTML = '<div></div>';
      } else if (index > _data2.default.questions.length / 4) {
        EL.qCards.innerHTML = '<div></div><div></div>';
      } else {
        EL.qCards.innerHTML = '<div></div><div></div><div></div>';
      }
    }
  }, {
    key: 'onOptionHover',
    value: function onOptionHover(e) {
      if (this.isAnswered || this.activeIndex > 0) return;

      var el = e.currentTarget;
      var t = el.dataset.type;
      var hint = (0, _dom.makeElement)('div', CSS.main + '-q__option-hint', {
        innerHTML: t === 'left' ? _svg2.default.swipeL + '<div>\u0418\u043B\u0438 \u0441\u0432\u0430\u0439\u043F\u043D\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0432\u043B\u0435\u0432\u043E</div>' : _svg2.default.swipeR + '<div>\u0418\u043B\u0438 \u0441\u0432\u0430\u0439\u043F\u043D\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0432\u043F\u0440\u0430\u0432\u043E</div>'
      });

      el.appendChild(hint);
      el.addEventListener('mouseleave', function () {
        el.removeChild(hint);
      }, { once: true });
    }
  }, {
    key: 'start',
    value: function start() {
      this.container.removeChild(EL.enter);
      this.container.appendChild(EL.q);

      this.makeNextQuestion();

      if (/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768) {
        this.container.appendChild(EL.help);
        (0, _animate.animate)(EL.help, 'fadeIn', '200ms', '400ms');
      } else {
        EL.qOptionL.addEventListener('mouseenter', this.onOptionHover.bind(this));
        EL.qOptionR.addEventListener('mouseenter', this.onOptionHover.bind(this));
      }
    }

    // restart() {
    //   EL.cAnswerNextBtn.innerHTML = `<span>Продолжить</span>${Svg.arrow}`;
    //   EL.cAnswerNextBtn.dataset.click = 'continue';
    // }

  }, {
    key: 'continue',
    value: function _continue() {
      var _this4 = this;

      this.activeIndex += 1;

      var animationClassName = this.lastAnsweredType === 'left' ? 'fadeOutLeft' : 'fadeOutRight';

      (0, _animate.animate)(EL.card, animationClassName).then(function () {
        EL.qCard.removeChild(EL.card);

        _this4.makeNextQuestion();
      });
    }
  }, {
    key: 'makeNextQuestion',
    value: function makeNextQuestion() {
      var question = _data2.default.questions[this.activeIndex];

      this.isAnswered = false;

      EL.q.classList.remove('is-correct');
      EL.q.classList.remove('is-incorrect');

      EL.qOptionL.classList.remove('is-hide');
      EL.qOptionR.classList.remove('is-hide');

      EL.cImg.src = question.img;
      EL.cImg.srcset = question.img2x + ' 2x';
      EL.cText.innerHTML = question.text;

      (0, _dom.removeChildren)(EL.cBottom);
      EL.cBottom.appendChild(EL.cText);

      EL.qPages.innerHTML = this.activeIndex + 1 + '/' + _data2.default.questions.length;

      this.showCount();

      EL.qCard.appendChild(EL.card);
      (0, _animate.animate)(EL.card, 'zoomIn', '200ms');
    }
  }, {
    key: 'answer',
    value: function answer(t) {
      if (this.isAnswered) {
        return;
      }
      this.isAnswered = true;

      var question = _data2.default.questions[this.activeIndex];
      var type = t;

      this.lastAnsweredType = type;

      if (type === 'left') {
        EL.qOptionR.classList.add('is-hide');
      } else {
        EL.qOptionL.classList.add('is-hide');
      }

      if (question.correct === type) {
        this.correctAnswers += 1;
        EL.q.classList.add('is-correct');
        EL.cAnswerTitle.innerHTML = type === 'left' ? 'Да, это фильм' : 'Да, это дало старт бизнесу ';
        EL.cAnswerText.innerHTML = question.correctMsg;
      } else {
        EL.q.classList.add('is-incorrect');
        EL.cAnswerTitle.innerHTML = type === 'left' ? 'Нет, это дало старт бизнесу' : 'Нет, это фильм';
        EL.cAnswerText.innerHTML = question.incorrectMsg;
      }

      if (this.activeIndex === _data2.default.questions.length - 1) {
        EL.cAnswerNextBtn.innerHTML = '<span>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442</span>' + _svg2.default.arrow;
        EL.cAnswerNextBtn.dataset.click = 'result';
      }

      EL.cAnswerInfoImg.src = question.info.avatar;
      EL.cAnswerInfoBio.innerHTML = question.info.bio;

      (0, _dom.removeChildren)(EL.cBottom);
      (0, _animate.animate)(EL.cBottom, 'fadeIn', '200ms').then(function () {
        EL.cBottom.appendChild(EL.cAnswer);
        (0, _animate.animate)(EL.cAnswer, 'fadeIn', '200ms');
      });
    }
  }, {
    key: 'result',
    value: function result() {
      var result = Special.getResult(this.correctAnswers);

      this.container.removeChild(EL.q);
      this.container.appendChild(EL.result);

      EL.rText.innerHTML = '\u0418\u0434\u0435\u0438 \u0434\u043B\u044F \u0431\u0438\u0437\u043D\u0435\u0441\u0430 \u043F\u043E\u0432\u0441\u044E\u0434\u0443, \u043D\u043E \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0442\u044C \u0438\u0445 \u043D\u0435 \u0432\u0441\u0435\u0433\u0434\u0430 \u043B\u0435\u0433\u043A\u043E. <b>\u0423 \u0432\u0430\u0441 \u044D\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u0432 <span style="color: #FFD100;">' + this.correctAnswers + ' \u0438\u0437 ' + _data2.default.questions.length + '</span> \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0439</b>.';
      EL.rTitle.innerHTML = result.title;
      EL.rSubtitle.innerHTML = result.subtitle;
      EL.rImg.src = result.img;
      EL.rImg.srcset = result.img2x + ' 2x';

      (0, _dom.removeChildren)(EL.rShare);
      Share.make(EL.rShare, {
        url: this.params.share.url + this.correctAnswers,
        title: this.params.share.title,
        twitter: this.params.share.title
      });
    }
  }, {
    key: 'showOffer',
    value: function showOffer() {
      this.container.removeChild(EL.result);
      this.container.appendChild(EL.offer);
    }
  }, {
    key: 'backToResult',
    value: function backToResult() {
      this.container.removeChild(EL.offer);
      this.container.appendChild(EL.result);
    }
  }, {
    key: 'setInitialParams',
    value: function setInitialParams() {
      this.activeIndex = 0;
      this.correctAnswers = 0;
    }
  }, {
    key: 'init',
    value: function init() {
      this.setInitialParams();
      this.createElements();
      (0, _dom.removeChildren)(this.container);
      this.container.appendChild(EL.logo);
      this.container.appendChild(EL.enter);

      this.params.isFeed ? this.container.classList.add('is-feed') : '';
    }
  }], [{
    key: 'getResult',
    value: function getResult(score) {
      var result = '';
      _data2.default.results.some(function (item) {
        if (item.range[0] <= score && item.range[1] >= score) {
          result = item;
          return true;
        }
        return false;
      });

      return result;
    }
  }]);

  return Special;
}(_base2.default);

exports.default = Special;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(4);

var _config2 = _interopRequireDefault(_config);

var _analytics = __webpack_require__(5);

var Analytics = _interopRequireWildcard(_analytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base special constructor with common methods
 */
var BaseSpecial = function () {
    function BaseSpecial() {
        _classCallCheck(this, BaseSpecial);

        this.keyCodes = {
            enter: 13
        };
        this.params = {
            container: document.body
        };

        if (_config2.default.sendPageView) {
            Analytics.sendPageView();
        }
    }

    /**
     * Save custom params
     * @param {Object} params - params object with custom values
     */


    _createClass(BaseSpecial, [{
        key: 'saveParams',
        value: function saveParams() {
            Object.assign(this.params, _config2.default);
            this.container = this.params.container;

            this.addEventListeners();
        }

        /**
         * Load css file
         * @param {String} path
         */

    }, {
        key: 'loadStyles',
        value: function loadStyles(path) {
            return new Promise(function (resolve, reject) {
                var link = document.createElement('link');

                link.rel = 'stylesheet';
                link.href = path;

                link.onload = function () {
                    return resolve();
                };
                link.onerror = function () {
                    return reject();
                };

                document.body.appendChild(link);
            });
        }

        /**
         * Add event listeners to document
         */

    }, {
        key: 'addEventListeners',
        value: function addEventListeners() {
            var _this = this;

            this.params.listenedEvents.forEach(function (eventName) {
                _this.container.addEventListener(eventName, function (event) {
                    return _this.defaultEventHandler(event, eventName);
                });
            });
        }

        /**
         * Default events handler
         * @param {Object} event
         * @param {String} eventName
         */

    }, {
        key: 'defaultEventHandler',
        value: function defaultEventHandler(event, eventName) {
            var target = event.target;
            var action = void 0;

            while (target.parentNode && target !== event.currentTarget) {
                action = target.dataset[eventName];

                /** Send all links clicks to analytics */
                if (eventName === 'click' && target.tagName.toLowerCase() === 'a') {
                    Analytics.sendEvent(target.href);
                }

                if (action) break;
                target = target.parentNode;
            }

            action = target.dataset[eventName];

            if (action && this[action]) {
                this[action](event.target, event);
            }
        }
    }]);

    return BaseSpecial;
}();

exports.default = BaseSpecial;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Все текстовые значения рекомендуется хранить здесь
 */
exports.default = {
  title: 'Идея для бизнеса или сюжет из фильма',
  description: 'Если из ситуации вырос бизнес, смахните карточку вправо, а если это сюжет из фильма — влево.',
  bg: {
    movie: 'https://leonardo.osnova.io/15aed67a-7d2e-a5c9-6dca-a38af3df1955/',
    movie2x: 'https://leonardo.osnova.io/a6d97f90-5912-6335-4313-7538299fecd4/',
    business: 'https://leonardo.osnova.io/be875e48-0597-ddd6-1138-60d9faff1945/',
    business2x: 'https://leonardo.osnova.io/39990766-4f90-2ebf-baf5-69724e9f7a50/'
  },
  questions: [{
    img: 'https://leonardo.osnova.io/603de5a4-10e3-61f8-6efc-b2c03db4be7d/',
    img2x: 'https://leonardo.osnova.io/3ebee9b2-9252-a1d1-02dd-2a2069c005f0/',
    text: '<p>Молодой человек взял с собой в автобусную поездку ноутбук, чтобы поработать. В начале пути он заметил, что забыл дома флешку с материалами.</p>',
    correctMsg: '<p>Вы правы. Ему пришла в голову идея создать сервис облачного хранения данных — так появился Dropbox. Герой этой истории теперь долларовый миллиардер.</p>',
    incorrectMsg: '<p>Вы не правы. Герой этой истории придумал сервис Dropbox, чтобы хранить нужные файлы в облаке.</p>',
    correct: 'right',
    info: {
      avatar: 'https://leonardo.osnova.io/27086adc-1f57-f07f-66e2-f7cd76bf6559/',
      bio: '<p><b>Дрю Хьюстон</b></p><p>Придумал свой облачный сервис</p>'
    }
  }, {
    img: 'https://leonardo.osnova.io/0673ba59-d386-19b7-2c58-85bc8892f871/',
    img2x: 'https://leonardo.osnova.io/94ea4aa4-36f4-78ba-3cbe-82d6ed6321af/',
    text: '<p>У молодого журналиста не было возможности отыскать контакты нужного героя, и он отдал в печать интервью, которое целиком выдумал сам.</p>',
    correctMsg: '<p>Правильно. К бизнесу это не имеет отношения, но создателям кинокомедии «Фантомас», из которой взят этот сюжет, удалось хорошо заработать на кассовых сборах в СССР.</p>',
    incorrectMsg: '<p>Неверно. Это завязка кинокомедии «Фантомас».</p>',
    correct: 'left',
    info: {
      avatar: 'https://leonardo.osnova.io/e004f241-75c7-156f-919a-f4d93b784a4e/',
      bio: '<p><b>Фильм «Фантомас»</b></p>'
    }
  }, {
    img: 'https://leonardo.osnova.io/c0b25d02-489b-67b3-572d-37f88aa6704f/',
    img2x: 'https://leonardo.osnova.io/70501ec9-3945-7541-4f5a-abcb500b4301/',
    text: '<p>Юноша увлекался коллекционированием: с детства собирал комиксы, бейсбольные карточки, автографы. Их он брал даже у своих одноклассников в надежде, что они станут знаменитыми.</p>',
    correctMsg: '<p>Да! После продажи своей гигантской коллекции Джо Маддалена открыл аукцион памятных вещей Profiles In History. Бластер со съёмок «Звёздных войн» там продали за $240 тысяч.</p>',
    incorrectMsg: '<p>Неверно. Это мог быть фильм про страсть коллекционирования, но стало идеей для организации аукциона памятных вещей Profiles In History.</p>',
    correct: 'right',
    info: {
      avatar: 'https://leonardo.osnova.io/2e28bf46-e866-54be-9cde-cccd3d0149e9/',
      bio: '<p><b>Джо Маддалена</b></p><p>Создал аукцион</p>'
    }
  }, {
    img: 'https://leonardo.osnova.io/eb494497-cef7-16b9-3d76-7961f500005c/',
    img2x: 'https://leonardo.osnova.io/6ba515f2-bf81-f682-f5f1-06b949f99bac/',
    text: '<p>Домохозяйка нашла необычное применение мешку, набитому кукурузными зёрнами.</p>',
    correctMsg: '<p>Да. Это бизнес, но без попкорна. Из небольшого мешка, разогретого в микроволновке, получилась тёплая спа-подушка Wuvit, которую позже запатентовали.</p>',
    incorrectMsg: '<p>Неверно. Попкорн — классический атрибут кинематографа, но это реальная история создания спа-подушек, которые можно разогревать в микроволновке.</p>',
    correct: 'right',
    info: {
      avatar: 'https://leonardo.osnova.io/b6c7bd98-3202-80a7-f22d-72136332cacc/',
      bio: '<p><b>Ким Левин</b></p><p>Придумала спа-подушку</p>'
    }
  }, {
    img: 'https://leonardo.osnova.io/4d07e16f-5a97-7bdd-323d-97ab6c9f7f3b/',
    img2x: 'https://leonardo.osnova.io/6ecba224-40b7-ec63-0f83-de5090d3fdfd/',
    text: '<p>Американец задумался, может ли посуда отражать черты характера её владельца.</p>',
    correctMsg: '<p>Вы правы. У главного героя фильма «Бойцовский клуб» была настолько невзрачная жизнь, что он тратил время на тщательный подбор сервиза в каталоге.</p>',
    incorrectMsg: '<p>Вы неправы. Это всего лишь метафора серой жизни главного героя фильма «Бойцовский клуб».</p>',
    correct: 'left',
    info: {
      avatar: 'https://leonardo.osnova.io/38696e2e-a3ef-b364-ca39-9638755c8da9/',
      bio: '<p><b>Фильм «Бойцовский клуб»</b></p>'
    }
  }, {
    img: 'https://leonardo.osnova.io/c2a97e67-e625-412b-c759-1a2f082a9963/',
    img2x: 'https://leonardo.osnova.io/7d0172e8-bb7f-3391-fc66-b51f47ecbb15/',
    text: '<p>Американец шил плюшевых медведей, но магазины отказывались их распространять из-за мелкосерийного производства.</p>',
    correctMsg: '<p>Верно. Столь редкие игрушки стали коллекционными. На вторичном рынке цена на мишек Beanie Babies доходила до $5 тысяч, при себестоимости в $10.</p>',
    incorrectMsg: '<p>Нет. Звучит странно, но предприниматель Тай Уорнер продавал в каждый магазин не более 36 игрушек в месяц, из-за чего те стали коллекционными и сделали его компанию известной.</p>',
    correct: 'right',
    info: {
      avatar: 'https://leonardo.osnova.io/b45f64af-569b-c596-f1c8-a53d6cca07b0/',
      bio: '<p><b>Тай Уорнер</b></p><p>Спланировал дефицит игрушек</p>'
    }
  }, {
    img: 'https://leonardo.osnova.io/9449862f-51b4-34a0-f02d-011eeddaa2dc/',
    img2x: 'https://leonardo.osnova.io/fcd95e61-3e36-80cd-fb4b-1e795ae5d5be/',
    text: '<p>Безработный американец побрезговал мыть свой ковёр.</p>',
    correctMsg: '<p>Правильно. «Ковёр задавал стиль всей комнате!» — знаменитая реплика героя фильма «Большой Лебовски». В походе за новым ковром начинаются все его приключения.</p>',
    incorrectMsg: '<p>Неверно. Бандиты вломились к главному герою фильма «Большой Лебовски» и испортили ему любимый ковёр. Это стало началом всех его приключений.</p>',
    correct: 'left',
    info: {
      avatar: 'https://leonardo.osnova.io/74d549b9-0fb3-e2d4-61d6-0826bda2a1e1/',
      bio: '<p><b>Фильм «Большой Лебовски»</b></p>'
    }
  }, {
    img: 'https://leonardo.osnova.io/948d1a2a-5f5e-c396-57e2-c4f8d04db9a8/',
    img2x: 'https://leonardo.osnova.io/f791cefa-75ce-e2ab-138c-3c97652e795a/',
    text: '<p>Компания калифорнийца разорилась и он берёт передышку: уезжает в Австралию кататься на сёрфе и снимать видео.</p>',
    correctMsg: '<p>Точно. Снимать экшн-видео было сложно — хорошую съёмку могли позволить себе только профессионалы. Так родилась идея сделать камеру GoPro.</p>',
    incorrectMsg: '<p>Это не так. По словам основателя компании Ника Вудмана, без сёрфинга ему никогда бы не пришла идея сделать GoPro — камеру для экстремальных съёмок.</p>',
    correct: 'right',
    info: {
      avatar: 'https://leonardo.osnova.io/13fe5be2-bf9b-0912-b0d5-d5969a9c89b4/',
      bio: '<p><b>Ник Вудман</b></p><p>Придумал свою экшн-камеру</p>'
    }
  }, {
    img: 'https://leonardo.osnova.io/52c30d3b-1d39-89b7-6d5a-2f4283312bcc/',
    img2x: 'https://leonardo.osnova.io/e75eb129-4fa2-38dc-7019-ee5688542a15/',
    text: '<p>Житель Нью-Йорка часто переезжал и испытывал трудности с перевозкой своего комнатного растения.</p>',
    correctMsg: '<p>Всё верно. Цветок в горшке — атрибут главного героя из фильма «Леон». Это метафора «кочевого» образа жизни героя.</p>',
    incorrectMsg: '<p>Увы. За цветком ухаживал главный герой фильма «Леон». Это единственное живое существо, о котором он заботился.</p>',
    correct: 'left',
    info: {
      avatar: 'https://leonardo.osnova.io/d1dfffd0-735c-1795-5d13-18592ff98322/',
      bio: '<p><b>Фильм «Леон»</b></p>'
    }
  }, {
    img: 'https://leonardo.osnova.io/2149a5ee-1517-3346-92f8-3daa11757c7b/',
    img2x: 'https://leonardo.osnova.io/0ac20ddf-a293-cef3-9a9e-b5d07b7005f6/',
    text: '<p>В Сан-Франциско проходила крупная конференция, из-за наплыва посетителей невозможно было найти место в отелях. Предприимчивые друзья заработали на этом $240.</p>',
    correctMsg: '<p>Правильно. Они подселили незнакомцев и продали им три места на надувных матрасах. Это первый заработок проекта Airbnb.</p>',
    incorrectMsg: '<p>Вы не правы. Так началась десятилетняя история компании Airbnb.</p>',
    correct: 'right',
    info: {
      avatar: 'https://leonardo.osnova.io/09f33026-be80-3938-88b3-72bfe34605e2/',
      bio: '<p><b>Брайан Чески и Джо Геббиа</b></p><p>Основали проект для аренды жилья</p>'
    }
  }],
  results: [{
    range: [0, 2],
    img: 'https://leonardo.osnova.io/ca2f98d8-f4a5-8f80-b7e0-ab7971077795/',
    img2x: 'https://leonardo.osnova.io/5dd07332-c8f9-4f1b-5e77-cde3be75297d/',
    title: 'Я — Дов Чарни,<br>основатель American Apparel',
    subtitle: 'Меня выгоняют из<br>собственного бизнеса.'
  }, {
    range: [3, 4],
    img: 'https://leonardo.osnova.io/fccef461-8194-9edd-6fc8-b9868bce1e94/',
    img2x: 'https://leonardo.osnova.io/05aba140-6b7a-fdd6-7ac0-086fe4ee73c7/',
    title: 'Я — Амансио Ортега,<br>создатель Zara',
    subtitle: 'Мои идеи кончились, теперь скупаю<br>банки, отели и недвижимость.'
  }, {
    range: [5, 6],
    img: 'https://leonardo.osnova.io/d9122999-468b-097e-2165-ad49fa69b955/',
    img2x: 'https://leonardo.osnova.io/ab13a37f-7cad-91c8-984d-e912b87da993/',
    title: 'Я — Илон Маск,<br>изобретатель',
    subtitle: 'Подвинул всех на рынках ракет,<br>машин и огнемётов.'
  }, {
    range: [7, 8],
    img: 'https://leonardo.osnova.io/ba09aa38-5b04-98e7-ec55-d372e5ac9ac8/',
    img2x: 'https://leonardo.osnova.io/3dc71a8b-6950-cfa3-61ce-aba248516439/',
    title: 'Я — Ричард Брэнсон,<br>основатель Virgin Group',
    subtitle: 'Владею конгломератом<br>из четырёхсот компаний.'
  }, {
    range: [9, 10],
    img: 'https://leonardo.osnova.io/c3a8acd7-6c74-291d-d002-b69341cf7bde/',
    img2x: 'https://leonardo.osnova.io/99ac7f29-a088-841d-a2c3-b5af21bde5a6/',
    title: 'Я — Уоррен Баффетт,<br>третий в списке богачей',
    subtitle: '«Провидец» бизнеса.'
  }]
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Все svg-иконки рекомендуется хранить здесь,
 * предварительно прогнав их через https://jakearchibald.github.io/svgomg/
 */
exports.default = {
  logo: '<svg viewBox="0 0 197.06 40"><path d="M25.87 21.84A13.19 13.19 0 0 0 21.49 16a12.84 12.84 0 0 0-4.89-2.31.42.42 0 0 1-.28-.27c-.1-1.18-.2-2.36-.25-3.55C16 8.52 16 7.14 16 5.75V5.5h-1.09v7.92l-1-.12v-.44V0h-1v13.29l-1 .13V5.5h-1a.49.49 0 0 0 0 .12c0 1.33 0 2.66-.09 4s-.15 2.55-.25 3.83a.38.38 0 0 1-.23.27 12.64 12.64 0 0 0-4.54 2 13.14 13.14 0 0 0-4.88 6.1 11.22 11.22 0 0 0-.83 3.66.44.44 0 0 1-.09.16v2c.06.33.13.66.17 1a12.3 12.3 0 0 0 1 3.48 13.07 13.07 0 0 0 3.54 4.68c.42.35.86.66 1.39 1.06.59-.85 1.2-1.6 1.67-2.43a24.38 24.38 0 0 0 2.47-6.83c.4-1.84.69-3.7 1-5.56.18-1.16.29-2.34.41-3.51v-1.24c-.61.11-1.15.21-1.68.32a.34.34 0 0 0-.17.23c-.09.39-.17.78-.25 1.17a29.83 29.83 0 0 1-2.36 7.19 22 22 0 0 1-3 4.74c-.39.46-.81.89-1.28 1.4-.34-.68-.67-1.26-.91-1.86A8.79 8.79 0 0 1 1.64 25a10 10 0 0 1 3.49-4.83 13.3 13.3 0 0 1 7.94-2.75 16.74 16.74 0 0 1 2.21.15 12.18 12.18 0 0 1 4.09 1.2 11.58 11.58 0 0 1 4.39 3.58A9 9 0 0 1 25.55 27a8.74 8.74 0 0 1-.67 4.34c-.29.67-.66 1.3-1 1.95h-.16c-.7-.86-1.44-1.7-2.1-2.6a22.85 22.85 0 0 1-2.71-5A30.26 30.26 0 0 1 17 19.24a.93.93 0 0 0-.19-.57c-.58-.16-1.18-.25-1.8-.36.05.68.09 1.24.14 1.8.08.92.12 1.85.26 2.77.23 1.53.51 3.05.8 4.57a27.06 27.06 0 0 0 2.72 8 28.18 28.18 0 0 0 1.63 2.37 2.7 2.7 0 0 0 .44-.15 13.48 13.48 0 0 0 4.87-15.83z"/><path d="M15.25 31.45c-.2-1.66-.44-3.31-.64-5-.11-1-.19-2-.25-3-.08-1.31-.11-2.62-.17-3.93 0-.44-.07-.88-.1-1.34h-1.41l-.18 2.67c-.09 1.41-.16 2.83-.25 4.24 0 .75-.08 1.51-.17 2.25-.14 1.2-.3 2.39-.49 3.58s-.38 2.34-.59 3.48a19.26 19.26 0 0 1-1.78 5l2.14.46c.33.07.67.12 1 .18h2.12a.52.52 0 0 1 .16-.09c.45-.06.91-.09 1.35-.17s1.06-.26 1.57-.39c-.37-.87-.77-1.63-1-2.44a29.29 29.29 0 0 1-1.31-5.5zM195.14 29c-.78-1-1.58-1.9-2.35-2.86a.35.35 0 0 1 0-.33 8.55 8.55 0 0 1 .64-.73l2.7-2.87c.22-.24.43-.51.68-.81a17.88 17.88 0 0 1-1.83 0 1.26 1.26 0 0 0-1.17.56l-3.1 3.66v-4.19h-2.07v10h2l.13-4.8c1.17 1.56 2.29 3.07 3.43 4.57a.72.72 0 0 0 .48.25h2.36v-.1zM88 26.59c-.94-2.21-1.88-4.42-2.83-6.63a.55.55 0 0 0-.41-.27h-4.24a.34.34 0 0 0-.37.26c-.64 1.54-1.31 3.07-2 4.61s-1.26 3-1.89 4.5c-.22.53-.46 1.05-.72 1.66-.22-.53-.39-1-.58-1.42-.62-1.46-1.25-2.92-1.86-4.38-.7-1.67-1.38-3.36-2.08-5a.39.39 0 0 0-.3-.18h-4.64L60.43 33h4.38a.52.52 0 0 0 .37-.27c.3-.71.56-1.44.85-2.16a.43.43 0 0 1 .29-.24h4.57c.32.82.65 1.62.93 2.44a.32.32 0 0 0 .38.25H79a.32.32 0 0 0 .37-.26c.8-2.26 1.62-4.52 2.44-6.77l.89-2.45L86.08 33h4.64a2.1 2.1 0 0 0-.08-.29zm-20.8.59l1.28-3.6 1.33 3.6h-2.6zM111.42 19.9l-3.81 7-.93 1.7h-.09v-8.88h-4.35v13.33h5a.42.42 0 0 0 .28-.21c.43-.76.85-1.52 1.26-2.28l3-5.66c.18-.34.38-.68.58-1h.07V33h4.36V19.68h-5.2a.39.39 0 0 0-.17.22zM129.38 25.31a6 6 0 0 0-2.61-.56h-4.71v-1.67h8.35v-3.37h-12.75v13.34h9.23a7.19 7.19 0 0 0 1.48-.17 3 3 0 0 0 2.63-2.55 13 13 0 0 0 0-2.49 2.78 2.78 0 0 0-1.62-2.53zm-2.86 4.17a.83.83 0 0 1-.57.38h-3.91v-1.92a2.92 2.92 0 0 1 .31 0h3.3a1 1 0 0 1 .87 1.55zM62.16 27a6.62 6.62 0 0 0 .37-4.13 3.51 3.51 0 0 0-2.38-2.8 6.35 6.35 0 0 0-1.92-.36H49.1V33h4.36v-3.79h3.48a17.51 17.51 0 0 0 2.31-.09A3.56 3.56 0 0 0 62.16 27zm-5-1.2c-1.2.06-2.4 0-3.64 0v-2.69h3.42a1.36 1.36 0 0 1 .18 2.68zM44.25 19.69a.49.49 0 0 0-.32.26c-.82 1.64-1.63 3.29-2.44 4.93-.06.11-.12.22-.21.37l-.15-.25c-.82-1.66-1.64-3.32-2.44-5a.46.46 0 0 0-.5-.3h-4.57c.1.2.17.36.25.51l2.46 4.36 2.44 4.38a.52.52 0 0 1 .07.62c-.39.64-.76 1.29-1.13 1.94l-.88 1.56h4.56a.55.55 0 0 0 .38-.27c.41-.72.78-1.46 1.17-2.19l3.5-6.41c.49-.89 1-1.78 1.46-2.68.31-.58.61-1.18.94-1.81-1.58-.03-3.08-.03-4.59-.02zM96.4 29.62A2.2 2.2 0 0 1 94.14 28a5.13 5.13 0 0 1-.09-2.59 2.36 2.36 0 0 1 2.25-2.19 18.59 18.59 0 0 1 2.55-.1h2.49v-3.36c-2.19 0-4.35-.05-6.5 0a4.91 4.91 0 0 0-4.06 2.4 7.73 7.73 0 0 0-1.14 5.31A6.58 6.58 0 0 0 91.07 31a5.21 5.21 0 0 0 4.07 2h6.22v-3.36c-1.68 0-3.36.06-4.96-.02zM164.12 25.54a5.16 5.16 0 0 0-2-.31h-1.35v-2.07h4.35v-1.74h-6.47v10c1.62 0 3.23 0 4.81-.15a2.66 2.66 0 0 0 2.19-1.56 3.07 3.07 0 0 0 .22-2.07 2.75 2.75 0 0 0-1.75-2.1zm-.45 3.22a1.2 1.2 0 0 1-1.06 1c-.6.07-1.21.08-1.86.13v-3a4.16 4.16 0 0 1 2.41.32 1.45 1.45 0 0 1 .51 1.55zM184.57 25.37h-4v-3.95h-2.06v10h2.08v-4.3h4v4.28h2.08v-10h-2.1v3.95zM173.46 21.66a.36.36 0 0 0-.41-.27h-1.75a.46.46 0 0 0-.52.37c-.64 1.65-1.3 3.3-2 4.94l-1.88 4.71h2.1a.42.42 0 0 0 .24-.25c.22-.53.44-1.06.61-1.61a.44.44 0 0 1 .54-.34h3.26a.54.54 0 0 1 .6.44c.22.6.45 1.19.67 1.77h2.36c-.2-.52-.38-1-.56-1.46q-1.61-4.15-3.26-8.3zm-2.74 5.76l1.3-3.77h.1l1.35 3.75h-2.75zM144.37 36.77h.9V16.68h-.9v20.09z"/></svg>',
  arrow: '<svg width="10" height="17.15"><path d="M1.82 17l8-8a.54.54 0 0 0 0-.79l-8-8A.54.54 0 0 0 1 .17L.17 1a.54.54 0 0 0 0 .79l6.75 6.78-6.75 6.76a.54.54 0 0 0 0 .79L1 17a.54.54 0 0 0 .82 0z"/></svg>',
  movie: '<svg width="40.5" height="40.53" viewBox="0 0 40.5 40.53"><path d="M39.42 15h-27l27.29-6.2a1.09 1.09 0 0 0 .81-1.33l-1.48-5.39a2.78 2.78 0 0 0-3.29-2l-33.61 8A2.75 2.75 0 0 0 .08 11.4l1.54 6v18.71a4.43 4.43 0 0 0 4.42 4.42h30a4.43 4.43 0 0 0 4.42-4.42v-20A1.09 1.09 0 0 0 39.42 15zM7.8 21.68l2.25-4.51h5.92l-2.25 4.51H7.8zm-4 0v-4.51h3.83l-2.26 4.51H3.79zm12.35 0l2.25-4.51h5.92l-2.25 4.51h-5.93zm8.34 0l2.25-4.51h5.91l-2.25 4.51h-5.92zm-20.7 2.17h34.54v12.26a2.26 2.26 0 0 1-2.25 2.25h-30a2.26 2.26 0 0 1-2.25-2.25V23.85zm29-2.17l2.25-4.51h3.25v4.51h-5.46zm-22.3-8.48l-4-4 5.61-1.33 4 4zm8.16-1.85l-4-4 5.6-1.38 4.08 4.08zm8.16-1.85l-4.1-4.1 5.64-1.35 4.15 4.2zm10.1-6.87l1.14 4.31-3.08.7-4.14-4.17 5.42-1.29a.62.62 0 0 1 .69.44zM8.03 13.76l-4.83 1.1-1-4a.59.59 0 0 1 .45-.72l1.44-.34z"/></svg>',
  case: '<svg width="40" height="32.94" viewBox="0 0 40 32.94"><path d="M36.88 4.74h-8.43V3.23A3.23 3.23 0 0 0 25.22 0H14.78a3.23 3.23 0 0 0-3.23 3.23v1.51H3.12A3.13 3.13 0 0 0 0 7.86v22a3.13 3.13 0 0 0 3.12 3.12h33.76A3.13 3.13 0 0 0 40 29.86v-22a3.13 3.13 0 0 0-3.12-3.12zm-22.6-1.51a.5.5 0 0 1 .5-.5h10.44a.5.5 0 0 1 .5.5v1.51H14.28V3.23zM3.12 7.46h33.76a.4.4 0 0 1 .4.4V15c-4.23 1.57-10.6 2.49-17.28 2.49S6.95 16.58 2.73 15V7.86a.4.4 0 0 1 .39-.4zm33.76 22.75H3.12a.4.4 0 0 1-.4-.4v-11.9a54.19 54.19 0 0 0 14.49 2.27v.6a2 2 0 0 0 2 2h1.48a2 2 0 0 0 2-2v-.6a54.1 54.1 0 0 0 14.58-2.28v11.92a.4.4 0 0 1-.39.39z"/></svg>',
  hat: '<svg width="44.6" height="28.4"><path d="M44.56 7.73a.83.83 0 0 0-.51-.52L22.54.04a.82.82 0 0 0-.48 0L.57 7.2a.82.82 0 0 0-.53 1 .8.8 0 0 0 .12.23l.18.22a.81.81 0 0 0 .23.15l8.64 2.88v9.63a.82.82 0 0 0 .06.31 7.39 7.39 0 0 0 2.53 2.84c2.45 1.77 6 2.72 10.31 2.75v-1.64a17.32 17.32 0 0 1-8.53-1.89 6.91 6.91 0 0 1-2.7-2.53V12.19l11.19 3.73a.79.79 0 0 0 .52 0l5.05-1.68v1.24h-.13a2.85 2.85 0 0 0-1.89 2.5l-2 10 1.61.32 1.57-7.76.24.14a2.84 2.84 0 0 0 .48.22h.13v7.29h1.65v-7.24h.13a2.82 2.82 0 0 0 .48-.22l.24-.14.02.21 1.51 7.59 1.61-.32-2-10.15a2.85 2.85 0 0 0-1.88-2.41h-.13v-1.82h.14l4.35-1.45v9.92a4.52 4.52 0 0 1-.54.58L34.3 24a5 5 0 0 0 1.08-1.29.82.82 0 0 0 .08-.36V11.64h.14l8.45-2.84a.82.82 0 0 0 .51-1.07zm-14.9 10.48a1.22 1.22 0 1 1-1.22-1.22 1.22 1.22 0 0 1 1.22 1.22zm10.95-10l-11.35 3.74-.07-.15a.83.83 0 0 0-.34-.41l-3.9-2.34.06-.15a2.82 2.82 0 0 0 .16-.89 2.89 2.89 0 1 0-1.37 2.39l.1-.07.11.06 3.53 2.12-5.24 1.77-18.87-6.3L4 7.8l18.3-6.1 18.87 6.28zm-17.09-.23A1.22 1.22 0 1 1 22.3 6.8a1.22 1.22 0 0 1 1.22 1.18z"/></svg>',
  payment: '<svg width="43.48" height="36"><path d="M43.13 11.69L36 7.59a8.15 8.15 0 0 1 2.7-2.46.69.69 0 0 0 0-1.2L32.06.09a.69.69 0 0 0-.69 0 9.53 9.53 0 0 0-3.16 3l-.57-.33a.69.69 0 0 0-.69 0l-8.88 5.09-.07.07L.24 23.28a.69.69 0 0 0-.24.52v2.56a.69.69 0 0 0 .35.6l15.51 9a.69.69 0 0 0 .69 0l26.58-15.4a.69.69 0 0 0 .35-.6v-7.68a.69.69 0 0 0-.35-.59zM31.72 1.5L37 4.57A9.59 9.59 0 0 0 33.3 11L28 8a8.19 8.19 0 0 1 3.72-6.5zm1.86 11.3a.69.69 0 0 0 1-.6 8.1 8.1 0 0 1 .13-1.2L37 12.28l-3 1.76-9.69-5.6L26.68 7a9.48 9.48 0 0 0-.09 1.33.69.69 0 0 0 .35.6zm-6.3-8.67l.24.14a9.57 9.57 0 0 0-.39.95.69.69 0 0 0-.19.07L22.5 7.85a.69.69 0 0 0 0 1.2l11.08 6.4a.69.69 0 0 0 .69 0l4.43-2.56a.69.69 0 0 0 0-1.2l-3.65-2.11a8.17 8.17 0 0 1 .31-.78l6 3.49-7.43 4.31L19.8 8.45zM1.38 26v-1l14.12 8.15v1zm14.74 5.95L1.88 23.68 18.5 9.29l14.24 8.22zm26-12.34l-25.23 14.5v-1L34.33 18l7.76-4.48v6.08z"/><path d="M30.14 17.2L19 10.79a.69.69 0 0 0-.8.08l-3.35 2.93a.69.69 0 0 0 .15 1.12l11.1 6.41a.69.69 0 0 0 .8-.08l3.39-2.94a.69.69 0 0 0-.15-1.11zm-3.82 2.69l-9.83-5.68 2.29-2 9.83 5.68zM25 21.67l-11.1-6.41a.69.69 0 0 0-.8.08l-8.73 7.54A.69.69 0 0 0 4.48 24l11.1 6.41a.69.69 0 0 0 .8-.08l8.71-7.54a.69.69 0 0 0-.09-1.12zM15.84 29L6 23.29l7.6-6.59 9.83 5.68z"/></svg>',
  swipe: '<svg width="54.78" height="60"><path d="M35.22 7.82h12.5l-3 3a1.31 1.31 0 0 0 1.85 1.84l5.23-5.22a1.23 1.23 0 0 0 .13-.2 1.28 1.28 0 0 0 .14-.24 1.27 1.27 0 0 0-.25-1.38L46.58.38a1.301 1.301 0 0 0-1.84 1.84l3 3H35.22a1.3 1.3 0 0 0 0 2.6zM7.44 12.66a1.31 1.31 0 0 0 0-1.84l-3-3H17a1.305 1.305 0 0 0 0-2.61H4.45l3-3A1.301 1.301 0 0 0 5.6.38L.38 5.6A1.3 1.3 0 0 0 .1 6a1.31 1.31 0 0 0 0 1 1.28 1.28 0 0 0 .15.23 1.23 1.23 0 0 0 .13.2l5.22 5.23a1.31 1.31 0 0 0 .92.38 1.29 1.29 0 0 0 .92-.38zM49.57 26.09a5.2 5.2 0 0 0-2.9.88 5.22 5.22 0 0 0-7.83-2.61 5.23 5.23 0 0 0-4.93-3.49 5.18 5.18 0 0 0-2.61.7V13a5.22 5.22 0 1 0-10.44 0v22.22l-4.53-3.4a6.84 6.84 0 0 0-8.89.63 3.92 3.92 0 0 0 0 5.53L26 56.56A11.67 11.67 0 0 0 34.32 60h6.11a14.37 14.37 0 0 0 14.35-14.35V31.3a5.22 5.22 0 0 0-5.21-5.21zm2.61 19.57a11.75 11.75 0 0 1-11.74 11.73h-6.12a9.07 9.07 0 0 1-6.46-2.67L9.29 36.14a1.31 1.31 0 0 1 0-1.84 4.22 4.22 0 0 1 5.49-.39l6.62 5a1.3 1.3 0 0 0 2.09-1V13a2.61 2.61 0 1 1 5.22 0v19.61a1.305 1.305 0 0 0 2.61 0v-6.52a2.61 2.61 0 1 1 5.22 0v6.52a1.305 1.305 0 0 0 2.61 0v-3.92a2.61 2.61 0 0 1 5.22 0v3.91a1.305 1.305 0 0 0 2.61 0v-1.3a2.61 2.61 0 0 1 5.22 0v14.35z"/></svg>',
  swipeL: '<svg viewBox="0 0 54.78 60.01"><path d="M7.44 12.67a1.31 1.31 0 0 0 0-1.84l-3-3H17a1.305 1.305 0 1 0 0-2.61H4.45l3-3A1.301 1.301 0 0 0 5.6.39L.38 5.61a1.3 1.3 0 0 0-.28.4 1.31 1.31 0 0 0 0 1 1.28 1.28 0 0 0 .15.23 1.23 1.23 0 0 0 .13.2l5.22 5.23a1.31 1.31 0 0 0 .92.38 1.29 1.29 0 0 0 .92-.38zM49.57 26.1a5.2 5.2 0 0 0-2.9.88 5.22 5.22 0 0 0-7.83-2.61 5.22 5.22 0 0 0-7.54-2.79v-8.57a5.22 5.22 0 0 0-10.44 0v22.22l-4.53-3.4a6.84 6.84 0 0 0-8.89.63 3.92 3.92 0 0 0 0 5.53L26 56.57a11.67 11.67 0 0 0 8.32 3.44h6.11a14.37 14.37 0 0 0 14.35-14.35V31.31a5.22 5.22 0 0 0-5.21-5.21zm2.63 19.56A11.75 11.75 0 0 1 40.44 57.4h-6.12a9.07 9.07 0 0 1-6.46-2.67L9.29 36.15a1.31 1.31 0 0 1 0-1.84 4.22 4.22 0 0 1 5.49-.39l6.62 5a1.3 1.3 0 0 0 2.09-1V13.01a2.61 2.61 0 0 1 5.22 0v19.61a1.305 1.305 0 1 0 2.61 0V26.1a2.61 2.61 0 0 1 5.22 0v6.52a1.31 1.31 0 0 0 2.61 0V28.7a2.61 2.61 0 1 1 5.22 0v3.91a1.305 1.305 0 0 0 2.61 0v-1.3a2.61 2.61 0 1 1 5.22 0v14.35z"/></svg>',
  swipeR: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.48 60"><path d="M28.92 7.82h12.5l-3 3a1.31 1.31 0 0 0 1.85 1.84l5.23-5.22a1.23 1.23 0 0 0 .13-.2 1.25 1.25 0 0 0-.11-1.62L40.28.38a1.301 1.301 0 1 0-1.84 1.84l3 3H28.92a1.3 1.3 0 0 0 0 2.6zM43.27 26.09a5.2 5.2 0 0 0-2.9.88 5.22 5.22 0 0 0-7.83-2.61A5.22 5.22 0 0 0 25 21.57V13a5.22 5.22 0 1 0-10.44 0v22.22l-4.53-3.4a6.84 6.84 0 0 0-8.89.63 3.92 3.92 0 0 0 0 5.53L19.7 56.56A11.67 11.67 0 0 0 28.02 60h6.11a14.37 14.37 0 0 0 14.35-14.35V31.3a5.22 5.22 0 0 0-5.21-5.21zm2.61 19.57a11.75 11.75 0 0 1-11.74 11.73h-6.12a9.07 9.07 0 0 1-6.46-2.67L2.99 36.14a1.31 1.31 0 0 1 0-1.84 4.22 4.22 0 0 1 5.49-.39l6.62 5a1.3 1.3 0 0 0 2.09-1V13a2.61 2.61 0 1 1 5.22 0v19.61a1.31 1.31 0 0 0 2.61 0v-6.52a2.61 2.61 0 0 1 5.22 0v6.52a1.31 1.31 0 0 0 2.61 0v-3.92a2.61 2.61 0 0 1 5.22 0v3.91a1.31 1.31 0 0 0 2.61 0v-1.3a2.61 2.61 0 1 1 5.22 0v14.35z"/></svg>'
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.init = undefined;

var _cmttLikely = __webpack_require__(17);

var _cmttLikely2 = _interopRequireDefault(_cmttLikely);

var _dom = __webpack_require__(6);

var _analytics = __webpack_require__(5);

var Analytics = _interopRequireWildcard(_analytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSS = {
    likely: 'likely',
    likelyCustom: 'likely--custom'
};

var init = exports.init = function init() {
    _cmttLikely2.default.initate();
};

/**
 * Make likely buttons and append to specified element
 * @param {Element} parentContainer - likely container will be placed here
 * @param {Object} set - object with optional params (title, url, twitter)
 */
var make = exports.make = function make(parentContainer) {
    var set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var likelyContainer = (0, _dom.makeElement)('div', [CSS.likely, CSS.likelyCustom]);
    var socials = ['facebook', 'vkontakte', 'twitter'];

    socials.forEach(function (social) {
        var button = (0, _dom.makeElement)('div', social);

        if (social === 'facebook') button.innerHTML = 'Поделиться';

        button.addEventListener('click', function () {
            Analytics.sendEvent('Share ' + social);
        });

        likelyContainer.appendChild(button);
    });

    parentContainer.appendChild(likelyContainer);

    if (set.url) likelyContainer.dataset.url = set.url;
    if (set.twitter) likelyContainer.dataset.twitter = set.twitter;
    if (set.title) likelyContainer.dataset.title = set.title;

    init();
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 'use strict';

var Likely = __webpack_require__(18),
    config = __webpack_require__(0),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1);

/**
 * @param {Node} node
 * @param {Object} options
 */
var likely = function (node, options) {
    options = options || {};

    var widget = node[config.name];

    if (widget) {
        widget.update(options);
    }
    else {
        node[config.name] = new Likely(node, utils.merge(
            {}, likely.defaults,
            options, utils.bools(node)
        ));
    }

    return widget;
};

/**
 * Initiate Likely buttons on load
 */
likely.initiate = likely.initate = function () {
    var widgets = dom.findAll('.' + config.name);

    utils.toArray(widgets).forEach(likely);
};

/**
 * Defaults options for likely
 */
likely.defaults = {
    counters: true,
    timeout:  1e3,
    zeroes:   false,
    title:    document.title,
    wait:     0.5e3,
    url:      window.location.href.replace(window.location.hash, '')
};

module.exports = likely;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Button = __webpack_require__(19);

var services = __webpack_require__(3),
    config   = __webpack_require__(0),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1),
    storage = __webpack_require__(7);

/**
 * Main widget view
 *
 * @param {Node} container
 * @param {Object} options
 */
function Likely(container, options) {
    this.isSmartOrder = container.dataset.smart !== undefined ? true : false;
    this.container = container;
    this.options   = options;

    this.countersLeft = 0;
    this.buttons      = [];
    this.number       = 0;

    this.init();
}

Likely.prototype = {

    /**
     * Change buttons order, if previous clicks were saved
     * @param {Array} children
     */
    reorder: function (children) {
        var savedServices = storage.getItem(config.storageKey);

        if (savedServices) {
            savedServices.reverse();

            savedServices.forEach(function (service) {

                var button = dom.find('.' + service);

                if (button) {
                    button.parentNode.insertBefore(button, button.parentNode.firstChild);
                }

            });
        }
    },

    /**
     * Initiate the social buttons widget
     */
    init: function () {

        var buttons = utils.toArray(this.container.children);

        if (dom.isMobile() && this.isSmartOrder) {
            this.reorder(buttons);
        }

        buttons.forEach(this.addButton.bind(this));

        if (this.options.counters) {
            this.timer   = setTimeout(this.appear.bind(this), this.options.wait);
            this.timeout = setTimeout(this.ready.bind(this),  this.options.timeout);
        }
        else {
            this.appear();
        }

        utils.flexboxSupport(this.container, config.name);
    },

    /**
     * Add a button
     *
     * @param {Node} node
     */
    addButton: function (node) {
        var button = new Button(node, this, this.options);

        this.buttons.push(button);

        if (button.options.counterUrl) {
            this.countersLeft++;
        }
    },

    /**
     * Update the timer with URL
     *
     * @param {Object} options
     */
    update: function (options) {
        if (
            options.forceUpdate ||
            options.url !== this.options.url
        ) {
            this.countersLeft = this.buttons.length;
            this.number = 0;

            this.buttons.forEach(function (button) {
                button.update(options);
            });
        }
    },

    /**
     * Update counter
     *
     * @param {String} service
     * @param {Number} counter
     */
    updateCounter: function (service, counter) {
        if (counter) {
            this.number += counter;
        }

        this.countersLeft--;

        if (this.countersLeft === 0) {
            this.appear();
            this.ready();
        }
    },

    /**
     * Show the buttons with smooth animation
     */
    appear: function () {
        this.container.classList.add(config.name + '--visible');
    },

    /**
     * Get. Set. Ready.
     */
    ready: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);

            this.container.classList.add(config.name + '--ready');
        }
    }
};

module.exports = Likely;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var services = __webpack_require__(3),
    config = __webpack_require__(0),
    fetch = __webpack_require__(33),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1),
    storage = __webpack_require__(7);

var htmlSpan = '<span class="{className}">{content}</span>';

/**
 * Separate social link widget
 *
 * @param {Node} widget
 * @param {Likely} likely
 * @param {Object} options
 */
function LikelyButton (widget, likely, options) {
    this.widget  = widget;
    this.likely  = likely;
    this.options = utils.merge(options);

    this.init();
}

LikelyButton.prototype = {
    /**
     * Initiate the button
     */
    init: function () {
        this.detectService();
        this.detectParams();

        if (this.service) {
            this.initHtml();

            setTimeout(this.initCounter.bind(this), 0);
        }
    },

    /**
     * Update the counter
     *
     * @param {Object} options
     */
    update: function (options) {
        var className = '.' + config.prefix + 'counter';
            counters  = dom.findAll(className, this.widget);

        utils.extend(this.options, utils.merge({forceUpdate: false}, options));
        utils.toArray(counters).forEach(function (node) {
            node.parentNode.removeChild(node);
        });

        this.initCounter();
    },

    /**
     * Get the config.name of service and its options
     */
    detectService: function () {
        var widget  = this.widget,
            service = utils.getDataset(widget).service;

        if (!service) {
            var classes = widget.className.split(' ');

            for (var i = 0; i < classes.length; i++) {
                if (classes[i] in services) break;
            }

            service = classes[i];
        }

        if (service) {
            this.service = service;

            utils.extend(this.options, services[service]);
        }
    },

    /**
     * Merge params from data-* attributes into options hash map
     */
    detectParams: function () {
        var options = this.options,
            data    = utils.getDataset(this.widget);

        if (data.counter) {
            var counter = parseInt(data.counter, 10);

            if (isNaN(counter)) {
                options.counterUrl = data.counter;
            }
            else {
                options.counterNumber = counter;
            }
        }

        options.title = data.title || options.title;
        options.url   = data.url   || options.url;
    },

    /**
     * Inititate button's HTML
     */
    initHtml: function () {
        var options = this.options,
            widget  = this.widget,
            text    = widget.innerHTML;

        widget.addEventListener('click', this.click.bind(this));
        widget.classList.remove(this.service);
        widget.className += (' ' + this.className('widget'));

        var button = utils.template(htmlSpan, {
            className: this.className('button'),
            content:   text
        });

        var icon = utils.template(htmlSpan, {
            className: this.className('icon'),
            content:   dom.wrapSVG(options.svgi)
        });

        widget.innerHTML = icon + button;
    },

    /**
     * Fetch or get cached counter value and update the counter
     */
    initCounter: function () {
        var options = this.options;

        if (options.counters && options.counterNumber) {
            this.updateCounter(options.counterNumber);
        }
        else if (options.counterUrl) {
            fetch(
                this.service,
                options.url,
                options
            )(this.updateCounter.bind(this));
        }
    },

    /**
     * @param {String} className
     * @return {String}
     */
    className: function (className) {
        var fullClass = config.prefix + className;

        return fullClass + ' ' + fullClass + '--' + this.service;
    },

    /**
     * Update counter
     *
     * @param {String} e
     */
    updateCounter: function (counter) {
        counter = parseInt(counter, 10) || 0;

        var counterElement = dom.find('.' + config.name + '__counter', this.widget);

        if (counterElement) {
            counterElement.parentNode.removeChild(counterElement);
        }

        var options = {
            className: this.className('counter'),
            content:   counter
        };

        if (!counter && !this.options.zeroes) {
            options.className += ' ' + config.prefix + 'counter--empty';
            options.content = '';
        }

        this.widget.appendChild(
            dom.createNode(utils.template(htmlSpan, options))
        );

        this.likely.updateCounter(this.service, counter);
    },

    /**
     * Click event listener
     */
    click: function () {
        var options = this.options;

        if ( this.service == 'more' ){

            this.widget.classList.toggle('active');
            this.widget.parentElement.classList.toggle(this.options.className);

        } else if (this.service == 'email'){

            var url = utils.makeUrl(options.popupUrl, {
                url: options.url,
                title: options.title
            });

            window.location = url;

            this.rememberClicked(this.service);

        } else {

            if (options.click.call(this)) {

                var twitterText = this.likely.container.dataset.twitter,
                    twitterUrl = this.likely.container.dataset.twitterUrl;

                var window_url = utils.makeUrl(options.popupUrl, {
                    url:   (this.service === 'twitter' && twitterUrl !== '' && twitterUrl !== undefined) ? twitterUrl : options.url,
                    title: (this.service === 'twitter' && twitterText !== '' && twitterText !== undefined) ? twitterText : options.title
                });

                dom.openPopup(
                    this.addAdditionalParamsToUrl(window_url),
                    config.prefix + this.service,
                    options.popupWidth,
                    options.popupHeight
                );

                this.rememberClicked(this.service);
            }

        }

        return false;
    },

    /**
     * Append service data to URL
     *
     * @param {String} url
     */
    addAdditionalParamsToUrl: function (url) {
        var parameters = utils.query(utils.merge(
                this.widget.dataset,
                this.options.data
            )),
            delimeter = url.indexOf('?') === -1 ? '?' : '&';

        return (parameters === '') ? url : (url + delimeter + parameters);
    },

    /**
     * Remember last clicked button and save to storage
     */
    rememberClicked: function (service) {
        var services = storage.getItem(config.storageKey) || [],
            serviceIndex = services.indexOf(service);

        if (serviceIndex !== -1) {
            services.splice(serviceIndex, 1);
        }

        services.splice(0, 0, service);

        storage.setItem(config.storageKey, services);
    }
};

module.exports = LikelyButton;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var dom = __webpack_require__(1);

/**
 * @param {String} url
 * @param {Function} factory
 */
var counter = function (url, factory) {
    var self = this;
    
    dom.getJSON(url, function (count) {
        try {
            if (typeof self.convertNumber === 'function') {
                count = self.convertNumber(count);
            } 
            
            factory(count);
        } 
        catch (e) {}
    });
};

/**
 * @param {Object} options
 */
module.exports = function (options) {
    options.counter = options.counter || counter;
    options.click   = options.click   || function () { return true; };
};

/***/ }),
/* 21 */
/***/ (function(module) {

module.exports = {"facebook":"5.9 16h3.3V8h2.2l.3-2.8H9.2V3.8c0-.7.1-1.1 1.1-1.1h1.4V0H9.5C6.9 0 5.9 1.3 5.9 3.6v1.7H4.3V8H6v8","twitter":"15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353","vkontakte":"15.4 12.8h-1.8c-.7 0-.9-.5-2.1-1.7-1-1-1.5-1.1-1.7-1.1-.4 0-.5.1-.5.6v1.6c0 .4-.1.7-1.3.7-1.9 0-3.9-1.1-5.3-3.2C.6 6.5 0 4.2 0 3.7c0-.3.1-.5.6-.5h1.8c.4 0 .6.2.8.7C4 6.4 5.4 8.6 6 8.6c.2 0 .3-.1.3-.7V5.4c0-1.2-.6-1.3-.6-1.7 0-.2.2-.4.4-.4h2.8c.4 0 .5.2.5.6v3.5c0 .4.2.5.3.5.2 0 .4-.1.8-.5 1.3-1.4 2.2-3.6 2.2-3.6.1-.3.3-.5.8-.5h1.8c.5 0 .6.3.5.6-.2 1-2.4 4-2.4 4-.2.3-.3.4 0 .8.2.3.8.8 1.2 1.3.8.8 1.3 1.6 1.5 2.1 0 .4-.2.7-.7.7","gplus":"8,6.5v3h4.291c-0.526,2.01-2.093,3.476-4.315,3.476C5.228,12.976,3,10.748,3,8c0-2.748,2.228-4.976,4.976-4.976c1.442,0,2.606,0.623,3.397,1.603L13.52,2.48C12.192,0.955,10.276,0,8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s7.5-3.582,7.5-8V6.5H8","odnoklassniki":"8 2.6c.9 0 1.7.7 1.7 1.7C9.7 5.2 9 6 8 6c-.9 0-1.7-.7-1.7-1.7S7.1 2.6 8 2.6zm0 5.7c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm1.6 3.2c.8-.2 1.6-.5 2.3-1 .5-.3.7-1.1.4-1.6-.3-.6-1.1-.7-1.6-.4-1.6 1-3.8 1-5.4 0-.6-.3-1.3-.1-1.6.4-.4.6-.2 1.3.3 1.7.7.5 1.5.8 2.3 1l-2.2 2.2c-.5.5-.5 1.2 0 1.7.2.2.5.3.8.3.3 0 .6-.1.8-.3L8 13.2l2.2 2.2c.5.5 1.2.5 1.7 0s.5-1.2 0-1.7l-2.3-2.2","pocket":"12.533 6.864L8.77 10.4c-.213.2-.486.3-.76.3-.273 0-.547-.1-.76-.3L3.488 6.865c-.437-.41-.45-1.09-.032-1.52.42-.428 1.114-.443 1.55-.032l3.006 2.823 3.004-2.823c.438-.41 1.132-.396 1.55.032.42.43.406 1.11-.03 1.52zm3.388-4.928c-.207-.56-.755-.936-1.363-.936H1.45C.854 1 .31 1.368.096 1.917.032 2.08 0 2.25 0 2.422v4.73l.055.94c.232 2.14 1.366 4.01 3.12 5.314.03.024.063.047.094.07l.02.013c.94.673 1.992 1.13 3.128 1.353.524.104 1.06.157 1.592.157.492 0 .986-.045 1.472-.133.058-.01.116-.022.175-.034.016-.003.033-.01.05-.018 1.088-.233 2.098-.677 3.003-1.326l.02-.015c.032-.022.064-.045.096-.07 1.753-1.303 2.887-3.173 3.12-5.312l.054-.94v-4.73c0-.165-.02-.327-.08-.487","telegram":"12.4 4.2L6.6 9.6c-.2.2-.3.4-.4.7L6 11.8c0 .2-.3.2-.3 0l-.8-2.6c-.1-.4.1-.7.3-.8l7-4.3c.2-.2.4 0 .2.1zm2.9-3L.5 6.9c-.4.1-.4.7 0 .8L4.1 9l1.4 4.5c.1.3.4.4.7.2l2-1.6c.2-.2.5-.2.7 0l3.6 2.6c.3.2.6 0 .7-.3l2.6-12.8c.1-.2-.2-.5-.5-.4","whatsapp":"15.8 7.8c0 4.2-3.4 7.6-7.6 7.6-1.3 0-2.6-.3-3.7-.9L.3 15.8l1.4-4.1C1 10.6.6 9.2.6 7.8.6 3.6 4 .2 8.2.2c4.2 0 7.6 3.4 7.6 7.6M8.1 1.4c-3.5 0-6.4 2.9-6.4 6.4 0 1.4.5 2.7 1.2 3.7l-.8 2.4 2.5-.8c1 .7 2.2 1.1 3.5 1.1 3.5 0 6.4-2.9 6.4-6.4.1-3.5-2.8-6.4-6.4-6.4M12 9.5c0-.1-.2-.1-.4-.2s-1.1-.5-1.3-.6c-.2-.1-.3-.1-.4.1-.1.2-.4.6-.6.7-.1.1-.2.1-.4 0-.1 0-.8-.2-1.5-.8-.6-.5-.9-1.1-1-1.3-.1-.2 0-.3.1-.4l.3-.3c.1-.1.1-.2.2-.3 0-.2 0-.3-.1-.4 0-.1-.4-1-.6-1.4-.1-.3-.3-.2-.4-.2h-.4c-.1 0-.3 0-.5.2-.1.2-.6.6-.6 1.5s.7 1.8.8 1.9c.1.1 1.3 2.1 3.2 2.8 1.9.7 1.9.5 2.2.5.3 0 1.1-.4 1.3-.9.1-.4.1-.8.1-.9","viber":"13.7 6.7c0 .3.1.7-.3.8-.6.1-.5-.4-.5-.8-.4-2.3-1.2-3.2-3.5-3.7-.4-.1-.9 0-.8-.5.1-.5.5-.4.9-.3 2.3.3 4.2 2.3 4.2 4.5zM8.8 1.2c3.7.6 5.5 2.4 5.9 6.1 0 .3-.1.9.4.9s.4-.5.4-.9c0-3.6-3.1-6.8-6.7-7-.2.1-.8-.1-.8.5 0 .4.4.3.8.4zm5.7 10.2c-.5-.4-1-.7-1.5-1.1-1-.7-1.9-.7-2.6.4-.4.6-1 .6-1.6.4-1.7-.8-2.9-1.9-3.7-3.6-.3-.7-.3-1.4.5-1.9.4-.3.8-.6.8-1.2 0-.8-2-3.5-2.7-3.7-.3-.1-.6-.1-1 0C.9 1.2.2 2.7.9 4.4c2.1 5.2 5.8 8.8 11 11 .3.1.6.2.8.2 1.2 0 2.5-1.1 2.9-2.2.3-1-.5-1.5-1.1-2zM9.7 4c-.2 0-.5 0-.6.3-.1.4.2.5.5.5.9.2 1.4.7 1.5 1.7 0 .3.2.5.4.4.3 0 .4-.3.4-.6 0-1.1-1.2-2.3-2.2-2.3","email":"12.7 1c1 .5 1.8 1.2 2.3 2.2.5.9.8 1.9.8 3.1 0 .9-.1 1.8-.5 2.7-.3.9-.8 1.6-1.4 2.2-.6.6-1.4.9-2.3.9-.6 0-1.1-.2-1.5-.5-.4-.3-.6-.7-.7-1.2-.6 1.1-1.5 1.6-2.5 1.6-.8 0-1.5-.3-1.9-.8-.5-.6-.7-1.3-.7-2.2 0-.8.1-1.6.4-2.5S5.5 5 6.1 4.4c.7-.6 1.5-.8 2.6-.8.5 0 1 .1 1.4.2.5.1.9.3 1.3.6l-.7 4.9v.3c0 .2 0 .4.1.5.1.1.3.2.5.2.4 0 .8-.2 1.1-.7.3-.4.5-1 .7-1.6.1-.7.2-1.3.2-1.9 0-1.3-.4-2.3-1.1-3-.8-.7-1.9-1-3.4-1s-2.7.4-3.7 1.1c-.9.7-1.6 1.6-2 2.6S2.6 7.9 2.6 9c0 .9.2 1.8.6 2.5.4.7 1 1.3 1.7 1.7.7.4 1.7.6 2.7.6.5 0 1-.1 1.6-.2.6-.1 1.1-.3 1.5-.4l.4 1.9c-.6.2-1.2.4-1.8.5-.7.1-1.3.2-1.9.2-1.4 0-2.7-.3-3.8-.9s-1.9-1.4-2.5-2.4S.2 10.3.2 9c0-1.3.3-2.7 1-4 .6-1.4 1.6-2.5 3-3.4C5.5.7 7.2.2 9.2.2c1.3 0 2.5.3 3.5.8zm-4 8.4l.6-3.9c-.3-.1-.5-.2-.7-.2-.7 0-1.2.4-1.5 1.2-.3.8-.5 1.7-.5 2.6 0 .8.3 1.2.8 1.2s.9-.3 1.3-.9","more":"14.725 6.667H9.333V1.275C9.333.57 8.738 0 8 0S6.667.57 6.667 1.275v5.392H1.275C.57 6.667 0 7.262 0 8s.57 1.334 1.275 1.334h5.392v5.393C6.667 15.43 7.262 16 8 16s1.333-.57 1.333-1.273V9.334h5.392C15.43 9.334 16 8.738 16 8s-.57-1.333-1.275-1.333"};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Odnoklassniki service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var odnoklassniki = {
    counterUrl: config.secure 
        ? undefined 
        : 'http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}',
    counter: function (url, promise) {
        this.promises.push(promise);
        
        dom.getScript(utils.makeUrl(url, {
            index: this.promises.length - 1
        }));
    },
    promises: [],
    popupUrl: 'http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}',
    popupWidth: 640,
    popupHeight: 400
};

utils.set(window, 'ODKL.updateCount', function (index, counter) {
    odnoklassniki.promises[index](counter);
});

module.exports = odnoklassniki;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Vkontakte service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var vkontakte = {
    counterUrl: 'https://vk.com/share.php?act=count&url={url}&index={index}',
    counter: function (url, promise) {
        this.promises.push(promise);
        
        dom.getScript(utils.makeUrl(url, {
            index: this.promises.length - 1
        }));
    },
    promises: [],
    popupUrl: config.protocol + '//vk.com/share.php?url={url}&title={title}',
    popupWidth: 550,
    popupHeight: 330
};

utils.set(window, 'VK.Share.count', function (index, count) {
    vkontakte.promises[index](count);
});

module.exports = vkontakte;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * Facebook service provider
 */

module.exports = {
    counterUrl: 'https://graph.facebook.com/?fields=share,og_object{likes.limit(0).summary(true),comments.limit(0).summary(true)}&id={url}&callback=?',
    convertNumber: function (counter) {
        return counter.share.share_count;
    },
    popupUrl: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    popupWidth: 600,
    popupHeight: 500
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Twitter service provider
 */

var config = __webpack_require__(0);

var twitter = {
    popupUrl: config.protocol + '//twitter.com/intent/tweet?url={url}&text={title}',
    popupWidth: 600,
    popupHeight: 450,
    click: function () {
        if (!/[\.\?:\-–—]\s*$/.test(this.options.title)) {
            this.options.title += ':';
        }

        return true;
    }
};

module.exports = twitter;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Google+ service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var gplus = {
    gid: 0,
    promises: {},
    popupUrl: 'https://plus.google.com/share?url={url}',
    popupWidth: 700,
    popupHeight: 500
};

module.exports = gplus;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Pocket service provider
 */

var config = __webpack_require__(0);

var pocket = {
    popupUrl: config.protocol + '//getpocket.com/save?url={url}&format=json&callback=?',
    popupWidth: 600,
    popupHeight: 300
};

module.exports = pocket;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * Telegram service provider
 */

module.exports = {
    popupUrl: 'tg://msg?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * WhatsApp service provider
 */

module.exports = {
    popupUrl: 'whatsapp://send?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * Viber service provider
 */

module.exports = {
    popupUrl: 'viber://forward?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * E-mail service provider
 */

var config = __webpack_require__(0);

var email = {
    popupUrl: 'mailto:?subject={title}&body={url}',
    popupWidth: 0,
    popupHeight: 0
};

module.exports = email;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(0);

module.exports = {
	parent: config.name,
    className: config.name + '--expanded'
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var services = __webpack_require__(3),
    Factory  = __webpack_require__(34),
    utils    = __webpack_require__(2),
    dom      = __webpack_require__(1);

var factories = {};

/**
 * Fetch data
 *
 * @param {String} service
 * @param {String} url
 * @param {Object} options
 * @return {Promise}
 */
module.exports = function (service, url, options) {
    if (!factories[service]) {
        factories[service] = {};
    }

    var counters = factories[service],
        counter  = counters[url];

    if (!options.forceUpdate && counter) {
        return counter;
    }

    counter = Factory();

    var href = utils.makeUrl(options.counterUrl, {
        url: url
    });

    services[service].counter(href, counter, url);

    counters[url] = counter;

    return counters[url];
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * Factory function
 * 
 * This function returns function with following API:
 * 
 * - if passed argument is callback, then this callback would be callled
 *   if the value was changed
 * - if passed argument is anything but undefined or function, then this 
 *   function behaves like setter
 * - if argument isn't provided, then return value stored in closure
 * 
 * @param {Object} value
 * @return {Function}
 */
module.exports = function (value) {
    var listeners = [];
    
    return function (argument) {
        var type = typeof argument;
        
        if (type == 'undefined') {
            return value;
        }
        else if (type == 'function') {
            listeners.push(argument);
        }
        else {
            value = argument;
            
            listeners.forEach(function (listener) {
                listener(argument);
            });
        }
    };
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSwipeable;

var _animate = __webpack_require__(8);

function makeSwipeable(el, callback) {
  var x = 0;
  var shift = 0;
  var direction = null;
  var firstX = void 0;
  var currentX = void 0;

  function down(eDown) {
    if (el.closest('.is-correct') || el.closest('.is-incorrect')) {
      return false;
    }

    if (eDown.touches) {
      eDown = eDown.touches[0];
    }

    // x = eDown.clientX + shift;
    x = eDown.clientX;
    firstX = x;

    function move(eMove) {
      if (eMove.touches) {
        eMove = eMove.touches[0];
      }

      shift = x - eMove.clientX;
      direction = x - eMove.clientX > 0 ? 'left' : 'right';
      currentX = eMove.clientX;

      var opacity = Math.ceil((100 / (el.offsetWidth / Math.abs(shift))).toFixed() / 10) * 10;
      el.dataset.opacity = opacity > 100 ? 100 : opacity;
      el.dataset.dir = direction;
      el.style.transform = 'translate3d(' + -shift + 'px, 0, 0)';
    }

    function up(eUp) {
      if (direction) {
        (function (dir) {
          (0, _animate.requestAnimate)({
            duration: 100,
            timing: function timing(timeFraction) {
              return timeFraction;
            },
            draw: function draw(progress) {
              var p = 1 - progress;
              el.style.transform = 'translate3d(' + -shift * p + 'px, 0, 0)';

              if (progress === 1 && Math.abs(currentX - firstX) > el.offsetWidth * 0.4) {
                callback(dir);
              }
            }
          });
        })(direction);
      }

      direction = null;
      el.dataset.dir = '';

      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('touchend', up);
      document.removeEventListener('touchleave', up);
      document.removeEventListener('touchcancel', up);
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    document.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', up);
    document.addEventListener('touchend', up);
    document.addEventListener('touchleave', up);
    document.addEventListener('touchcancel', up);

    return true;
  }

  el.addEventListener('mousedown', down);
  el.addEventListener('touchstart', down);
}

/***/ })
/******/ ]);
//# sourceMappingURL=all.js.map