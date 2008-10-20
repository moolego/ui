/*
Class: UI.Label
	UI.Text is used to make text element with css skin
*/

UI.Label = new Class({
	Extends					: UI.Element,
	Implements				: [Events, Options],
		
	options: {
		component			: 'label',
		
		elementTag			: 'span',
		html				: 'Label',
		
		selectable			: false
	},

	/* 
		Method: initialize
		
			Construtor
	 */
	
	build: function(options){
		this.parent(options);
	}
});