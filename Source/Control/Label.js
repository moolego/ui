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
		
		emboss				: false,
		
		selectable			: false
	},

	/* 
		Method: initialize
		
			Construtor
	 */
	
	build: function(options){
		this.parent(options);
		
		if(this.options.emboss) {
			console.log('clone label'+this.element.get('html'));
			this.emboss = this.element.clone().inject(this.element,'top');
			this.emboss.setStyles(this.props.components.emboss.styles);
		}
	}
});