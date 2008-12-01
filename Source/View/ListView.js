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

UI.View = new Class({
	Extends					: UI.Element,
		
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

	// expendTemplate

	expandTemplate : function (template, target, data) {
	    var template = $(template);
	    var target = $(target);
	    target.empty();
	    template.getChildren().each(function(item) {
	        target.adopt(item.clone());
	    });
	    fillTemplate(target, data);
	},
	
	tmpl : function (template, target, url, options) {
	    var template = $(template);
	    var target = $(target);
	    var ajax = new Ajax(url, {
	        onSuccess:function() {
	            var res = Json.evaluate(this.response.text);
	            expandTemplate(template, target, res);
	        }
	    });
		ajax.setOptions(options);
	    ajax.request();
	}
});

