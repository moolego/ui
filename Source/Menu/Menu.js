 /*
Class: UI.Menu
	Creates a new menu, manages submenus and positionning.
	
Require:
	UI/Scrolling/Scrolling.Menu.js
	UI/View/View.js

Arguments:
		options
		
Options: 
		className			: 'ui-menu',
		menu				: [],
		useUnderlay			: true,
		scrollToSelected	: false,
		zIndex				: 10500,
		position			: 'relative',	// can be 'relative', 'bottom', 'over'
		contentTag			: 'div',
		itemTag				: 'div',
		onHide				: $empty,
		ondisplay			: $empty


Returns:
	void
	
Example:
	(start code)
	var submenu = new UI.Menu({
		container : this.view.element,
		underlay : this.options.underlay,
		zIndex : 1
	});
	(end)

*/


UI.Menu = new Class({
	Extends					: UI.Element,
	
	options: {
		component			: 'menu',

		zIndex				: 3000,
		contentTag			: 'div',
		itemTag				: 'div',

		position			: 'normal',
		scrollToSelected	: false,
		scrollMargin		: 20,
		menu				: [],
		underlay			: false,
		
		styles			: {
			position	: 'absolute'
		}
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
		
			Construtor
			
		Discussion:
		
			the zIndex should be set by the ui.element
	 */
	
	build: function(menu) {
		this.parent();
		this.content = new Element(this.options.contentTag,{
			styles : {
				zIndex		: 2,
				position	: 'relative',
				padding		: this.props.components.wrapper.styles.padding,
				margin		: 0,
				listStyle	: 'none',
				lineHeight	: '1em'
			}
		}).inject(this.element);
		
		this.setMenu();
		
		this.element.setStyles({
			zIndex	: this.options.zIndex
		});
	},
	
	/* 
		Method: setMenu
		
			Set the content of the menu
	 */
	
	setMenu: function(menu) {
		this.empty();
		var list = (menu) ? menu : this.options.menu;
		list.each(function(item){
			if (item.text == 'separator') {
				var menuItem = new UI.Label({
					skin		: this.options.skin,
					tag			: this.options.itemTag,
					html		: '',
					styles		: this.props.components.separator.styles
				}).inject(this.content);
				menuItem.separator = true;
			} else {
				var menuItem = new UI.Label({
					skin		: this.options.skin,
					tag			: this.options.itemTag,
					html		: item.text,
					props		: UI.skin.getComponentProps(this.skin, 'menuItem')
				}).set(item.options);
				
				if (item.action) menuItem.element.addEvent('action', item.action);
				
				menuItem.inject(this.content);
			}
			this.addSubmenuEvents(item, menuItem);
		},this);
		return this;
	},
	
	/* 
		Method: addSubmenuEvents
		
			Attach actions and / or submenu to menu elements
	 */
	
	addSubmenuEvents : function(item, menuItem){
		if(item.menu) {
			menuItem.addEvents({
				'mouseenter' : function(){
					if (this.activeItem && this.activeItem.submenu && this.activeItem != menuItem) this.activeItem.submenu.hide();
					if (this.activeItem != menuItem) this.addSubmenu(item, menuItem, 'normal');
					this.moveRollover(menuItem);
				}.bind(this)
			});
			this.addSubmenuArrow(menuItem);
		} else {
			menuItem.addEvents({
				'mouseenter' : function(){
					this.removeSubmenu();
					(menuItem.separator) ? this.removeRollover() : this.moveRollover(menuItem);
				}.bind(this)
			});
		}
		
		menuItem.element.addEvents({
			'mouseleave': function(){
				$clear(this.menuActionDelay);
			}.bind(this),
			'mouseup' : function(){
				this.mouseUpAction(menuItem);
			}.bind(this),
			'mousedown' : function(){
				if (!menuItem.separator) this.fireEvent('change');
			}.bind(this)
		});
	},
	
	addSubmenu : function(item, menuItem, position) {
		this.menuWithAction = false;
		$clear(this.menuActionDelay);
		
		this.menuActionDelay = (function(){
			if (!menuItem.submenu) {
				menuItem.submenu = new UI.Menu({
					skin			: this.options.skin,
					target			: menuItem,
					underlay		: this.underlay,
					menu			: item.menu,
					openOnRollover	: this.options.openOnRollover,
					closeOnRollout	: this.options.closeOnRollout,
					position		: position,
					zIndex			: this.options.component == 'toolbar' ? --this.options.zIndex : ++this.options.zIndex,
					events			: {
						hide		: this.removeSubmenu
					}
				}).inject(document.body);
			} else {
				menuItem.submenu.underlay = this.underlay;
				menuItem.submenu.show(menuItem);
			}
		}.bind(this)).delay(this.props.showDelay);
	},
	
	/* 
		Method: addSubmenuArrow
		
			Add an arrow on the right side of the element
	*/
	
	addSubmenuArrow : function(menuItem){
		//we add the arrow
		menuItem.arrow = new UI.Element({
			skin		: this.options.skin,
			component 	: 'element',
			type		: 'menuRightArrow',
			styles 		: {
				'padding'	: 0,
				'position'	: 'absolute',
				right		: 8,
				display		: 'block',
				margin	: '4px 0 0 0'
			}
		}).inject(menuItem.element, 'top');
		menuItem.element.addEvents({
			'mouseenter': function(){
				menuItem.arrow.setState('over');
			},
			'defaultArrow': function(){
				menuItem.arrow.setState('default');
			}
		});
	},
	
	/* 
		Method: mouseUpAction
		
			Do the element action and close the menu
	*/
	
	mouseUpAction : function(menuItem){
		if ($time() - this.time > 300 && this.rollover) {
			// effect!!
			new Fx.Tween(this.rollover.element, {
				duration	: 100,
				onComplete	: function(){
					if (this.selected) this.selected.selected = false;
					this.selected = menuItem.element;
					menuItem.element.selected = true;
					this.underlay.fireEvent('click');
					menuItem.element.fireEvent('action');
				}.bind(this)
			}).start('opacity', 0, 1);
		}
	},
	
	/* 
		Method: setRollover
		
			set a canvas to draw menu elements
	 */
	
	setRollover : function(){
		this.rollover = new UI.Element({
			skin			: this.options.skin,
			type			: 'menuRollover',
			styles			: {
				position 	: 'absolute',
				zIndex 		: 1
			}
		}).inject(this.element);
	},
	
	/* 
		Method: moveRollover
		
			set the rollover to a new element
	 */
	
	moveRollover : function(menuItem){
		var coord = menuItem.getCoordinates(this.element);
		if (!this.rollover) this.setRollover();
		
		if (this.activeItem) {
			this.activeItem.element.fireEvent('defaultArrow');
			
			this.activeItem.setState('default');
		}
		
		this.rollover
		.setSize(coord.width, coord.height)
		.setStyles({
			display : 'block',
			top : coord.top,
			left : coord.left
		});
		menuItem.setState('over');

		this.activeItem = menuItem;
	},
	
	/* 
		Method: removeRollover
		
			Remove the rollover
	 */
	
	removeRollover : function(){
		if (this.rollover) {
			this.rollover.destroy();
			delete this.rollover;
			
			this.activeItem.element.fireEvent('defaultArrow');
			this.activeItem.setState('default');
		}
		
		this.activeItem = false;
	},
	
	/* 
		Method: removeSubmenu
		
			Remove the current submenu if needed
	 */
	
	removeSubmenu : function(){
		if(this.activeItem && this.activeItem.submenu) {
			this.activeItem.element.fireEvent('defaultArrow');
			this.activeItem.submenu.hide(this.props.hideFxDuration);
		}
	},
	
	/* 
		Method: setPosition
		
			Set the position of the menu
	 */
	
	setPosition: function(el) {
		var elCoordinates 	= el.getCoordinates();
		var menuCoordinates = this.element.getCoordinates();
		this.element.setStyle('height', menuCoordinates.height);

		if (this.options.position == 'bottom') {
			this.setCorners([0,0,4,4]);
			this.element.setStyles({
				left : elCoordinates.left,
				top : elCoordinates.bottom
			});
			menuCoordinates = this.element.getCoordinates();
			if(menuCoordinates.bottom + this.options.scrollMargin > (Window.getHeight()) || menuCoordinates.top < this.options.scrollMargin) {
				this.addScrolls();
			}
		
		} else if (this.options.position == 'over') {
			this.setCorners([4,4,4,4]);
			var selected = false;
			if (this.options.scrollToSelected) {
				//we set the position to selected element
				this.content.getElements(this.options.itemTag).each(function(menuItem){
					if (menuItem.selected) selected = menuItem;
				});
			}
			var top = (!selected) ? 
				elCoordinates.top - this.content.getStyle('paddingTop').toInt() :
				elCoordinates.top - selected.getCoordinates(this.element).top;
			
			this.element.setStyles({
				'top': top,
				'left': elCoordinates.left
			});
			windowScroll = Window.getScroll();
			menuCoordinates = this.element.getCoordinates();
			menuCoordinates.top -= windowScroll.y;
			menuCoordinates.bottom -= windowScroll.y;
			
			if(menuCoordinates.bottom + this.options.scrollMargin > (Window.getHeight()) || menuCoordinates.top < this.options.scrollMargin) {
				this.addScrolls();
			}

		//default location
		} else {
			var corners = [4,4,4,4];

			//determine if menu position is left or right
			if (menuCoordinates.width > (Window.getWidth() - elCoordinates.right)) {
				// menu on left
				var left = elCoordinates.left - menuCoordinates.width+2;
				corners[1] = 0;
			} else {
				// menu on right
				var left = elCoordinates.right-2;
				corners[0] = 0;
			}
			if (menuCoordinates.height < (Window.getHeight() - elCoordinates.top + Window.getScroll().y)) {
				// menu is under
				var top = elCoordinates.top - this.content.getStyle('paddingTop').toInt();
			} else if(menuCoordinates.height < (elCoordinates.top - Window.getScroll().y)) {
				// menu is over
				var top = elCoordinates.bottom - menuCoordinates.height + this.content.getStyle('paddingTop').toInt();
				corners = [4,4,corners[1],corners[0]]
			} else {
				// menu is on side
				corners = [4,4,4,4];
				top = elCoordinates.top - this.content.getStyle('paddingTop').toInt();
				this.element.setStyles({
					'top': top,
					'left': left
				});
				this.addScrolls();
			}
			this.setCorners(corners);
			this.element.setStyles({
				'top': top,
				'left': left
			});
		}
	},

	/*
    Method: setCorners

      Set corners radius for canvas draw
	  
	Discussion:
	
		is really needed anymore? 
	*/
	
	setCorners: function(corners) {
		this.props.layers['default'].radius = corners;
	},
	
	/* 
		Method: addScrolls
		
			Add scrolls to menu
	*/
	
	addScrolls : function() {
		this.scrolls = new UI.MenuScroller({
			skin			: this.options.skin,
			element			: this.element,
			content 		: this.content,
			margin			: this.options.scrollMargin,
			props	: this.props,
			onScroll 		: function(){
				this.removeSubmenu();
				this.removeRollover();
			}.bind(this),		
			onResize 		: function(){
				var size = this.element.getSize();
				this.setSize(size.x, size.y);
			}.bind(this)
		});
		this.addEvent('removeScrolls', function(){
			this.scrolls.removeScrolls();
			this.removeEvents('removeScrolls');
		}.bind(this));
	},
	
	/* 
		Method: addUnderlay
		
			Add an underlay to the page, to prevent clicks and scroll on page
	 */
	
	addUnderlay: function(underlay){
		if (!this.underlay) {
			if (this.options.underlay) {
				this.underlay = this.options.underlay;
			} else {
				this.underlay = new Element('div', {
					'class' : 'menu-underlay',
					styles: {
						position: 'fixed',
						width: '100%',
						height: '100%',
						background	: '#FFF',
						opacity: 0.000001,
						top: 0,
						left: 0,
						zIndex: this.options.zIndex-50
					},
					events : {
						'click' : function(){
							this.hide(300);
							this.removeUnderlay();
						}.bind(this),
						'contextmenu' : function(e){
							new Event(e).stop();
							this.hide();
							this.removeUnderlay();
						}.bind(this),
						'mousewheel' : function(e){
							new Event(e).stop()
						}
					}
				}).inject(document.body);
				this.removeUnderlayEvent = function(e){
					if (this.underlay) this.underlay.fireEvent('click');
					window.removeEvent('resize', this.removeUnderlayEvent);
				}.bind(this);
				window.addEvent('resize', this.removeUnderlayEvent.bindWithEvent());
			}
		}
	},
	
	/* 
		Method: removeUnderlay
		
			Remove the underlay
	 */
	
	removeUnderlay: function(){
		if (this.underlay && !this.options.underlay) {
			window.removeEvent('resize', this.removeOverlayEvent);
			this.underlay.destroy();
			delete this.underlay;
		}
		return this;
	},
	
	/* 
		Method: inject
		
			inject the menu and draw the canvas. Overwrite the inject method of UI.Element
	 */
	
	inject : function(element, target){
		this.time = $time();
		this.fireEvent('inject');
		
		this.element.inject(element, target);
		
		this.setSize();
		
		if (this.options.position != 'over') {
			this.options.target ? this.setPosition(this.options.target) : this.setPosition(element);
			this.setCanvas();
			this.setStyle('visibility', 'visible');
			this.addUnderlay();
		} else {
			this.setCanvas();
		}

		if (this.options.closeOnRollout)
		this.canvas.canvas.addEvent('mouseleave', function(){
			if (this.activeItem) this.underlay.fireEvent('click');
		}.bind(this));
		
		return this;
	},
	
	/* 
		Method: show
		
			Show the menu
	 */
	
	show : function(parent, x, y) {
		this.time = $time();
		this.element.setStyle('display', 'block');
		
		this.setPosition(parent);
		this.setSize(x, y);
		this.parent();
		this.addUnderlay();
		return this;
	},
	
	/* 
		Method: hide
		
			Remove the submenu and clean the dom
	 */
	
	hide: function(duration){
		
		if (!$defined(duration)) duration = this.props.hideFxDuration;
		
		this.fireEvent('hide');
		this.removeSubmenu();
			
		if (!duration) {
			this.setStyle('display', 'none');
			this.removeRollover();
			this.fireEvent('removeScrolls');
		} else {
			new Fx.Tween(this.element, {
				duration: duration,
				onComplete: function(){
					this.setStyle('display', 'none');
					this.removeRollover();
					this.fireEvent('removeScrolls');
				}.bind(this)
			}).start('opacity', 0);
		}
		
	
		
		return this;
	},
	
	/* 
		Method: empty
		
			Empty the menu content
	 */
	
	empty: function(){
		this.content.empty();
	}
});