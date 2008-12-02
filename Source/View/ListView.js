/*
Class: UI.ListView
	The UI.ListView class defines objects that manage the list.

Require:
	UI.Canvas
	UI.Skin
	UI.Element
	UI.View
	UI.ScrollBar
	
Arguments:
	options
	
Options:
	className - (String) css class apply to the wrapper
	width - (number) Width of the view wrapper in px
	height - (number) Height  of the view wrapper in px
	overflow - (collection) hidden, scrollbar or menu
	contentTag - (string) define the tag to use for the content view
	wrapperTag - (string) define the tag to use for the content view
	wrapper - (object) wrapper element properties
	content - (object) content element properties (in case of) 
	addClass - (string) additionnal class
	useCanvas - (boolean) false

Returns:
	View object.
	
Example:
	(start code)
	var listview = new UI.ListView({
		width			: 260,
		height			: 400,
		scroll			: true 
	}).setContent('content','content view');
	(end)

Discussion:
	
*/

UI.ListView = new Class({
	Extends					: UI.View,
		
	options: {
		component			: 'listview',
		
		width				: '100%',
		height				: '100%',

		overflow			: 'scrollbar',		// hide, scrollbar or scrollmenu

		tag					: 'div',
		contentTag			: 'div',			// 

		content				: {},

		// implemented events		
		onLoadComplete		: $empty
	},

	build : function() {
		this.parent();
		this.tmpl(this.options.url);
	},

	tmpl : function ( url, options) {
	   new Request.JSON({
			url : url,
	        onComplete:function(response) {
				this.process(response);
	        }.bind(this)
	    }).get();
	},


	/*
	Function: process
		Used internally. Process the template and inject in view content. Should always be invoced on a copy.
	
	Arguments:
		data - data to be used during template interpolation
	*/
	
	process : function(data){
		data.each(function(element){
			var item = new UI.Element({
				type: element.type || 'default',
			}).inject(this.content);
			
			$H(element).erase('type').each(function(el){
				new UI.Element({
					html : el
				}).inject(item.element);
			}, this)
		}, this);
	}
});