
/*
Class: UI.Dialog
	The UI.Dialog class defines objects that manage and coordinate the dialog an application displays on the screen.

Arguments
	options

Options:
		width
		height

Example:
	(start code)
	var dialog = new UI.Dialog({
		width': 		'260',
		height': 		'400',
	});
	(end)

Discussion:
	Still we need this class?
*/

UI.Dialog = new Class({
	Extends		:	UI.Window,
	
	options: {
		center				: true
	}
});