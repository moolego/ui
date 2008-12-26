/*
Class: UI.Textarea
		Create a skinnable textarea element
	
	Extends:
		<UI.Control>
	
	Arguments:
		options
	
	Options: 
		name - (string) name of hidden input
		value - (string) value to set on initialize
	
	Example:
		(start code)
			var textarea = new UI.Textarea({
				name : 'myTextarea',
				value : 'Hello world!'
			}).inject(document.body);
		(end)
*/

UI.Textarea = new Class({
	Extends				: UI.Control,
	
	options				: {
		component		: 'textarea',
		
		// default options
		name			: 'ui-input',
		value			: ''
	},
	
	/* 
	Function: build
		private function
		
		Call <UI.Control::build> and make a textarea element
		
	Return:
		(void)
	
	See also:
		<UI.Control::build>
		<UI.Element::build>
	*/
	
	build : function(){
		//create a new div as input element
		this.parent();
				
		//create input
		this.setInput(false, 'textarea');
		this.input.set({
			styles : {
				width		: this.props.width - this.input.getStyle('paddingLeft').toInt() - this.input.getStyle('paddingRight').toInt(),
				height		: this.props.height - this.input.getStyle('paddingTop').toInt() - this.input.getStyle('paddingBottom').toInt(),
				overflow	: 'hidden',
				margin: 0
			}
		});
	},
	
	/* 
		Method: setState
			Set the button state
		
		Arguments:
			state - (string)
			
		Return:
			(void)
		
		See als0:
			<UI.Element::setState>
	*/
	
	setState : function(state){
		this.parent(state);
		return this;
	},
	
	/* 
		Method: setBehavior
			private function
		
			Set behavior
		
		Return:
			(void)
		
		See also:
			<UI.Control::setBehavior>
			<UI.Element::setBehavior>
	*/
	
	setBehavior : function() {
		this.parent();
		this.addEvents({
			blur	: this.setState.bind(this, 'default'),
			focus	: this.setState.bind(this, 'focus')
		});
	}
});