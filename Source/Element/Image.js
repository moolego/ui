/*
---
description: UI.Image is used to make a skinnable image container

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI.Image]
 
...
*/
/*
	Class: UI.Image
		UI.Image is used to make a skinnable image container
	
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
	
	Discussion:
	
*/

UI.Image = new Class({

	Extends: UI.Element,
	
	options: {
		component: 'image',
		
		tag: 'div',
		html: 'Box',
		
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