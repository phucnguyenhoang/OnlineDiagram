var main,
    Cells,
    Entity;

/*
 * create main panel
 */
main = new Main();
console.log(main);

//create Cells object
Cells = function(x, y) {   
    this.X = x;
    this.Y = y;
    this.W = 150;
    this.H = 30;
    this.FILL = '#D4E7ED';
    this.COLOR = '#47423F';
	this.TITLE_COLOR = '#FFFFFF';
	this.TITLE_FILL = '#7195A3';
    this.rect = null;
    this.text = null;
    this.key = null;
    this.title = null;
};

/*
 * 
 * @Name: _rect
 * @Param: undefined
 * @Retrun: undefined
 * @Action: draw cell into layer
 * 
 */
Cells.prototype._rect = function(type) {
    var self = this;
	if (type == 'title') {
		var rect = new Kinetic.Rect({
			x: self.X,
			y: self.Y,
			width: self.W,
			height: self.H,
			fill: self.TITLE_FILL
		});
	} else {
		var rect = new Kinetic.Rect({
			x: self.X,
			y: self.Y,
			width: self.W,
			height: self.H,
			fill: self.FILL
		});
	}
    //this.rect = rect;
	return rect;
};

/*
 * 
 * @Name: _key
 * @Param: undefined
 * @Retrun: undefined
 * @Action: draw key into layer
 * 
 */
Cells.prototype._key = function() {
    var self = this;
    var key = new Kinetic.Path({
        x: self.X + 12,
        y: self.Y + 12,
        data: 'M20,0C25,-30 -25,-30 -20,0C-20,5 -20,8 -10,15L-10,60L0,65L7,58L7,55L5,53L5,52L6,50L4,47L4,45L6,40L6,36L5,33L5,30L4,28L4,23C11,23 8,15 10,14C20,8 19,6 20,0z',
        fill: '#EB8540',
        scaleX: .2,
        scaleY: .17
    });
    //this.key = key;
	return key;
};

/*
 * 
 * @Name: _text
 * @Param: undefined
 * @Retrun: undefined
 * @Action: draw text into layer
 * 
 */
Cells.prototype._text = function() {
    var self = this;
    var txt = new Kinetic.Text({
		text: 'AttributeName',
        x: self.X + 25,
        y: self.Y + 7,        
        fontSize: 16,
        fontFamily: 'Calibri',
        align: 'left',
        fill: self.COLOR
    });
    //this.text = txt;
	return txt;
};

/*
 * 
 * @Name: _title
 * @Param: undefined
 * @Retrun: undefined
 * @Action: draw title into layer
 * 
 */
Cells.prototype._title = function() {
    var self = this;
    var txt = new Kinetic.Text({
		text: 'Entity name',
        x: self.X,
        y: self.Y + parseInt(self.H/4),
		width: self.W,        
        fontSize: 18,
        align: 'center',
        fontStyle: 'bold',
        fontFamily: 'Calibri',
        fill: self.TITLE_COLOR
    });
    //this.title = txt;
	return txt;
};

Cells.prototype.drawTitle = function() {
	var self = this;
	var g = new Kinetic.Group({
		x: self.X,
		y: self.Y
	});

	var r = self._rect('title'),
		t = self._title();
	g.add(r)
	 .add(t);

	return g;
};

/*
 * 
 * @Name: setFill
 * @Param: String color
 * @Retrun: undefined
 * @Action: Set fill color of cell
 * 
 */
Cells.prototype.setFill = function(color) {
    this.rect.setFill(color);
    main.layer.draw();
};

/*
 * 
 * @returns undefined
 */
Cells.prototype.setText = function(txt) {
    
};


/*****************************************************************************************************************************/
/*****************************************************************************************************************************/
Entity = function(x, y) {
    this.X = x;
    this.Y = y;
    this.title = null;
};
Entity.prototype._drawTitle = function() {
	var self = this;
    var objTitle = new Cells(self.X, self.Y);
	var t = objTitle.drawTitle();
	this.title = t;
    main.layer.add(t);
};
Entity.prototype.setTitle = function(txt) {
	console.log(this.title.get('Text'));	
};
Entity.prototype.init = function() {
    this._drawTitle();
    var layer = main.layer;
    main.stage.add(layer);
};
