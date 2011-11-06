
function setupApp(){
	//to defeat chrome displaying text cursor when dragging mouse
	document.onselectstart = function(){ return false; }
	window.blackboardApp = new AppController();
}

function refreshSwatch(){
	var red = $( "#red-color-slider" ).slider( "value" );
	var green = $( "#green-color-slider" ).slider( "value" );
	var blue = $( "#blue-color-slider" ).slider( "value" );
	var hex = hexFromRGB( red, green, blue );
	//update swatch's background color
	updateSwatches(hex);
	return hex;		
}

function updateSwatches(hexColorCode){
	$( "#swatch1" ).css( "background-color", "#" + hexColorCode );
	$( "#swatch2" ).css( "background-color", "#" + hexColorCode );
}

function updateColorSliders(hexColorCode){
	var rgb = RGBFromHex(hexColorCode);
	console.log(rgb.toString());
	$("#red-color-slider").slider("value",[rgb[0]]);
	$("#green-color-slider").slider("value",[rgb[1]]);
	$("#blue-color-slider").slider("value",[rgb[2]]);
}
