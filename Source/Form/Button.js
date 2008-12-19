/*
	Class: UI.Button
		Creates button and let you attach events action
		
	Extend:
		<UI.Control>
	
	Arguments:
		options
	
	Options: 
		label - (string) Text to show in button
		submit - (boolean) Set to true if you want your button act as a submit button
	
	Example:
	(start code)
		var button = new UI.Button({
			label		: 'i am a new UI.Button',
			onClick		: { alert('click') }
		}).inject(document.body);
	(end)
*/

UI.Button = new Class({
	Extends				: UI.Control,
	
	options				: {
		component		: 'button',
		
		// default options
		label			: 'Button',
		submit			: false
	},
	
	/* 
	Function: build
		private function
		
		Create a textLabel and call parent method
	
	Returns:
		(void)
		
	See also:
		<UI.Control::build>
		<UI.Element::build>
	*/
	
	build : function(){
		this.parent();
		if(this.options.label) {
			this.label = new UI.Label({
				skin : this.options.skin,
				html : this.options.label,
				styles : this.props.components.label.styles,
				image : this.options.image,
				onImageLoad : function(){
					this.setSize();
				}.bind(this)
			}).inject(this.element);
		}
	},
	
	/* 
	Function: setState
		Set the button state
	
	Arguments:
		state - (string) State name
		
	Returns:
		(void)
	
	See also:
		<UI.Element::setState>
	*/
	
	setState : function(state){
		if (this.label && this.skin[state]) {
			this.label.setStyles(this.skin[state].components.label.styles);
		}
		this.parent(state);
	},
	
	/* 
	Function: setBehavior
		private function
		
		Set behavior relative to button (mouseenter, mousedown, mouseup, mouseleave)
	
	Returns:
		(void)
	
	See also:
		<UI.Control::setBehavior>
		<UI.Element::setBehavior>
	*/
	
	setBehavior : function() {
		this.parent();
		//we add mouse event
		this.element.addEvents({
			mouseenter	: this.setState.bind(this, 'over'),
			mousedown	: function(e) {
				this.setState('down');
				new Event(e).stop();
			}.bind(this),
			mouseleave: function(){
				this.setState(this.options.state);
			}.bind(this),	
			mouseup		: function(){
				if (this.options.submit) this.submit();
				this.setState('over');
			}.bind(this)
		});
	},
	
	/* 
	Function: submit
		Submit the form containing this button
	
	Return:
		(void)
		
	Discussion:
		As we want to remove hidden input, we must instead serialize the group of this button than submitting an unecessary form
	*/
	
	submit : function() {
		this.getForm().submit();
	}
});