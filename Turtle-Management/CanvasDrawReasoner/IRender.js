/**
  * IRender.js: Represents the interface for all subclass that which to implement their own draw functions
 */

function IRender(opt){
	this._id = uniqueId();
}

IRender.prototype.onDraw = function(position,context){
	alert('Error: Invalid base class function used');
}
IRender.prototype.onMouseDown = function(mouseEvent,context){
	alert('Error: Invalid base class function used');
}
IRender.prototype.onMouseUp = function(mouseEvent,context){
	alert('Error: Invalid base class function used');
}
IRender.prototype.onMouseMove = function(mouseEvent,context){
	alert('Error: Invalid base class function used');
}
IRender.prototype.id = function(){
	return this._id;
}

