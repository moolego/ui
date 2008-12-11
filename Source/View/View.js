/*
Class: UI.View
	The UI.View class defines objects that manage the views use by several object like windows, menus.

Require:
	UI.Core Classes
	UI.Element Classes
	UI.ScrollBar
	
Arguments:
	options
	
Options:
	className - (String) css class apply to the wrapper
	width - (number) Width of the view wrapper in px
	height - (number) Height  of the view wrapper in px
	overflow - (collection) hidden, scrollbar or menu
	tag - (string) define the tag to use for the content view
	contentTag - (string) define the tag to use for the content view
	wrapper - (object) wrapper element properties
	content - (object) content element properties (in case of) 
	addClass - (string) additionnal class
	useCanvas - (boolean) false

Returns:
	View object.
	
Example:
	(start code)
	var view = new UI.View({
		width			: 260,
		height			: 400,
		overflow		: 'scrollbar' 
	}).setContent('content','content view');
	(end)

Discussion:
	
*/

UI.View = new Class({
	Extends					: UI.Element,
		
	options: {
		component			: 'view',
		
		width				: '100%',
		height				: '100%',

		overflow			: 'scrollbar',		// hide, scrollbar or scrollmenu

		tag					: 'div',
		contentTag			: 'div',			// 

		content				: {},

		// implemented events		
		onLoadComplete		: $empty
	},

	/*
	    Method: initialize
	    Constructor
	
	*/
 	  
	initialize: function(options){
		this.parent(options);
	},

	/*
    Method: build

      Creates html structure and inject it to the dom. The view is build with two elements: the wrapper and the content. 
      If the option overflow is set to true, it will also add the scrollbar object

    Returns:
      this
	*/

	build: function() {
		this.parent();
		
		this.setOverflow();
		this.show();
	},
 	
	/* 
		Function: setOverlay
			create a new overlay object 
	*/

	buildOverlay: function() {
		
		//console.log('show overlay');
		this.overlay = new Element('div',this.props.components.overlay)
		 .inject(this.view.element);

		this.addEvents({
			'onBlur' : function() { console.log('blur');this.overlay.show(); },
			'onFocus' : function() { this.overlay.hide(); },
			'onResizeStart' : function() { this.overlay.show(); },
			'onResizeComplete' : function() { this.overlay.hide(); },
			'onDragStart' : function() { this.overlay.show(); },
			'onDragComplete' : function() { this.overlay.hide(); }
		});
	},


	/* 
	 * Method: setBehaviors
	 * 
	 * 
	 */

	setBehavior: function() {
		this.parent();
	},

	/*
    Method: setOverflow

		Manage overflow and set scrololbar if needed or requested
	*/

	setOverflow: function() {
		if ( this.options.overflow != 'hidden') { 
			this.content = new Element( this.options.contentTag,  this.options.content )
			 .setStyles( {
				height :'100%',
				position : 'relative'
			}).inject(this.element);

			if (this.options.overflow == 'hidden') {
				this.content.setStyle('overflow','hidden');	
			}
			
			if (this.options.overflow == 'scrollbar') {
				this.content.setStyle('overflow','hidden');
				this.buildScrollbar();
			}
			
			this.content.addEvents({
				onInject : function(){
					this.updateSize()
				}.bind(this)
			});
		} else { this.content = this.element }
	},
	
	/*
    Method: setScrollbar

      Creates a new scrollbar object

	*/
	
	buildScrollbar : function() {
		this.scrollbar = new UI.Scrollbar({
			container	: this.content
		});
				 
		this.addEvents({
			'ondLoadCompplete' : function() { this.scrollbar.update() },
			'onResize' : function() { this.scrollbar.update() }
		 });  
	},
	

	/*
	 * 	Function: setSize
	 * 		Set size of the element and its canvas
	 */
	
	setSize : function(width, height, state){
		this.parent();
		this.fireEvent('onResize');
	},

	/*
    	Function: setContent
    
    		Set Content of the Container
	*/
	
	setContent: function(method,source,options){
		switch (method) {
			case 'ajax' || 'xhr':
				this.setAjaxContent(method,source,options);
				break;
			case 'ajaxnu' :
				this.setAjaxNuContent(method,source,options)
				break;
			case 'json':
				this.setJsonContent(method,source,options);
				break;
			case 'content' || 'html':
				this.setHtmlContent(method,source,options);
				break;
			case 'iframe':
				this.setIFrameContent(method,source,options);
				break;
			default:		
		};
	},

	setHtmlContent: function(method,source,options) {
		this.content.set('html',source);
		this.fireEvent('onLoadComplete');
		this.fireEvent('onResize');
		return this;
	},
	
	setAjaxContent: function(method,source,options) {
		new Request.HTML({
			url 		: source,
			update		: this.content,
			method		: 'get',
			onComplete: function(response){
				this.fireEvent('onLoadComplete');
				this.fireEvent('onResize');
			}.bind(this)
		}).send();
		
		return this;
	},
	
	setAjaxNuContent: function(method,source,options) {
		new Request.HTML({
			url : source,
			method : 'get',
			onComplete : function(responseTree,responseElements,responseHTML,responseJS){
				this.fireEvent('onLoadComplete',new Array(responseHTML,responseTree,responseElements,responseJS));
				this.fireEvent('onResize');
			}.bind(this)
		}).send();
		
		return this;
	},
	
	setJsonContent: function(method,source,options) {
		new Request.JSON({
			url : source,
			onComplete : function(response){
				this.fireEvent('onLoadComplete',new Array(response));
				this.fireEvent('onResize');
			}.bind(this)
		}).get();
		
		return this;
	},
	
	setIFrameContent : function(method,source,options) {
		if (!this.iframe) {
			this.element.empty();
			this.iframe = new Element('iframe',this.props.components.iframe).inject(this.element);
		};
		
		this.iframe.set('src',source)
		 .addEvent('load',function(){ 
		 	this.fireEvent('loadComplete');
			this.fireEvent('onResize');
		});
		
		return this;
	}
});

