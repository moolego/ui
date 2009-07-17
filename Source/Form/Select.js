/*
	Class: UI.Select
		Create <select> like element
	
	Extends:
		<UI.Control>
		
	Require:
		<UI.Control>
		<UI.Menu>
		<UI.Menu.Scroller>
	
	Arguments:
			options
			
	Options: 
		scrollToSelected - (boolean) Set to true if you want the menu position remember last position when you reopen it
		list - (object) the menu list
	
	Example:
		(start code)
		new UI.Select({
			name			: 'formular',
			list			: [{
				text		: 'Button',
				value		: 'bttn'
			},{ 
				text		: 'Checkbox',
				value		: 'ckbx'
			},{ 
				text		: 'Input',
				value		: 'inpt'
			},{ 
				text		: 'Select',
				value		: 'slct'
			},{ 
				text		: 'Slider',
				value		: 'sldr'
			},{ 
				text		: 'Textarea',
				value		: 'txtr'
			}]
		}).inject(this.content);
		(end)
*/


UI.Select = new Class({

	Extends: UI.Control,
	
	options: {
		component: 'select',
		
		scrollToSelected: true,
		list: {}
	},
	
	/* 
	Function: build
		private function
		
		Call UI.Element build, then create a hidden input , a textLabel and create a menu
	
	Returns:
		(void)
	
	See also:
		<UI.Control::build>
		<UI.Element::build>
	*/
	
	build: function(){
		//Create new div as button element
		this.parent();
		this.setInput();
		this.addMenuActions(this.options.list);
		
		// Create a menu
		this.menu = new UI.Menu({
			width: this.options.width,
			skin: this.options.skin,
			position: 'over',
			target: this.element,
			menu: this.options.list,
			scrollToSelected: this.options.scrollToSelected
		}).inject(document.body);
		
		// Create a label for the selected item
		var width = this.menu.content.getFirst().getSize().x;
		width -=  this.menu.content.getFirst().getStyle('paddingRight').toInt();
		width -=  this.menu.content.getFirst().getStyle('paddingLeft').toInt();
		this.menu.setStyle('display', 'none');
		
		this.label = new UI.Label({
			width: width,
			skin: this.options.skin,
			styles: this.props.components.label.styles,
			html: this.options.list[0].text
		}).inject(this.element);
	},

	/*
		Method: setBehavior
			private function
			
			Add events on element
		
		Return:
			(void)
		
		See also:
			<UI.Control::setBehavior>
			<UI.Element::setBehavior>
	*/

	setBehavior: function(){
		this.parent();

		//we add events on select
		this.element.addEvents({
			mousedown: function(e){
				ui.controller.element.closeMenu();
				this.menu.show(this.element);
				new Event(e).stop();
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
	

	addMenuActions: function(list){
		list.each(function(el){
			if (!el.menu && el.text != 'separator') {
				el.action = function(){
					this.input.value = (el.value) ? el.value : el.text;
					this.label.set('html', el.text);
				}.bind(this);
			} else if (el.menu) {
				this.addMenuActions(el.menu);
			}
		}, this)
	}
	
});
