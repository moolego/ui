/*
 ---
 description: Canvas Adapter. Contains basic drawing functions.
 authors: [moolego,r2d2]
 requires:
 - core:1.2.1: '*'
 - mooCanvas
 provides: [UI.Canvas]
 
 ...
 */
/*
 Class: UI.Scrollbar
 Manage scrolls for views.
 
 Extend:
 <UI.Element>
 
 Arguments:
 options
 
 Options:
 - width - (integer) The scollbar track width
 - maxThumbSize - (integer)
 - wheel - (integer) The scroll increment
 
 Example:
 (start code)
 var scrollbar = new UI.Scrollbar({
 container	: this.content
 });
 (end)
 
 Implied global:
 - MooLego - UI
 - MooTools -Class
 - Javascript - document
 
 Credits:
 based on Valerio's Mootools scrollbar plugin.
 found in upload folder of mootools website
 */
UI.Scrollbar = new Class({

    Extends: UI.Element,
    
    options: {
        component: 'scrollbar',
        type: 'track',
        
        // direction: 'horizontal',
        direction: 'vertical',
        
        maxThumbSize: 32,
        wheel: 16
    },
    /* 
     Constructor: initialize
     Construtor
     
     Arguments:
     options - (object) options
     
     See also:
     <UI.Element::initialize>
     */
    initialize: function(options){
    
        this.parent(options);
        this.bound = {
            'start': this.start.bind(this),
            'end': this.end.bind(this),
            'drag': this.drag.bind(this),
            'wheel': this.wheel.bind(this),
            'page': this.page.bind(this)
        };
        
        this.container = this.options.container;
        this.position = {};
        this.mouse = {};
        this.update();
        this.attach();
    },
    /* 
     Method: build
     private method
     
     Make a  Label and set the fade Fx
     
     Return:
     (void)
     
     See also:
     <UI.Element::build>
     */
    build: function(){
        if (this.options.direction == 'vertical') {
            if (!this.options.size) {
                this.options.width = this.props.size;
            }
        }
        else 
            if (!this.options.size) {
                this.options.height = this.props.size;
            }
        
        this.parent();
        
        this.inject(this.options.container, 'before');
        
        this.thumb = new UI.Element({
            skin: this.options.skin,
            component: this.options.component,
            type: 'thumb'
        }).inject(this.element);
        
        //this.canvas.canvas.setStyle('position','');
    },
    
    update: function(){
        if (this.options.direction == 'vertical') {
            this.containerSize = this.options.container.getComputedSize().totalHeight;
            this.setSize(this.options.width.toInt(), this.containerSize);
            this.containerScrollSize = this.options.container.scrollHeight;
            this.trackSize = this.element.offsetHeight.toInt();
        }
        else {
            this.containerSize = this.options.container.getComputedSize().totalWidth;
            this.setSize(this.containerSize, this.options.height.toInt());
            this.containerScrollSize = this.options.container.scrollWidth;
            this.trackSize = this.element.offsetWidth.toInt();
        }
        
        if (this.containerScrollSize === 0) {
            return;
        }
        
        if (this.isVisible()) {
            this.thumb.element.setStyle('visibility', 'visible');
        }
        else {
            this.thumb.element.setStyle('visibility', 'hidden');
        }
        
        
        this.containerRatio = this.containerSize / this.containerScrollSize;
        this.thumbSize = this.trackSize * this.containerRatio;
        
        var offset;
        
        if (this.thumbSize < this.options.maxThumbSize.toInt()) {
            this.thumbSize = this.options.maxThumbSize.toInt();
            offset = this.trackSize - this.thumbSize;
        }
        else 
            if (this.thumbSize > this.trackSize) {
                this.thumbSize = this.options.maxThumbSize.toInt();
            }
            else {
                offset = this.trackSize;
            }
        this.scrollRatio = this.containerScrollSize / offset;
        
        if (this.options.direction == 'vertical') {
            this.thumb.setSize(this.options.width, this.thumbSize);
        }
        else {
            this.thumb.setSize(this.thumbSize, this.options.height);
        }
        
        this.updateThumbFromContentScroll();
        this.updateContentFromThumbPosition();
    },
    
    updateContentFromThumbPosition: function(){
        if (this.options.direction == 'vertical') {
            this.options.container.scrollTop = this.position.now * this.scrollRatio;
        }
        else {
            this.options.container.scrollLeft = this.position.now * this.scrollRatio;
        }
    },
    
    updateThumbFromContentScroll: function(){
        if (this.options.direction == 'vertical') {
            this.position.now = (this.options.container.scrollTop / this.scrollRatio).limit(0, (this.trackSize));
            this.thumb.setStyle('top', this.position.now + 'px');
        }
        else {
            this.position.now = (this.options.container.scrollLeft / this.scrollRatio).limit((this.trackSize), 0);
            //console.log(this.position.now + 'px');
            this.thumb.setStyle(this.position.now + 'px', 'left');
            
        }
    },
    
    attach: function(){
        this.thumb.element.addEvent('mousedown', this.bound.start);
        if (this.options.wheel) {
            this.options.container.addEvent('mousewheel', this.bound.wheel);
        }
        this.element.addEvent('mouseup', this.bound.page);
    },
    
    wheel: function(event){
        if (this.options.direction == 'vertical') {
            this.options.container.scrollTop -= event.wheel * this.options.wheel;
        }
        else {
            this.options.container.scrollLeft -= event.wheel * this.options.wheel;
        }
        this.updateThumbFromContentScroll();
        event.stop();
    },
    
    page: function(event){
        if (this.options.direction == 'vertical') {
            if (event.page.y > this.thumb.element.getPosition().y) {
                this.options.container.scrollTop += this.options.container.offsetHeight;
            }
            else {
                this.options.container.scrollTop -= this.options.container.offsetHeight;
            }
        }
        else {
            if (event.page.x > this.thumb.element.getPosition().x) {
                this.options.container.scrollLeft += this.options.container.offsetWidth;
            }
            else {
                this.options.container.scrollLeft -= this.options.container.offsetWidth;
            }
        }
        
        this.updateThumbFromContentScroll();
        event.stop();
    },
    
    start: function(event){
        if (this.options.direction == 'vertical') {
            this.mouse.start = event.page.y;
            this.position.start = this.thumb.element.getStyle('top').toInt();
        }
        else {
            this.mouse.start = event.page.x;
            this.position.start = this.thumb.element.getStyle('left').toInt();
        }
        
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
        if (this.options.direction == 'vertical') {
            this.mouse.now = event.page.y;
        }
        else {
            this.mouse.now = event.page.x;
        }
        this.position.now = (this.position.start + (this.mouse.now - this.mouse.start)).limit(0, (this.trackSize - this.thumbSize));
        this.updateContentFromThumbPosition();
        this.updateThumbFromContentScroll();
        event.stop();
    },
    
    isVisible: function(){
        if (this.containerSize < this.containerScrollSize) {
            return true;
        }
        else {
            return false;
        }
    }
});
