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
				className	: 'ui-menu-dropdown',
				container	: this.main.content,
				menu		: [
				{
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
*/

UI.Toolbar = new Class({
	Extends				: UI.Menu,
	
	options				: {
		// default options
		tag				: 'div',
		menus			: [],
		zIndex			: 4000,
		openOnRollover	: false,
		closeOnRollout	: false,
		
		// styles
		rolloverType	: 'toolbarRollover',
		component		: 'toolbar'
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
	
	build: function() {
		this.addItemStyles();
		this.parent();
		
		this.element.setStyles({
			position	: 'relative',
			width		: '100%'
		});
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
	
	inject : function(element, target){
		this.fireEvent('inject');
		this.setStyle('visibility', 'visible');
		this.element.inject(element, target);
		this.setSize($(element).getWidth(), false);
		this.setCanvas();
		this.controller.register(this);
		this.fireEvent('injected');
		
		window.addEvent('resize', function(){
			this.setSize(this.element.getParent().getSize().x);
		}.bind(this));
		
		return this;
	},
	
	addItemStyles : function(){
		this.options.menu.each(function(item){
			item.options = item.options || {};
			item.options.styles = {
				'float'	: 'left',
				color	: this.props.fontColor
			}
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
	
	addSubmenuEvents : function(item, menuItem){
		if(item.menu) {
			menuItem.element.addEvents({
				'mousedown' : function(e){
					if (this.activeItem != menuItem) {
						this.time = $time();
						this.addUnderlay();
						if (!item.action) {
							this.addSubmenu(item, menuItem, 'bottom');
							this.moveRollover(menuItem);
						} else {
							// first push icon, then manage action with delay
							this.menuWithAction = (function(){
								if (this.activeItem && this.activeItem.submenu) this.activeItem.submenu.hide(0);
								this.moveRollover(menuItem);
								this.addSubmenu(item, menuItem, 'bottom');
								this.menuWithAction = false;
							}).delay(this.props.actionDelay, this);
						}
					}
					new Event(e).stop();
				}.bind(this),
				'mouseup' : function(){
					if ($time() - this.time > 800 && this.underlay) {
						this.underlay.fireEvent('click');
					}
				}.bind(this),
				'mouseenter': function(){
					if (this.activeItem && this.activeItem != menuItem && !item.action) {
						if (this.activeItem.submenu) {
							this.activeItem.submenu.hide(0);
						}
						this.addUnderlay();
						this.addSubmenu(item, menuItem, 'bottom');
						this.moveRollover(menuItem);
					} else if (this.options.openOnRollover) {
						menuItem.fireEvent('mousedown');
					}
				}.bind(this),
				'hideSubmenu' : function(){
					if (!menuItem.submenu) return;
					this.hideFx = new Fx.Tween(menuItem.submenu.element, {
						duration	: this.props.hideFxDuration,
						onComplete	: function(){
							this.removeRollover();
							if (this.underlay) this.underlay.fireEvent('click');
							this.removeSubmenu();
						}.bind(this)
					}).start('opacity', 0);
				}.bind(this)
			})
		}
		menuItem.element.addEvents({
			'mousedown' : function(e){
				if (!item.menu && this.activeItem) this.activeItem.fireEvent('hideSubmenu');
				menuItem.down = true;
				new Event(e).stop();
			}.bind(this),
			'mouseleave' : function(){menuItem.down = false},
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
	},
	
	/* 
		Method: addUnderlay
			private function
		
			Overwrite <UI.Menu::addUnderlay> to keep the toolbar
		
		Return:
			(void)
		
		See also:
			<UI.Menu::addUnderlay>
	*/
	
	addUnderlay : function(){
		this.parent();
		this.underlay.removeEvents();
		this.underlay.addEvents({
			'click' : function(){
				this.removeSubmenu();
				(function(){this.removeRollover()}.bind(this)).delay(this.props.hideFxDuration)
				this.removeUnderlay();
			}.bind(this),
			'contextmenu' : function(e){
				new Event(e).stop();
				this.underlay.fireEvent('click');
			}.bind(this),
			'mousewheel' : function(e){new Event(e).stop()}
		});
	}
});	