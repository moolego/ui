/*
	Class: UI.View
		The UI.View class defines objects that manage the views use by several object like windows, menus.
	

	Extends:
		<UI.Element>
	
	Require:
		<UI>
		<UI.Element>
		<UI.Scrollbar>
		
	Arguments:
		options
		
	Options:
		width - (integer/string) Width of the view wrapper in px or percent
		height - (integer/string) Height  of the view wrapper in px or percent
		overflow - (string) hidden, scrollbar or menu
		tag - (string) Element's tag
		contentTag - (string) Content's tag
		
		content - (object) Object containing content element's options
		onLoadComplete - (function) Function to fire on list load complete
	
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
*/

UI.View = new Class({

	Extends: UI.Element,
		
	options: {
		component: 'view',
		
		width: '100%',
		height: '100%',
		
		overflow: 'scrollbar', // hide, scrollbar or scrollmenu
		tag: 'span',
		contentTag: 'div', // 
		content: {},
		useOverlay: true,
		scrollbar: {},
		
		// implemented events		
		onLoadComplete: $empty
	},

	/*
	Method: build
		private function
		
		Creates html structure and inject it to the dom. The view is build with two elements: the wrapper and the content. 
		If the option overflow is set to true, it will also add the scrollbar object

	Returns:
		(void)
	
	See also:
		<UI.Element::build>
	*/

	build: function() {
		this.parent();
		
		if (this.options.useOverlay) 
			this.buildOverlay();
		
		this.setOverflow();
		
		this.show();
	},
 	
	/*
	Method: buildOverlay
		private function
		
		create an overlay displayed when view is disabled (when moved or resized)
	
	Returns:
		(void)
	 */

	buildOverlay: function() {
		this.overlay = new Element('div',this.props.components.overlay)
		 .inject(this.element);
		 
		this.overlay.hide();
	
		this.addEvents({
			'onLoadComplete' : function() { this.overlay.hide(); }
		});
		 
	},

	/*
    Method: setOverflow
    	private function

		Manage overflow and set scrololbar if needed or requested
	
	Returns:
		(void)
	*/

	setOverflow: function() {
		if (this.options.overflow != 'hidden') { 
			this.content = new Element( this.options.contentTag,  this.options.content )
			 .setStyles( {
				height :'100%',
				position : 'relative',
				overflow:'hidden'
			}).inject(this.element);

			if (this.options.overflow == 'hidden') {
				this.content.setStyle('overflow','hidden');	
			}
			
			if (this.options.overflow == 'scrollbar') {
				this.setScrollbar();
			}
			
			if (this.options.overflow == 'scroller') {
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
	Method: buildScrollbar
		private function
		
		Creates a new scrollbar object attached to the view
	
	Returns:
		(void)
	*/
	
	setScrollbar: function(){
		if (this.options.skin) 
			this.options.scrollbar.skin = this.options.skin;
		 
		this.options.scrollbar.container = this.content;
		
		this.scrollbar = new UI.Scrollbar(this.options.scrollbar);
				 
		this.addEvents({
			'ondLoadCompplete': function() { this.scrollbar.update() },
			'onResize': function() { this.scrollbar.update() }
		 });
	},
	
	
	/*
	Method: buildScrollbar
		private function
		
		Creates a new scrollbar object attached to the view
	
	Returns:
		(void)
	*/
	
	setScroller : function() {
		this.scroller = new Scroller(this.content, this.options.scroller)
		 .addEvents({
		 	onChange : function(x,y) {	
				this.scrollbar.update();
			}.bind(this)
		});
			
		this.scroller.start();
	},
	

	/*
	Function: setContent
		Set Content of the Container (really basic)
	
	Arguments:
		method - (string) ajax, ajaxnu, json, content, html or iframe
		source - (string) source's url
	
	Returns:
		(void)
	*/
	
	setContent: function(method,source){
		switch (method) {
			case 'ajax' || 'xhr':
				this.setAjaxContent(source);
				break;
			case 'ajaxnu':
				this.setAjaxNuContent(source)
				break;
			case 'json':
				this.setJsonContent(source);
				break;
			case 'content' || 'html':
				this.setHtmlContent(source);
				break;
			case 'iframe':
				this.setIFrameContent(source);
				break;	
		};
		
		return this;
	},
	
	/*
	Function: setHtmlContent
		Set html Content
	
	Arguments:
		source - (string) source's html
	
	Returns:
		this
	*/

	setHtmlContent: function(source){
		this.content.set('html',source);
		this.fireEvent('onLoadComplete');
		this.fireEvent('onResize');
		return this;
	},
	
	/*
	Function: setAjaxContent
		Set ajax Content
	
	Arguments:
		source - (string) source's url
	
	Returns:
		this
	*/
	
	setAjaxContent: function(source){
		if (this.iframe) 
		 this.iframe.destroy();
		
		new Request.HTML({
			url: source,
			update: this.content,
			method: 'get',
			onComplete: function(){
				this.fireEvent('onLoadComplete');
				this.fireEvent('onResize');
			}.bind(this)
		}).send();
		
		return this;
	},
	
	/*
	Function: setAjaxNuContent
		Set ajax content
	
	Arguments:
		source - (string) source's url
	
	Returns:
		this
	*/
	
	setAjaxNuContent: function(source) {
		new Request.HTML({
			url: source,
			method: 'get',
			onComplete: function(responseTree,responseElements,responseHTML,responseJS){
				this.fireEvent('onLoadComplete',
					new Array(responseHTML,responseTree,responseElements,responseJS)
				);
				this.fireEvent('onResize');
			}.bind(this)
		}).send();
		
		return this;
	},
	
	/*
	Function: setJsonContent
		Set JSON content
	
	Arguments:
		source - (string) source's url
	
	Returns:
		this
	*/
	
	setJsonContent: function(source) {
		new Request.JSON({
			url: source,
			onComplete : function(response){
				this.fireEvent('onLoadComplete',new Array(response));
				this.fireEvent('onResize');
			}.bind(this)
		}).get();
		
		return this;
	},
	
	/*
	Function: setIFrameContent
		Set ajax content
	
	Arguments:
		source - (string) iFrame's url
	
	Returns:
		this
	*/
	
	setIFrameContent: function(source) {
		if (!this.iframe) {
			if (this.content) this.content.destroy();
			if (this.scrollbar) this.scrollbar.destroy();
			this.iframe = new Element('iframe',this.props.components.iframe).inject(this.element);
		};
		
		this.iframe.set('src',source)
		 .addEvent('load',function(){ 
		 	this.fireEvent('onLoadComplete');
			this.fireEvent('onResize');
		});

		return this;
	}
});

