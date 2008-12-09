/*
	Class: UI.Label
		UI.Label is used to make text element with css skin
	
	Extends:
		<UI.Element>
	
	Arguments:
		options
		
	Options:
		tag - (string) element tag, by default 'span'
		html - (string) label text, by default Label
		emboss - (boolean) duplicate the text to create an emboss effect
		selectable - (boolean) Define if the text is selectable or not
	
	Returns:
		Label element
		
	Example:
		(start code)
		var label = new UI.Label({
			html	: 'Hello world!',
		}).inject(this.element);
		(end)
	
	Discussion:
	
*/

UI.Label = new Class({
	Extends					: UI.Element,
		
	options: {
		component			: 'label',
		
		tag					: 'span',
		html				: 'Label',
		
		emboss				: false,
		
		selectable			: false
	},

	/* 
	Function: build
		private function
		
		Call UI.Element build
	
	See also:
		<UI.Element::build>
	*/
	
	build: function(options){
		this.parent(options);
		/*
		if (this.options.emboss) {
			this.addEvent('injected', function(){
				this.emboss = this.element.clone().inject(this.element, 'top');
				if (this.props.components && this.props.components.emboss.styles) {
					this.emboss.setStyles(this.props.components.emboss.styles);
				}
			});
		}
		*/
	}
});