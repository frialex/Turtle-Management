//Given the decimal value of r,g,b, the function returns
//the concatenation of the hex value of each argument
function hexFromRGB(r, g, b) {
	var hex = [
		r.toString( 16 ),
		g.toString( 16 ),
		b.toString( 16 )
	];
	$.each( hex, function( nr, val ) {
		if ( val.length === 1 ) {
			hex[ nr ] = "0" + val;
		}
	});
	return hex.join( "" ).toUpperCase();
}
function RGBFromHex(hexColorCode){
	var hex = cutHex(hexColorCode);
	return [hexToR(hex), hexToG(hex) , hexToB(hex)];
}
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

function convertMousePositionFromMouseEvent(e)
{
    //this section is from http://www.quirksmode.org/js/events_properties.html
    var targ;
    if (!e)
        e = window.event;
    if (e.target)
        targ = e.target;
    else if (e.srcElement)
        targ = e.srcElement;
    if (targ.nodeType == 3) // defeat Safari bug
        targ = targ.parentNode;

    var x = e.pageX - $(targ).offset().left;
    var y = e.pageY - $(targ).offset().top;

    return {"x": x, "y": y};
}

function alertProperty(arg){
	for(var p in arg){
		alert(p + ' = ' + arg[p] );
	}
}

function uniqueId(){
	return (new Date()).getTime();
}

//returns a new jquery element object 
function createElement(tagName){
	return $(document.createElement(tagName));
}
function saveFile(strData){
	var prevLoc = document.location.href;
	document.location.href = strData;
	document.localtion.href = prevLoc;
}
