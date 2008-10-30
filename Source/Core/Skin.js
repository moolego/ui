/*

Class: UI.Skin
	The UI.Skin class defines singleton object that manage skins.

Require:


Arguments:
	Options
	
Options: 
	skin - (string) skin name defined in skins. ie: GreyGlass
	component - (string) 
	path - (optional)

Example:
	(start code)
	this.skin = UI.skin.get({
			skin : this.options.skin,
			component : this.options.name, 
			type : this.options.type, 
			props : this.options.props
		});
	(end)
*/

UI.Skin = new Class({
	Singleton 	: true,
 	Implements	: [Events, Options],
	
	options : {
		skin	: 'GreyGlass'
	},
 	
	initialize : function(options) {
		this.setOptions(options);
		this.defaultSkin = this.options.skin;
	},
	
	merge : function() {
		var mix = {};
		for (var i = 0, l = arguments.length; i < l; i++){
			var object = arguments[i];
			for (var key in object){
				var op = object[key], mp = mix[key];
				mix[key] = ($type(op) == 'object' && $type(mp) == 'object') ? this.merge(mp, op) : op;
			}
		}
		return mix;
	},
	
	processSkin : function(skinName) {
		//we merge syles for each states of each type of components
		for (var cKey in UI.props[skinName]) {
			if (cKey != 'default') {
				for(var tKey in UI.props[skinName][cKey]) {
					for(var sKey in  UI.props[skinName][cKey][tKey]) {
						if (sKey != 'shortcuts') {
							var props = UI.props[skinName]['default'];
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
			get part of the skin définition according component
			
		Properties: (hash)
			skin - (string) the skin object (if not define the skin define when instanciate will be used)
			component - (string) the name of the component
			type - (string) type of the previously define component (default/transparent for window or default/round for button)
	 */
	
	get : function(className){
		var
			skin		= className.options.skin ? className.options.skin : this.defaultSkin,
			cKey		= className.options.component,
			tKey		= className.options.type,
			props		= className.options.props,
			styles		= className.options.styles;
		
		//check if it was already preprocessed
		if(!UI.props[skin].preprocessed) this.processSkin(skin);

		//get properties for provided type
		var type = $unlink(UI.props[skin][cKey][tKey]);
		
		for (var sKey in type) {
			//bind shortcuts
			if(type[sKey].shortcuts) {
				for (var scKey in type[sKey].shortcuts) {
					if (className.options[scKey])
						eval('type[\'' + sKey + '\'].' + type[sKey].shortcuts[scKey] + ' = this.merge(type[\'' + sKey + '\'].' + type[sKey].shortcuts[scKey] + ',className.options.' + scKey + ')');
				}
			}
			
			//merge custom properties
			if (props)
				type[sKey] = this.merge(type[sKey], props['default'], props[sKey]);
			
			//merge custom styles
			type[sKey].styles = this.merge(type[sKey].styles, styles);
			
			//set size
			if (className.options.width) type[sKey].width = className.options.width;
			if (className.options.height) type[sKey].height = className.options.height;
			
			//add custom states
			for(var csKey in props) {
				if(!type[csKey]) type[csKey] = props[csKey];
			}
		}
		
		//remove shadows if not used
		if (type['default'].layers.shadow.size == 0) {
			delete type['default'].shadows;
		};
		console.log(type);
		return type;
	},
	
	/*
		Function: getComponentProps
			get skin definition for specified component (inside an other element)
			
		Properties: (hash)
			component - (string) the name of the component
	*/
	
	getComponentProps : function(skin, component){
		var componentProps = {};
		$H(skin).each(function(state, key){
			if (state.components && state.components[component]){
				componentProps[key] = state.components[component];
			}
		});
		return componentProps;
	}
	
 });