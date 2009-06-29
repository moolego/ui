
/*
Class: UI.Dialog
	The UI.Dialog class defines objects that manage and coordinate the dialog an application displays on the screen.

Arguments
	options

Options:
		width
		height

Example:
	(start code)
	var dialog = new UI.Dialog({
		width': 		'260',
		height': 		'400',
	});
	(end)

Discussion:
	Still we need this class?
*/

UI.Dialog = new Class({
	Extends		:	UI.Window,
	
	options: {
		center: true,
		title: 'Dialog' ,
		// Size options
		width: 480,
		height: 200,
		
		// Components Options
		head: true,
		controls: ['close'],
		view: {},
		foot: false,
		message : 'message',
		location: 'center',
		scrollbar: false,
		
		resizable: false,
		
		buttons: []
	},
	
	
	build:function(){
		console.log('build dialog');
		this.buildUnderlay();
		
		this.parent();
		this.element.setStyle('zIndex','1000')
		
		this.buildMessage();
		this.buildButtons();
		
	},
	
	buildUnderlay: function() {
		console.log('buildunderlay');
		this.underlay = new Element('div',{
			styles: {
				position: 'absolute',
				top:'0',
				left:'0',
				width: '100%',
				height: '100%',
				opacity: '.2',
				backgroundColor: '#000',
				zIndex: '999'
			}
		}).inject($(document.body));
		
		this.addEvent('onClose',function(){ this.underlay.destroy() })
		
	},
	
	buildMessage: function() {
		this.message = new Element('div')
		.setStyles({
			padding:'20px'
			
		}).set('html',this.options.message)
		.inject(this.content);
		
	},
	
	buildButtons: function() {
		
		this.buttons = new Element('div',this.props.components.controls)
		
		this.options.buttons.each(function(action){
			this.props.components.control.type = action;

			var button = new UI.Button(this.props.components.control)
			.addEvent('onClick', this.control.bind(this, action))
			.inject(this.controls);	

		},this);
	}
});