$('head').append(`
	<style>
		div#test {
			transition: height 0.4s;
		}
	</style>
`)
setTimeout(() => {

	$('div#test').css('height', 200)
}, 1000)
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




function computeDelta(tsInitial, ts, viewName) {

	console.log(ts - tsInitial);
}

var ViewA = Mn.View.extend({
	viewName: 'viewA',
	attributes: {
		style: 'border: solid 1px red; padding: 20px; margin: 10px;'
	},
	initialize: function(){

		this.model = new Backbone.Model({ someProperty: 'set in initialize @ ' + Date.now() })
	},
	templateContext: function(){

		return { 
		}
	},
	template: _.template(`
		view A  
		<div data-model-attr="someProperty"><%= someProperty %></div>
		<div data-region-id="r-a-one"></div>
		<div data-region-id="r-a-two"></div>
	`),
	regions: {
		'r-a-two': 'div[data-region-id="r-a-two"]',
		'r-a-one': 'div[data-region-id="r-a-one"]',
	},
	onRender: function(){

		console.log(this.viewName + ': onRender')
	},
	onAttach: function(){

		console.log(this.viewName + ': onAttach')
	},
	onCallrouterProcess: function(request, skip){

		console.log(this.viewName + ': onCallrouterProcess' + ( skip ? ' (handler was skipped)': ''))
		computeDelta(request.tsInitial, request.ts);

		if (skip) {
			this.model.set({ someProperty: 'updated in onCallrouterProcess @ ' + Date.now() })
			this.$('[data-model-attr="someProperty"]').html(this.model.get('someProperty'))
		}
	}

});

var ViewB = Mn.View.extend({
	viewName: 'viewB',
	attributes: {
		style: 'border: solid 1px green; padding: 20px; margin: 10px;'
	},
	initialize: function() {

		this.model = new Backbone.Model({ someProperty: 'set at initialize @ ' + Date.now() })
	},
	templateContext: function(){

		return { 
		}
	},
	template: _.template(`
		view B  
		<div data-model-attr="someProperty"><%= someProperty %></div>
		<div data-region-id="r-b-one"></div>
		<div data-region-id="r-b-two"></div>
	`),
	regions: {
		'r-b-one': 'div[data-region-id="r-b-one"]',
		'r-b-two': 'div[data-region-id="r-b-two"]'
	},
	onRender: function(){

		console.log(this.viewName + ': onRender')
    },
	onAttach: function(){

		console.log(this.viewName + ': onAttach')
    },
	onCallrouterProcess: function(request, skip){

		console.log(this.viewName + ': onCallrouterProcess' + ( skip ? ' (handler was skipped)': ''))
		computeDelta(request.tsInitial, request.ts);

		if (skip) {
			this.model.set({ someProperty: 'updated in onCallrouterProcess @ ' + Date.now() })
			this.$('[data-model-attr="someProperty"]').html(this.model.get('someProperty'))
		}
	}

});

var ViewC = Mn.View.extend({
	viewName: 'viewC',
	attributes: {
		style: 'border: solid 1px blue; padding: 20px; margin: 10px;'
	},
	initialize: function() {

		this.model = new Backbone.Model({ someProperty: 'set at initialize @ ' + Date.now() })
	},
	templateContext: function(){

		return { 
		}
	},
	template: _.template(`
		view C  
		<div data-model-attr="someProperty"><%= someProperty %></div>
		<div data-region-id="r-c-one"></div>
		<div data-region-id="r-c-two"></div>

	`),
	regions: {
		'r-c-one': 'div[data-region-id="r-c-one"]',
		'r-c-two': 'div[data-region-id="r-c-two"]'
	},
	onRender: function(){

		console.log(this.viewName + ': onRender')
    },
	onAttach: function(){

		console.log(this.viewName + ': onAttach')
    },
	onCallrouterProcess: function(request, skip){

		console.log(this.viewName + ': onCallrouterProcess' + ( skip ? ' (handler was skipped)': ''))
		computeDelta(request.tsInitial, request.ts);

		if (skip) {
			this.model.set({ someProperty: 'updated in onCallrouterProcess @ ' + Date.now() })
			this.$('[data-model-attr="someProperty"]').html(this.model.get('someProperty'))
		}
	}
});

var ViewD = Mn.View.extend({
	viewName: 'viewD',
	attributes: {
		style: 'border: solid 1px yellow; padding: 20px; margin: 10px;'
	},
	initialize: function() {

		this.model = new Backbone.Model({ someProperty: 'set at initialize @ ' + Date.now() })
	},
	templateContext: function(){

		return { 
		}
	},
	regions: {
		'r-d-one': 'div[data-region-id="r-d-one"]',
		'r-d-two': 'div[data-region-id="r-d-two"]'
	},
	onRender: function(){

		console.log(this.viewName + ': onRender')
    },
	onAttach: function(){

		console.log(this.viewName + ': onAttach')
    },
	template: _.template(`
		view D  
		<div data-model-attr="someProperty"><%= someProperty %></div>
		<div data-region-id="r-d-one"></div>
		<div data-region-id="r-d-two"></div>
	`),
	onCallrouterProcess: function(request, skip){

		console.log(this.viewName + ': onCallrouterProcess' + ( skip ? ' (handler was skipped)': ''))
		computeDelta(request.tsInitial, request.ts);

		if (skip) {
			this.model.set({ someProperty: 'updated in onCallrouterProcess @ ' + Date.now() })
			this.$('[data-model-attr="someProperty"]').html(this.model.get('someProperty'))
		}
	}
});

var ViewE = Mn.View.extend({
	viewName: 'viewE',
	attributes: {
		style: 'border: solid 1px pink; padding: 20px; margin: 10px;'
	},
	initialize: function() {

		this.model = new Backbone.Model({ someProperty: 'set at initialize @ ' + Date.now() })
	},
	templateContext: function(){

		return { 
		}
	},
	regions: {
		'r-e-one': 'div[data-region-id="r-e-one"]',
		'r-e-two': 'div[data-region-id="r-e-two"]'
	},
	onRender: function(){

		console.log(this.viewName + ': onRender')
    },
	onAttach: function(){

		console.log(this.viewName + ': onAttach')
    },
	template: _.template(`
		view E  
		<div data-model-attr="someProperty"><%= someProperty %></div>
		<div data-region-id="r-e-one"></div>
		<div data-region-id="r-e-two"></div>
	`),
	onCallrouterProcess: function(request, skip){

		console.log(this.viewName + ': onCallrouterProcess' + ( skip ? ' (handler was skipped)': ''))
		computeDelta(request.tsInitial, request.ts);

		if (skip) {
			this.model.set({ someProperty: 'updated in onCallrouterProcess @ ' + Date.now() })
			this.$('[data-model-attr="someProperty"]').html(this.model.get('someProperty'))
		}
	}
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

var foo = {
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

router.addRoute(foo);

// foo-2

var foo2 = {
	path: 'foo-2',
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
			view: ViewD,
			//region: 'r-two',
		}
		]
	}
	]
};

router.addRoute(foo2);

// bar 

var bar = {
	path: 'bar',
	validate: function(){
	},
	children: [
	{
		view: ViewC,
		children: [
		{
			view: ViewB,
			region: 'r-c-one',
			/*
			children: {
				view: ViewD,

			    children: {
			    	view: ViewE,
		    	    render: function(viewClass, viewOptions){
		    			//debugger
		    			return new Promise((resolve, reject) => {
		    				setTimeout(() => {
		    					
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
			view: ViewD,
			//region: 'r-two',
		}
		]
	}
	]
};

router.addRoute(bar);

// baz 

var baz = {
	path: 'baz',
	validate: function(){
	},
	children: [
	{
		view: ViewA,
	    handler: function(viewClass, viewOptions){

			return new Promise((resolve, reject) => {

				setTimeout(() => {

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

    	    					let view = new viewClass(viewOptions);
    	    					view.render();
    	    					
    	    					resolve({ view: view});
    	    				}, 1000)
    	    			});

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

    	    						let view = new viewClass(viewOptions);
    	    						view.render();
    	    						
    	    						resolve({ view: view});
    	    					}, 500)
    	    				});

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

router.addRoute(baz);

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
