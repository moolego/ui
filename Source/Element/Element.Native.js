/*
Script: UI.Element.Native.js
  Contains methods to work with size, scroll, or positioning of Elements and the window object.
 
License:
  MIT-style license.
 
Credits:
  - Element positioning based on the [qooxdoo](http://qooxdoo.org/) code and smart browser fixes, [LGPL License](http://www.gnu.org/licenses/lgpl.html).
  - Viewport dimensions based on [YUI](http://developer.yahoo.com/yui/) code, [BSD License](http://developer.yahoo.com/yui/license.html).
*/
 
UI.Element.implement({

		
	/*
    reImpelement some Native Mootools Element needed methods
	*/
	
	
	/*
    Function: show
    
    	Set display block to the view element
	*/
	
	show: function() {
		this.fireEvent('show');
		this.element.setStyle('opacity', 1);
		this.element.show();
		return this;
	},

	/*
    Function: hide
    
    	Set display none to the view element

	*/
	
	hide: function() {
		this.element.hide();
		
		return this;
	},

	/*
	 * Function: setStyle
	 * 	implement setStyle from de wrappwr
	 */
	
	setStyle: function(style, value) {
		this.element.setStyle(style, value);
		
		return this;	
	},

	/*
	 * Function: setStyles
	 * 	implement setStyles from element
	 */
	
	setStyles: function(styles) {
		this.element.setStyles(styles);
		
		return this;	
	},
	
	/*
	 * Function: setStyles
	 * 	implement setStyles from element
	 */
	
	getStyle: function(style) {
		return this.element.getStyle(style);;	
	},
	
	/*
	 * Function: addClass
	 * 	implement addClass from de wrapper
	 */
	
	addClass: function(className) {
		this.element.addClass(className);
		
		return this;	
	},
	
	/*
	 * Function: addEvent
	 * 	implement addEvent from de wrapper
	 */
	
	addEvent: function(event, action) {
		this.element.addEvent(event, action);
		return this;	
	},
	
	/*
	 * Function: addEvents
	 * 	implement addEvents from de wrapper
	 */
	
	addEvents: function(events) {
		this.element.addEvents(events);
		
		return this;	
	},
	
	/*
	 * Function: addClass
	 * 	implement element set method
	 */
	
	set: function(property, value) {
		this.element.set(property, value);
		return this;	
	},
	
	/*
	 * Function: get
	 * 	implement element get method
	 */
	
	get: function(property) {
		return this.element.get(property);	
	},
	
	/*
	 * Function: getSize
	 * 	implement element getSize method
	 */
	
	getSize: function() {
		return this.element.getSize();	
	},
	
	/*
	 * Function: getCoordinates
	 * 	implement element getCoordinates method
	 */
	
	getCoordinates: function(ref) {
		return this.element.getCoordinates(ref);
	},


	/*
    Function: inject
    
    	Inject the element element into container
    	
    Argument: 
    
    	View Container

	*/
	
	inject: function (container, position){
		this.fireEvent('inject');
		
		this.element.inject(container, position);
		this.element.setStyle('visibility', 'visible');
		this.setSize();
		this.setCanvas();
		this.controller.register(this);
		return this;
	},
	
		/*
    Function: destroy
    
    	Destroy the view element

	*/

	destroy: function() {
		/*
		//we get inner element
		if (this.element.elements) {
			//get component
			this.element.elements.each(function(component){
				component.each(function(elementClass){
					console.log('destroy : ' + elementClass.options.component);
					elementClass.destroy();
					delete elementClass;
				});
			});
		}
		*/
		
		this.element.destroy();

		return;
	}

});

/*
Script: Extension.Element.js
        Extends the Element class with some needed methods.

License: MIT
        
*/

Element.implement({
	disableSelect :function(){
		if (typeof this.onselectstart!="undefined")	this.onselectstart = function(){ return false }
		 else if (typeof this.style.MozUserSelect!="undefined") this.style.MozUserSelect="none"
		 else this.onmousedown = function() { return true }

		this.style.cursor = "default" 
	},
	
	enableSelect : function(){

		if (this.onselectstart)	this.onselectstart = "" // for the badboy
		 else if ($type(this.style.MozUserSelect)=="none") this.style.MozUserSelect="" // for Firefox 
		 else this.onmousedown = function() { return false } //finaly the others (opera, not sure for safari)

		this.style.cursor = "default" 
	}
});

/*
Script: Element.Shortcuts.js
	Extends the Element native object to include some shortcut methods.

License:
	http://clientside.cnet.com/wiki/cnet-libraries#license
*/

Element.implement({
	isVisible: function() {
		return this.getStyle('display') != 'none';
	},
	toggle: function() {
		return this[this.isVisible() ? 'hide' : 'show']();
	},
	hide: function() {
		var d;
		try {
			//IE fails here if the element is not in the dom
			d = this.getStyle('display');
		} catch(e){}
		this.store('originalDisplay', d||'block'); 
		this.setStyle('display','none');
		return this;
	},
	show: function(display) {
		original = this.retrieve('originalDisplay')?this.retrieve('originalDisplay'):this.get('originalDisplay');
		this.setStyle('display',(display || original || 'block'));
		return this;
	},
	swapClass: function(remove, add) {
		return this.removeClass(remove).addClass(add);
	}
});

Element.implement({
	log: function(text, args) {
		if (window.console) console.log(text.substitute(args || {}));
	}
});