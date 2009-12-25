/*
	Class: UI.ListView
		The UI.ListView class defines objects that manage the list.
	
	Extends:
		<UI.View>
	
	Require:
		<UI.Canvas>
		<UI.Skin>
		<UI.Element>
		<UI.View>
		<UI.Scrollbar>
		
	Arguments:
		options
		
	Options:
		itemType - (string)
		scroll - (boolean) react on scrollwheel if set to true
		data - (array)
	
	Returns:
		Listview object.
		
	Example:
		(start code)
		var listview = new UI.ListView({
			url: 'data.php?id=42',
			width: 260,
			height: 400,
			scroll: true 
		}).inject(this.content);
		(end)	

	Implied global:
		UI,
		$H,
		Class,Request 

	Members: 
		Element, Extends, JSON, ListView, View, addEvent, addItems, 
	    bind, build, component, components, content, data, each, element, erase, 
	    fireEvent, get, getData, height, html, inject, item, itemObject, 
	    itemType, items, label, onSuccess, options, parent, props, scroller, 
	    setScroller, skin, styles, type, url, width
*/

UI.ListView = new Class({

	Extends: UI.View,
		
	options: {
		component: 'listview',
		
		data: [],
		
		itemObject: 'Button',
		
		item: {
			component: 'itemList',
			type: 'default',
			label: false
		},
		
		scroller : false,
		
		/*{
			area:  40,
			velocity: 2,
			fps:50
		},*/
		
		width: '100%',
		height: '100%',
		itemType: 'itemList'
	},
	
	/*
	Method: build
		private function
	
		call <UI.View::build>, get listview's data then process list

	Returns:
		(void)

	See also:
		<UI.View::build>
	*/

	build: function() {
		this.parent();
		
		this.getData(this.options.url);
		
		if (this.options.scroller) {
			this.setScroller(this.options.scroller);
		}
	},
	
	
	
	
	/*
	Method: getData
		private function
	
		get data by doing an ajax request if url is defined, or using data set in options
	
	Arguments:
		url - (string) Url where to get data
		options - (object) class options

	Returns:
		(void)
	*/

	getData: function(url, options){
		if (this.options.url) {
			var request = new Request.JSON({
				url: url,
				onSuccess: function(response,text){
					this.addItems(response);
				}.bind(this)
			}).get();
			
		}
		else {
			this.addEvent('injected', function(){
				this.addItems(this.options.items);
			}.bind(this));
		}
	},

	/*
	Function: processList
		private function
		
		Parse datas and inject them in view content.
	
	Arguments:
		data - (object) data to be used during template interpolation
	
	Return:
		this
	*/

	addItems: function(items){
		
		if (this.options.skin) {
			this.options.item.skin = this.options.skin;
		}
			
		items.each(function(object){
			var item = new UI[this.options.itemObject](this.options.item)
			.inject(this.content);
			
			$H(object).erase('type').each(function(value,key){
				var o = new UI.Element({
					html: value,
					styles: this.props.components[key].styles
				}).inject(item.element);
				this.fireEvent('resize');
			}, this);
		}, this);
	}
});
