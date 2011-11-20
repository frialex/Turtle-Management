function Toolbox(options){
	_.bindAll(this);
	this.colSize= options.col;
	this.itemCount = 0;
	this.toolBox = $(document.createElement('table')).addClass('tools-table');
}

Toolbox.prototype.tag = function(){
	return this.toolBox;
}
Toolbox.prototype.clear = function(){
	this.toolBox.empty();
}
Toolbox.prototype.addItem = function(item){
	//var item = toolItem.tag();
	
	var entry = $(document.createElement('td')).append( item );
	//check if spaces are filled for the current row
	if(this.itemCount % this.colSize == 0){
		this.currentRow = $(document.createElement('tr')); //create a new row
		this.currentRow.append( entry ); //add entry to row
		this.toolBox.append( this.currentRow );  //add row to table
	}else{
		this.currentRow.append(entry);
	}
	++this.itemCount;
}
