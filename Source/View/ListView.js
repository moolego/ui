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
			url				: 'data.php?id=42',
			width			: 260,
			height			: 400,
			scroll			: true 
		}).inject(this.content);
		(end)	
*/

UI.ListView = new Class({
	Extends					: UI.View,
		
	options: {
		component			: 'listview',
		
		data				: [],
		
		itemObject	 		: 'Button',
		
		item				: {
			component	: 'itemList',
			type			: 'default',
			label : false
		},
		
		width				: '100%',
		height				: '100%',
		itemType			: 'itemList',
	},
	
	/*
	Method: build
		private function
	
		call <UI.View::build> then get listview's data

	Returns:
		(void)

	See also:
		<UI.View::build>
	*/

	build : function() {
		this.parent();
		
		this.getData(this.options.url);
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

	/*
	Function: getData
		if the url options is give 
	
	Arguments:
		data - data to be used during template interpolation
	*/

	getData : function ( url, options) {
		if (this.options.url) {
			 new Request.JSON({
				url : url,
		        onComplete:function(response) {
					this.processList(response);
		        }.bind(this)
		    }).get();
			
		} else {
			this.addEvent('injected', function(){
				this.processList(this.options.data);
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

	processList : function(data){
		
		if (this.options.skin)
			this.options.item.skin = this.options.skin;
			
		data.each(function(element){
			var item = new UI[this.options.itemObject](this.options.item)
			.inject(this.content);
			
			$H(element).erase('type').each(function(value,key){
				
				new UI.Element({
					html : value,
					styles : this.props.components[key].styles,
				}).inject(item.element);
				this.fireEvent('onResize');
			}, this)
		}, this);
	}
});
