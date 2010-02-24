/*
---
description: The UI.Skin class defines object that handle skins.

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI.Skin]
 
...
*/

UI.Skin = new Class({
	
 	Implements: [Events, Options],
	
	options: {
		skin: 'AquaGraphite'
	},
 	
	initialize : function(options) {
		this.setOptions(options);
		this.defaultSkin = this.options.skin;
		
		return this;
	},

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
	
	getComponentProps: function(skin, component){
		var componentProps = {};
		$H(skin).each(function(state, key){
			if (state.components && state.components[component]){
				componentProps[key] = state.components[component];
			}
		});
		return componentProps;
	},
	
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
