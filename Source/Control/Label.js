/*
Class: UI.Label
	UI.Text is used to make text element with css skin
*/

UI.Label = new Class({
	Extends					: UI.Element,
	Implements				: [Events, Options],
		
	options: {
		component			: 'label',
		
		tag					: 'span',
		html				: 'Label',
		
		emboss				: true,
		
		selectable			: false
	},

	/* 
		Method: initialize
		
			Construtor
	 */
	
	build: function(options){
		this.parent(options);
		/*
		if(this.options.emboss) {
			this.emboss = this.element.clone().inject(this.element,'top');
			if (this.props.components && this.props.components.emboss.styles) {
				this.emboss.setStyles(this.props.components.emboss.styles);
			}
		}
		*/
		
	}
});