/*
Class: UI.Element.Resize
	Add resizable capabilities for the element.
*/

UI.Element.implement({
	
	/*
    Function: enableResize
    	Add resizable capabilities for the element.
	*/
	
	enableResize : function() {
		this.element.makeResizable({
			handle			: this.resize,
			limit			: { 
				x			: this.options.resizeLimitX,
				y			: this.options.resizeLimitX 
			},
			onStart 		: function() { this.fireEvent('onResizeStart'); }.bind(this),
			onDrag 			: function() { this.fireEvent('onResizeDrag'); }.bind(this),
			onComplete		: function() { this.fireEvent("onResizeComplete"); }.bind(this)
		});
		
		this.addEvents({
			onResizeDrag 	: function(){
				this.setSize(this.element.getSize().x,this.element.getSize().y);
			}
		});
		
		return this;
	}
});