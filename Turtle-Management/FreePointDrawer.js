function FreePointDrawer(options){
	IRender.call(this,options);
	this.hasDrawingStarted = false;
}

//javascript 'fake inheritance' just like its creator's Penis.
FreePointDrawer.prototype = new IRender();
FreePointDrawer.prototype.constructor = FreePointDrawer;

//Derived functions
FreePointDrawer.prototype.onDraw = function (position, context) {
    var x = position.x;
    var y = position.y;
    //if not setup, setup
    if (!this.hasDrawingStarted) {
        this.hasDrawingStarted = true;
        context.beginPath();
        context.moveTo(x, y);
    } else { //else resume from point before
        context.lineTo(x, y);
        context.stroke();
    }

    var points = new DataMessage(x, y);
    points.X = x;
    points.Y = y;
    Draw.sendPoints(points);

}
FreePointDrawer.prototype.onMouseDown = function(mouseEvent,context){
	this.isMouseDown = true;
	var mousePosition = convertMousePositionFromMouseEvent(mouseEvent);
	this.onDraw(mousePosition,context);
}
FreePointDrawer.prototype.onMouseUp = function(mouseEvent,context){
	this.isMouseDown = false;
	this.hasDrawingStarted = false;
}
FreePointDrawer.prototype.onMouseMove = function(mouseEvent,context){
	if(this.isMouseDown) this.onMouseDown(mouseEvent,context);
}
