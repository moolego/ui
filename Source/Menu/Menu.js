 /*
	Class: UI.Menu
		Creates a new menu, manages submenus and positionning as well as scrolling thru <UI.Menu.Scroller>
		
	Extends:
		<UI.Element>
	
	Arguments:
		options
			
	Options: 
		zIndex - (integer) Base z-index for menu element (submenu's z-index will be incremented)
		contentTag - (string) Tag name for menu elements wrapper
		itemTag - (string) Tag name for menu elements
		
		position - (string) Specify where the new menu must be positionned.
			It could be normal (element will be positionned on parent's side),
			over (element will be positionned over the parent element, used for <UI.Select>),
			bottom (element will be positionned on bottom of parent element, used for <UI.Toolbar>)
		
		scrollToSelected - (boolean) Determine if a menu (specifically a <UI.Select>) should remember last item selected
		scrollMargin - (integer) Determine remaining margin on top and bottom when a menu is too large to feet in window
		menu - (array) Array containing menu definition
		
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
		rolloverType		: 'menuRollover',

		zIndex				: 3000,
		contentTag			: 'div',
		itemTag				: 'div',

		position			: 'normal',
		scrollToSelected	: false,
		scrollMargin		: 20,
		menu				: []
	},

	/*
	Function: build
		private function
		
		Call UI.Element build, then create a menu wrapper
	
	Return:
		(void)
	
	See also:
		<UI.Element::build>
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
		
		this.buildMenu();
		
		this.element.setStyles({
			zIndex	: this.options.zIndex
		});
	},
	
	setBehavior : function(){
		this.parent();
		if (!this.options.closeMenu) {
			this.addEvent('onCloseMenu', function(){
				this.hide(300);
				//ui.controller.closeMenu = $empty;
			}.bind(this));
		} else 
			this.addEvent('onCloseMenu', function(){
				this.options.closeMenu();
			}.bind(this));
	},
	
	/* 
	Method: buildMenu
		Build the content of the menu or change menu content
	
	Arguments:
		menu - (array) Array containing menu definition
	
	Return:
		this
	 */
	
	buildMenu : function(menu) {
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
				//console.log(UI.skin.getComponentProps(this.skin, 'menuItem'), this.skin);
				var menuItem = new UI.Label({
					skin		: this.options.skin,
					tag			: this.options.itemTag,
					html		: item.text,
					props		: UI.skin.getComponentProps(this.skin, 'menuItem'),
					image 		: item.image
				}).set(item.options);
				
				if (item.action) menuItem.element.addEvent('action', item.action);
				menuItem.inject(this.content);
			}
			this.addSubmenuEvents(item, menuItem);
		},this);
		ui.controller.closeMenu = this.fireEvent.bind(this, 'closeMenu');
		return this;
	},
	
	/* 
	Method: addSubmenuEvents
		private function
	
		Attach actions and / or submenu to menu elements
	
	Arguments:
		item - (object) Object containing element properties
		menuItem - (element) Menu item where events will be attached
	
	Return:
		(void)
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
			'mousedown' : function(e){
				new Event(e).stop();
				if (!menuItem.separator) this.fireEvent('change');
			}.bind(this)
		});
	},
	
	/* 
	Method: addSubmenu
		private function
		
		Attach a submenu to a menu item if needed
	
	Arguments:
		item - (object) Object containing element properties
		menuItem - (element) Menu item where submenu will be attached
	
	Return:
		(void)
	 */
	
	addSubmenu : function(item, menuItem, position) {
		this.menuWithAction = false;
		$clear(this.menuActionDelay);
		ui.controller.closeMenu = this.fireEvent.bind(this, 'closeMenu');
		this.menuActionDelay = (function(){
			if (!menuItem.submenu) {
				menuItem.submenu = new UI.Menu({
					skin			: this.options.skin,
					target			: menuItem,
					closeMenu		: function(){
						this.fireEvent('closeMenu');
					}.bind(this),
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
				menuItem.submenu.show(menuItem);
			}
		}.bind(this)).delay(this.props.showDelay);
	},
	
	/* 
	Method: addSubmenuArrow
		private function
		
		Add an arrow on the right side of the element
	
	Arguments:
		menuItem - (element) Menu item where arrow will be attached
	
	Return:
		(void)
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
		private function
		
		Execute the menu item action and close the menu (as well as submenu if needed)
	
	Arguments:
		menuItem - (element) Menu item with attached action to fire
	
	Return:
		(void)
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
					this.fireEvent('closeMenu');
					menuItem.element.fireEvent('action');
				}.bind(this)
			}).start('opacity', 0, 1);
		}
	},
	
	/* 
	Method: setRollover
		private function
		
		Create a new rollover element in menu if it doesn't exist
	
	Return:
		(void)
	 */
	
	setRollover : function(){
		if (this.rollover) return;
		this.rollover = new UI.Element({
			skin			: this.options.skin,
			type			: this.options.rolloverType,
			styles			: {
				position 	: 'absolute',
				zIndex 		: 1
			}
		}).inject(this.element);
	},
	
	/* 
	Method: moveRollover
		private function
		
		Move the rollover to a new location (menu item)
	
	Arguments:
		menuItem - (element) Rollover will be moved to this menu item position
	
	Return:
		(void)
	 */
	
	moveRollover : function(menuItem){
		var coord = menuItem.getCoordinates(this.element);
		 this.setRollover();
		
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
		private function
	
		Remove the rollover from menu and destroy it
	
	Return:
		(void)
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
		private function
	
		Remove the current submenu as well as submenus if needed
	
	Return:
		(void)
	 */
	
	removeSubmenu : function(){
		if(this.activeItem && this.activeItem.submenu) {
			this.activeItem.element.fireEvent('defaultArrow');
			this.activeItem.submenu.hide(this.props.hideFxDuration);
		}
	},
	
	/* 
	Method: setPosition
		private function
		
		Set the menu position relatively to parent element. Parent could be a menu element or any dom element
	
	Arguments:
		el - (element) Parent element who will define menu position
	
	Return:
		(void)
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
    	private function

		Set corners radius for canvas draw
	
	Return:
		(void)
	  
	Discussion:
		is really needed anymore?
	*/
	
	setCorners: function(corners) {
		this.props.layers['default'].radius = corners;
	},
	
	/* 
	Method: addScrolls
		private function
	
		Add scrolls to menu
	
	Return:
		(void)
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
	Method: inject
		inject the menu and draw the canvas. Overwrite the inject method of <UI.Element>
	
	Arguments:
		element - (element) Injection target
		target - (string) Determine where to inject.
	
	Return:
		this
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
		} else {
			this.setCanvas();
		}

		if (this.options.closeOnRollout)
		this.canvas.canvas.addEvent('mouseleave', function(){
			this.fireEvent('closeMenu');
		}.bind(this));
		
		return this;
	},
	
	/* 
	Method: show
		Show the menu
	
	Arguments:
		parent - (element) Menu location will be determine relatively to this element
		x - (integer) (optional) new menu width
		y - (integer) (optional) new menu height
	
	Return:
		this
	
	See also:
		<UI.Element::show>
	 */
	
	show : function(parent, x, y) {
		this.time = $time();
		this.element.setStyle('display', 'block');
		this.setPosition(parent);
		this.setSize(x, y);
		this.parent();
		return this;
	},
	
	/* 
	Method: hide
		Hide the submenu, and clean it (remove rollover, remove scrolls, ...)
	
	Arguments:
		duration - (integer) Fade out duration, in milliseconds
	
	Return:
		this		
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
		Clear menu content
	
	Return:
		this
	 */
	
	empty: function(){
		this.content.empty();
		return this;
	}
});