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
		
		this.tmpl(this.options.template, this.options.url);
		
	},

	tmpl : function (template, url, options) {
	    var template = $(template);
	    new Request.JSON({
	        onComplete:function() {
	            var res = Json.evaluate(this.response.text);
	            this.expandTemplate(template,res);
	        }.bind(this)
	    }).get();
	},


	// expendTemplate

	expandTemplate : function (template, data) {
	    var template = $(template);
	    var target = $(target);
	    target.empty();
	    template.getChildren().each(function(item) {
	        target.adopt(item.clone());
	    });
	    this.process(target, data);
	},
	
	/*
	Function: process
		Used internally. Process the template and inject in view content. Should always be invoced on a copy.
	
	Arguments:
		target - location of the template to be filled
		data - data to be used during template interpolation
	*/
	
	process : function (target, data) {
		var target = this.element;
		
		for(var key in data) {
			var tmpEls = target.getElements('.' + key);
			var obj = data[key];
			
			if ($type(obj) == 'object') {
				// descend
				this.process(tmpEls[0], obj);
			} else
				if ($type(obj) == 'array') {
					// clone array of 'el'
					for(var i=0;i<obj.length;i++) {
						var tmpEl = tmpEls[i%tmpEls.length];
						var a = tmpEl.clone(true);
						tmpEl.getParent().adopt(a);
						if (($type(obj[i]) == 'array') || ($type(obj[i]) == 'object')) {
							this.process(a, obj[i]);
						} else {
							a.setText(obj[i]);
						}
					}
					tmpEls.each(function(el) {el.remove(); });
			} else {
				// set text of el to obj
				tmpEls[0].setText(obj);
			}
		}
	}
});

