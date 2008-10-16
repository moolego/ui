/*
Class: UI.Toolbar
	Create a dropdown menubar
	
Require:
	UI/Menu/Menu.js

Arguments:
		options
		
Options: 
	options				: {
		zIndex			: 10000,
		presentation	: 'textIcons',  // text, button, icons, textIcons, textButton
		menus			: []
	}

Example:
	(start code)
	this.toolbar = new UI.Menu.Toolbar({
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
	Implements			: [Options, Events],
	
	options				: {
		// default options	
		menus			: [],
		zIndex			: 2500,
		
		// styles
		component		: 'toolbar',
	},
	
	/* 
		Method: initialize
		
			Construtor
	*/

	initialize: function(options) {
		this.parent(options);
	},
	
	/* 
		Method: build
		
			Overwrite the build method of UI.Menu
	*/
	
	build: function() {
		this.addItemStyles();
		this.parent();
		
		this.element.setStyles({
			position	: 'relative',
			width		: '100%'
		});
	},
	
	inject : function(element, target){
		this.element.inject(element, target);
		this.setSize();
		this.setCanvas();
		this.setStyle('visibility', 'visible');
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
				color	: this.skinProperties.fontColor
			}
		}, this);
	},
	
	/* 
		Method: addSubmenuEvents
		
			Overwrite the addSubmenuEvents method of UI.Menu to manage mousedown events, ...
	*/
	
	addSubmenuEvents : function(item, menuItem){
		if(item.menu) {
			menuItem.addEvents({
				'mousedown' : function(e){
					if (this.activeItem != menuItem) {
						this.time = $time();
						this.addUnderlay();
						if (item.menu && !item.action) {
							this.addSubmenu(item, menuItem, 'bottom');
							this.moveRollover(menuItem);
						} else {
							// first push icon, then manage action with delay
							this.menuWithAction = (function(){
								this.addSubmenu(item, menuItem, 'bottom');
								this.menuWithAction = false;
							}).delay(this.skinProperties.delay, this);
						}
					}
				}.bind(this),
				'mouseup' : function(e){
					if ($time() - this.time > 300 && this.underlay) {
						this.underlay.fireEvent('click');
					}
				}.bind(this),
				'mouseenter': function(){
					if (this.activeItem && this.activeItem != menuItem && !item.action) {
						if (this.activeItem.submenu) this.activeItem.submenu.hide(0);
						this.addUnderlay();
						this.addSubmenu(item, menuItem, 'bottom');
						this.moveRollover(menuItem);
					}
				}.bind(this),
				'hideSubmenu' : function(){
					if (!menuItem.submenu) return;
					this.hideFx = new Fx.Tween(menuItem.submenu.element, {
						duration	: this.skinProperties.hideFxDuration,
						onComplete	: function(){
							this.removeRollover();
							if (this.underlay) this.underlay.fireEvent('click');
							this.removeSubmenu();
						}.bind(this)
					}).start('opacity', 0);
				}.bind(this)
			})
		}
		menuItem.addEvents({
			'mousedown' : function(){
				if (!item.menu && this.activeItem) this.activeItem.fireEvent('hideSubmenu');
				menuItem.down = true;
			}.bind(this),
			'mouseleave' : function(){menuItem.down = false},
			'mouseup' : function(){
				if (this.menuWithAction || !item.menu) {
					this.removeSubmenu();
					this.removeRollover();
				}
				if (this.menuWithAction) {
					$clear(this.menuWithAction);
					delete this.menuWithAction;
				}
				if (menuItem.down && (!menuItem.submenu || (menuItem.submenu && menuItem.submenu.element.getStyle('visibility') == 'hidden'))) {
					menuItem.fireEvent('action');
				}
				menuItem.down = false;
			}.bind(this)
		});
	},
	
	/* 
		Method: setRollover
		
			set a canvas to draw menu elements
	 */
	
	setRollover : function(){
		this.rollover = new UI.Element({
			type			: 'toolbarRollover',
			styles			: {
				position 	: 'absolute',
				zIndex 		: 1
			}
		}).inject(this.element);
	},
	
	/* 
		Method: addUnderlay
		
			Overwrite the addUnderlay method of UI.Menu to keep the toolbar
	*/
	
	addUnderlay : function(){
		this.parent();
		this.underlay.removeEvents();
		this.underlay.addEvents({
			'click' : function(){
				this.removeSubmenu();
				this.removeRollover();
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