var Config = new Default();
function Table(r, x, y) {
    this.paper = r;  
    this.x = x;
    this.y = y;
    this.w = Config.tableWidth;
    this.h = Config.tableHeight;
    this.titleText = Config.tableTitle;    
    this.titleSize = Config.tableTitleSize;
    this.titleFill = Config.tableTitleBgColor;
    this.titleColor = Config.tableTitleColor;
    this.rect;
    this.title;
};

Table.prototype.draw = function() {
    var paper = this.paper,
        x = this.x,
        y = this.y,
        w = this.w,
        h = this.h,
        fill = this.titleFill;
    var rect = paper.rect(x, y, w, h);
    var titleBorder = paper.rect(x, y, w, 30).attr({fill: fill});
    var s = paper.set();
    s.push(rect, titleBorder);
    this.rect = s;
};

Table.prototype.setTitle = function() {
    var paper = this.paper,
        x = this.x + parseInt(this.w/2),
        y = this.y + 15,
        title = this.titleText,
        size = this.titleSize,
        color = this.titleColor;
    
    var txt = paper.text(x, y, title).attr({stroke: color, 'font-size': size});
    this.title = txt;
};

Table.prototype.init = function() {
    var self = this;
    self.draw();
    self.setTitle();
};

