/*
	Class: UI.Scrollbar
		Manage scrolls for views.
		
	Extend:
		UI.Element
		
	Arguments:
		options
		
	Options:
		width - (integer) The scollbar track width
		maxThumbSize - (integer)
		wheel - (integer) The scroll increment
		
	Example:
		(start code)
		var scrollbar = new UI.Scrollbar({
			container	: this.content
		});
		(end)

	Credits: 
		based on Valerio's Mootools scrollbar plugin.

*/


UI.Scrollbar = new Class({
	Extends				: UI.Element,

	options: {
		component		: 'scrollbar',
		type			: 'track',
		
		width			: 15,
		
		maxThumbSize	: 30,
		wheel			: 30	
	},

	initialize: function(options){
		this.parent(options);
		
		this.bound = {
			'start': this.start.bind(this),
			'end': this.end.bind(this),
			'drag': this.drag.bind(this),
			'wheel': this.wheel.bind(this),
			'page': this.page.bind(this)
		};

		this.position = {};
		this.mouse = {};
		this.update();
		this.attach();
	},
	
	build: function() {
		this.parent();
		
		this.inject(this.options.container,'before')
		
		this.thumb = new UI.Element({
			skin 			: this.options.skin,
			component		: this.options.component,
			type			: 'thumb'
		}).inject(this.element);
	},
	
	update: function(){
		this.containerSize = this.options.container.getSize().y;
		this.setSize(this.options.width.toInt(),this.containerSize);
		this.containerScrollSize = this.options.container.scrollHeight;
		if(this.containerScrollSize == 0) return;

		this.isVisible() ?	this.thumb.element.setStyle('visibility','visible') : this.thumb.element.setStyle('visibility','hidden');
		
		this.trackSize = this.element.offsetHeight.toInt();
		this.containerRatio = this.containerSize / this.containerScrollSize;
		this.thumbSize = (this.trackSize * this.containerRatio).limit(this.options.maxThumbSize.toInt(), this.trackSize);
		this.scrollRatio = this.containerScrollSize / this.trackSize;
		this.thumb.setSize(this.options.width, this.thumbSize);
			
		this.updateThumbFromContentScroll();
		this.updateContentFromThumbPosition();
		
	},

	updateContentFromThumbPosition: function(){
		this.options.container.scrollTop = this.position.now * this.scrollRatio;
	},

	updateThumbFromContentScroll: function(){
		this.position.now = (this.options.container.scrollTop / this.scrollRatio).limit(0, (this.trackSize - this.thumbSize));
		this.thumb.setStyle('top', this.position.now);
	},

	attach: function(){
		this.thumb.element.addEvent('mousedown', this.bound.start);
		//this.thumb.element.addEvent('whileclick', this.bound.start);
		if (this.options.wheel) 
			this.options.container.addEvent('mousewheel', this.bound.wheel);
		this.element.addEvent('mouseup', this.bound.page);
	},

	wheel: function(event){
		this.options.container.scrollTop -= event.wheel * this.options.wheel;
		this.updateThumbFromContentScroll();
		event.stop();
	},

	page: function(event){
		if (event.page.y > this.thumb.element.getPosition().y) this.options.container.scrollTop += this.options.container.offsetHeight;
		else this.options.container.scrollTop -= this.options.container.offsetHeight;
		this.updateThumbFromContentScroll();
		event.stop();
	},

	start: function(event){
		this.mouse.start = event.page.y;
		this.position.start = this.thumb.element.getStyle('top').toInt();
		document.addEvent('mousemove', this.bound.drag);
		document.addEvent('mouseup', this.bound.end);
		this.thumb.element.addEvent('mouseup', this.bound.end);
		event.stop();
	},

	end: function(event){
		document.removeEvent('mousemove', this.bound.drag);
		document.removeEvent('mouseup', this.bound.end);
		this.thumb.element.removeEvent('mouseup', this.bound.end);
		event.stop();
	},

	drag: function(event){
		this.mouse.now = event.page.y;
		this.position.now = (this.position.start + (this.mouse.now - this.mouse.start)).limit(0, (this.trackSize - this.thumbSize));
		this.updateContentFromThumbPosition();
		this.updateThumbFromContentScroll();
		event.stop();
	},
	
	isVisible: function() {

		if (this.containerSize < this.containerScrollSize) {
			return true;
		} else {
			return false;	
		}
	}

});