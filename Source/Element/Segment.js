/*
	Class: UI.Segment
		Allows to group elements visually (buttons for example)
	
	Arguments:
		options
		
	Options:
		- tag - (string) element tag, by default 'span'
		- html - (string) label text, by default Label
	
	Returns:
		Segement element
		
	Example:
		(start code)
		var segment = new UI.Segment({
			html: 'group of buttons',
		}).inject(this.element);
		(end)
	
	Implied global: 
		- MooLego - UI
		- MooTools - Class
	
	Discussion will may act like a minimal controller for inner elements managing way of they will be display
	or maybe the element controller will take care of that using the group properties
		
*/

UI.Segment = new Class({
	
	Extends: UI.Element,
		
	options: {
		component: 'segment'
	},

	/* 
	Function: build
		private function
		
		Call UI.Element build
	*/
	
	build: function(options){
		this.parent(options);
	}
});
