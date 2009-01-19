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
			a selector key, who define on wich elements the context menu will be attached. It could be a CSS3 selector as well.
			a menu key, who is a menu list as defined in <UI.Menu>.

	Discussion:
		We must still add methods to set dynamically new contexts, ...
	
	Example:
		(start code)
		var context = new UI.Context({
			contexts : [
				{
					name : 'workspace',
					selector	: '.app-workspace',
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
	
	Extends: UI.Menu,
	
	options:{
		className: 'ui-menu-context',
		contexts: [],
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
		this.addContexts(this.options.contexts);
		this.element.setStyle('display', 'none');
		this.element.inject(document.body);
	},
	
	/* 
	Method: addContexts
		Attach context to elements (provided by contexts.selector)
	
	Arguments:
		contexts - (array) an array containing contexts definition. See above in class' options for more details
	
	Return:
		this
	*/
	
	addContexts: function(contexts){
		contexts.each(function(context){
			document.body.getElements(context.selector).each(function(el){
				el.addEvent('contextmenu', function(e){
					new Event(e).stop();
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
		Remove context to elements (defined by selector)
	
	Arguments:
		selector - (string) Selector defining elements where context will be detached
	
	Return:
		this
	*/
	
	removeContexts: function(selector){
		document.body.getElements(selector).each(function(el){
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
		ui.controller.closeMenu = function(event){
			if (event.rightClick) {
				ui.controller.closeMenu = $empty;
				this.hide(0);
			} else {
				ui.controller.closeMenu = $empty;
				this.hide(300);
			}
			
		}.bind(this);
		//ui.controller.closeMenu = this.fireEvent.bind(this, 'closeMenu');
		var coord = this.content.getCoordinates();
		this.setSize(coord.width, coord.height);
		this.setPosition(e.client.x,e.client.y);
		this.setCanvas();

	}

});
