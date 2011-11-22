function BlackboardCanvas(canvasId){
    this.isMouseDown = false;
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = this.canvas.offsetWidth;
	this.canvas.height = this.canvas.offsetHeight;
    this.canvasContext = this.canvas.getContext('2d');
    this.canvasContext.lineCap = 'round';
    _.bindAll(this);
    
     //add appropriate event listeners
    this.canvas.addEventListener("mousedown",_.bind(this.onMouseDown,this),false);
    this.canvas.addEventListener('mouseup',_.bind(this.onMouseUp,this),false);
    this.canvas.addEventListener('mousemove',_.bind(this.onMouseMove,this),false);
    
    //holds all observers
    this.observers = {};
}

function canvas_start_line(points) {
    var context = document.getElementById("blackboard-canvas");
    $.each(this.observers, function (index, value) {
        test2 = value;
        value.server_start_line(points);
    });
}

function canvas_resume_line(points) {
    var context = document.getElementById("blackboard-canvas");
    $.each(this.observers, function (index, value) {
        test2 = value;
        value.server_resume_line(points);
    });
}

function canvas_erase(eraser) {
//    alert("ERASER!");

    var test = eraser;
    var context = document.getElementById("blackboard-canvas").getContext('2d');
//    var ed = EraserDrawer(); //TODO: Cant instantiate new class? how does _updateRenderer work?
//    ed.setWidth(10);
//TODO: _updateRender for startline and resume line.. use freepoint drawer
    toolboxController._updateRenderer(EraserDrawer);
    _.each(this.observers, function (observer) {
        var ob = observer;
        ob.setWidth(eraser.lineWidth);
        ob.setHeight(eraser.height);
        ob._onRectangleErase(eraser.X, eraser.Y, context);
    });
}

BlackboardCanvas.prototype.onMouseDown = function(e){
	var context = this.canvasContext;
	_.each(this.observers, function(observer){
       		observer.onMouseDown(e,context);
       	});
}
BlackboardCanvas.prototype.onMouseUp = function(e){
	var context = this.canvasContext;
	_.each(this.observers, function(observer){
			observer.onMouseUp(e,context);
		});
}
BlackboardCanvas.prototype.onMouseMove = function(e){
	var context = this.canvasContext;
	_.each(this.observers, function(observer){
			observer.onMouseMove(e,context);
		});
}
BlackboardCanvas.prototype.clearBoard = function(){
	this.canvas.width = this.canvas.width;
}
BlackboardCanvas.prototype.setStrokeStyle = function(hexColorCode){
	this.canvasContext.strokeStyle = '#' + hexColorCode;
}
BlackboardCanvas.prototype.setFillStyle = function(hexColorCode){
	this.canvas.fillStyle = '#' + hexColorCode;
}
BlackboardCanvas.prototype.setLineWidth = function(width){
	this.canvasContext.lineWidth = width;
}
BlackboardCanvas.prototype.setLineCap = function(type){
	this.canvasContext.lineCap = type;
}
BlackboardCanvas.prototype.getFillSyle = function(){
	return this.canvas.fillStyle;
}
BlackboardCanvas.prototype.getStrokeSyle = function(){
	return this.canvas.strokeStyle;
}
BlackboardCanvas.prototype.attachObserver = function (render) {
    if (render) this.observers[render.id()] = render;
    window.observers = this.observers;
}
BlackboardCanvas.prototype.detachObserver = function(render){
	if(render) delete this.observers[render.id()];
}
BlackboardCanvas.prototype.detachAll = function(){
	this.observers = {};
}
BlackboardCanvas.prototype.drawImage = function(url,dx,dy,dw,dh){
	var image = new Image();
	var that = this;
	image.src = url;
	image.onload = function(){
		//set deafults
		dx = dx || 0;
		dy = dy || 0;
		dw = dw || that.canvas.width;
		dh = dh || that.canvas.height;
		that.canvasContext.drawImage(image,dx,dy,dw,dh);
	}
}
BlackboardCanvas.prototype.toImage = function(type){
	type = type || "image/png";
	return this.canvas.toDataURL(type);
}
