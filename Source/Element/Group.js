/*
	Class: UI.Group
		UI.Box is used to make a skinnable container
	
	Arguments:
		options
		
	Options:
		tag - (string) element tag, by default 'span'
		html - (string) label text, by default Label
	
	Returns:
		Box element
		
	Example:
		(start code)
		var box = new UI.Box({
			html	: 'Hello world!',
		}).inject(this.element);
		(end)
	
	Discussion:
	
*/

UI.Group = new Class({
	
	Extends: UI.Element,
		
	options: {
		component: 'group',
		
		tag: 'div',
		html: 'group',
		
		emboss: false,
		
		selectable: false
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