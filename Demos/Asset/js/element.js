
var TransElement = new Class({
	Implements: [Events, Options],
    
    options: {
        tag: 'div'
    },
    
	initialize: function(options) {
		this.setOptions(options);	
		console.log(this.options.tag,this.options.element);

		return new Element(this.options.tag,this.options.element);
	}
});



var Component = new Class({
	Extends: TransElement,
    
	options: {
        lib: 'ui',
        
        // component options
        component: 'element',
        type: 'default',
        state: 'default',
        
        props: false,
        skin: false,
        styles: {},
        
        // group id
        group: false,
        
        // classname options
        
        className: false,
        useAutoClass: true,
        
        tag: 'div',
        
        selectable: true,
        
        // Drag options
        draggable: false,
        dragLimitX: false,
        dragLimitY: false,
        
        // Resize options
        resizable: false,
        resizeLimitX: [100, Window.getWidth()],
        resizeLimitY: [100, Window.getHeight()]
    },
    
	initialize: function(options) {
		this.parent(options);	
		
		console.log(this.options.tag,this.options.element);

	},
	
    print: function(){
		console.log('print');
        //do something
    } 
});

