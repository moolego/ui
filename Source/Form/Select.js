/*
	Class: UI.Select
		Create <select> like element
		
	Require:
		UI/Control/Control.js
		UI/Menu/Menu.js
		UI/Menu/Scroller.js
	
	Arguments:
			options
			
	Options: 
		scrollToSelected - (boolean) Set to true if you want the menu position remember last position when you reopen it
		list - (object) the menu list
	
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
	
	options : {
		component			: 'select',

		scrollToSelected	: true,
		list				: {}
	},
	
	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	*/
	
	initialize: function(options){
		this.parent(options);
	},
	
	/* 
	Function: build
		private function
		
		Call UI.Element build, then create a hidden input , a textLabel and create a menu
	*/
	
	build : function(){
		//we create a new div as button element
		this.parent();
		this.setInput();
		this.addMenuActions(this.options.list);
		
		//we create a menu
		this.menu = new UI.Menu({
			width				: this.options.width,
			skin				: this.options.skin,
			position 			: 'over',
			target				: this.element,
			menu				: this.options.list,
			scrollToSelected 	: this.options.scrollToSelected
		}).inject(document.body);
		
		//we create a span for text
		var width = this.menu.content.getFirst().getSize().x;
		width -=  this.menu.content.getFirst().getStyle('paddingRight').toInt();
		width -=  this.menu.content.getFirst().getStyle('paddingLeft').toInt();
		this.menu.setStyle('display', 'none');
		
		this.textLabel = new UI.Label({
			width	: width,
			skin	: this.options.skin,
			styles	: this.props.components.label.styles,
			html	: this.options.list[0].text
		}).inject(this.element);
	},

	/*
		Method: setBehavior
			private function
			
			Add events on element
		
		Return:
			(void)
	*/

	setBehavior : function() {
		this.parent();

		//we add events on select
		this.element.addEvents({
			mousedown : function(e){
				this.menu.show(this.element);
			}.bind(this)
		});
	},
	
	/* 
	Function: addMenuActions
		private function
		
		Add a setValue action to menu list's entries
	
	Return:
		(void)
	*/
	

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

