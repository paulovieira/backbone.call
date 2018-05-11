/*!
 * 
 * backbone.call v0.0.1
 * 
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("backbone"), require("backbone.marionette"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "backbone", "backbone.marionette"], factory);
	else if(typeof exports === 'object')
		exports["CallRouter"] = factory(require("underscore"), require("backbone"), require("backbone.marionette"));
	else
		factory(root["_"], root["Backbone"], root["Marionette"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);
	var Backbone = __webpack_require__(2);
	var Mn = __webpack_require__(3);

	var internals = {
	    NAMED_PARAM: /(\(\?)?[:*]\w+/g,  // copied from Backbone (it's not exposed)
	    PLUS_SYMBOL: /\+/g,
	}

	var CallRouter = Backbone.Router.extend({

	    constructor: function(options) {

	        this.options = _.extend({ requestProperty: 'request' }, options);

	        this.routeParams = {};
	        Backbone.Router.prototype.constructor.apply(this, arguments);
	    },

	    start: function(startOptions){

	        // reference: http://backbonejs.org/#History-start
	        Backbone.history.start(startOptions);
	    },

	    addRoutes: function(routesConfig){

	        routesConfig = internals._wrapInArray(routesConfig);
	        routesConfig.forEach(this._addRoute, this)
	    },

	    addRoute: function(routeConfig) {

	        this.addRoutes(routeConfig);
	    },

	    _addRoute: function(routeConfig) {

	        var origRoute = routeConfig.path;
	        var route, routeStr;

	        if (_.isRegExp(origRoute)) {
	            route = origRoute;
	            routeStr = '' + origRoute;
	        } 
	        else {
	            route = this._routeToRegExp(origRoute);
	            routeStr = origRoute;
	        }
	  
	        this.routeParams[origRoute] = _.map(routeStr.match(internals.NAMED_PARAM), function (param) {
	            return param.slice(1);
	        });
	  
	        // register a callback with history (add the callback directly to the history handlers array)
	        var router = this;

	        // similar to Backbone.history.route, but uses push() instead of unshift()
	        this._pushHandler.call(Backbone.history, route, function (fragment) {

	            // extract params and query string
	            var params = router._extractParameters(route, fragment);
	            var queryString = params.pop();

	            var routeData = {
	                tsInitial: Date.now(),
	                route: route,
	                originalRoute: origRoute,
	                uriFragment: fragment,
	                params: internals._getNamedParams.call(router, routeStr, params),
	                queryString: queryString,
	                query: internals._getQueryParameters(queryString)
	            }

	            var parent = router.options.root;
	            var children = internals._wrapInArray(routeConfig.children);

	            if (parent instanceof Mn.Region && children.length > 1) {
	            	throw new Error('the configuration for route ' + routeData.originalRoute + ' has ' + children.length + ' elements in the initial branch but the root container is a region (use a view instance with ' + children.length + ' regions instead)')
	            }

	            var shouldProceed = (routeConfig.validate || _.noop) (routeData);
	            if (shouldProceed === false) { return }

	            // start the recursive call
	            router._processChildren(parent, children, routeData); 
	        });
	  
	        return this;
	    },

	    // similar to  as Backbone.history.route, but uses push() instead of unshift()
	    // note that the handlers property is not documented, so this method might give problems in the future
	    _pushHandler: function (route, callback) {

	        Backbone.history.handlers.push({ route: route, callback: callback });
	    },

	    _processChildren: function (parent, children, requestData) {
	//debugger

			children = internals._wrapInArray(children);
			if (children.length === 0) {
				return;
			}

			children.forEach((child, i) => {
	//debugger
				var region;
				if (parent instanceof Mn.View) {
					region = this._getRegion(parent, child.region, i)
				}
				else {
					region = parent;
				}

				if (region instanceof Mn.Region === false) {
				    throw new Error('"' + regionName + '" must be an instance of Mn.Region');
				    // todo: show more details about the region
				}
	//debugger
	            let requestDataClone = _.extend({}, requestData, { ts: undefined })
	            let viewOptionsClone = _.extend({}, child.viewOptions);
	            viewOptionsClone[this.options.requestProperty] = requestDataClone;

	            var renderedView;
	            if (region.hasView() && region.currentView instanceof child.view) {

	                renderedView = region.currentView;

	                this._markTimestamp(requestDataClone);
	                Mn.triggerMethodOn(renderedView, 'callrouter:process', true, requestDataClone, viewOptionsClone);
	                this._processChildren(renderedView, child.children, requestData);

	                return;
	            }
			

				if (!_.isFunction(child.handler)) {
					child.handler = this.defaultHandler;
				}

				if (!_.isFunction(child.mount)) {
					child.mount = this.defaultMount;
				}
	//debugger

				renderedView = child.handler.call(this, child.view, viewOptionsClone);
				var isPromise = renderedView instanceof Promise;

	            // sync
				if (isPromise === false) {

	                this._markTimestamp(requestDataClone);
	                Mn.triggerMethodOn(renderedView, 'callrouter:process', false, requestDataClone, viewOptionsClone);
					this._processChildren(renderedView, child.children, requestData);
					child.mount.call(this, region, renderedView);
	                //Mn.triggerMethodOn(renderedView, 'callrouter:mount', requestDataClone, region);
				}

	            // async
				else {

					renderedView.then(obj => {

	                    // the view that was rendered asyncronously in the custom handler
	                    let renderedView = obj.view;

	                    // copy-paste from the sync version
	                    this._markTimestamp(requestDataClone);
	                    Mn.triggerMethodOn(renderedView, 'callrouter:process', false, requestDataClone, viewOptionsClone);
	                    this._processChildren(renderedView, child.children, requestData);
	                    child.mount.call(this, region, renderedView);
	                    //Mn.triggerMethodOn(renderedView, 'callrouter:mount', requestDataClone, region);
					})
	                .catch(err => {
	                    debugger
	                })

				}
			})
	    },

	    defaultHandler: function(viewClass, viewOptions) {

	    	var viewInstance = new viewClass(viewOptions);
	    	viewInstance.render();

	    	return viewInstance;
	    },

	    defaultMount: function(region, view) {

	    	region.show(view)
	    },


	    // get the region from the parent view; the region can be given explicitely
	    // (if a string is given in the 'region' property), or implicitely (if no such 
	    // string is given, in which case the index in the branch array is used)

	    _getRegion: function(parent, regionName, i) {

			regionName = regionName || Object.keys(parent.getRegions()).sort()[i];

	    	if (typeof regionName === 'string'){
	    	    region = parent.getRegion(regionName);    
	    	}

	    	return region;
	    },

	    _markTimestamp: function (requestDataObj) {

	        requestDataObj.ts = Date.now();
	    }

	})

	internals._wrapInArray = function(obj){

	    var outArray;

	    if (obj === undefined || obj === null) {
	        outArray = []
	    }
	    else if(_.isArray(obj)){
	        outArray = obj;
	    }
	    else {
	        outArray = [obj];
	    }

	    return outArray;
	};

	// Decodes the Url query string parameters & and returns them
	// as an object. Supports empty parameters, but not array-like
	// parameters (which aren't in the URI specification)
	internals._getQueryParameters = function(queryString) {

	    if (!queryString) { return {}; }

	    return _.reduce(queryString.split('&'), function(memo, param) {

	        var parts = param.replace(internals.PLUS_SYMBOL, ' ').split('=');
	        var key = parts[0];
	        var val = parts[1];

	        key = decodeURIComponent(key);
	        val = val === undefined ? null : decodeURIComponent(val);

	        // If we don't have the value, then we set it.
	        if (!memo[key]) {
	            memo[key] = val;
	        }

	        // Otherwise, if we have the value, and it's an array,
	        // then we push to it.
	        else if (_.isArray(memo[key])) {
	            memo[key].push(val);
	        }

	        // Otherwise, we have a value that is not yet an array,
	        // so we convert it to an array, adding the newest value.
	        else {
	            memo[key] = [memo[key], val];
	        }

	        return memo;
	    }, {});
	};
	  
	// Returns the named parameters of the route
	internals._getNamedParams = function(route, params) {

	    if (!params.length) { return {}; }

	    var routeKeys = this.routeParams[route];
	    var routeValues = params.slice(0, routeKeys.length);

	    return _.reduce(_.zip(routeKeys, routeValues), function (obj, opts) {

	        obj[opts[0]] = opts[1];

	        return obj;
	    }, {});
	};

	Backbone.CallRouter = CallRouter;
	module.exports = CallRouter;



/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ])
});
;