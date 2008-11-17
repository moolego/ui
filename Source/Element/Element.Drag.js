UI.Element.implement({
	/*
		Function: enableDrag
			Add draggable capabilities for the element.
	*/
	enableDrag :function() {
		
		if (this.dragHandlers.length == 0) {
			this.dragHandlers = null;
		}
		
		this.dragHandler = this.element.makeDraggable({
			handle 		: this.dragHandlers,
			limit 		: { x: this.options.dragLimitX, y: this.options.dragLimitY },
			
			onStart 	: function() { this.fireEvent("onDragStart"); }.bind(this),
			onDrag 		: function() { this.fireEvent('onDrag'); }.bind(this),
			onComplete 	: function() { this.fireEvent('onDragComplete'); }.bind(this)
		});
		
		this.addEvents({
			onDragComplete 	: this.adaptLocation.bind(this)
		});
		
		return this;
	},	

	/*
	  	Function: enableDrag
			Remove draggable capabilities for the element.
	*/
		
	disableDrag	: function() {
		if (this.options.draggable)  {
			this.dragHandler.detach();
		};
		
		return this;
	}
});	