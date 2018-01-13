// route configuration - OLD


var router = new CallRouter

var route = {
	path: '#users/:'
	pre: function(request){

	},
	views: [
		{
			viewClass: RootV,
			initOptions: {}
			handler: function(request, view, routeConfig){
				$('some-container').html(view.$el.html())
			}
			views: 
		}
	]
}



return false in pre should cancel the tree rendering process




// route configuration - NEW

var router = new CallRouter({
	root: RootRegion
});

routeConfig = {
	path: '#path-1',
	validate: function(request){ 
		// ... 
	},
	children: [
	{
		view: 'viewA',
		viewOptions: {}
		children: [
		{
			view: 'viewB',
			region: 'r-a'
		}, 
		{
			view: 'viewC'
		}
		]
	
	}
	]
}
router.addRoute(routeConfig)

router.addRoute({
	path: '#reservations',
	validate: function(request){ 
		// ... 
	},
	tree: [
		{
			view: ...
			handler: function(request, options){

			}.
			viewTree: [
				{
					view: ...
					region: ...
				}
			]
		},
		{
			view: ...
			region: ...
			handler: function(request, options){

			}
		}
	]
}

})

var myRoute = {
	path: '#reservations',
	validate: function(request, options){ 
		... 
	},
	rootContainer: ... 
	viewTree: [
		{
			view: ...
			region: ...
			handler: function(request, options){

			}.
			viewTree: [
				{
					view: ...
					region: ...
				}
			]
		},
		{
			view: ...
			region: ...
			handler: function(request, options){

			}
		}
	]
}

where:

- path: the full path of the route
- validate: path parameters and query parameters are available in request.query and request.params; return false to stop the processing of the current route (that is, do not proceed to the viewTree rendering); in that case it should also have a redirection to some other route

- rootContainer: an instace of a marionette view or region where the viewTree will be placed (or more exacttly, where the first level elements of the viewTree will be placed); this instance will be the parent of the 1st level leafs in the viewTree
- viewTree: an object (or array of objects) defining the view hierarchy associated to this path. 
	- viewClass: (required) a reference to a view class that will be instantiated when this path is requested; can also be a function that returns a view class
	- viewOptions:
	- region: a string with a region name (that should be available in the parent view); this view will be placed in that region; if ommited, the i-th region will be used (where i is the index in the corresponding viewTree array (see example below); this is useful when the parent view only has 1 or 2 regions
	- handler: ... (a function implementing the logic to show the view instance in the parent view; return false to stop the processing of the current leaf in the viewTree (note that other siblings will still continue processing) [????](
	- mount: ...
	- viewTree: an array or object where the recursive form takes place

	NOTE: the properties 'handler' and 'region' are mutually exclusive; see below

an object in the viewTree can have 3 forms:

1) 

{
	view: MyView,
	viewTree: ...
}

in this case the region and handler are ommitted, so the default region and the default handler property will be used


2) 

{
	view: MyView,
	region: 'some-region',
	viewTree: ...
}

in this case the default handler will be used (with the given region)

3) 

{
	view: MyView,
	handler: function(request, options){
		...
	},
	viewTree: ...
}

in this case the given handler will be used; the region should be explicitly used in the handler code (a reference can be obtained from the arguments, for instance)

4) 

{
	view: MyView,
	region: 'some-region',
	handler: function(request, options){
		...
	},
	viewTree: ...
}

in this case the given handler will be used; the given region is available in the options parameters for convenience, but the handler can ignore it and use any other region; this form is a bit redundant since the region property can be ignored; it makes more sense to use form 3 instead;


the viewTree can be either an array of objects or a function(request, options) that return an array of objects (if we want to dynamically create the leafs of the viewTree)


## Default regions

if the region property is ommited in the objects in the viewTree, the default names of the regions (in the corresponding parent view) will be used:

	"r1", "r2", etc;

That is, the plugin will obtain the region in the parent view using:

parentView.getRegion('r1')

if there is no region with this name, an error will be thrown

Note: if the root of the route is a region instance, the 'region' property in the 1st level leafs in the viewTree, if present, will be ignored. And if the 1st level leafs are given as an array with more than 1 element, only the last branch will actually end up living in the DOM. So looking at in other angle, if the 1st-level leafs are given as an array (with more than 1 element), then the root property must be a view instance with the same number of regions.

note: the peer dependency should be low enough to not cause incompatibilities


--

test:
-viewTree can be either an object or an array (even the topmost)

--

.check 