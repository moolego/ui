/*
	Class: UI.Box
		UI.Box is used to make a skinnable container
	
	Arguments:
		options
		
	Options:
		- tag - (string) element tag, by default 'span'
		- html - (string) label text, by default Label
	
	Returns:
		Box element
		
	Example:
		(start code)
		var box = new UI.Box({
			html	: 'Hello world!',
		}).inject(this.element);
		(end)

	Implied global:
		- MooLego - UI
		- MooTools - Class
		
	Members:
		Box, Element, Extends, build, component, emboss, html, options, 
    	parent, selectable, tag
    
    Discussion:
	
*/

UI.Box = new Class({
	Extends: UI.Element,
		
	options: {
		component: 'box',
		title: 'box'
	},

	/* 
	Function: build
		private function
		
		Call UI.Element build
	*/
	
	build: function(options){
		this.parent(options);
		
		this.title = new UI.Label(this.props.components.title)
		 .inject(this.head);
		
	}
	
});