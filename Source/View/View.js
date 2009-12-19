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
		- width - (integer/string) Width of the view wrapper in px or percent
		- height - (integer/string) Height  of the view wrapper in px or percent
		- overflow - (string) hidden, scrollbar or menu
		- tag - (string) Element's tag
		- contentTag - (string) Content's tag
		
		- content - (object) Object containing content element's options
		- onLoadComplete - (function) Function to fire on list load complete
	
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
		
		
	Implied global: 
		UI,
		Class,Element,Request,Scroller
		
	Members:
		Element, Extends, HTML, JSON, Scrollbar, View, _setOverflow, 
	    addEvent, addEvents, bind, build, buildOverlay, buildScrollbar, 
	    component, components, container, content, contentTag, destroy, element, 
	    fireEvent, get, height, hide, iframe, inject, loadCompplete, method, 
	    onChange, onComplete, onInject, onLoadComplete, options, overflow, 
	    overlay, parent, position, props, resize, scrollbar, scroller, send, 
	    set, setAjaxContent, setAjaxNuContent, setContent, setHtmlContent, 
	    setIFrameContent, setJsonContent, setProperties, setScrollbar, 
	    setScroller, setStyle, setStyles, show, skin, start, tag, update, 
	    updateSize, url, useOverlay, width
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
		scrollbar: {}
		
		// implemented events		
		/*
		onLoadComplete: $empty,
		onResize: $empty
		*/
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
		
		this._setOverflow();
		
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

		this.addEvents({
			'onLoadComplete' : function() { 
				this.overlay.hide(); 
			}
		});
		 
	},

	/*
    Method: setOverflow
    	private function

		Manage overflow and set scrololbar if needed or requested
	
	Returns:
		(void)
	*/

	_setOverflow: function() {
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
					this.updateSize();
				}.bind(this)
			});
		} else { 
			this.content = this.element; 
		}
	},
	
	/*
	Method: buildScrollbar
		private function
		
		Creates a new scrollbar object attached to the view
	
	Returns:
		(void)
	*/
	
	setScrollbar: function(){
		if (this.options.skin) {
			this.options.scrollbar.skin = this.options.skin;
		}
		this.options.scrollbar.container = this.content;
		
		this.scrollbar = new UI.Scrollbar(this.options.scrollbar);
				 
		this.addEvents({
			'loadCompplete': function() { this.scrollbar.update(); },
			'resize': function() { 	this.scrollbar.update(); }
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
				this.setAjaxNuContent(source);
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
		}
		
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
		this.fireEvent('loadComplete');
		this.fireEvent('resize');
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
		if (this.iframe) {
			this.iframe.destroy();
		}
		
		var request = new Request.HTML({
			url: source,
			update: this.content,
			method: 'get',
			onComplete: function(){
				this.fireEvent('loadComplete');
				this.fireEvent('resize');
			}.bind(this)
		}).send();
		
		return this;
	},
	
	/*
	Function: setAjaxContent
		Set ajax content
	
	Arguments:
		source - (string) source's url
	
	Returns:
		this
	*/
	
	setAjaxNuContent: function(source) {
		var self = this;
		
		var request = new Request.HTML({
			url: source,
			method: 'get',
			onComplete: function(responseTree,responseElements,responseHTML,responseJS){
				var list = [responseHTML,responseTree,responseElements,responseJS];
				self.fireEvent('onLoadComplete',list);
				self.fireEvent('resize');
			}
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
		var request = new Request.JSON({
			url: source,
			onComplete : function(response){
				this.fireEvent('loadComplete',new Array(response));
				this.fireEvent('resize');
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
			if (this.content) {
				this.content.destroy();
			}
			if (this.scrollbar) {
				this.scrollbar.destroy();
			}
			
			this.iframe = new IFrame(this.props.components.iframe)
			.setStyles({
				height:'100%',
				width:'100%',
				margin:0,
				padding:0,
				border:0
			})
			.setProperties({height:'100%',width:'100%'})
			.inject(this.element);
		}
		
		this.iframe.set('src',source)
		 .addEvent('load',function(){
		 	this.fireEvent('loadComplete');
			this.fireEvent('resize');
		}.bind(this));
		
		if (this.options.useOverlay) {
			this.buildOverlay();
		}

		return this;
	}
});

