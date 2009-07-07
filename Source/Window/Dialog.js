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
		Still we need this class? yes
	
	Implied global: 
		$ - 79 
		Class - 25
		Element - 68 86 97
		UI - 25 26 102
		console - 51 65
		document - 79
	
	Members 
		Button, Dialog, Extends, Window, addEvent, backgroundColor, 
	    bind, body, build, buildButtons, buildMessage, buildUnderlay, buttons, 
	    center, components, content, control, controls, destroy, each, element, 
	    foot, head, height, inject, left, location, log, message, opacity, 
	    options, padding, parent, position, props, resizable, scrollbar, set, 
	    setStyle, setStyles, styles, title, top, type, underlay, view, width, 
	    zIndex
	
*/

UI.Dialog = new Class({
	Extends		:	UI.Window,
	
	options: {
		center: true,
		title: 'Dialog',
		
		// Default size
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
		
		// should be handle by the conroller!
		this.element.setStyle('zIndex','1000');
		
		this.buildMessage();
		this.buildButtons();
		
	},
	
	buildUnderlay: function() {
		console.log('buildunderlay');
		
		// and that by the skin!		
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
		
		this.addEvent('onClose',function(){ this.underlay.destroy(); });
		
	},
	
	buildMessage: function() {
		this.message = new Element('div')
		.setStyles({
			padding:'20px'
			
		}).set('html',this.options.message)
		.inject(this.content);
		
	},
	
	buildButtons: function() {
		
		this.buttons = new Element('div',this.props.components.controls);
		
		this.options.buttons.each(function(action){
			this.props.components.control.type = action;

			var button = new UI.Button(this.props.components.control)
			.addEvent('onClick', this.control.bind(this, action))
			.inject(this.controls);	

		},this);
	}
});