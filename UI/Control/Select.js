/*
Class: UI.Select
	Create <select> like element
	
Require:
	UI/Control/Control.js
	UI/Menu/Menu.js
	UI/Shadow/Shadow.js
	UI/Scrolling/Scrolling.js
	UI/Scrolling/Scrolling.Menu.js

Arguments:
		options
		
Options: 
	options: {
		className	: 'ui-form',
		name		: 'select',
		list		: {}
	}

Return:
	a div who act as a select item
	
Example:
	(start code)
	new UI.Control.Select({
		name			: 'testselect',
		list			: [{
			text		: 'Montagne',
			value		: 'mntgn'
		},{ 
			text		: 'Plage',
			value		: 'plg'
		},{ 
			text		: 'Sport',
			value		: 'sprt'
		},{ 
			text		: 'Nuit',
			value		: 'nt'
		},{ 
			text		: 'Glace',
			value		: 'glc'
		}]
	}).inject(this.content);
	(end)

*/


UI.Select = new Class({
	Extends					: UI.Control,
	Implements				: [Events, Options],
	
	options : {
		component			: 'select',

		scrollToSelected	: true,
		list				: {}
	},
	
	/* 
		Method: initialize
		
			Construtor
	*/
	
	initialize: function(options){
		this.parent(options);
	},
	
	/* 
		Method: build
		
			Create a div and a hidden input to receive the selected value
	*/
	
	build : function(){
		//we create a new div as button element
		this.parent();
		this.setInput();
		this.addMenuActions(this.options.list);
		
		//we create a menu
		this.menu = new UI.Menu({
			width				: this.options.width,
			position 			: 'over',
			target				: this.element,
			menu				: this.options.list,
			scrollToSelected 	: this.options.scrollToSelected
		}).inject(document.body);
		
		//we create a span for text
		var width = this.menu.content.getFirst().getSize().x;
		width -=  this.menu.content.getFirst().getStyle('paddingRight').toInt();
		width -=  this.menu.content.getFirst().getStyle('paddingLeft').toInt();
		
		this.textLabel = new UI.Label({
			width	: width,
			styles	: this.skinProperties.components.label.styles,
			html	: this.options.list[0].text
		}).inject(this.element);
	},

	/*
		Method: setBehavior
		
			Set the action for each menu element
	*/

	setBehavior : function() {
		this.parent();

		//we add events on select
		this.element.addEvent('mousedown', function(e){
			this.menu.show(this.element);
		}.bind(this));
	},

	addMenuActions : function(list) {
		list.each(function(el){
			if (!el.menu && el.text != 'separator') {
				el.action = function(){
					this.input.value = (el.value) ? el.value : el.text;
					this.textLabel.set('html', el.text);
				}.bind(this);
			} else if (el.menu) {
				this.addMenuActions(el.menu);
			}
		}, this)
	}
});

