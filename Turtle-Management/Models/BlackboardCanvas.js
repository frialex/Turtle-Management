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
BlackboardCanvas.prototype.attachObserver = function(render){ 
	if(render) this.observers[render.id()] = render; 
}
BlackboardCanvas.prototype.detachObserver = function(render){
	if(render) delete this.observers[render.id()];
}
BlackboardCanvas.prototype.detachAll = function(){
	this.observers = {};
}