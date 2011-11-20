function ToolItem(options){
	options = options || {};
	this.imageIcon = new ImageIcon(options);
}

ToolItem.prototype.getImageIcon = function(){
	return this.imageIcon;
}
ToolItem.prototype.tag = function(){
	return this.imageIcon.tag();
}
