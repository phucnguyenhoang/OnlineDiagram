var DataType = [
    //kieu so
    'tinyInt', 'smallInt', 'mediumInt', 'int', 'bigInt',
    'decimal', 'float', 'double', 'real',
    'bit', 'boolean', 'serial',
    //kieu ngay thang
    'date', 'dateTime', 'timeStamp', 'time', 'year',
    //kieu chuoi
    'char', 'varChar',
    'tinyText', 'text', 'mediumText', 'longText',
    'binary', 'varBinary',
    'tinyBlob', 'mediumBlob', 'blob', 'longBlob',
    'enum', 'set',
    //kieu khac
    'geometry', 'point', 'lineString', 'polygon', 'multiPoint', 'multiLineString', 'multiPolygon', 'geometryCollection'
];
function Entity(layer, id, x, y) {
    'use strict';
    console.log('Create new Entity object');

    this.X = x;
    this.Y = y;
    this.ID = id;
    this.W = 150;
    this.MAX_W = 150;
    this.H = 30;
    this.FILL = '#D4E7ED';
    this.COLOR = '#47423F';
    this.TITLE_COLOR = '#FFFFFF';
    this.TITLE_FILL = '#7195A3';
    this.NUM_ATTR = 0;
    this.LIST_ATTR = new Array();

    var group = new Kinetic.Group({
        x: 0,
        y: 0,
        draggable: true,
        id: this.ID
    });

    var border = new Kinetic.Rect({
        x: this.X,
        y: this.Y,
        width: this.W,
        height: (this.NUM_ATTR + 1) * this.H,
        stroke: 'white',
        strokeWidth: 4,
        shadowColor: 'white',
        shadowBlur: 10,
        name: 'border',
        id: 'border_' + this.ID
    });
    group.add(border);
    layer.add(group);

    this.BORDER = border;
    this.ENTITY = group;
    this.LAYER = layer;
}
;

Entity.prototype._drawBorder = function() {
    var self = this;
    this.BORDER.setHeight((self.NUM_ATTR + 1) * self.H);
};

Entity.prototype.focus = function() {
    this.BORDER.setStroke('red');
};

Entity.prototype.blur = function() {
    this.BORDER.setStroke('white');
};

Entity.prototype._drawTitle = function() {
    var self = this;
    var titleBox = new Kinetic.Rect({
        x: self.X,
        y: self.Y,
        width: self.W,
        height: self.H,
        fill: self.TITLE_FILL,
        id: 'titleBox_' + self.ID
    });
    var titleText = new Kinetic.Text({
        text: 'Entity name',
        x: self.X,
        y: self.Y + parseInt(self.H / 4),
        width: self.W,
        fontSize: 18,
        align: 'center',
        fontStyle: 'bold',
        fontFamily: 'Calibri',
        fill: self.TITLE_COLOR,
        id: 'titleText_' + self.ID
    });

    this.titleBox = titleBox;
    this.titleText = titleText;
    this.ENTITY.add(titleBox);
    this.ENTITY.add(titleText);
};

Entity.prototype._updateBoxWidth = function() {
    var self = this,
        maxWidth = this.MAX_W,
        titleWidth = parseInt(self.titleText.getWidth()),
        numAttr = self.NUM_ATTR,
        maxTypeWidth = 0,
        i = 0;

    for (i = 1; i <= numAttr; i += 1) {
        var textWidth = parseInt(self.LIST_ATTR[i].text.getWidth());
        var typeWidth = parseInt(self.LIST_ATTR[i].type.getWidth());
        var totalWidth = textWidth + typeWidth + 60;
        if (totalWidth > maxWidth) {
            maxWidth = totalWidth;
        }
        if (typeWidth > maxTypeWidth) {
            maxTypeWidth = typeWidth;
        }
    }
    if (titleWidth > maxWidth) {
        maxWidth = titleWidth;
    }

    //ve lai khung sao cho bao trum text
    for (i = 1; i <= numAttr; i += 1) {
        this.LIST_ATTR[i].box.setWidth(maxWidth);
        this.LIST_ATTR[i].type.setX(self.X + maxWidth - maxTypeWidth - 10);
    }
    this.titleBox.setWidth(maxWidth);
    this.titleText.setWidth(maxWidth);
    this.BORDER.setWidth(maxWidth);
    this.MAX_W = maxWidth; 
};

Entity.prototype.setTitle = function(txt) {
    this.titleText.setText(txt);
    //this._updateBoxWidth();
    this.LAYER.draw();
};

Entity.prototype._drawAttr = function(option) {
    if (typeof(option) == 'object') {
        var self = this,
                numAttr = this.NUM_ATTR,
                o = option,
                attr = {};
        numAttr += 1;

        //draw text and box
        if (o.name && typeof(o.name) == 'string') {
            var attrBox = new Kinetic.Rect({
                x: self.X,
                y: self.Y + numAttr * (self.H),
                width: self.W,
                height: self.H,
                fill: self.FILL,
                id: 'attrBox_' + self.ID
            });
            var attrText = new Kinetic.Text({
                text: o.name,
                x: self.X + 25,
                y: self.Y + numAttr * (self.H) + parseInt(self.H / 4),
                fontSize: 16,
                align: 'left',
                fontFamily: 'Calibri',
                fill: self.COLOR,
                id: 'attrText_' + self.ID
            });
            attr.box = attrBox;
            attr.text = attrText;
            this.ENTITY.add(attrBox);
            this.ENTITY.add(attrText);
        }

        //draw primary key
        if (o.primaryKey && typeof(o.primaryKey) == 'boolean') {
            var key = new Kinetic.Path({
                x: self.X + 12,
                y: self.Y + numAttr * (self.H) + 12,
                data: 'M20,0C25,-30 -25,-30 -20,0C-20,5 -20,8 -10,15L-10,60L0,65L7,58L7,55L5,53L5,52L6,50L4,47L4,45L6,40L6,36L5,33L5,30L4,28L4,23C11,23 8,15 10,14C20,8 19,6 20,0z',
                fill: '#EB8540',
                scaleX: .2,
                scaleY: .15,
                id: 'primaryKey_' + self.ID
            });

            attr.primaryKey = key;
            this.ENTITY.add(key);
        }

        //draw data type
        var typeValue = '';
        if (o.type && typeof(o.type) == 'string') {
            typeValue = '<' + o.type + '>'; 
        } else {
            typeValue = '<undefined>';
        }
        var attrType = new Kinetic.Text({
            text: typeValue,
            x: self.X + self.MAX_W,
            y: self.Y + numAttr * (self.H) + parseInt(self.H / 4),
            fontSize: 16,
            align: 'left',
            fontFamily: 'Calibri',
            fontStyle: 'italic',
            fill: self.COLOR,
            id: 'attrType_' + self.ID
        });
        attr.type = attrType;
        this.ENTITY.add(attrType);
        
        
        this.LIST_ATTR[numAttr] = attr;
        this.NUM_ATTR = numAttr;
    } else {
        console.log('Param error');
    }
};

Entity.prototype.addAttr = function(option) {
    this._drawAttr(option);
    this._updateBoxWidth();
    this._drawBorder();
    this.LAYER.draw();
};

Entity.prototype._draw = function() {
    var self = this;
    self._drawTitle();
    this.LAYER.draw();
};

Entity.prototype._setEventListener = function() {
    var self = this,
        body = document.body;
    self.ENTITY.on('mouseover', function() {
        body.style.cursor = 'move';
    });
    self.ENTITY.on('mouseout', function() {
        body.style.cursor = 'default';
    });
    self.ENTITY.on('mousedown', function() {
        this.moveToTop();
        //self.focus();
        self.LAYER.get('.border').each(function(shape, n) {
            shape.setStroke('white');
        });
        self.focus();
    });
};

Entity.prototype.init = function() {
    var self = this;
    self._draw();
    self._setEventListener();
    console.log(self.ENTITY.getAbsolutePosition());   
};

























