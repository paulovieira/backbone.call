/*!
 * 
 * backbone.call v0.0.1
 * 
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("backbone"), require("backbone.marionette"), require("backbone.base-router"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "backbone", "backbone.marionette", "backbone.base-router"], factory);
	else if(typeof exports === 'object')
		exports["CallRouter"] = factory(require("underscore"), require("backbone"), require("backbone.marionette"), require("backbone.base-router"));
	else
		factory(root["_"], root["Backbone"], root["Marionette"], root["Backbone"]["BaseRouter"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
/***/ function(module, exports, __webpack_require__) {

	

	var _ = __webpack_require__(1);
	var Backbone = __webpack_require__(2);
	var Mn = __webpack_require__(3);
	var BaseRouter = __webpack_require__(4);
	//require('./show');

	// in global mode, BaseRouter will be passed to the factory function as window['Backbone']['BaseRouter']

	if(!BaseRouter){
		throw new Error('backbone.base-router must be loaded before backbone.call')
	}

	var CallRouter = BaseRouter.extend({

	    constructor: function(options){

			this.options = _.extend({ requestProperty: 'request' }, options)
			this.routes = {};
			
	    	BaseRouter.prototype.constructor.apply(this, arguments);
	    },

	    addRoutes: function(routesConfig){

			routesConfig = this._wrapInArray(routesConfig);
	        routesConfig.forEach(this._addRoute, this)

	        Backbone.Router.prototype._bindRoutes.call(this)
	    },

	    addRoute: function(routeConfig) {

	    	this.addRoutes(routeConfig);
	    },

	    start: function(startOptions){

	    	// reference: http://backbonejs.org/#History-start
	        Backbone.history.start(startOptions);
	    },

	    onNavigate: function(routeData) {
	//debugger;
	        
	        //this.renderTree(routeData.linked.root, routeData.linked.children, _.pick(routeData, keys));
			//debugger
	        // parent for the 1st level nodes
	        var parent = this.options.root;
	        var children = this._wrapInArray(routeData.linked.children);

	        if (parent instanceof Mn.Region && children.length > 1) {
	        	throw new Error('the configuration for route ' + routeData.originalRoute + ' has ' + children.length + ' elements in the initial branch but the root container is a region (use a view instance with ' + children.length + ' regions instead)')
	        }

	        var keys = ['query', 'params', 'uriFragment', 'originalRoute'];
	        var requestData = _.pick(routeData, keys);
	        requestData._tsInitial = Date.now();
	        
	//debugger
	        var validate = routeData.linked.validate || _.noop;
	        var shouldProceed = validate(requestData);
	//debugger
	        if (shouldProceed === false) {
	    		return;
	        }

	        this._processChildren(parent, children, requestData, null, null);        	



	//debugger
	 		var x = 3;
	    },

	    _processChildren: function (parent, children, requestData, resolveFromParent, rejectFromParent) {
	//debugger

			children = this._wrapInArray(children);
			if (children.length === 0) {

				// if this is a leaf, resolve immediately
				if (resolveFromParent) {
					//console.log('no children, _ts from resolveFromParent: ', resolveFromParent._ts);
					resolveFromParent({ view: parent });	

					// note: any code below the call to resolveFromParent will be executed before
					// the callback given to the associated .then

				}
				
				return;
			}

			children.forEach((child, i) => {
	debugger
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


				// TODO: add a "forceCreate" option (to always create a new instance)

				var viewOptions = child.viewOptions || {};

				// TODO: the property should be configurable
				viewOptions[this.options.requestProperty] = requestData;
				

				if (!_.isFunction(child.handler)) {
					child.handler = this.defaultHandler;
				}

				if (!_.isFunction(child.mount)) {
					child.mount = this.defaultMount;
				}
	//debugger
				// render the view
				var renderedView = child.handler.call(this, child.view, viewOptions);

				var isPromise = renderedView instanceof Promise;

				if (isPromise === false) {
					this._processChildren(renderedView, child.children, requestData, null, null);
					child.mount.call(this, region, renderedView);

					if (resolveFromParent) {
						//console.log('has children (1), _ts from resolveFromParent: ', resolveFromParent._ts);
						resolveFromParent({ view: parent });
					}

				}
				else {

					//console.log('_ts from the promise: ', view._ts);

					renderedView.then(obj => {

						// obj.view is the view that was rendered asyncronously in the custom handler
						var renderedView2 = obj.view;
						this._processChildren(renderedView2, child.children, requestData);
						child.mount.call(this, region, renderedView2);
					})

					/*
					view = view.then(obj => {
						debugger
						// return a new promise that will be resolved inside the new call (recursive)

						var p = new Promise((resolve, reject) => {
							debugger
							let _ts = Date.now();
							console.log('_ts for resolve: ', _ts);
							resolve._ts = _ts;

							this._processChildren(obj.view, child.children, requestData, resolve, reject);	
						});

						return p;
					})

					view = view.then(obj => {
						debugger

						child.mount.call(this, region, obj.view);

						if (resolveFromParent) {
							console.log('has children (2), _ts from resolveFromParent: ', resolveFromParent._ts);
							resolveFromParent({ view: parent });
						}
						
					})
					*/
					
					.catch(err => {
						debugger
					})

				}


				// --- move to the forEachAsync implementation; must be executed after the call to done
				// alternative: create a promise here, for each element in the children array; that is, the 
				// render method should return a promise; however this might not work because the 
				// promise callback is always execute in a future tick of the event loop (?)

			    // ---
			})

	    },

	    defaultHandler: function(viewClass, viewOptions){

	    	viewOptions[this.options.requestProperty]._ts = Date.now();
	    	var viewInstance = new viewClass(viewOptions);
	    	viewInstance.render();

	    	return viewInstance;
	    },


	    defaultMount: function(region, view){
	//debugger
	    	region.show(view)
	    },


	    _wrapInArray: function(obj){

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
	    },

	    _addRoute: function(routeObj){

	        this.routes[routeObj.path] = routeObj;
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
	    }







	})

	Backbone.CallRouter = CallRouter;
	module.exports = CallRouter;





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