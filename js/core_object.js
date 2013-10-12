var Config = {
    tableTitle: 'Table Name',
    tableTitleColor: '#47423F',
    tableTitleBgColor: '#527578'
}

function Table(r, x, y) {
    this.paper = r;   
    this.title = 'Table Name';    
    this.x = x;
    this.y = y;
    this.rect;
}

Table.prototype.draw = function() {
    var paper = this.paper;
    var rect = paper.rect(this.x, this.y, 150, 200);
    var titleBorder = paper.rect(this.x, this.y, 150, 30);
    titleBorder.attr({fill: ''});
    this.rect = rect;
}

Table.prototype.title = function() {
    var paper = this.paper;
    var box;
}

Table.prototype.init = function() {
    var self = this;
    self.draw();
}

