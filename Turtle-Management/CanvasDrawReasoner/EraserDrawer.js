/*
 * EraserDrawer.js
 */

function EraserDrawer(options){
	IRender.call(this,options);
	this.width = 5;
	this.height = 5;
	this.type = 'rectangle';
}

//javascript 'fake inheritance' just like its creator's Penis.
EraserDrawer.prototype = new IRender();
EraserDrawer.prototype.constructor = EraserDrawer;

EraserDrawer.prototype.onDraw = function (position, context) {
    //get center position of x and y
    var x = position.x - this.width / 2;
    var y = position.y - this.height / 2;

    var eraser = new DataMessage(position.x, position.y);
    eraser.X = position.x;
    eraser.Y = position.y;
    eraser.type = this.type;
    eraser.lineWidth = this.width;
    eraser.height = this.height;

    Dummy.erase(eraser);

    switch (this.type) {
        case 'rectangle': this._onRectangleErase(x, y, context); break;
        case 'circle': this._onCircleErase(position.x, position.y, context); break;
        default: this._onRectangleErase(x, y, context); break;
    }

}
EraserDrawer.prototype.onMouseDown = function(mouseEvent,context){
	this.isMouseDown = true;
	var mousePosition = convertMousePositionFromMouseEvent(mouseEvent);
	this.onDraw(mousePosition,context);
}
EraserDrawer.prototype.onMouseUp = function(mouseEvent,context){
	this.isMouseDown = false;
}
EraserDrawer.prototype.onMouseMove = function(mouseEvent,context){
	if(this.isMouseDown) this.onMouseDown(mouseEvent,context);
}
EraserDrawer.prototype.setText = function(text){
	this.text = text;
}
EraserDrawer.prototype.setWidth = function(width){
	this.width = 5 + width;
}
EraserDrawer.prototype.setHeight = function(height){
	this.height = 5 + height;
}
EraserDrawer.prototype.setEraserType = function(type){
	this.type = type;
}
EraserDrawer.prototype._onRectangleErase = function(x,y,context){
	var prevFillStyle = context.fillStyle;
	context.fillStyle = "#FFFFFF";
	context.fillRect(x,y,this.width,this.height);
	context.fillStyle = prevFillStyle;
}
EraserDrawer.prototype._onCircleErase = function(x,y,context){
	var prevFillStyle = context.fillStyle;
	context.fillStyle = "#FFFFFF";
	context.beginPath();
		context.arc(x,y,this.width,0,Math.PI * 2,false);	
	context.closePath();
	context.fill();	
	context.fillStyle = prevFillStyle;
}