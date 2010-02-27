
/*
 Script: App.js
 Abstract Class for application
 License:
 MIT-style license.
 Copyright:
 copyright (c) 2007 Jerome Vial, <http://moolego.org>
 Require:
 UI/Container/Vertical.js
 UI/Design/Core.js
 UI/Design/Container.js
 */
/*
 Class: App
 Base Class for applications.
 */
var App = new Class({
    Implements: [Events, Options],
    
    initialize: function(options){
    
    },
    
    getVersion: function(){
        return this.options.version;
    }
    
});





/*
 Script: App.Demo.js
 Demo Application For Moolego UI Examples.
 License:
 MIT-style license.
 Copyright:
 copyright (c) 2007 Jerome Vial, <http://floor.ch>
 */
/*
 Class: App.Demo
 Creates a Workspace Interface that allow demo presentation
 Arguments:
 Options
 
 */
App.Demo = new Class({
    Extends: App,
    Implements: [Events, Options],
    
    options: {
        appName: 'app-floor-cs',
        
        require: ['toolbar.js'],
        
        defaultLang: 'en-US',
        langDef: 'Content',
        
        serverName: 'moolego',
        
        defaultCall: {
            act: 'list',
            params: {
                m: 'Finder',
                lng: 'fr',
                cid: '1'
            }
        },
        toolbarDisplayMode: 'both',
        container: {
            width: 640,
            height: 500,
            location: 'center',
            viewOverflow: 'hidden'
        },
        panel: {
            title: 'Inspector',
            width: 300,
            height: 520,
            location: 'center'
        },
        url: 'form/button01.html'
    },
    
    /*
     Function: initialize
     Constructor
     
     */
    initialize: function(options){
        this.setOptions(options);
        
        this.lang = MooTools.lang.get(this.options.langDef);
        
        this.build();
        this.launch(this.options.url);
    },
    
    /*
     Function: build
     
     Create dom needed elements
     */
    build: function(){
        this.setToolbar();
        
        this.workspace = new UI.View({
            name: 'workspace',
            id: 'workspace',
            overflow: 'scrollbar',
            styles: {
                position: 'fixed'
            }
        }).inject(document.body);
        
        this.buildUnderlay();
        
        this.setWorkspaceSize();
        this.setBehavior();
    },
    
    /*
     Method: buildUnderlay
     
     Launch application
     */
    buildUnderlay: function(){
        this.underlay = new Element('div', {
            styles: {
                position: 'absolute',
                overflow: 'hidden',
                width: '100%',
                zIndex: 10
            }
        }).inject(document.body);
    },
    
    /*
     Method: launch
     
     Launch application
     */
    launch: function(url){
    	var self = this;
        this.workspace.setContent('iframe', url).addEvent('loadComplete', function(){
        
            self.workspace.iframe.contentWindow.document.body.addEvent('mousedown', function(e){
                ui.controller.element.closeMenu(e);
            });
            
            document.body.setStyle('cursor', '');
        });
    },
    
	browse: function(url){
		this.workspace.setContent('iframe', url);
    },
    
    setBehavior: function(){
        window.addEvent('resize', function(){
            this.setWorkspaceSize();
        }.bind(this));
        
        this.workspace.element.addEvent('load', function(){
            this.page = frames['workspace'].document.body;
        }.bind(this));
    },
    
    setWorkspaceSize: function(){
        this.workspace.element.setStyles({
            'height': window.getHeight() - this.toolbar.element.getSize().y,
            'top': this.toolbar.element.getSize().y
        });
        
        this.underlay.setStyles({
            height: window.getHeight(),
            top: this.toolbar.element.getSize().y,
            display: 'none'
        });
    },
    
    test: function(text){
        alert(text);
    }
});


App.Demo.implement({
    setToolbar: function(){
        var that = this;
        
        this.toolbar = new UI.Toolbar({
            displayMode: 'text',
            menu: [{
                text: 'MooLego',
                styles: {
                    position: 'relative'
                },
                menu: [{
                    text: 'About',
                    action: function(){
                        new UI.Dialog({
                            title: 'About',
                            message: 'Moolego UI',
                            width: 300,
                            height: 160,
                            head: false,
                            viewOverflow: 'hidden',
                            controls: ['close']
                        });
                    }
                }, {
                    text: 'Software version...',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }]
            }, {
                text: 'Demos',
                options: {
                    'class': 'ui-dd-new'
                },
                menu: [{
                    text: 'Button',
                    menu: [{
                        text: 'Example 1',
                        action: function(){
                        	that.browse('form/button01.html')
                    	}
                    }, {
                        text: 'Example 2',
                        action: function(){
                        	that.browse('form/button02.html')
                    	}
                    }, {
                        text: 'Example 3',
                        action: function(){
                        	that.browse('form/button03.html')
                    	}
                    }, {
                        text: 'Example 4',
                        action: function(){
                        	that.browse('form/button04.html')
                    	}

                    }]
                }, {
                    text: 'Window',
                    
                    
                    menu: [{
                        text: 'Example 1',
                        action: function(){
                        	that.browse('window/window01.html')
                    	}
                    }, {
                        text: 'Example 2',
                        action: function(){
                        	that.browse('window/window02.html')
                    	}
                    }, {
                        text: 'Example 3',
                        action: function(){
                        	that.browse('window/window03.html')
                    	}
                    }, {
                        text: 'Example 4',
                        action: function(){
                        	that.browse('window/window04.html')
                    	}
					}, {
                        text: 'Example 5',
                        action: function(){
                        	that.browse('window/window05.html')
                    	}
                    }]
				},{
                        text: 'separator'
                },{
                    text: 'Element',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Box',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Bubble',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Image',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Label',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'separator'
                }, {
                    text: 'Element',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Box',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Bubble',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Image',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Label',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }]
            }, {
                text: 'Docs',
                options: {
                    'class': 'ui-dd-new'
                },
                menu: [{
                    text: 'UI',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Canvas',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Skin',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Interface',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'separator'
                }, {
                    text: 'Element',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Box',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Bubble',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Image',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Label',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'separator'
                }, {
                    text: 'Element',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Box',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Bubble',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Image',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Label',
                    action: function(){
                        this.test('about');
                        alert('click')
                    }

                }, {
                    text: 'Minimizer'
                }, {
                    text: 'separator'
                }, {
                    text: 'Cascade',
                    action: function(){
                        this.windowManager.resetCascade()
                    }

                
                }]
            }, {
                text: 'Contribute',
                options: {
                    'class': 'ui-dd-help'
                },
                menu: [{
                    text: 'Fork at Git',
					action: function() {
						that.launch('http://www.github.com/moolego/ui');
					}
                }, {
					text: 'Report Bug',
					action: function(){
						that.launch('http://moolego.lighthouseapp.com/projects/19046-ui');
					}
				}]
            }, {
                text: 'Discussion',
                options: {
                    'class': 'ui-dd-help'
                },
                menu: [{
                    text: 'Welcome'
                }, {
                    text: 'separator'
                }, {
                    text: 'Update...'
                }, {
                    text: 'separator'
                }, {
                    text: 'Settings...'
                }]
            }]
        }).inject(document.body, 'top');
    }
});


