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
    this.x = x;
    this.y = y;
    this.w = 150;
    this.h = 30;
    this.fill = '#D4E7ED';
    this.color = '#47423F';
    this.text = 'Attribute name';
    this.type = 'cell';
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
Cells.prototype._rect = function() {
    var self = this;
    var rect = new Kinetic.Rect({
        x: self.x,
        y: self.y,
        width: self.w,
        height: self.h,
        fill: self.fill
    });
    this.rect = rect;
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
        x: self.x + 12,
        y: self.y + 12,
        data: 'M20,0C25,-30 -25,-30 -20,0C-20,5 -20,8 -10,15L-10,60L0,65L7,58L7,55L5,53L5,52L6,50L4,47L4,45L6,40L6,36L5,33L5,30L4,28L4,23C11,23 8,15 10,14C20,8 19,6 20,0z',
        fill: '#EB8540',
        scaleX: .2,
        scaleY: .17
    });
    this.key = key;
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
        x: self.x + 25,
        y: self.y + 7,
        text: 'AttributeName',
        fontSize: 17,
        fontFamily: 'Calibri',
        align: 'left',
        fill: self.color
    });
    this.text = txt;
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
        x: self.x + parseInt(self.x/2),
        y: self.y + 7,
        text: 'Entity name',
        fontSize: 17,
        align: 'center',
        fontStyle: 'bold',
        fontFamily: 'Calibri',
        fill: self.color
    });
    this.title = txt;
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

/*
 * 
 * @returns undefined
 */
Cells.prototype.drawTitle = function() {
    this._rect();
    this._title();
    main.layer.add(this.rect);
    main.layer.add(this.title);    
};

/*
 * 
 * @returns undefined
 */
Cells.prototype._draw = function() {
    this._rect();
    this._key();
    this._text();
    main.layer.add(this.rect);
    main.layer.add(this.key);
    main.layer.add(this.text);
};

/*
 * 
 * @Name: init
 * @Param: undefined
 * @Retrun: undefined
 * @Action: init Cells object
 * 
 */
Cells.prototype.init = function() {
    var layer = main.layer;
    main.stage.add(layer);
    this._draw();
};


/*****************************************************************************************************************************/
/*****************************************************************************************************************************/
Entity = function(x, y) {
    this.x = x;
    this.y = y;
    this.title = null;
};
Entity.prototype.drawTitle = function() {
    var objTitle = new Cells(this.x, this.y);
    objTitle.drawTitle();
    this.title = objTitle;
    this.title.setFill('#7195A3');
};
Entity.prototype.init = function() {
    this.drawTitle();
    var layer = main.layer;
    main.stage.add(layer);
};
