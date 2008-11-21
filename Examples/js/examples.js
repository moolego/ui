
window.addEvent('domready', function() {
	new UI.Select({
		list : [
			{
				text : 'View',
				onClick : function() { document.location = 'view.js' }
			},
			{
				text : 'Window',
				onClick : function() { document.location = 'window.js' }
			},
			{
				text : 'Button',
				onClick : function() { document.location = 'button01.js' }
			},
			{
				text : 'Window',
				onClick : function() { document.location = 'controls.js' }
			},
			{
				text : 'Window',
				onClick : function() { document.location = 'window.js' }
			},
			{
				text : 'Window',
				onClick : function() { document.location = 'window.js' }
			},
			{
				text : 'Slider',
				onClick : function() { document.location = 'slider01.js' }
			}
			
		],
		styles : {
			position : 'absolute',
			right : '20px', 
			top : '35px'
		}
	}).inject(document.body);
	console.log('exxamples');
});