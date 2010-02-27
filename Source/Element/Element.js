/*
 ---
 description: Canvas Adapter. Contains basic drawing functions.
 
 authors: [moolego,r2d2]
 
 requires:
 - core:1.2.1: '*'
 
 provides: [UI.Element]
 
 ...
 */

UI.Element = new Class({

    Implements: [Events, Options],
    
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
        
        tag: 'span',
        
        selectable: true,
        
        // Drag options
        draggable: false,
        dragLimitX: false,
        dragLimitY: false,
        
        // Resize options
        resizable: false,
        resizeLimitX: [100, screen.width],
        resizeLimitY: [100, screen.height]
    },

    initialize: function(options){
        this.setOptions(options);
        this.state = this.options.state;
        this.dragHandlers = [];
        
        this.setClassName();
        this.setSkin();
        this.build();
        this.attach();
    },
   
    toElement: function(){
        return this.element;
    },

    build: function(){
        this.fireEvent('build');
        
        this.element = new Element(this.options.tag, {
            'class': this.className,
            styles: this.props.styles,
            events: this.options.events,
            id: this.options.id,
            name: this.options.name,
            html: this.options.html,
            'for': this.options['for']
        });
        
        if (!this.options.selectable) {
            this.element.disableSelect();
        }
        if (this.options.resizable) {
            this.buildResizer();
        }
    },

    buildResizer: function(){
        this.resizer = new UI.Element({
            skin: this.options.skin,
            component: 'element',
            type: 'resizer',
            styles: {
                zIndex: '1000000',
                bottom: this.element.getComputedSize().computedBottom,
                right: this.element.getComputedSize().computedRight
            }
        }).inject(this.element, 'bottom');
        
        this.resizer.element.addEvent('click', function(e){
            var ev = new Event(e).stop();
        });
    },

    setClassName: function(){
        if (this.options.className) {
            this.className = this.options.className;
        }
        else 
            if (this.options.useAutoClass) {
                this.className = this.options.lib + '-' + this.options.component;
                
                if (this.options.type != 'default') {
                    this.className = this.className + '-' + this.options.type;
                }
                
                if (this.options.state != 'default') {
                    this.className = this.className + '-' + this.options.state;
                }
            }
    },

    setSkin: function(){
        this.options.skin = this.options.skin ? this.options.skin : ui.defaultSkin;
		
        UI.skin = new UI.Skin(this.options.skin);
        this.skin = UI.skin.get(this);
        this.props = this.skin[this.options.state];
    },
    
    setState: function(state, size){
        if (this.skin[state]) {
            this.state = state;
            if (this.skin[state].styles) {
                this.setStyles(this.skin[state].styles);
            }
            
            this.fireEvent('render', state);
        }
        return this;
    },
	
    setCanvas: function(){
        if (this.paint || (this.props && !this.props.layers) || (this.props && this.props.layers && $H(this.props.layers).getLength() <= 2) || ($defined(this.props.layers.def) && !this.props.layers.def.length)) {
            return false;
        }

        if (this.element.getComputedSize()) {
            var size = this.element.getComputedSize();
            this.computedSize = size;
        }
        else {
        
        
        }
        
        var offsetWidth = (size.computedLeft + size.computedRight);
        var offsetHeight = (size.computedTop + size.computedBottom);
        
        this.paint = new UI.Paint({
            props: this.props,
            width: this.element.x + offsetWidth,
            height: this.element.y + offsetHeight,
            debug: this.options.debug,
            element: this.element,
            skin: this.options.skin,
            component: this.options.component,
            type: this.options.type,
            state: this.options.state
        }).inject(this.element).addEvent('click', function(){
            alert('click on canvas')
        });
        
        this.addEvent('render', function(state){
            if (!state) {
                this.paint.props = this.props;
            }
            else {
                this.paint.props = this.skin[state] || this.props;
            }
            
            this.paint.draw(this.element.x + offsetWidth, this.element.y + offsetHeight);
        });
    },
    
    setSize: function(width, height, state, target){
        this.fireEvent('resize');
        
        this.element.x = width || this.options.width || this.props.width || this.element.getSize().x;
        this.element.y = height || this.options.height || this.props.height || this.element.getSize().y;
        if (this.element.x) {
            this.element.setStyle('width', this.element.x);
        }
        if (this.element.y) {
            this.element.setStyle('height', this.element.y);
        }
        
        this.fireEvent('render', state);
        return this;
    },

    setLocation: function(left, top, morph){
        this.element.left = left || this.options.left || this.props.defaultLeft || this.element.getCoordinates().x - this.props.shadowMagnify * 2;
        this.element.top = top || this.options.top || this.props.defaultTop || this.element.getCoordinates().y - this.props.shadowMagnify * 2;
        
        this.element[morph ? 'morph' : 'setStyles']({
            top: this.element.top,
            left: this.element.left
        });
        
        return this;
    },

    attach: function(){
    
        var self = this;
        
        if (this.options.draggable) {
            this.enableDrag();
        }
        if (this.options.resizable) {
            this.enableResize();
        }
        
        this.element.addEvents({
            mousedown: function(e){
                if (self.options.component != 'label') {
                    ui.controller.element.closeMenu(e);
                }
                self.fireEvent('mousedown');
            },
            click: function(){
                if (!Browser.Engine.trident) {
                    self.fireEvent('click');
                }
            },
            mouseup: function(){
                if (Browser.Engine.trident) {
                    self.fireEvent('click');
                }
                self.fireEvent('mouseup');
            },
            
            mouseenter: this.fireEvent.bind(this, 'mouseenter'),
            mouseleave: this.fireEvent.bind(this, 'mouseleave'),
            mouseover: this.fireEvent.bind(this, 'mouseover'),
            mouseOut: this.fireEvent.bind(this, 'mouseOut')
        });
    },

    enableDrag: function(){
        if (this.dragHandlers.length === 0) {
            this.dragHandlers = null;
        }
        
        this.dragHandler = new Drag(this.element, {
            handle: this.dragHandlers,
            limit: {
                x: this.options.dragLimitX,
                y: this.options.dragLimitY
            },
            
            onStart: this.fireEvent.bind(this, 'onDragStart'),
            onDrag: this.fireEvent.bind(this, 'onDrag'),
            onComplete: this.fireEvent.bind(this, 'onDragComplete')
        });
        
        this.addEvents({
            onDragComplete: this.adaptLocation.bind(this)
        });
        
        return this;
    },

    disableDrag: function(){
        if (this.dragHandler) {
            this.dragHandler.stop();
        }
        
        return this;
    },

    enableResize: function(){
		var that = this;
		
        if (!this.options.resizeLimitX) {
            this.options.resizeLimitX = 10;
        }
        
        if (!this.options.resizeLimitY) {
            this.options.resizeLimitY = 10;
        }
        
        this.element.makeResizable({
            handle: this.resizer,
            limit: {
                x: that.options.resizeLimitX,
                y: that.options.resizeLimitY
            },
            onStart: function(){
                that.fireEvent('resizeStart');
            },
            onDrag: function(){
                that.fireEvent('resizeDrag');
            } ,
            onComplete: function(){
                that.fireEvent('resizeComplete');
            }.bind(this)
        });
        
        this.addEvents({
            resizeDrag: function(){
                this.setSize(this.element.getComputedSize().width, this.element.getComputedSize().height);
                this.fireEvent('redraw', 'button')
            },
            resizeComplete: function(){
                this.setSize(this.element.getComputedSize().width, this.element.getComputedSize().height);
                
            }
        });
        
        return this;
    },

    getCenterLocation: function(){
        var location = {};
        
        location.top = (window.getHeight() - this.options.height.toInt()) / 2;
        location.left = (window.getWidth() - this.options.width.toInt()) / 2;
        
        return location;
    },

    adaptLocation: function(){
        var location = {};
        var needed = false;
        var coordinates = this.element.getCoordinates();
        
        if (coordinates.top.toInt() > window.getHeight()) {
            location.top = window.getHeight() - $random(25, 75);
            needed = true;
        }
        
        if (coordinates.top.toInt() < 0) {
            location.top = 50;
            needed = true;
        }
        
        if (coordinates.left.toInt() + this.element.getStyle('width').toInt() < 0) {
            location.left = $random(25, 75) - this.element.getStyle('width').toInt();
            needed = true;
        }
        
        if (this.element.getStyle('left').toInt() > window.getWidth()) {
            location.left = window.getWidth() - $random(25, 75);
            needed = true;
        }
        
        if (needed) {
            if (this.props.fx && this.props.fx.adaptLocation) {
                if (!this.reposFx) {
                    this.reposFx = new Fx.Morph(this.element, this.props.fx.adaptLocation);
                }
                this.reposFx.start(location);
            }
        }
    },
 
    show: function(){
        this.fireEvent('show');
        this.element.setStyle('opacity', 1);
        this.element.show();
        
        return this;
    },
 
    hide: function(){
        this.fireEvent('hide');
        this.element.hide();
        
        return this;
    },

    setStyle: function(style, value){
        this.element.setStyle(style, value);
        
        return this;
    },

    setStyles: function(styles){
        this.element.setStyles(styles);
        
        return this;
    },

    getStyle: function(style){
        return this.element.getStyle(style);
    },

    inject: function(container, position){
        this.fireEvent('inject');
		
        this.element.inject(container, position);
        this.element.setStyle('visibility', 'visible');
        this.setSize('', '', '', container);
        this.setCanvas();
        ui.controller.element.register(this);
        
        this.fireEvent('injected');
        return this;
    },
    
    set: function(property, value){
        if (property == 'html' && this.label) {
            this.label.set(property, value);
            this.setSize();
        }
        else 
            if (property == 'morph') {
                var self = this;
                this.element.set(property, value);
                this.element.get('morph').addEvents({
                    onMorph: function(){
                        var size = this.element.getSize();
                        self.setSize(size.x, size.y);
                    }
                });
            }
            else {
                this.element.set(property, value);
            }
        return this;
    },

    get: function(property){
        return this.element.get(property);
    },

    getSize: function(){
        return this.element.getSize();
    },

    morph: function(props){
        return this.element.morph(props);
    },

    getComputedSize: function(){
        return this.element.getComputedSize();
    },

    getCoordinates: function(ref){
        return this.element.getCoordinates(ref);
    },

    destroy: function(){
        this.element.destroy();
        return;
    }
});

/*
 Some usefull method for element
 
 */
Element.implement({

    /*
     Function: disableSelect
     Disable the ability to select element content text
     
     Return:
     this
     */
    disableSelect: function(){
        if (typeof this.onselectstart != "undefined") {
            this.onselectstart = function(){
                return false;
            };
        }
        else {
            if (typeof this.style.MozUserSelect != 'undefined') {
                this.style.MozUserSelect = 'none';
            }
            else {
                this.onmousedown = function(){
                    return false;
                };
            }
        }
        this.style.cursor = 'default';
        return this;
    },
    
    /*
     Function: enableSelect
     Enable the ability to select element content
     
     Return:
     this
     */
    enableSelect: function(){
        if (this.onselectstart) {
            this.onselectstart = ''; // for ie
        }
        else {
            if ($type(this.style.MozUserSelect) == "none") {
                this.style.MozUserSelect = ''; // for Firefox 
            }
            else {
                this.onmousedown = function(){
                    return true;
                }; // finaly the others (opera, perfectible on safari and chrome)
            }
        }
        this.style.cursor = 'default';
        return this;
    }
});



/*
	Object: ui.controller.element

	Default element controller.
	It handle element's z-index as well as group managing and group serialization (usefull for controls values)
	
	Implied global:
		- MooLego - ui
		- MooTools - $empty
		- Javascript - window

	Members:
		addEvent, attach, bind, closeMenu, controller, each, element, elements, 
	    getStyle, goDown, goUp, group, groups, handelKeys, join, key, list, 
	    menu, name, options, push, register, serialize, setStyle, 
	    start, value, zIndex

	Discussion: 
		For now, the controller structure is not well defined, 
	
*/

ui.controller.element = {

	/*
	Constructor: start
		Constructor
		
	Arguments:
		options - (object) options
	*/
	
	start: function(){
		this.list = [];
		
		this.zIndex = 1;
		this.groups = {};
		this.elements = [];
		this.closeMenu = $empty;
		this.attach();
		this.handelKeys();
	},

	/*
	Function: register
		private function
		
		Add passing element to the elements list
	   
	Arguments:
		object - (object) an element class' instance
	  
	 */
	
	register: function(object){
		var oid = this.list.push(object) - 1;
		
		//set z-index
		if (object.element.getStyle('zIndex') == 'auto' || object.element.getStyle('zIndex') === 0) {
			object.element.setStyle('zIndex', object.options.zIndex || this.zIndex++);
		}
			
		//add element to the group if needed
		if (object.options.group) {
			this.group(oid);
		}
		
		/*
		//get first element parent made with UI
		var element = object.element.getParent();
		while (element && !element.ui) {
			element = element.getParent();
		}
		
		//store element in first element parent made with UI
		if (element) {
			if (!element.elements) element.elements = new Hash();
			if (!element.elements[object.options.component]) element.elements[object.options.component] = new Array();
			element.elements[object.options.component].push(object);	
		
		//store element in UI (element is not in our UI)
		} else {
			if (!this.list[object.options.component]) this.list[object.options.component] = new Array();
			this.list[object.options.component].push(object);
		}
		
		//replace tips
		// should in tips contreller in tips.js
		
		if (object.options.component != 'tip') {
			window.fireEvent('setTipsPosition');
		}
		*/
		
	},
	
	/*
	Function: group
		private function
		
		Add passing element to the provided group
	   
	Arguments:
		object - (object) an element class' instance
	  
	 */
	
	group: function(oid) {
		//we check if the group exists, else we create it
		this.groups[this.list[oid].options.group] = this.groups[this.list[oid].options.group] || [];
		this.groups[this.list[oid].options.group].push(oid);
	},
	
	/*
	Function: serialize
		private function
		
		Add passing element to the elements list
	   
	Arguments:
		groupID - (string) name of the group you want to serialize element's value.
		
	Discussion:
	
		Not implemented
	  
	*/
	
	serialize: function(groupID) {
		if (!this.groups[groupID]) {
			return false;
		}

		var string = [];
		this.groups[groupID].each(function(eC){
			if (eC.value) {
				string.push(eC.options.name + '=' + eC.value);
			}
		});
		
		return string.join('&');
	},

	/*
	Function: handelKeys
		private function
		
		Listen to the keyboard and propagate effect on menu
		
	Discussion:
	
		Should be handled by ui.notification and UI.Menu
		or by ui.controller.menu eventual
		and should be optional
	  
	*/
	
	attach: function(){
		document.addEvent('mousedown', function(e){
			this.closeMenu(e);
		}.bind(this));
	},
	
	/*
	Function: handelKeys
		private function
		
		Listen to the keyboard and propagate effect on menu
		
	Discussion:
	
		Should be also handled by ui.notification and UI.Menu
		
	  
	*/

	handelKeys : function(){
		window.addEvent('keydown', function(e){
			if (e.key == 'down' && this.menu) {
				this.menu.goDown();
			}
			else if (e.key == 'up' && this.menu) {
				this.menu.goUp();
			}
			
			//var ev = new Event(e).stop();
		}.bind(this));
	}
	
};

ui.controller.element.start();


