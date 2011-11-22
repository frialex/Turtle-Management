
function AppController(){
	_.bindAll(this);
	this.drawingPanel = new BlackboardCanvas("blackboard-canvas");
	this.colorChooserPanel = new ColorChooser('color-spectrum-canvas');
	this.colorChooserPanel.addOnMouseClickedAndMovedListener(this.onColorChooserMouseClickedAndMoved);
	
	window.toolboxController = new ToolBoxController({
		drawingCanvas: this.drawingPanel,
		toolOptionView: $("#toolbar-option-view"),
		toolBox: new Toolbox({col: 4}), 
		parentId: 'toolbar-div'
	});
	
	this._initializeView();
	this._setInitialSettings();
}

//called when color rgb is clicked
AppController.prototype.onSliderChange = function(){
	var hexColor = refreshSwatch();
	this.drawingPanel.setStrokeStyle(hexColor);
}
//called when clicked on the color spectrum to change color
AppController.prototype.onColorChooserMouseClickedAndMoved = function(hexColor){
	this.drawingPanel.setStrokeStyle(hexColor);
	updateColorSliders(hexColor);
}

AppController.prototype._initializeView = function(){
	var self = this;
	$("#tools-div").tabs();
	$( "#red-color-slider, #green-color-slider, #blue-color-slider" ).slider({
		orientation: "horizontal",
		range: "min",
		max: 255,
		value: 0,
		slide:  self.onSliderChange,
		change: self.onSliderChange,
	});
	
	//updates slider display value given the display amount in a slide event
	var updateRGBValue = function( event, ui, displayId ) { 
		$(displayId ).val(ui.value );
	}
	
	$("#red-color-slider").bind("slide", function(event,ui){ updateRGBValue(event,ui,"#red-amount")});
	$("#red-color-slider").bind("slidechange", function(event,ui){ updateRGBValue(event,ui,"#red-amount")});
	
	$("#green-color-slider").bind("slide", function(event,ui){ updateRGBValue(event,ui,"#green-amount")});
	$("#green-color-slider").bind("slidechange", function(event,ui){ updateRGBValue(event,ui,"#green-amount")});
	
	$("#blue-color-slider").bind("slide", function(event,ui){ updateRGBValue(event,ui,"#blue-amount")});
	$("#blue-color-slider").bind("slidechange", function(event,ui){ updateRGBValue(event,ui,"#blue-amount")});
		
	//create the accordion
	$("#colorOption-accordion").accordion({});
}
AppController.prototype._setInitialSettings = function(){
	//this.currentRender = new FreePointDrawer();
	//this.drawingPanel.attachObserver(this.currentRender);
}
