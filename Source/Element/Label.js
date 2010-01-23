/*
---
description: UI.Label is used to make text element with css skin

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI.Canvas]
 
...
*/
/*
	Class: UI.Label
		UI.Label is used to make text element with css skin
	
	Extends:
		<UI.Element>
	
	Arguments:
		options
		
	Options:
		- tag - (string) element tag, by default 'span'
		- html - (string) label text, by default Label
		- emboss - (boolean) duplicate the text to create an emboss effect
		- selectable - (boolean) Define if the text is selectable or not
	
	Returns:
		Image element
		
	Example:
		(start code)
		var label = new UI.Label({
			html	: 'Hello world!',
		}).inject(this.element);
		(end)
	
	Implied global: 
		- MooLego - UI
		- MooTools - $merge, Class, Element
	
	Members:
		Element, Extends, Label, bind, build, buildImage, component, 
	    components, element, emboss, events, fireEvent, html, image, inject, 
	    load, options, parent, props, selectable, src, tag
	
	Discussion:
	
*/

UI.Label = new Class({
	
	Extends: UI.Element,
		
	options: {
		component: 'label',
		tag: 'span',
		html: 'Label',
		emboss: false,
		selectable: false
	},
	/* 
	Method: build
		private method
	 
	Make a  Label and set the fade Fx
	 
	 Return:
	 (void)
	 
	 See also:
	 <UI.Element::build>
	 */	
	build: function(){
		this.parent();
		if (this.options.image) {
			this.buildImage();
		}
	},
	/* 
	Method: buildImage
	 	private method
	 
		Define image props form element
	 
	Return:
	 	(void)
	*/		
	buildImage: function(){
		this.image = new Element('img', $merge(
			this.props.components.image,
			{
				src : this.options.image,
				events : {
					load : this.fireEvent.bind(this, 'onImageLoad')	
				}
			}
		)).inject(this.element, 'top');
	}
});