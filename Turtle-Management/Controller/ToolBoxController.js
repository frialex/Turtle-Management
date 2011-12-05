function ToolBoxController(options){
	_.bindAll(this);
	this.drawingCanvas = options.drawingCanvas;
	this.toolOptionView = options.toolOptionView;
	this.toolBox = options.toolBox;
	this.parentId = options.parentId;
	this._populateToolBox();
	$('#' + this.parentId).append( this.toolBox.tag() );
	
	this.toolItemSubOptionTable = createSubOptionTable();
	this._setInitialSettings();
	
}

ToolBoxController.prototype._populateToolBox = function()
{
	this.toolBox.addItem( createToolItem('Brush-icon.png',this.onBrushIconClicked));
	this.toolBox.addItem( createToolItem('Eraser-icon.png',this.onEraserIconClicked));
	this.toolBox.addItem( createToolItem('Line-icon.png', this.onLineIconClicked));
	this.toolBox.addItem( createToolItem('Upload-image-icon.png', this.onUploadImageIconClicked));
	this.toolBox.addItem( createToolItem('Rectangle-icon.png', this.onRectangleIconClicked));
	this.toolBox.addItem( createToolItem('Circle-icon.png', this.onCircleIconClicked));
	this.toolBox.addItem( createToolItem('Text-icon.png', this.onTextIconClicked));
	this.toolBox.addItem( createToolItem('SaveImage-icon.png', this.onSaveImageIconClicked));
	
}

ToolBoxController.prototype.onBrushIconClicked = function(){
	//clear out sub-options
	
	this.toolOptionView.empty();
	//create sub options
	this._createBrushIconSubOptions();
	//add sub-options to view
	this.toolOptionView.append( this.toolItemSubOptionTable.tag() );
	
	//add slider and label
	this._addSizerView();
	
	//set dot-clicked as initial setting
	this.onDotSubOptionClicked();
}
ToolBoxController.prototype.onEraserIconClicked = function(){

	//clear out sub-options
	this.toolOptionView.empty();
	//create sub-options
	this._createEraserIconSubOption();
	//add sub-option
	this.toolOptionView.append( this.toolItemSubOptionTable.tag() );
	//add slider and label
	this._addSizerView();
	
	//set rectangle eraser to be initial
	this.onCircleEraserClicked();
}
ToolBoxController.prototype.onLineIconClicked = function(){
	alert('line');
}
ToolBoxController.prototype.onUploadImageIconClicked = function(){
	this.toolOptionView.empty();
	this._createUploadImageSubOption();
	//this.toolOptionView.append( this.toolItemSubOptionTable.tag() );
	
}
ToolBoxController.prototype.onRectangleIconClicked = function(){
	alert('rectangle');
}
ToolBoxController.prototype.onCircleIconClicked = function(){
	alert('circle');
}
ToolBoxController.prototype.onTextIconClicked = function(){
	//clear previous data
	this.toolOptionView.empty();
	//clear previous sub-options
	this._createTextIconSubOption();
	
	this.toolOptionView.append( this.toolItemSubOptionTable.tag());
	
	var button = this._getButtonView('Set Text');
	var that = this;
	button.unbind('click');
	button.bind('click', function(){
		var text = that.textArea.val();
		that._setTextState(text);
	})
	this.toolOptionView.append( button );
}
ToolBoxController.prototype.onSaveImageIconClicked = function(){
	var type = "image/png"
	var data = this.drawingCanvas.toImage(type);
	saveFile( data.replace(type, "image/octet-stream") )	
}
ToolBoxController.prototype.inBrushIconOnPointIconClicked = function(){
	alert('inBrushIconOnPointIconClicked');
}
ToolBoxController.prototype._createBrushIconSubOptions = function(){
	this.toolItemSubOptionTable = createSubOptionTable();
	this.toolItemSubOptionTable.addItem( createToolItem('Dot-icon.png',this.onDotSubOptionClicked));
	this.toolItemSubOptionTable.addItem( createToolItem('Filled-Rectangle-icon.png',this.onRectSubOptionClicked) );
}
ToolBoxController.prototype._createTextIconSubOption = function(){
	this.toolItemSubOptionTable = createSubOptionTable();
	//create text area where user can set text to render
	this.textArea = $(document.createElement('textarea'));
	this.textArea.attr('cols',20).attr('rows',5).css('border-width','0px');
	this.toolItemSubOptionTable.addItem( this.textArea );
	
}
ToolBoxController.prototype._createEraserIconSubOption = function(){
	this.toolItemSubOptionTable = createSubOptionTable(2);
	this.toolItemSubOptionTable.addItem( createToolItem('Eraser-rectangle-icon.png',this.onRectangleEraserClicked));
	this.toolItemSubOptionTable.addItem( createToolItem('Eraser-circle-icon.png',this.onCircleEraserClicked));	
}
ToolBoxController.prototype._createUploadImageSubOption = function () {
    this.toolItemSubOptionTable = null;// createSubOptionTable(1);
    //create a view for inputting images from url 
    var label = $(document.createElement('label'))
				.text('Image URL')
				.css('padding-right', '15px')
    var urlField = $(document.createElement('input'))
					.attr('type', 'text')
					.attr('id', 'imageUrlField')
					.css('margin', '5px auto');

    //create a preview view
    var previewDiv = $(document.createElement('div'))
					 .attr('id', 'image-preview-div')
					 .css('background-color', 'gray')
					 .css('margin', '10px auto')
					 .css('pading', '5px')
					 .css('width', '200px')
					 .css('height', '100px');

    var updatePreviewButton = $(document.createElement('button'))
							  .text('update preview')
							  .css('margin-left', '15px')
							  .css('padding', '5px')
							  .bind('click', this.onUpdateImagePreview)
                              .attr('type', 'button');


    var updateCanvasButton = $(document.createElement('button'))
							  .text('update canvas')
							  .css('margin-left', '15px')
							  .css('padding', '5px')
							  .bind('click', this.onUpdateCanvasImage)
                              .attr('type', 'button');

    var wrapper = $(document.createElement('div'))
					.append(label)
					.append(urlField)
					.css('margin', '5px')
					.css('padding', '5px');


    this.toolOptionView.append(wrapper)
					   .append(previewDiv)
					   .append(updatePreviewButton)
					   .append(updateCanvasButton);


}
ToolBoxController.prototype.onUpdateImagePreview = function () {
    var imageUrl = $('#imageUrlField').val();
    server_image_link = imageUrl;
    $("#image-preview-div")
	.css('background-image', 'URL(' + imageUrl + ')')
	.css('background-repeat', 'no-repeat')
	.css('background-size', '200px 100px');



    var x = 0;
    var y = 0;
    var link = new DataMessage(x, y);
    link.type = server_image_link;
    Dummy.startline2(link);
}
ToolBoxController.prototype.onUpdateCanvasImage = function () {
    var url = server_image_link; //$('#imageUrlField').val();
    this.drawingCanvas.drawImage(url, 0, 0);

}



ToolBoxController.prototype.onDotSubOptionClicked = function(){
	//create new renderer only if current on isn't a FreePointDrawer
	if(this._updateRenderer(FreePointDrawer)){
	
	var self = this;
	this._resetSliderCallback('slidestop', function(event,ui){ //add a callback to change rect-size
		self.drawingCanvas.setLineWidth(ui.value);
	})}
	this.drawingCanvas.setLineCap('round');
}
//suboption of brush icon
ToolBoxController.prototype.onRectSubOptionClicked = function(){
	//create new renderer only if current on isn't a FreePointDrawer
	if(this._updateRenderer(FreePointDrawer)){
	var self = this;
	this._resetSliderCallback('slidestop', function(event,ui){ //add a callback to change rect-size
		self.drawingCanvas.setLineWidth(ui.value);
	})}
	this.drawingCanvas.setLineCap('square');
}
ToolBoxController.prototype.onRectangleEraserClicked = function()
{
	if(this._updateRenderer(EraserDrawer))
	{
		var self = this;
		this._resetSliderCallback('slidestop', function(event,ui){ //add a callback to change rect-size
			self.currentRender.setWidth(ui.value);
			self.currentRender.setHeight(ui.value);
		})
	}	
	this.currentRender.setEraserType('rectangle');
	}
ToolBoxController.prototype.onCircleEraserClicked = function(){

	if(this._updateRenderer(EraserDrawer))
	{
	var self = this;
	this._resetSliderCallback('slidestop', function(event,ui){ //add a callback to change rect-size
			self.currentRender.setWidth(ui.value);
			self.currentRender.setHeight(ui.value);
	})
	}
	this.currentRender.setEraserType('circle');
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
		stop: function(event,ui){ 
			$("#brush-icon-slider-value-display").val(ui.value);
		}
	}).css('margin', '10px');
	
	//save it
	this.sizerLabel = label;
	this.sizerInput = input;
	this.sizerSlider = sizeSlider;
}
ToolBoxController.prototype._addSizerView = function()
{	
	this._createSizeHandlerView();
	this.drawingCanvas.setLineWidth(1);
	this.toolOptionView.append(this.sizerLabel )
					   .append(this.sizerInput)
					   .append(this.sizerSlider );
	
}
ToolBoxController.prototype._setInitialSettings = function(){
	//start with the brush icon with the free point drawing
	//this._createBushIconSubOptions();
	this.onBrushIconClicked();
	//this.onDotSubOptionClicked();
}
ToolBoxController.prototype._resetSliderCallback = function(eventName,newCallback){
	this.sizerSlider.unbind(eventName);
	this.sizerSlider.bind(eventName,newCallback);
}
ToolBoxController.prototype._getButtonView = function(name){
	var divWrapper = $(document.createElement('div'))
					.css('margin','5px auto')
					.css('padding','5px 5px 5px 25px');
	var updateButton = $(document.createElement('button')).text(name);
	return divWrapper.append(updateButton);
}
ToolBoxController.prototype._setTextState = function(text)
{
	if(this._updateRenderer(TextDrawer)){
		this.currentRender.setText(text);
	}
	
}
ToolBoxController.prototype._updateRenderer = function(Class){
	var updated = false;
	if(!(this.currentRender instanceof Class)){
		this.drawingCanvas.detachObserver(this.currentRender);
		this.currentRender = new Class();
		this.drawingCanvas.attachObserver(this.currentRender);
		updated = true;
	}
	return updated;
}
//helper functions
function createToolItem(imgName,click){
	var  path = "./images/icon/" + imgName;
	return new ImageIcon({imgSrc: path, onClick: click }).tag();
}
function createSubOptionTable(colSize){
	var size = colSize || 2; //default is 2
	return new Toolbox({col:size});
}

