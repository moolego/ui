/*
	Class: UI.Context
		Create a context menu
		
	Extends:
		<UI.Menu>		
	
	Arguments:
		options

	Options: 
		contexts - (array) An array containing contexts definition. A context definition is an object composed of following keys :
			a name key, who is the context name,
			a target key, who define on wich elements the context menu will be attached. It could be a CSS3 target as well.
			a menu key, who is a menu list as defined in <UI.Menu>.

	Discussion:
		We must still add methods to set dynamically new contexts, ...
	
	Example:
		(start code)
		var context = new UI.Context({
			contexts : [
				{
					name : 'workspace',
					target	: '.app-workspace',
					menu		: [
						{ text		: 'Workspace menu'},
						{ text		: 'separator' },
						{
							text 	: 'Hello world...',
							action	: function(){ alert('Hello world!') }
						}
						{ text		: 'viewSource'},
						{ text		: 'separator' },
						{ text		: 'deleteCategory'}
					]
				},
				{
					name : 'pageinfo',
					target	: '[id^=pageinfo]',
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
		
	Implied global:
		UI,ui,
		$,$defined,$empty,
		Class,Event,	Window, 
		document
		
	Members:
		Context, Extends, Menu, addContexts, addEvent, bind, body, 
	    buildMenu, className, client, closeMenu, content, contexts, controller, 
	    each, element, event, getCoordinates, getElements, getHeight, 
	    getScrollLeft, getScrollTop, getWidth, height, hide, initialize, inject, 
	    left, menu, options, parent, removeContexts, removeEvents, rightClick, 
	    setCanvas, setPosition, setSize, setStyles, show, stop, target, top, 
	    trigger, type, width, x, y
*/


UI.Context = new Class({
	
	Extends: UI.Menu,
	
	options:{
		className: 'ui-menu-context',
		contexts: [],
		scope:$(document.body),
		container:$(document.body),
		trigger: 'contextmenu',
		type: 'context'
	},
	
	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	
	See also:
		<UI.Menu::initialize>
		<UI.Element::initialize>
	*/

	initialize: function(options){
		this.parent(options);

		this.addContexts(this.options.contexts,this.options.container);
		this.element.hide();
		this.element.inject(this.options.container);
	},
	
	/* 
	Method: addContexts
		Attach context to elements (provided by contexts.target)
	
	Arguments:
		contexts - (array) an array containing contexts definition. See above in class' options for more details
	
	Return:
		this
	*/
	
	addContexts: function(contexts,container){
		contexts.each(function(context){
			container.getElements(context.target).each(function(el){
				el.addEvent(this.options.trigger, function(e){
					new Event(e).stop();
					this.hide(0);
					this.buildMenu(context.menu);
					this.show(e);
				}.bind(this));
				this.element.addEvent('contextmenu', function(e){
					new Event(e).stop();
				});
			},this);
		},this);
		
		return this;
	},
	
	/* 
	Method: removeContexts
		Remove context to elements (defined by target)
	
	Arguments:
		target - (string) target defining elements where context will be detached
	
	Return:
		this
	*/
	
	removeContexts: function(target){
		document.body.getElements(target).each(function(el){
			el.removeEvents('contextmenu');
		},this);
		
		return this;
	},	
	
	/* 
	Method: setPosition
		private function
		
		Overwrite the setPosition method of UI.Menu to use mouse coordinates to set menu location
	
	Arguments:
		x - (integer) X mouse's coordinates
		y - (integer) Y mouse's coordinates
	
	Return:
		(void)
	
	See also:
		<UI.Menu::setPosition>
		
	*/
	
	setPosition: function(x,y){
		if (!$defined(x) || !$defined(y)) {
			return;
		}
				
		var coordinates = this.element.getCoordinates();
		var top = y+this.options.container.getScrollTop();
		var left = x+this.options.container.getScrollLeft();
		
		if ((x + coordinates.width + 20) > this.options.container.getWidth()) {left =  left - coordinates.width;}
		if ((y + coordinates.height + 20) > this.options.container.getHeight())	{top =  top - coordinates.height;}
		
		this.element.setStyles({
			'top' : top,
			'left' : left
		});
	},
	
	/* 
		Method: show
			private function
			
			Overwrite the show method of UI.Menu to use mouse coordinates
		
		Arguments:
			e - (event) Event who provide cursor's position
		
		Return:
			this
		
		See also:
			<UI.Menu::show>
			<UI.Element::show>
	*/
	
	show: function(e){
		this.parent();
		
		ui.controller.element.closeMenu = function(event){
			if (event.rightClick || this.options.event != 'contextmenu') {
				ui.controller.element.closeMenu = $empty;
				this.hide(0);
			} else {
				ui.controller.element.closeMenu = $empty;
				this.hide(300);
			}
			
		}.bind(this);
		
		//ui.controller.element.closeMenu = this.fireEvent.bind(this, 'closeMenu');
		var coord = this.content.getCoordinates();
		this.setSize(coord.width, coord.height);
		this.setPosition(e.client.x,e.client.y);
		this.setCanvas();

	}

});
