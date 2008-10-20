/*
Class: UI.Context
	Create a context menu
	
Require:
	UI/Menu/Menu.js

Arguments:
		options
		
Options: 
	options				: {
		contexts		: []
	}

Example:
	(start code)
	this.context = new UI.Menu.Context({
		contexts : [
			{
				name : 'workspace',
				selector	: '.app-workspace',
				menu		: [
					{ text		: 'Workspace menu'},
					{ text		: 'separator' },
					{
						text 	: 'editCategory',
						action	: function(){ this.test('dorpdown') }.bind(this)
					}
					{ text		: 'viewSource'},
					{ text		: 'separator' },
					{ text		: 'deleteCategory'}
				]
			},
			{
				name : 'pageinfo',
				selector	: '[id^=pageinfo]',
				menu		: [
					{
						text 	: 'editCategory',
						action	: function(){ this.test('dorpdown') }.bind(this)
					},
					{ text 		: 'editCategoryApparence'}
				]
			}
		]
	});
	(end)

*/


UI.Context = new Class({
	Extends : UI.Menu,
	Implements: [Events, Options],
	
	options: {
		className		: 'ui-menu-context',
		contexts		: [],
		type			: 'context'
	},
	
	/* 
		Method: initialize
		
			Construtor
	*/

	initialize: function(options) {
		this.parent(options);
		this.addContexts(this.options.contexts);
		this.element.setStyle('display', 'none');
		this.element.inject(document.body);
	},
	
	/* 
		Method: addContexts
		
			Attach context to elements (provided by options.contexts.selector)
	*/
	
	addContexts : function(contexts) {
		contexts.each(function(context){
			document.body.getElements(context.selector).each(function(el){
				el.addEvent('contextmenu', function(e){
					new Event(e).stop();
					this.setMenu(context.menu);
					this.show(e);
				}.bind(this));
				this.element.addEvent('contextmenu', function(e){
					new Event(e).stop();
				});
			},this);
		},this);
	},
	
	/* 
		Method: removeContexts
		
			Remove context to elements (provided by selector)
	*/
	
	removeContexts : function(selector) {
		document.body.getElements(selector).each(function(el){
			el.removeEvents('contextmenu');
		},this);
	},	
	
	/* 
		Method: setPosition
		
			Overwrite the setPosition method of UI.Menu to use mouse coordinates
	*/
	
	setPosition: function(x,y) {
		if (!$defined(x) || !$defined(y)) return;
		
		var coordinates = this.element.getCoordinates();
		var top = y+Window.getScrollTop();
		var left = x+Window.getScrollLeft();
		
		if ((x + coordinates.width + 20) > Window.getWidth()) left = left - coordinates.width;
		if ((y + coordinates.height + 20) > Window.getHeight())	top = top - coordinates.height;
		
		this.element.setStyles({
			'top' : top,
			'left' : left
		});
	},
	
	/* 
		Method: show
		
			Overwrite the show method of UI.Menu to use mouse coordinates
	*/
	
	show: function(e) {
		var coord = this.content.getSize();
		this.parent(false, coord.x, coord.y);
		this.setPosition(e.client.x,e.client.y);
		this.setCanvas();
	}
});
