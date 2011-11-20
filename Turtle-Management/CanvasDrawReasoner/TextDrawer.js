/*
 * TextDrawer.js
 */

function TextDrawer(options){
	IRender.call(this,options);
	this.hasDrawingStarted = false;
	this.text = "";
}

//javascript 'fake inheritance' just like its creator's Penis.
TextDrawer.prototype = new IRender();
TextDrawer.prototype.constructor = TextDrawer;

TextDrawer.prototype.onDraw = function(position,context){
	var x = position.x;
	var y = position.y;
	//if not setup, setup
	if(!this.hasDrawingStarted){
		this.hasDrawingStarted = true;
		context.fillText(this.text,x,y);
	}else{ //else resume from point before
		context.fillText(this.text,x,y);
	}
}
TextDrawer.prototype.onMouseDown = function(mouseEvent,context){
	this.isMouseDown = true;
	var mousePosition = convertMousePositionFromMouseEvent(mouseEvent);
	this.onDraw(mousePosition,context);
}
TextDrawer.prototype.onMouseUp = function(mouseEvent,context){
	this.isMouseDown = false;
	this.hasDrawingStarted = false;
}
TextDrawer.prototype.onMouseMove = function(mouseEvent,context){
	//if(this.isMouseDown) this.onMouseDown(mouseEvent,context);
}
TextDrawer.prototype.setText = function(text){
	this.text = text;
}

