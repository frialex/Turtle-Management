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
    var width = context.lineWidth;

    var points = new DataMessage(x, y);
    points.X = x;
    points.Y = y;
    points.lineWidth = context.lineWidth;
    points.senderId = PokeIn.GetClientId();
    points.type = "NULL";
    points.height = 0;

    //if not setup, setup
    if (!this.hasDrawingStarted) {
        this.hasDrawingStarted = true;
        context.beginPath();
        context.moveTo(x, y);
        Dummy.startline(points);

    } else { //else resume from point before
        context.lineTo(x, y);
        context.stroke();
        Dummy.resumeline(points);
    }
}

FreePointDrawer.prototype.server_start_line = function (position) {
    var canvas = document.getElementById("blackboard-canvas");
    var context = canvas.getContext('2d');
    context.lineWidth = position.lineWidth;
    context.beginPath();
    context.moveTo(position.X, position.Y);
}

FreePointDrawer.prototype.server_resume_line = function (position) {
    var canvas = document.getElementById("blackboard-canvas");
    var context = canvas.getContext('2d');
    context.lineWidth = position.lineWidth;
    context.lineTo(position.X, position.Y);
    context.stroke();
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
