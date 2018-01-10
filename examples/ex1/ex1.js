/*

// TODO: handle error?

forEachAsync = function(array, method){

	var i = 0, l = array.length;

	if (l === 0){
		return;
	}

	function done(){
		if (i >= l){
			return
		}

		var value = array[i];
		method(value, i, done)
		i++;
	}

	done()
}

var fn1 = function(next){

	console.log('fn1 started...')
	setTimeout(() => {

		console.log('fn1 finished...')
		next()	
	}, 1000)
	
}
var fn2 = function(next){

	console.log('fn2 started...')
	setTimeout(() => {

		console.log('fn2 finished...')
		next()	
	}, 1000)

}
var a = [fn1, fn2]


forEachAsync(a, function(value, i, next){

	setTimeout(() => {

		console.log(value);
		next();
	}, 1000)
})


forEachAsync(a, function(value, i, next){

	value(next)
})
*/




function computeDelta(options) {
	return options.request._ts - options.request._tsInitial;
}

var ViewA = Mn.View.extend({
	attributes: {
		style: 'border: solid 1px red; padding: 20px; margin: 10px;'
	},
	templateContext: function(){

		return { 
			routerDelta: computeDelta(this.options)
		}
	},
	template: _.template(`
		view A  (delta <%= routerDelta %>)
		<div data-region-id="r-a-one"></div>
		<div data-region-id="r-a-two"></div>
	`),
	regions: {
		'r-a-two': 'div[data-region-id="r-a-two"]',
		'r-a-one': 'div[data-region-id="r-a-one"]',
	}
});

var ViewB = Mn.View.extend({
	attributes: {
		style: 'border: solid 1px green; padding: 20px; margin: 10px;'
	},
	templateContext: function(){

		return { 
			routerDelta: computeDelta(this.options)
		}
	},
	template: _.template(`
		view B  (delta <%= routerDelta %>)
		<div data-region-id="r-b-one"></div>
		<div data-region-id="r-b-two"></div>
	`),
	regions: {
		'r-b-one': 'div[data-region-id="r-b-one"]',
		'r-b-two': 'div[data-region-id="r-b-two"]'
	},

});

var ViewC = Mn.View.extend({
	attributes: {
		style: 'border: solid 1px blue; padding: 20px; margin: 10px;'
	},
	templateContext: function(){

		return { 
			routerDelta: computeDelta(this.options)
		}
	},
	template: _.template(`
		view C  (delta <%= routerDelta %>)
		<div data-region-id="r-c-one"></div>
		<div data-region-id="r-c-two"></div>

	`),
	regions: {
		'r-c-one': 'div[data-region-id="r-c-one"]',
		'r-c-two': 'div[data-region-id="r-c-two"]'
	},
});

var ViewD = Mn.View.extend({
	attributes: {
		style: 'border: solid 1px yellow; padding: 20px; margin: 10px;'
	},
	templateContext: function(){

		return { 
			routerDelta: computeDelta(this.options)
		}
	},
	regions: {
		'r-d-one': 'div[data-region-id="r-d-one"]',
		'r-d-two': 'div[data-region-id="r-d-two"]'
	},
	template: _.template(`
		view D  (delta <%= routerDelta %>)
		<div data-region-id="r-d-one"></div>
		<div data-region-id="r-d-two"></div>
	`)
});

var ViewE = Mn.View.extend({
	attributes: {
		style: 'border: solid 1px pink; padding: 20px; margin: 10px;'
	},
	templateContext: function(){

		return { 
			routerDelta: computeDelta(this.options)
		}
	},
	regions: {
		'r-e-one': 'div[data-region-id="r-e-one"]',
		'r-e-two': 'div[data-region-id="r-e-two"]'
	},
	template: _.template(`
		view E  (delta <%= routerDelta %>)
		<div data-region-id="r-e-one"></div>
		<div data-region-id="r-e-two"></div>
	`)
});


$('body').prepend(`
	<main data-region-id="root"></main>
`)

var rootR = new Mn.Region({
    el: document.querySelectorAll('[data-region-id=root]')[0]
});


var router = new Backbone.CallRouter({
	root: rootR
});

// foo 

var fooPath = {
	path: 'foo',
	validate: function(){
	},
	children: [
	{
		view: ViewA,
		children: [
		{
			view: ViewB,
			region: 'r-a-one',
			/*
			children: {
				view: ViewD,

			    children: {
			    	view: ViewE,
		    	    render: function(viewClass, viewOptions){
		    			//debugger
		    			return new Promise((resolve, reject) => {
		    				setTimeout(() => {
		    					
		    					viewOptions.request._ts = Date.now();
		    					var view = new viewClass(viewOptions);
		    					view.render();
		    					
		    					//debugger
		    					resolve({ view: view});
		    					//resolve()
		    				}, 1000)
		    			});

		    	    },
			    }

			}
			*/
		},
		
		{
			view: ViewC,
			//region: 'r-two',
		}
		]
	}
	]
};

router.addRoute(fooPath);

// bar 

var barPath = {
	path: 'bar',
	validate: function(){
	},
	children: [
	{
		view: ViewC,
		
		children: [
		{
			view: ViewD,
			region: 'r-c-one',
		},
		
		{
			view: ViewE,
			region: 'r-c-two',
		}
		]
	}
	]
};

router.addRoute(barPath);

// baz 

var bazPath = {
	path: 'baz',
	validate: function(){
	},
	children: [
	{
		view: ViewA,
	    handler: function(viewClass, viewOptions){

			return new Promise((resolve, reject) => {

				setTimeout(() => {

					viewOptions.request._ts = Date.now();
					let view = new viewClass(viewOptions);
					view.render();
					
					resolve({ view: view});
				}, 1000)
			});
	    },
	    children: [
	    {
	    	view: ViewB,
	        handler: function(viewClass, viewOptions){

	    		return new Promise((resolve, reject) => {

	    			setTimeout(() => {

	    				viewOptions.request._ts = Date.now();
	    				let view = new viewClass(viewOptions);
	    				view.render();
	    				
	    				resolve({ view: view});
	    			}, 1000)
	    		});
	        },
	        children: [
	        {
	        	view: ViewC,
	            handler: function(viewClass, viewOptions){

	        		return new Promise((resolve, reject) => {

	        			setTimeout(() => {

	        				viewOptions.request._ts = Date.now();
	        				let view = new viewClass(viewOptions);
	        				view.render();
	        				
	        				resolve({ view: view});
	        			}, 1000)
	        		});
	            },
	        }
	        ]
	    }
	    ]
	}
	],




	xchildren: [
	{
		view: ViewA,
		children: [
		{
			view: ViewB,
			children: [
			{
		    	view: ViewD,
	    	    handler: function(viewClass, viewOptions){

	    			return new Promise((resolve, reject) => {

	    				setTimeout(() => {

	    					viewOptions.request._ts = Date.now();
	    					let view = new viewClass(viewOptions);
	    					view.render();
	    					
	    					resolve({ view: view});
	    				}, 1000)
	    			});
	    	    },
	    	    children: [
	    	    {
	    	    	view: ViewE,
	    	    	/*
	    	    	children: [
	    	    	{
	    	    		view: ViewA
	    	    	}
	    	    	]
	    	    	*/
	    	    	
    	    	    handler: function(viewClass, viewOptions){
    	    			debugger
    	    			let p = new Promise((resolve, reject) => {

    	    				setTimeout(() => {

    	    					viewOptions.request._ts = Date.now();
    	    					let view = new viewClass(viewOptions);
    	    					view.render();
    	    					
    	    					resolve({ view: view});
    	    				}, 1000)
    	    			});

    	    			let _ts = Date.now();
    	    			console.log('_ts for the promise for viewE (in the handler): ', _ts);
    	    			p._ts = _ts;

    	    			return p;
    	    	    },
    	    	    
	    	    },
	    	    {
	    	    	view: ViewA,
	    	    	children: [
	    	    	{
	    	    		view: ViewB,
    	    		    handler: function(viewClass, viewOptions){
    	    				debugger
    	    				let p = new Promise((resolve, reject) => {

    	    					setTimeout(() => {

    	    						viewOptions.request._ts = Date.now();
    	    						let view = new viewClass(viewOptions);
    	    						view.render();
    	    						
    	    						resolve({ view: view});
    	    					}, 500)
    	    				});

    	    				let _ts = Date.now();
    	    				console.log('_ts for the promise for viewB (in the handler): ', _ts);
    	    				p._ts = _ts;

    	    				return p;
    	    		    },
	    	    	}
	    	    	]
	    	    }
	    	    ]
	    	    
			}
			]
		},
		
		{
			view: ViewC,
		}
		]
	}
	]
};

router.addRoute(bazPath);

/*
var router1 = new Backbone.CallRouter([
	{
		path: 'path-a',
		validate: function(){
			//debugger
		},
		rootContainer: rootR,  // could also be a view with 2 or more regions
		viewTree: {
			view: ViewA,
			viewTree: [
				{
					view: ViewB,
					region: 'r-one',

					viewTree: {
						view: ViewD,

					    viewTree: {
					    	view: ViewE,
				    	    render: function(viewClass, viewOptions){
				    			//debugger
				    			return new Promise((resolve, reject) => {
				    				setTimeout(() => {
				    					
				    					viewOptions.request._ts = Date.now();
				    					var view = new viewClass(viewOptions);
				    					view.render();
				    					
				    					//debugger
				    					resolve({ view: view});
				    					//resolve()
				    				}, 1000)
				    			});

				    	    },
					    }

					}
				},
				
				{
					view: ViewC,
					region: 'r-two',
				}
				
			]

		}
	},
	{
		path: 'path-d',
		validate: function(){
			debugger
		},
		rootContainer: rootR,  // could also be a view with 2 or more regions
		viewTree: {
			view: ViewA,
			handler: function(){
				debugger
				return false;
			},

			viewTree: [
				{
					view: ViewB,
					//region: 'r-one',
				},
				{
					view: ViewC,
					//region: 'r-two',
				}
			]

		}
	},
	{
		path: 'path-b',
		validate: function(){
			//debugger
		},
		rootContainer: rootR,
		viewTree: {
			view: ViewB,
		}
	}
]);


*/

router.start();
