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
	var view = new UI.View({
		width			: 260,
		height			: 400,
		scroll			: true 
	}).setContent('content','content view');
	(end)

Discussion:
	
*/

UI.View = new Class({
	Extends					: UI.Element,
	Implements				: [Events, Options],
		
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
	 * Method: setBehaviors
	 * 
	 * 
	 */

	setBehavior: function() {
		this.parent();
		
		this.addEvents({
			'onResize'  : this.updateSize
		});
	},

	/*
    Method: setOverflow

		Manage overflow and set scrololbar if needed or requested
	*/

	setOverflow: function() {
		if ( this.options.overflow != 'hidden') { 
			this.content = new Element( this.options.contentTag,  this.options.content )
			 .setStyles( {
					overflow	:'hidden',
					height		:'100%',
					position	: 'relative'
				} )
			 .inject( this.element );
			
			if (this.options.overflow == 'scrollbar') {
				this.setScrollbar();
			}
		} else { this.content = this.element }
	},
	
	/*
    Method: setScrollbar

      Creates a new scrollbar object

	*/
	
	setScrollbar : function() {
		this.scrollbar = new UI.Scrollbar({
			container	: this.content
		});
				 
		this.addEvents({
			'onContentSet'	: this.scrollbar.update(),
			'onResize'		: this.scrollbar.update()
		 });  
	},
	
	/*
    Method: updateSize

      Creates a new scrollbar object
      
	Discussion:
		need to find a better method name	
	*/

	updateSize : function() {
		if (this.options.overflow == 'scrollbar') {
			this.scrollbar.update();
		}
	},

	/*
    	Function: setContent
    
    		Set Content of the Container
	*/
	
	setContent: function(method,source,options){
		switch (method) {
			case 'ajax' || 'xhr':
				new Request.HTML({
					url 		: source,
					update		: this.content,
					method		: 'get',
					onComplete: function(response){
						this.fireEvent('onLoadComplete');
						this.updateSize();
						//this.fireEvent('resize')
					}.bind(this)
				}).send();
				break;
			case 'ajaxnu' :
				new Request.HTML({
					url 		: source,
					method		: 'get',
					onComplete: function(responseTree,responseElements,responseHTML,responseJS){
						this.fireEvent('onLoadComplete',new Array(responseHTML,responseTree,responseElements,responseJS));
						this.updateSize();
					}.bind(this)
				}).send();
				break;
			case 'json':
				new Request.JSON({
					url 		: source,
					onComplete: function(response){
						this.fireEvent('onLoadComplete',new Array(response));
						this.updateSize();
					}.bind(this)
				}).get();
				break;
			case 'content' || 'html':
				this.content.set('html',source);
				this.fireEvent('onLoadComplete');
				this.updateSize();
				//return this;
				break;
			case 'iframe':
				this.iframe = new Element("iframe", {
					'class'	: this.options.className+'-iframe',
					'src'	: source,
					styles  : {
						width	: '100%',
						height	: '100%',
						border	: '0',
						margin	: '0'
					}
				 }).inject(this.element);
				break;
			default:		
		};
		this.updateSize();
	}
});

