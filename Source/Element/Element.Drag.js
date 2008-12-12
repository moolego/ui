/*
Class: UI.Element.Drag
	Add draggable capabilities for the element.
*/


UI.Element.implement({
	/*
		Function: enableDrag
			Add draggable capabilities for the element.
	*/
	enableDrag :function() {
		
		if (this.dragHandlers.length == 0) {
			this.dragHandlers = null;
		}
		
		this.dragHandler = new Drag(this.element, {
			handle 		: this.dragHandlers,
			limit 		: { x: this.options.dragLimitX, y: this.options.dragLimitY },
			
			onStart 	: this.fireEvent.bind(this, 'onDragStart'),
			onDrag 		: this.fireEvent.bind(this, 'onDrag'),
			onComplete 	: this.fireEvent.bind(this, 'onDragComplete')
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
		if (this.dragHandler) this.dragHandler.stop();
		return this;
	}
});	