function ColorChooser(canvasId){
	_.bindAll(this);
	this.canvas = document.getElementById(canvasId);
	this.canvasContext = this.canvas.getContext('2d');
	this.mouseClickedAndMovedListeners = [];
	
	this.updateColorSpectrumImage("./images/color-spectrum.png")
	
	this.canvas.addEventListener("mousedown",	_.bind(this.onMouseDown,this),false);
    this.canvas.addEventListener('mouseup',		_.bind(this.onMouseUp,this),false);
    this.canvas.addEventListener('mousemove',	_.bind(this.onMouseMove,this),false);
}

ColorChooser.prototype.updateColorSpectrumImage = function(imgSrc){
	//Load image and draw it on canvas when ready
	var colorSpectrumImage = new Image();
	colorSpectrumImage.src = imgSrc;
	
	var that = this;
	colorSpectrumImage.onload = function() {
	  that.canvas.width = colorSpectrumImage.width;
	  that.canvas.height = colorSpectrumImage.height;
	  that.canvasContext.drawImage(colorSpectrumImage,0,0,colorSpectrumImage.width, colorSpectrumImage.height);
	}
}

ColorChooser.prototype.onMouseDown = function (e){
	this.isMouseDown = true;
}
ColorChooser.prototype.onMouseUp = function(e){
	this.isMouseDown = false;
}
ColorChooser.prototype.onMouseMove = function(e){
	if(this.isMouseDown){
		var clickedPosition = convertMousePositionFromMouseEvent(e);
		var imageData = this.canvasContext.getImageData(clickedPosition.x,clickedPosition.y,1,1);
		var pixel = imageData.data;
		var hex = hexFromRGB(pixel[0],pixel[1],pixel[2])
		updateSwatches(hex);
		_.each(this.mouseClickedAndMovedListeners, function(f){f(hex);});
	}
}
ColorChooser.prototype.addOnMouseClickedAndMovedListener = function(func1){
	this.mouseClickedAndMovedListeners.push(func1);
}
