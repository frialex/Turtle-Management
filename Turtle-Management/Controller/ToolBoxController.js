function ToolBoxController(options){
	_.bindAll(this);
	this.drawingCanvas = options.drawingCanvas;
	this.toolOptionView = options.toolOptionView;
	this.toolBox = options.toolBox;
	this.parentId = options.parentId;
	this._populateToolBox();
	$('#' + this.parentId).append( this.toolBox.tag() );
	
	this.toolItemSubOptionTable = new Toolbox({col:2});
	
	this._setInitialSettings();
	
}

ToolBoxController.prototype._populateToolBox = function(){

	this.toolBox.addItem( createToolItem('Brush-icon.png',this.onBrushIconClicked));
	this.toolBox.addItem( createToolItem('Eraser-icon.png',this.onEraserIconClicked));
	this.toolBox.addItem( createToolItem('Line-icon.png', this.onLineIconClicked));
	this.toolBox.addItem( createToolItem('Bezier-Curve-icon.png', this.onCurveIconClicked));
	this.toolBox.addItem( createToolItem('Rectangle-icon.png', this.onRectangleIconClicked));
	this.toolBox.addItem( createToolItem('Circle-icon.png', this.onCircleIconClicked));
	this.toolBox.addItem( createToolItem('Text-icon.png', this.onTextIconClicked));
	this.toolBox.addItem( createToolItem('Sigma-icon.png', this.onSigmaIconClicked));
	
}

ToolBoxController.prototype.onBrushIconClicked = function(){
	//clear out sub-options
	this.toolOptionView.empty();
	
	//add sub-options to view
	this.toolOptionView.append( this.toolItemSubOptionTable.tag() );
	
	//add slider and label
	this._addSizerView();
}
ToolBoxController.prototype.onEraserIconClicked = function(){
	alert('eraser');
}
ToolBoxController.prototype.onLineIconClicked = function(){
	alert('line');
}
ToolBoxController.prototype.onCurveIconClicked = function(){
	alert('curve');
}
ToolBoxController.prototype.onRectangleIconClicked = function(){
	alert('rectangle');
}
ToolBoxController.prototype.onCircleIconClicked = function(){
	alert('circle');
}
ToolBoxController.prototype.onTextIconClicked = function(){
	alert('text');
}
ToolBoxController.prototype.onSigmaIconClicked = function(){
	alert('sigma');
}
ToolBoxController.prototype.inBrushIconOnPointIconClicked = function(){
	alert('inBrushIconOnPointIconClicked');
}
ToolBoxController.prototype._createBushIconSubOptions = function(){

	this.toolItemSubOptionTable.addItem( createToolItem('Dot-icon.png',this.onDotSubOptionClicked));
	this.toolItemSubOptionTable.addItem( createToolItem('Filled-Rectangle-icon.png',this.onRectSubOptionClicked) );
}
//suboption of brush icon
ToolBoxController.prototype.onDotSubOptionClicked = function(){
	//create new renderer only if current on isn't a FreePointDrawer
	if(!(this.currentRender instanceof FreePointDrawer)){
		this.drawingCanvas.detachObserver(this.currentRender);
		this.currentRender = new FreePointDrawer();
		this.drawingCanvas.attachObserver(this.currentRender);	
	}
	var self = this;
	this._resetSliderCallback('slidestop', function(event,ui){ //add a callback to change line-width
		self.drawingCanvas.setLineWidth(ui.value);
	})
	this.drawingCanvas.setLineCap('round');
}
//suboption of brush icon
ToolBoxController.prototype.onRectSubOptionClicked = function(){
	//create new renderer only if current on isn't a FreePointDrawer
	if(!(this.currentRender instanceof FreePointDrawer)){
		this.drawingCanvas.detachObserver(this.currentRender);
		this.currentRender = new FreePointDrawer();
		this.drawingCanvas.attachObserver(this.currentRender);	
	}
	var self = this;
	this._resetSliderCallback('slidestop', function(event,ui){ //add a callback to change rect-size
		self.drawingCanvas.setLineWidth(ui.value);
	})
	this.drawingCanvas.setLineCap('butt');
}
ToolBoxController.prototype._createSizeHandlerView = function(){
	var self = this;
	//create a view to show the slider value
	var label = $("<span>Size: </span>").css('margin', '10px');
	var input = $(document.createElement('input'))
				.attr({
					maxlength: 3,
					value: 1,
					size: 1,
					disabled: true,
					type: "text",
					id: 'brush-icon-slider-value-display'
				}).addClass('slider-value-display');
	
	//create the slider view
	var sizeSlider = $(document.createElement('div')).slider({
		range: "min",
		value: 1,
		min: 1,
		max: 40,
		slide: function(event,ui){
			$("#brush-icon-slider-value-display").val(ui.value);
		},
		/*stop: function(event,ui){ 
			//$("#brush-icon-slider-value-display").val(ui.value);
			self.drawingCanvas.setLineWidth(ui.value);
		}*/
	}).css('margin', '10px');
	
	//save it
	this.sizerLabel = label;
	this.sizerInput = input;
	this.sizerSlider = sizeSlider;
}
ToolBoxController.prototype._addSizerView = function(){
	this._createSizeHandlerView();
	this.drawingCanvas.setLineWidth(1);
	this.toolOptionView.append( this.sizerLabel ).append(this.sizerInput).append(this.sizerSlider );
	
}
ToolBoxController.prototype._setInitialSettings = function(){
	//start with the brush icon with the free point drawing
	this._createBushIconSubOptions();
	//this.currentRender = new FreePointDrawer();
	//this.drawingCanvas.attachObserver(this.currentRender);
	this.onBrushIconClicked();
	this.onDotSubOptionClicked();
}
ToolBoxController.prototype._resetSliderCallback = function(eventName,newCallback){
	this.sizerSlider.unbind(eventName);
	this.sizerSlider.bind(eventName,newCallback);
}
//helper functions
function createToolItem(imgName,click){
	var  path = "./images/icon/" + imgName;
	return new ToolItem({imgSrc: path, onClick: click });
}
