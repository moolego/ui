/*

Class: UI.Panel
	Build UI.Window component.

Require:
	UI/Container/Vertical.js
	UI/Canvas/Canvas.js
	UI/Canvas/CanvasWindow.js

Arguments:
	className - (string) css class apply to the wrapper - default 'ui-win'.
	title - (string) title dissplayed in the header titlebar.
	type - ('default''modal') define the type of the panel.
	position - ('custom','center','cascade')  override top and left options if defined - default to custom.
	width - (number) Width of the container wrapper in px.
	height - (number) Height  of the container wrapper in px.
	top	- (number) Height  of the container wrapper in px.
	left - (number) Height  of the container wrapper in px.
	state - ('normalized','maximized','normalized') Define the initial state - default to normalized.
	useEffects - (boolean) Define if effects should be implemented.
	resizable - (boolean) Define if the panel is resizable.
	draggable - (boolean) Define if the panel is draggable.
	shadow -	(boolean) Define if the panel should use a shadow.
	scrollbar - (boolean) Define if the container should use scrollbar.
	register - (bollean) Define if the panel should be handle by the panel manager.
	status - (bollean) Define if the panel should use a statusbar.
	url	- (string) Define the url from the panel content.

Example:
	(start code)
	var win = new UI.panel({
		width 	: 260,
		height	: 400,
		title	: 'bonjour'
	});
	(end)
*/

UI.Panel = new Class({
	Extends						: UI.Window,
	options						: {
		component				: 'panel',
		
		title					: 'Panel',

		// Size options
		width					: 300,
		height					: 480,
		
		// see UI.VIew.setContent() for information about loading window's content.
		url						: false,

		// location options
		location				: 'cascade',
		top						: 0,
		left					: 0,	
		zIndex					: 'auto',   // to get zIndex from themanager or an Int as zIndex
		
		tag						: 'div',
		
		// Components Options
		head					: true,
		controls				: ['close'],

		foot					: false,
	
		// Not Implemented should be able to enable/disable effects
		useEffects				: false,
		
		// Drag options
		draggable				: true,
		dragLimitX				: [-1000, window.getWidth() + 1000],
		dragLimitY				: [53, window.getHeight() + 1000],
		
		// Resize options
		resizable				: false,
		resizeLimitX			: [200, window.getWidth()],
		resizeLimitY			: [200, window.getHeight()],
		
		// Main View Options
		viewOverflow			: 'hide',
		viewBackgroundColor		: '#fff',
		
		// Implemented events
		onResize			: $empty,
		onMinimize			: $empty,
		onMaximize			: $empty,
		onRestore			: $empty,
		onLoad				: $empty,
		onBlur				: $empty,
		onFocus				: $empty,
		onClose				: $empty
	},

/*
    Function: initialize
   
    	Constructor

*/
	
	initialize: function(options) {
		this.parent(options);
	},

/*
    Function: build

      Creates html structure and inject it to the dom. The panel is based on the UI.Container Class.

*/
	
	build: function() {
		this.parent();
	},


/*
    Function: updateInnerSize

      Update size of the window inner components

*/

	updateInnerSize : function() {
		var wrapper = this.frame.getSize();
		var bs = this.options.borderSize;
		var borderOffset = bs*2

		var offsetHeight = 0;
		if (this.options.useHead) { offsetHeight = offsetHeight + this.options.styles.head.height; }
		if (this.options.useFoot) { offsetHeight = offsetHeight + this.options.styles.foot.height; }
		
		var bodyHeight = wrapper.y - offsetHeight;
		
		if (this.options.useHead) {
			this.head.setStyles({
				width: wrapper.x - borderOffset
			});
		}
		
		this.view.wrapper.setStyles({ width	: wrapper.x - borderOffset,	height	: bodyHeight -  borderOffset });
		
		if (this.options.useFoot) {
			this.foot.setStyles({
				bottom: bs,
				width: wrapper.x - borderOffset
			});
		}
		
		this.drawCanvas();
		
		//this.view.updateSize();
	}
});



