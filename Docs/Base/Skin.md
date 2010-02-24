Class: UI.Skin {#UI.Skin}
=========================

The UI.Skin class defines a singleton object that handle skins.

### Implements:

Events, Options

### Syntax:

	this.options.skin = this.options.skin ? this.options.skin : ui.defaultSkin;
	UI.skin = new UI.Skin(this.options.skin);
	this.skin = UI.skin.get(this);
	this.props = this.skin[this.options.state];
	
###	Options: 

1. skin - (*string*) Skin name defined in skins. ie: AquaGraphite

### Implied global:
	- MooLego - UI
	- MooTools - $H,$type,$unlink,Class,Events,Options

### Members:

Implements, Skin, component, components, default, defaultSkin,  each, get, getComponentProps, initialize, layers, length, merge,  options, preprocessed, processSkin, props, setOptions, shadow, shadows,  shortcuts, size, skin, styles, type


UI.Skin Method: processSkin {#UI.Skin:processSkin}
---------------------------------------------------

Merge what can be merged on the skin sheet the first time it's called so it will be faster for next calls.

### Syntax:

	this.processSkin(skin);

### Arguments:

1. skinName - (*string*) Name of the skin that should be preprocessed.


UI.Skin Method: get {#UI.Skin:get}
-----------------------------------

Get properties for provided class. This method will check in the options of the instance needed parameters.

### Syntax:

	this.get(object);

### Arguments:
1. className - (*object*) A UI.Element (or a child class) instance.

### className: 

the get method will use in the provided instance following options:

	options.skin
	options.component
	option.type
	options.props
	options.style

It will also check for other options, as defined in skin sheet as shortkeys

### Returns:

* properties - (*object*) An object containing skin properties for current type, merged with optional provided custom properties.



UI.Skin Method: getComponentProps {#UI.Skin:getComponentProps}
---------------------------------------------------------------

Get skin definition for specified component (inside an other element)

### Syntax:


### Properties:

1. component - (*string*) the name of the component
		
###	Returns:

* properties - (*object*) Object containing component properties

UI.Skin Method: merge {#UI.Skin:merge}
---------------------------------------

Merges any number of objects recursively without referencing them or their sub-objects.


### Returns:

* (*object*) Merged object

### Note:

merge is a lighter version of the core mootools merge function.
see also mootools merge function	


