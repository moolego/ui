/*
---
description: The UI.Skin class defines object that handle skins.

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI.Canvas]
 
...
*/
/*
	Class: UI.Skin
		The UI.Skin class defines a singleton object that handle skins.
	
	Arguments:
		Options
		
	Options: 
		- skin - (string) skin name defined in skins. ie: AquaGraphite
	
	Example:
		(start code)
		UI.skin = new UI.Skin('AquaGraphite');
		(end)

	Implied global:
		- MooLego -UI
		- MooTools - $H,$type,$unlink,Class,Events,Options
	
	Members:
		Implements, Skin, component, components, default, defaultSkin, 
	    each, get, getComponentProps, initialize, layers, length, merge, 
	    options, preprocessed, processSkin, props, setOptions, shadow, shadows, 
	    shortcuts, size, skin, styles, type

 */

UI.Skin = new Class({
	
 	Implements: [Events, Options],
	
	options: {
		skin: 'AquaGraphite'
	},
	
	/*
	Constructor: initialize
		Constructor

		Set the default skin
		
	Arguments:
		- options - (object) options
	
	Returns:
		this
	*/
 	
	initialize : function(options) {
		this.setOptions(options);
		this.defaultSkin = this.options.skin;
		
		return this;
	},
	
	/* 
	Function : processSkin
		private function
	
		Merge what can be merged on the skin sheet the first time it's called so it will be faster for next calls.
		
	Arguments:
		- skinName - (string) the name of the skin who should be preprocessed.
	
	Return:
		(void)
	*/

	processSkin: function(skinName) {
		
		var cKey,
			tKey,
			sKey,
			props;
		
		//we merge syles for each states of each type of components
		for (cKey in UI.props[skinName]) {
			if (cKey != 'default') {
				for (tKey in UI.props[skinName][cKey]) {
					for (sKey in  UI.props[skinName][cKey][tKey]) {
						if (sKey != 'shortcuts') {
							props = UI.props[skinName]['default'];
							if (UI.props[skinName][cKey]['default']) {
								props = this.merge(
									props,
									UI.props[skinName][cKey]['default']['default'],
									UI.props[skinName][cKey]['default'][sKey]
								);
							}
							props = this.merge(
								props,
								UI.props[skinName][cKey][tKey]['default'],
								UI.props[skinName][cKey][tKey][sKey]
							);
							UI.props[skinName][cKey][tKey][sKey] = props;
						}
					}
				}
			}
		}
		UI.props[skinName].preprocessed = true;
	},
	

	/*
	Function: get
		get properties for provided class. This methos will check in the options of the instance needed parameters.
		
	Properties:
		- className - (object) A UI.Element (or a child class) instance.
		
	className: (object)
		the get method will use in the provided instance following options :
			options.skin
			options.component
			option.type
			options.props
			options.style
		It will also check for other options, as defined in skin sheet as shortkeys
		
	Return:
		- properties - (object) An object containing skin properties for current type, merged with optional provided custom properties.
	 */
	
	get: function(className){
		var
			skin = className.options.skin ? className.options.skin : this.defaultSkin,
			cKey = className.options.component,
			tKey = className.options.type,
			props = className.options.props,
			styles = className.options.styles;
		
		//check if it was already preprocessed
		if (!UI.props[skin].preprocessed) {
			this.processSkin(skin);
		}
		
		var type;
		
		//get properties for provided type
		if (UI.props[skin][cKey][tKey]) {
			type = $unlink(UI.props[skin][cKey][tKey]);
		} else if (UI.props[skin][cKey]['default']) {
			type = $unlink(UI.props[skin][cKey]['default']);
		} else {
			type = {
				'default': $unlink(UI.props[skin]['default'])
			};
		}
		//add custom states
		for (var csKey in props) {
			if (!type[csKey]) {
				type[csKey] = props[csKey];
			}
		}
		
		for (var sKey in type) {
			//bind shortcuts
			if(type[sKey].shortcuts) {
				for (var scKey in type[sKey].shortcuts) {
					if (className.options[scKey]) {
						// eval is evil..					
						eval('type[\'' + sKey + '\'].' + type[sKey].shortcuts[scKey] + ' = this.merge(type[\'' + sKey + '\'].' + type[sKey].shortcuts[scKey] + ',className.options.' + scKey + ')');
					}
				}
			}

			//merge custom properties
			if (props) {
				type[sKey] = this.merge(type[sKey], props['default'], props[sKey]);
			}
			
			//merge custom styles
			type[sKey].styles = this.merge(type[sKey].styles, styles);
		}
		
		//remove shadows if not used
		//if (type['default'].layers.base.shadow.size === 0) {
		//	delete type['default'].shadows;
		//}
		
		return type;
	},
	
	/*
	Function: getComponentProps
		get skin definition for specified component (inside an other element)
		
	Properties:
		- component - (string) the name of the component
		
	Return:
		- properties - (object) Object containing component properties
	*/
	
	getComponentProps: function(skin, component){
		var componentProps = {};
		$H(skin).each(function(state, key){
			if (state.components && state.components[component]){
				componentProps[key] = state.components[component];
			}
		});
		return componentProps;
	},
		
	/*
	Function: merge
		private function
		
		merge is a lighter version of the core mootools merge function
		Merges any number of objects recursively without referencing them or their sub-objects.
		
	See also:
		mootools merge function	
	*/	
	
	merge: function() {
		var mix = {};
		for (var i = 0, l = arguments.length; i < l; i++){
			var object = arguments[i];
			for (var key in object){
				var op = object[key], mp = mix[key];
				mix[key] = ($type(op) == 'object' && $type(mp) == 'object') ? this.merge(mp, op) : op;
			}
		}
		return mix; 
	}
	
});
