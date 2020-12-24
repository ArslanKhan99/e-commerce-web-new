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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function updateCart(data) {
  axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/update-cart', data).then(function (res) {
    console.log(res);
  });
}

function loginUser(data) {
  axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/login-user', data).then(function (res) {
    console.log(res);
  });
}
/*$(document).ready(function(e){
    $("#btn-login").click(function(){
        e("body").append("<div class='ajax-overlay'><i class='porto-loading-icon'></i></div>")
        setTimeout(function() {
            $('.ajax-overlay').remove();
        }, 2000);
        let email = $('#LoginForm input[name=emailTxt]').val();
        let password = $('#LoginForm input[name=passwordTxt]').val();
        const data = {
            email:email,
            password:password
        }
        loginUser(data);
    });
});*/


!function (e) {
  "use strict";

  var t = {
    initialised: !1,
    mobile: !1,
    init: function init() {
      this.initialised || (this.initialised = !0, this.checkMobile(), this.stickyHeader(), this.mMenuIcons(), this.mMenuToggle(), this.mobileMenu(), this.scrollToTop(), this.quantityInputs(), this.countTo(), this.tooltip(), this.popover(), this.changePassToggle(), this.changeBillToggle(), this.catAccordion(), this.ajaxLoadProduct(), this.toggleFilter(), this.toggleSidebar(), this.productTabSroll(), this.scrollToElement(), this.loginPopup(), this.modalView(), this.productManage(), this.ratingTooltip(), this.windowClick(), this.popupMenu(), this.headerSearchToggle(), this.parallax(), this.appearMap(), this.appearAnimate(), e.fn.isotope && this.isotopes(), e.fn.superfish && this.menuInit(), e.fn.owlCarousel && this.owlCarousels(), "object" == (typeof noUiSlider === "undefined" ? "undefined" : _typeof(noUiSlider)) && this.filterSlider(), e.fn.themeSticky && this.stickySidebar(), e.fn.magnificPopup && this.lightBox(), e.fn.Morphext && this.wordRotate());
    },
    checkMobile: function checkMobile() {
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? this.mobile = !0 : this.mobile = !1;
    },
    menuInit: function menuInit() {
      e(".menu").superfish({
        popUpSelector: "ul, .megamenu",
        hoverClass: "show",
        delay: 0,
        speed: 80,
        speedOut: 80,
        autoArrows: !0
      });
    },
    stickyHeader: function stickyHeader() {
      var t = !1,
          i = null,
          a = null,
          o = function o(t, i) {
        t.hasClass("fixed") && (t.removeClass("fixed"), t.css("top", ""), i.changes && i.changes.forEach(function (e) {
          e.removeClass && t.find(e.item).addClass(e.removeClass), e.addClass && t.find(e.item).removeClass(e.addClass);
        }), i.move && i.move.forEach(function (i) {
          if (i.clone) t.find(i.item).hide();else {
            var a = 0;
            t.find(i.item).each(function () {
              e('.sticky-placeholder[data-sticky-placeholder="' + (i.indexStart + ++a) + '"]').replaceWith(e(this));
            });
          }
        }), t.parent().css("min-height", ""));
      },
          n = function n() {
        if (992 > e(window).width()) t && i.each(function (t) {
          o(e(this), a[t]);
        });else {
          t || function () {
            var o = 0;
            a = [], i = e(".sticky-header").each(function () {
              var t = e(this),
                  i = t.data("sticky-options"),
                  n = {};
              i && (n = JSON.parse(i.replace(/'/g, '"').replace(";", ""))), n.move && n.move.forEach(function (t) {
                t.clone || (t.indexStart = o, o += e(t.item).length);
              }), n.height = t.outerHeight(), n.offset = t.offset().top, n.paddingTop = parseInt(t.css("padding-top")), a.push(n), t.wrap('<div class="sticky-wrapper"></div>');
            }), t = !0;
          }();
          var n = e(window).scrollTop(),
              s = 0;
          i.each(function (i) {
            var r = e(this),
                l = a[i];
            n + s >= l.offset + l.paddingTop ? (r.hasClass("fixed") || function (t, i, a) {
              t.hasClass("fixed") || (t.parent().css("min-height", i.height), i.move && i.move.forEach(function (a) {
                if (a.clone) t.find(a.item).show();else {
                  var o = t.find(i.moveTo),
                      n = 0;
                  e(a.item).each(function () {
                    var t = e(this);
                    t.wrap('<div class="sticky-placeholder" style="width:' + t.outerWidth() + "px;height:" + t.outerHeight() + "px;margin:" + t.css("margin") + ';" data-sticky-placeholder="' + (a.indexStart + ++n) + '"></div>'), "end" == a.position ? t.appendTo(o) : t.prependTo(o);
                  });
                }
              }), i.changes && i.changes.forEach(function (e) {
                e.removeClass && t.find(e.item).removeClass(e.removeClass), e.addClass && t.find(e.item).addClass(e.addClass);
              }), t.addClass("fixed").css("top", -i.height).animate({
                top: a
              }));
            }(r, l, s), s += r.outerHeight()) : !r.hasClass("fixed") && t || o(r, l);
          });
        }
      };

      setTimeout(n, 500), e.fn.smartresize && e(window).smartresize(n), e(window).on("scroll", n);
    },
    mMenuToggle: function mMenuToggle() {
      e(".mobile-menu-toggler").on("click", function (t) {
        e("body").toggleClass("mmenu-active"), e(this).toggleClass("active"), t.preventDefault();
      }), e(".mobile-menu-overlay, .mobile-menu-close").on("click", function (t) {
        e("body").removeClass("mmenu-active"), e(".menu-toggler").removeClass("active"), t.preventDefault();
      });
    },
    mMenuIcons: function mMenuIcons() {
      e(".mobile-menu").find("li").each(function () {
        var t = e(this);
        t.find("ul").length && e("<span/>", {
          "class": "mmenu-btn"
        }).appendTo(t.children("a"));
      });
    },
    mobileMenu: function mobileMenu() {
      e(".mmenu-btn").on("click", function (t) {
        var i = e(this).closest("li"),
            a = i.find("ul").eq(0);
        i.hasClass("open") ? a.slideUp(300, function () {
          i.removeClass("open");
        }) : a.slideDown(300, function () {
          i.addClass("open");
        }), t.stopPropagation(), t.preventDefault();
      });
    },
    owlCarousels: function owlCarousels() {
      var t = {
        loop: !0,
        margin: 0,
        responsiveClass: !0,
        nav: !1,
        navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
        dots: !0,
        autoplay: !0,
        autoplayTimeout: 15e3,
        items: 1
      },
          i = function i(_i, a) {
        var o;
        o = a ? e.extend(!0, {}, t, a) : t, _i.hasClass("nav-thin") && (o.navText = ['<i class="icon-left-open-big">', '<i class="icon-right-open-big">']);

        var n = _i.data("owl-options");

        "string" == typeof n && (n = JSON.parse(n.replace(/'/g, '"').replace(";", "")), o = e.extend(!0, {}, o, n)), _i.owlCarousel(o);
      },
          a = {
        ".home-slider": {
          lazyLoad: !0,
          autoplay: !1,
          dots: !1,
          nav: !0,
          autoplayTimeout: 12e3,
          animateOut: "fadeOut",
          navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
          loop: !0
        },
        ".testimonials-carousel": {
          lazyLoad: !0,
          autoHeight: !0,
          responsive: {
            992: {
              items: 2
            }
          }
        },
        ".featured-products": {
          loop: !1,
          margin: 30,
          autoplay: !1,
          responsive: {
            0: {
              items: 2
            },
            700: {
              items: 3,
              margin: 15
            },
            1200: {
              items: 4
            }
          }
        },
        ".cats-slider": {
          loop: !1,
          margin: 20,
          autoplay: !1,
          nav: !0,
          dots: !1,
          items: 2,
          responsive: {
            576: {
              items: 3
            },
            992: {
              items: 4
            },
            1200: {
              items: 5
            },
            1400: {
              items: 6
            }
          }
        },
        ".products-slider": {
          loop: !1,
          margin: 20,
          autoplay: !1,
          dots: !0,
          items: 2,
          responsive: {
            576: {
              items: 3
            },
            992: {
              items: 4
            }
          }
        },
        ".categories-slider": {
          loop: !1,
          margin: 20,
          autoplay: !1,
          nav: !0,
          dots: !1,
          items: 2,
          responsive: {
            576: {
              items: 3
            },
            992: {
              items: 5
            }
          }
        },
        ".quantity-inputs": {
          items: 2,
          margin: 20,
          dots: !1,
          nav: !0,
          responsive: {
            992: {
              items: 4
            },
            768: {
              items: 3
            }
          },
          onInitialized: function onInitialized() {
            this.$element.find(".horizontal-quantity").val(1);
          }
        },
        ".banners-slider": {
          dots: !0,
          loop: !1,
          margin: 20,
          responsive: {
            576: {
              items: 2
            },
            992: {
              items: 3
            }
          }
        },
        ".brands-slider": {
          loop: !1,
          margin: 20,
          autoHeight: !0,
          autoplay: !1,
          dots: !1,
          items: 2,
          responsive: {
            576: {
              items: 4
            },
            768: {
              items: 6
            }
          }
        },
        ".widget-featured-products": {
          lazyLoad: !0,
          nav: !0,
          navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
          dots: !1,
          autoHeight: !0
        },
        ".entry-slider": {
          margin: 2,
          lazyLoad: !0
        },
        ".related-posts-carousel": {
          loop: !1,
          margin: 30,
          autoplay: !1,
          responsive: {
            480: {
              items: 2
            },
            1200: {
              items: 3
            }
          }
        },
        ".boxed-slider": {
          lazyLoad: !0,
          autoplayTimeout: 2e4,
          animateOut: "fadeOut",
          dots: !1
        },
        ".about-slider": {
          margin: 2,
          lazyLoad: !0
        },
        ".product-single-default .product-single-carousel": {
          nav: !0,
          dotsContainer: "#carousel-custom-dots",
          autoplay: !1,
          onInitialized: function onInitialized() {
            var t = this.$element;
            e.fn.elevateZoom && t.find("img").each(function () {
              var t = e(this),
                  i = {
                responsive: !0,
                zoomWindowFadeIn: 350,
                zoomWindowFadeOut: 200,
                borderSize: 0,
                zoomContainer: t.parent(),
                zoomType: "inner",
                cursor: "grab"
              };
              t.elevateZoom(i);
            });
          }
        },
        ".product-single-extended .product-single-carousel": {
          dots: !1,
          autoplay: !1,
          center: !0,
          items: 1,
          responsive: {
            768: {
              items: 3
            }
          }
        }
      };

      Object.keys(a).forEach(function (t) {
        e(t + ".owl-carousel").each(function () {
          i(e(this), a[t]);
        });
      }), e(".owl-carousel").each(function () {
        e(this).data("owl.carousel") || i(e(this), i);
      }), e(".home-slider").on("loaded.owl.lazy", function (t) {
        e(t.element).closest(".home-slide").addClass("loaded"), e(t.element).closest(".home-slider").addClass("loaded");
      }), e(".boxed-slider").on("loaded.owl.lazy", function (t) {
        e(t.element).closest(".category-slide").addClass("loaded");
      }), e(".about-slider").on("loaded.owl.lazy", function (t) {
        e(t.element).closest("div").addClass("loaded");
      }), e("#carousel-custom-dots .owl-dot").click(function () {
        e(".product-single-carousel").trigger("to.owl.carousel", [e(this).index(), 300]);
      });
    },
    filterSlider: function filterSlider() {
      var t = document.getElementById("price-slider");
      null != t && (noUiSlider.create(t, {
        start: [200, 700],
        connect: !0,
        step: 100,
        margin: 100,
        range: {
          min: 0,
          max: 1e3
        }
      }), t.noUiSlider.on("update", function (t, i) {
        t = t.map(function (e) {
          return "$" + e;
        });
        e("#filter-price-range").text(t.join(" - "));
      }));
    },
    stickySidebar: function stickySidebar() {
      e(".sidebar-wrapper, .sticky-slider").themeSticky({
        autoInit: !0,
        minWidth: 991,
        containerSelector: ".row, .container",
        autoFit: !0,
        paddingOffsetBottom: 10,
        paddingOffsetTop: 60
      });
    },
    countTo: function countTo() {
      e.fn.countTo ? e.fn.waypoint ? e(".count").waypoint(function () {
        e(this.element).countTo();
      }, {
        offset: "90%",
        triggerOnce: !0
      }) : e(".count").countTo() : e(".count").each(function () {
        var t = e(this),
            i = t.data("to");
        t.text(i);
      });
    },
    tooltip: function tooltip() {
      e.fn.tooltip && e('[data-toggle="tooltip"]').tooltip({
        trigger: "hover focus"
      });
    },
    popover: function popover() {
      e.fn.popover && e('[data-toggle="popover"]').popover({
        trigger: "focus"
      });
    },
    changePassToggle: function changePassToggle() {
      e("#change-pass-checkbox").on("change", function () {
        e("#account-chage-pass").toggleClass("show");
      });
    },
    changeBillToggle: function changeBillToggle() {
      e("#change-bill-address").on("change", function () {
        e("#checkout-shipping-address").toggleClass("show"), e("#new-checkout-address").toggleClass("show");
      });
    },
    catAccordion: function catAccordion() {
      e(".catAccordion").on("shown.bs.collapse", function (t) {
        var i = e(t.target).closest("li");
        i.hasClass("open") || i.addClass("open");
      }).on("hidden.bs.collapse", function (t) {
        var i = e(t.target).closest("li");
        i.hasClass("open") && i.removeClass("open");
      });
    },
    scrollBtnAppear: function scrollBtnAppear() {
      e(window).scrollTop() >= 400 ? e("#scroll-top").addClass("fixed") : e("#scroll-top").removeClass("fixed");
    },
    scrollToTop: function scrollToTop() {
      e("#scroll-top").on("click", function (t) {
        e("html, body").animate({
          scrollTop: 0
        }, 1200), t.preventDefault();
      });
    },
    newsletterPopup: function newsletterPopup() {
      e.magnificPopup.open({
        items: {
          src: "#newsletter-popup-form"
        },
        type: "inline",
        mainClass: "mfp-newsletter",
        removalDelay: 350
      });
    },
    lightBox: function lightBox() {
      document.getElementById("newsletter-popup-form") && setTimeout(function () {
        var i = e.magnificPopup.instance;
        i.isOpen ? (i.close(), setTimeout(function () {
          t.newsletterPopup();
        }, 360)) : t.newsletterPopup();
      }, 1e4);
      var i = [],
          a = e(0 === e(".product-single-carousel .owl-item:not(.cloned) img").length ? ".product-single-gallery img" : ".product-single-carousel .owl-item:not(.cloned) img");
      a.each(function () {
        i.push({
          src: e(this).attr("data-zoom-image")
        });
      }), e(".prod-full-screen").click(function (t) {
        var o;
        o = t.currentTarget.closest(".product-slider-container") ? (e(".product-single-carousel").data("owl.carousel").current() + a.length - Math.ceil(a.length / 2)) % a.length : e(t.currentTarget).closest(".product-item").index(), e.magnificPopup.open({
          items: i,
          navigateByImgClick: !0,
          type: "image",
          gallery: {
            enabled: !0
          }
        }, o);
      }), e("body").on("click", "a.btn-quickview", function (i) {
        i.preventDefault(), t.ajaxLoading();
        var a = e(this).attr("href");
        setTimeout(function () {
          e.magnificPopup.open({
            type: "ajax",
            mainClass: "mfp-ajax-product",
            tLoading: "",
            preloader: !1,
            removalDelay: 350,
            items: {
              src: a
            },
            callbacks: {
              open: function open() {
                if (e(".sticky-header.fixed")) {
                  var t = Number(e(".sticky-header.fixed").css("margin-right").slice(0, -2)) + 17 + "px";
                  e(".sticky-header.fixed").css("margin-right", t), e(".sticky-header.fixed-nav").css("margin-right", t), e("#scroll-top").css("margin-right", t);
                }
              },
              ajaxContentAdded: function ajaxContentAdded() {
                t.owlCarousels(), t.quantityInputs(), "undefined" != typeof addthis ? addthis.layers.refresh() : e.getScript("https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5b927288a03dbde6");
              },
              beforeClose: function beforeClose() {
                e(".ajax-overlay").remove();
              },
              afterClose: function afterClose() {
                if (e(".sticky-header.fixed")) {
                  var t = Number(e(".sticky-header.fixed").css("margin-right").slice(0, -2)) - 17 + "px";
                  e(".sticky-header.fixed").css("margin-right", t), e(".sticky-header.fixed-nav").css("margin-right", t), e("#scroll-top").css("margin-right", t);
                }
              }
            },
            ajax: {
              tError: ""
            }
          });
        }, 500);
      });
    },
    productTabSroll: function productTabSroll() {
      e(".rating-link").on("click", function (t) {
        if (e(".product-single-tabs").length) e("#product-tab-reviews").tab("show");else {
          if (!e(".product-single-collapse").length) return;
          e("#product-reviews-content").collapse("show");
        }
        e("#product-reviews-content").length && setTimeout(function () {
          var t = e("#product-reviews-content").offset().top - 60;
          e("html, body").stop().animate({
            scrollTop: t
          }, 800);
        }, 250), t.preventDefault();
      });
    },
    quantityInputs: function quantityInputs() {
      e.fn.TouchSpin && (e(".vertical-quantity").TouchSpin({
        verticalbuttons: !0,
        verticalup: "",
        verticaldown: "",
        verticalupclass: "icon-up-dir",
        verticaldownclass: "icon-down-dir",
        buttondown_class: "btn btn-outline",
        buttonup_class: "btn btn-outline",
        initval: 1,
        min: 1
      }), e(".horizontal-quantity").TouchSpin({
        verticalbuttons: !1,
        buttonup_txt: "",
        buttondown_txt: "",
        buttondown_class: "btn btn-outline btn-down-icon",
        buttonup_class: "btn btn-outline btn-up-icon",
        initval: 1,
        min: 1
      }));
    },
    ajaxLoading: function ajaxLoading() {
      e("body").append("<div class='ajax-overlay'><i class='porto-loading-icon'></i></div>");
    },
    wordRotate: function wordRotate() {
      e(".word-rotater").each(function () {
        e(this).Morphext({
          animation: "bounceIn",
          separator: ",",
          speed: 2e3
        });
      });
    },
    ajaxLoadProduct: function ajaxLoadProduct() {
      var t = 0;
      i.click(function (a) {
        a.preventDefault(), e(this).text("Loading ..."), e.ajax({
          url: "ajax/category-ajax-products.html",
          success: function success(a) {
            var o = e(a);
            setTimeout(function () {
              o.hide().appendTo(".product-ajax-grid").fadeIn(), i.text("Load More"), ++t >= 2 && i.hide();
            }, 350);
          },
          failure: function failure() {
            i.text("Sorry something went wrong.");
          }
        });
      });
    },
    toggleFilter: function toggleFilter() {
      e(".filter-toggle a").click(function (t) {
        t.preventDefault(), e(".filter-toggle").toggleClass("opened"), e("main").toggleClass("sidebar-opened");
      }), e(".sidebar-overlay").click(function (t) {
        e(".filter-toggle").removeClass("opened"), e("main").removeClass("sidebar-opened");
      }), e(".sort-menu-trigger").click(function (t) {
        t.preventDefault(), e(".select-custom").removeClass("opened"), e(t.target).closest(".select-custom").toggleClass("opened");
      });
    },
    toggleSidebar: function toggleSidebar() {
      e(".sidebar-toggle").click(function () {
        e("main").toggleClass("sidebar-opened");
      });
    },
    scrollToElement: function scrollToElement() {
      e('.scrolling-box a[href^="#"]').on("click", function (t) {
        var i = e(this.getAttribute("href"));
        i.length && (t.preventDefault(), e("html, body").stop().animate({
          scrollTop: i.offset().top - 90
        }, 700));
      });
    },
    loginPopup: function loginPopup() {
      e(".login-link").click(function (i) {
        i.preventDefault(), t.ajaxLoading();
        setTimeout(function () {
          e.magnificPopup.open({
            type: "ajax",
            mainClass: "login-popup",
            tLoading: "",
            preloader: !1,
            removalDelay: 350,
            items: {
              src: "ajax/login-popup.html"
            },
            callbacks: {
              open: function open() {
                if (e(".sticky-header.fixed")) {
                  var t = Number(e(".sticky-header.fixed").css("margin-right").slice(0, -2)) + 17 + "px";
                  e(".sticky-header.fixed").css("margin-right", t), e(".sticky-header.fixed-nav").css("margin-right", t), e("#scroll-top").css("margin-right", t);
                }
              },
              beforeClose: function beforeClose() {
                e(".ajax-overlay").remove();
              },
              afterClose: function afterClose() {
                if (e(".sticky-header.fixed")) {
                  var t = Number(e(".sticky-header.fixed").css("margin-right").slice(0, -2)) - 17 + "px";
                  e(".sticky-header.fixed").css("margin-right", t), e(".sticky-header.fixed-nav").css("margin-right", t), e("#scroll-top").css("margin-right", t);
                }
              }
            },
            ajax: {
              tError: ""
            }
          });
        }, 1500);
      });
    },
    modalView: function modalView() {
      $(".btn-add-cart").on("click", function (t) {
        var data = JSON.parse($(this).val());
        updateCart(data);

        if (e(".add-cart-box #productImage").attr("src", e(this).parents(".product-default").find("figure img").attr("src")), e(".add-cart-box #productTitle").text(e(this).parents(".product-default").find(".product-title").text()), e(".sticky-header.fixed").css("margin-right")) {
          var i = Number(e(".sticky-header.fixed").css("margin-right").slice(0, -2)) + 17 + "px";
          e(".sticky-header.fixed").css("margin-right", i), e(".sticky-header.fixed-nav").css("margin-right", i), e("#scroll-top").css("margin-right", i);
        }
      }), e(".modal#addCartModal").on("hidden.bs.modal", function (t) {
        if (e(".sticky-header.fixed").css("margin-right")) {
          var i = Number(e(".sticky-header.fixed").css("margin-right").slice(0, -2)) - 17 + "px";
          e(".sticky-header.fixed").css("margin-right", i), e(".sticky-header.fixed-nav").css("margin-right", i), e("#scroll-top").css("margin-right", i);
        }
      });
    },
    productManage: function productManage() {
      e(".product-select").click(function (t) {
        e(this).parents(".product-default").find("figure img").attr("src", e(this).data("src")), e(this).addClass("checked").siblings().removeClass("checked");
      });
    },
    ratingTooltip: function ratingTooltip() {
      e(".product-ratings").hover(function (t) {
        var i = e(this).find(".ratings").width() / e(this).width() * 5;
        e(this).find(".tooltiptext").text(i ? i.toFixed(2) : i);
      });
    },
    windowClick: function windowClick() {
      e(document).click(function (t) {
        e(t.target).closest(".toolbox-item.select-custom").length || e(".select-custom").removeClass("opened");
      });
    },
    popupMenu: function popupMenu() {
      if (!(e(".popup-menu").length <= 0)) {
        var t = e(".popup-menu-ul"),
            i = t.parent().width() - t.children().width();
        i >= 0 && t.css("margin-right", "-" + i + "px"), t.css("margin-top", i + "px"), e(".popup-menu-toggler").on("click", function (t) {
          t.preventDefault(), e(this).siblings(".popup-menu").addClass("open"), e(document).on("keydown.popup-menu", function (t) {
            "Escape" == t.key && (e(".popup-menu").removeClass("open"), e(document).off("keydown.popup-menu"));
          });
        }), e("body").on("click", ".popup-menu-close", function (t) {
          e(".popup-menu").removeClass("open"), e(document).off("keydown.popup-menu"), t.preventDefault();
        }), e("body").on("click", ".popup-menu a", function (t) {
          var i = e(this).siblings("ul");
          i.length > 0 && (i.toggleClass("open"), t.preventDefault());
        });
      }
    },
    headerSearchToggle: function headerSearchToggle() {
      e(".header-search").length && e("body").on("click", ".header-search", function (e) {
        e.stopPropagation();
      }).on("click", ".search-toggle", function (t) {
        var i = e(this).closest(".header-search");
        i.toggleClass("show"), e(".header-search-wrapper").toggleClass("show"), i.hasClass("show") && i.find("input.a-control").focus(), t.preventDefault();
      }).on("click", function (t) {
        e(".header-search").removeClass("show"), e(".header-search-wrapper").removeClass("show"), e("body").removeClass("is-search-active");
      });

      var t = function t() {
        e(".header-search").each(function () {
          var t = e(this);
          t.find(".header-search-wrapper").css(e(window).width() < 576 ? {
            left: 15 - t.offset().left + "px",
            right: 15 + t.offset().left + t.width() - e(window).width() + "px"
          } : {
            left: "",
            right: ""
          });
        });
      };

      t(), e.fn.smartresize ? e(window).smartresize(t) : e(window).on("resize", t);
    },
    parallax: function parallax() {
      var i = e("[data-parallax]"),
          a = {
        speed: 1.5,
        horizontalPosition: "50%",
        offset: 0,
        enableOnMobile: !0
      };
      i.length && i.each(function () {
        var i = e(this),
            o = i.data("parallax");
        o && (o = JSON.parse(o.replace(/'/g, '"').replace(";", "")));
        var n,
            s,
            r,
            l,
            c = e.extend(!0, {}, a, o),
            d = e(window);
        l = e('<div class="parallax-background"></div>');
        var u = i.data("image-src") ? "url(" + i.data("image-src") + ")" : i.css("background-image");

        if (l.css({
          "background-image": u,
          "background-size": "cover",
          "background-position": "50% 0%",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 100 * c.speed + "%"
        }), i.prepend(l), i.css({
          position: "relative",
          overflow: "hidden"
        }), !t.mobile || c.enableOnMobile) {
          var p = function p() {
            n = i.offset(), s = -(d.scrollTop() - (n.top - 100)) / (c.speed + 2), r = s < 0 ? Math.abs(s) : -Math.abs(s), l.css({
              transform: "translate3d(0, " + (r - 50 + c.offset) + "px, 0)",
              "background-position-x": c.horizontalPosition
            });
          };

          e(window).on("scroll resize", p), p();
        } else i.addClass("parallax-disabled");
      });
    },
    appearMap: function appearMap() {
      function initialize() {
        var mapProp = {
          center: new google.maps.LatLng(31.523083, 74.306576),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapProp);
      }

      google.maps.event.addDomListener(window, 'load', initialize);
    },
    appearAnimate: function appearAnimate() {
      if (e.fn.appear) {
        var t = new Array();
        e('.owl-item [data-animation-name="splitRight"]').each(function () {
          var t = e(this).text(),
              i = e(this).data("animation-delay") ? e(this).data("animation-delay") : "0";
          e(this).text("");

          for (var a = t.length - 1; a >= 0; a--) {
            e(this).prepend('<div class="d-inline-block appear-animate" data-animation-delay="' + (i + 90 * a) + '">' + (" " === t[a] ? "&nbsp" : t[a]) + "</div>");
          }
        }), e(".appear-animate").each(function () {
          e(this).hasClass("animated") || e(this).appear(function () {
            var i = e(this);

            if (!(i.closest(".owl-carousel.slide-animate").length > 0 && 0 === i.closest(".owl-item.active").length)) {
              var a, o, n;
              a = i.data("animation-name") ? i.data("animation-name") : "fadeIn", n = i.data("animation-duration") ? i.data("animation-duration") : "750", o = i.data("animation-delay") ? i.data("animation-delay") : "0", i.addClass(a), i.css("animationDelay", o + "ms"), i.css("animationDuration", n + "ms"), i.addClass("animated");
              var s = setTimeout(function () {
                i.addClass("appear-animation-visible");
              }, parseInt(o || 0));
              i.closest(".owl-carousel.slide-animate").length > 0 && t.push(s);
            }
          }, {
            accX: e(this).data("x") ? e(this).data("x") : 0,
            accY: e(this).data("y") ? e(this).data("y") : -50
          });
        }), e(".owl-carousel.slide-animate").each(function () {
          var i;
          e(this).on("translate.owl.carousel", function (t) {
            i = e(this).find(".owl-item.active");
          }), e(this).on("translated.owl.carousel", function (a) {
            var o = e(this);

            if (e(this).find(".owl-item.active")[0] !== i[0]) {
              for (var n = 0; n < t.length; n++) {
                clearTimeout(t[n]);
              }

              t = t.splice(), i.find(".appear-animate").removeClass("appear-animation-visible"), i.find(".appear-animate").css("animationDelay", ""), i.find(".appear-animate").css("animationDuration", ""), i.find(".appear-animate").removeClass("animated"), i.find(".appear-animate").each(function () {
                var t,
                    i = e(this);
                t = i.data("animation-name") ? i.data("animation-name") : "fadeIn", i.removeClass(t);
              });
            }

            o.find(".owl-item.active .appear-animate").each(function () {
              var i,
                  a,
                  o,
                  n = e(this);
              i = n.data("animation-name") ? n.data("animation-name") : "fadeIn", o = n.data("animation-duration") ? n.data("animation-duration") : "750", a = n.data("animation-delay") ? n.data("animation-delay") : "0", n.addClass(i), "splitRight" != i && (n.css("animationDelay", a + "ms"), n.css("animationDuration", o + "ms")), n.addClass("animated");
              var s = setTimeout(function () {
                n.addClass("appear-animation-visible");
              }, parseInt(a || 0));
              t.push(s);
            });
          });
        });
      }
    },
    isotopes: function isotopes() {
      var t = {
        itemsSelector: ".grid-item",
        masonry: {
          columnWidth: ".grid-col-sizer"
        },
        percentPosition: !0,
        sortBy: "original-order",
        getSortData: {
          "md-order": "[data-md-order] parseInt"
        },
        sortReorder: !1
      };
      e(".grid").each(function () {
        var i = e(this),
            a = i.data("grid-options");
        a && (a = JSON.parse(a.replace(/'/g, '"').replace(";", "")));
        var o = e.extend(!0, {}, t, a),
            n = i.isotope(o);

        if (o.sortReorder) {
          var s = function s() {
            var t = e(window).width();
            n.isotope({
              sortBy: t < 768 && t > 400 ? "md-order" : "original-order"
            });
          };

          e.fn.smartresize ? e(window).smartresize(s) : e(window).on("resize", s);
        }
      });
    }
  };
  e("body").prepend('<div class="loading-overlay"><div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
  var i = e(".loadmore .btn");
  jQuery(document).ready(function () {
    t.init();
  }), e(window).on("load", function () {
    e("body").addClass("loaded"), t.scrollBtnAppear();
  }), e(window).on("scroll", function () {
    t.scrollBtnAppear();
  });
}(jQuery);

/***/ }),

/***/ "./resources/scss/app.scss":
/*!*********************************!*\
  !*** ./resources/scss/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/scss/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! E:\Node projects\New Projects\e-commerce-website\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! E:\Node projects\New Projects\e-commerce-website\resources\scss\app.scss */"./resources/scss/app.scss");


/***/ })

/******/ });