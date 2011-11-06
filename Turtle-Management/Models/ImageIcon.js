function ImageIcon(options){
	this.iconTag = this._makeImgTag(options.imgSrc);
	this.iconTag = this._makeClickable(this.iconTag, options.onClick);
}

ImageIcon.prototype.tag = function(){
	return this.iconTag;
}
ImageIcon.prototype.setOnClickedCallback = function(callbackFunc){
	this.iconTag.click( callbackFunc );
}
ImageIcon.prototype._makeClickable = function(imgTag, onClick){
	return $(document.createElement('a')).attr({
		href: 'javascript:void(0);',
	}).append( imgTag.click(onClick) ); 
}

ImageIcon.prototype._makeImgTag = function(src){
	return $(document.createElement('img')).attr({
		src: src,
		alt: 'icon',
		id: src
	}).mouseover( function(){
		$(this).toggleClass("iconHover");
	}).mouseout( function(){
		$(this).toggleClass("iconHover");
	});
}
