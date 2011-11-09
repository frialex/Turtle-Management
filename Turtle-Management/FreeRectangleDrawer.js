function FreeRectangleDrawer(options){
	IRender.call(this,options);
	this.hasDrawingStarted = false;
	this.width  = 10;
	this.height = 10;
}

//javascript 'fake inheritance' just like its creator's Penis.
FreeRectangleDrawer.prototype = new IRender();
FreeRectangleDrawer.prototype.constructor = FreeRectangleDrawer;

//Derived functions
FreeRectangleDrawer.prototype.onDraw = function(position,context){
	var x = position.x;
	var y = position.y;
	context.fillRect(x,y,this.width,this.height);
	context.strokeRect(x,y,this.width,this.height);
}
FreeRectangleDrawer.prototype.onMouseDown = function(mouseEvent,context){
	this.isMouseDown = true;
	var mousePosition = convertMousePositionFromMouseEvent(mouseEvent);
	this.onDraw(mousePosition,context);
}
FreeRectangleDrawer.prototype.onMouseUp = function(mouseEvent,context){
	this.isMouseDown = false;
	this.hasDrawingStarted = false;
}
FreeRectangleDrawer.prototype.onMouseMove = function(mouseEvent,context){
	if(this.isMouseDown) this.onMouseDown(mouseEvent,context);
}
FreeRectangleDrawer.prototype.setSize = function(width,height){
	this.width = width;
	this.height = height;
}
