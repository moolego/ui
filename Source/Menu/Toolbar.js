/*
	Class: UI.Toolbar
		Create a dropdown menubar to create menu bar or window's toolbar
		
	Extends:
		<UI.Menu>
	
	Arguments:
			options
			
	Options:
		menu - (array) Menu definition, same as in <UI.Menu>
		openOnRollover - (boolean) When set to true, toolbar's elements will react on mouse over
		closeOnRollout - (boolean) When set to true, toolbars's submenu will react on mouse leave to close themself
	
	Example:
		(start code)
		var toolbar = new UI.Toolbar({
				container: this.main.content,
				menu: [{
					text : 'Floor App',
					options	: {	'class' : 'ui-dd-floor'	},
					menu : [{
						text : 'About',
						action : function() { this.test('about'); alert('click')}.bind(this)
					}]
				}
			]						
		});
		(end)
		
	Implied global:
		UI,ui,
		$,$clear,$empty,$time,
		Class,Event,Fx,
		window
		
	Members:
		Extends, Menu, Toolbar, Tween, action, actionDelay, activeItem, 
	    addEvent, addEvents, addItemStyles, addSubmenu, addSubmenuEvents, bind, 
	    build, closeMenu, closeOnRollout, color, component, controller, delay, 
	    down, duration, each, element, fireEvent, float, fontColor, getParent, 
	    getSize, getStyle, getWidth, hide, hideFx, hideFxDuration, hideSubmenu, 
	    initialize, inject, menu, menuWithAction, menus, mousedown, mouseenter, 
	    mouseleave, mouseup, moveRollover, onComplete, openOnRollover, options, 
	    overflow, parent, position, props, register, removeRollover, 
	    removeSubmenu, rolloverType, attach, setCanvas, setSize, setStyle, 
	    setStyles, start, stop, styles, submenu, tag, time, width, x, zIndex
*/

UI.Toolbar = new Class({
	
	Extends: UI.Menu,
	
	options: {
		// default options
		tag: 'div',
		menus: [],
		zIndex: 4000,
		openOnRollover: false,
		closeOnRollout: false,
		
		// styles
		rolloverType: 'toolbarRollover',
		component: 'toolbar'
	},

 	initialize: function(options){
        this.parent(options); //will call initalize of UI.ELEMENT
    },
	
	/*
	Function: build
		private function
		
		Overwrite <UI.Menu::build> to set custom toolbar's style
	
	Return:
		(void)
	
	See also:
		<UI.Menu::build>
		<UI.Element::build>
	*/
	
	build: function(){
		
		this.addItemStyles();
		this.parent();
		
		this.element.setStyles({
			position: 'relative',
			width: '100%',
			overflow: 'hidden'
		});
	},
	
	attach: function(){

		this.addEvent('onCloseMenu', function(){
			this.removeSubmenu();
			(function(){this.removeRollover();}.bind(this)).delay(this.props.hideFxDuration);
			ui.controller.element.closeMenu = $empty;
		}.bind(this));
	},
	
	/* 
	Method: inject
		inject the toolbar and draw the canvas. Overwrite the inject method of <UI.Menu>
	
	Arguments:
		element - (element) Injection target
		target - (string) Determine where to inject.
	
	Return:
		this
	 */
	
	inject: function(element, target){
		this.fireEvent('inject');
		this.setStyle('visibility', 'visible');
		this.element.inject(element, target);
		this.setSize($(element).getWidth(), false);
		this.setCanvas();
		ui.controller.element.register(this);
		this.fireEvent('injected');
		
		window.addEvent('resize', function(){
			this.setSize(this.element.getParent().getSize().x);
		}.bind(this));
		
		return this;
	},
	
	
	/* 
	Method: addItemStyles
		set Styles for each item
	
	Arguments:
	
	Return:
		this
		
	Discussion: 
		not really nice...
	 */
	
	
	addItemStyles : function(){			
		this.options.menu.each(function(item){
			item.options = item.options || {};
			item.options.styles = {
				'float': 'left',
				color: this.props.fontColor
			};
		}, this);
	},
	
	/* 
	Method: addSubmenuEvents
		private function
	
		Overwrite the addSubmenuEvents method of UI.Menu to manage mousedown events, ...
	
	Arguments:
		item - (object) Object containing element properties
		menuItem - (element) Menu item where events will be attached
	
	Return:
		(void)
		
	See also:
		<UI.Menu::addSubmenuEvents>
	*/
	
	addSubmenuEvents: function(item, menuItem){
		if(item.menu) {
			menuItem.element.addEvents({
				'mousedown' : function(e){
					ui.controller.element.closeMenu(e);
					if (this.activeItem != menuItem) {
						this.time = $time();
						if (!item.action) {
							this.addSubmenu(item, menuItem, 'bottom');
							this.moveRollover(menuItem);
						} else {
							// first push icon, then manage action with delay
							this.menuWithAction = (function(){
								if (this.activeItem && this.activeItem.submenu) {
									this.activeItem.submenu.hide(0);
								}
								this.moveRollover(menuItem);
								this.addSubmenu(item, menuItem, 'bottom');
								this.menuWithAction = false;
							}).delay(this.props.actionDelay, this);
						}
					}
					var ev = new Event(e).stop();
				}.bind(this),
				'mouseup' : function(){
					if ($time() - this.time > 800) {
						this.fireEvent('closeMenu');
					}
				}.bind(this),
				'mouseenter': function(){
					if (this.activeItem && this.activeItem != menuItem && !item.action) {
						if (this.activeItem.submenu) {
							this.activeItem.submenu.hide(0);
						}
						this.addSubmenu(item, menuItem, 'bottom');
						this.moveRollover(menuItem);
					} else if (this.options.openOnRollover) {
						menuItem.element.fireEvent('mousedown');
					}
				}.bind(this),
				'hideSubmenu' : function(){
					if (!menuItem.submenu) {
						return;
					}
					this.hideFx = new Fx.Tween(menuItem.submenu.element, {
						duration	: this.props.hideFxDuration,
						onComplete	: function(){
							this.removeRollover();
							this.fireEvent('closeMenu');
							this.removeSubmenu();
						}.bind(this)
					}).start('opacity', 0);
				}.bind(this)
			});
		}
		
		menuItem.element.addEvents({
			'mousedown' : function(e){
				if (!item.menu && this.activeItem) {
					this.activeItem.fireEvent('hideSubmenu');
				}
				menuItem.down = true;
				var ev = new Event(e).stop();
			}.bind(this),
			'mouseleave' : function(){menuItem.down = false;},
			'mouseup' : function(){
				if (this.menuWithAction || !item.menu) {
					this.removeSubmenu();
				}
				if (this.menuWithAction) {
					$clear(this.menuWithAction);
					delete this.menuWithAction;
				}
				if (menuItem.down && (!menuItem.submenu || (menuItem.submenu && menuItem.submenu.element.getStyle('visibility') == 'hidden'))) {
					menuItem.element.fireEvent('action');
				}
				menuItem.down = false;
			}.bind(this)
		});
	}
	
});	