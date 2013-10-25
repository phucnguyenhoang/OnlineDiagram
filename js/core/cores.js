var Entity;
Entity = function(layer, x, y) {
	console.log('Create new Entity object');	
	var group = new Kinetic.Group({
        x: 0,
        y: 0,
		draggable: true
	});

    this.LAYER = layer;
	this.ENTITY = group;
	this.X = x;
    this.Y = y;
    this.W = 150;
    this.H = 30;
    this.FILL = '#D4E7ED';
    this.COLOR = '#47423F';
	this.TITLE_COLOR = '#FFFFFF';
	this.TITLE_FILL = '#7195A3';
	this.NUM_ATTR = 0;
	this.LIST_ATTR = new Array();
	
	var border = new Kinetic.Rect({
		x: this.X,
		y: this.Y,
		width: this.W,
		height: (this.NUM_ATTR + 1)*this.H,
		stroke: 'white',
        strokeWidth: 4,
		shadowColor: 'white',
        shadowBlur: 10
	});
	
	this.ENTITY.add(border);
	this.LAYER.add(this.ENTITY);
};

Entity.prototype._drawTitle = function() {
	var self = this;
	var titleBox = new Kinetic.Rect({
		x: self.X,
		y: self.Y,
		width: self.W,
		height: self.H,
		fill: self.TITLE_FILL
	});
	var titleText = new Kinetic.Text({
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
	this.titleBox = titleBox;
	this.titleText = titleText;
	this.ENTITY.add(titleBox);
	this.ENTITY.add(titleText);
};

Entity.prototype.setTitle = function(txt) {
	this.titleText.setText(txt);
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
				y: self.Y + numAttr*(self.H),
				width: self.W,
				height: self.H,
				fill: self.FILL
			});
			var attrText = new Kinetic.Text({
				text: o.name,
				x: self.X + 25,
				y: self.Y + numAttr*(self.H) + parseInt(self.H/4),       
				fontSize: 16,
				align: 'left',
				fontFamily: 'Calibri',
				fill: self.COLOR
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
				y: self.Y + numAttr*(self.H) + 12,
				data: 'M20,0C25,-30 -25,-30 -20,0C-20,5 -20,8 -10,15L-10,60L0,65L7,58L7,55L5,53L5,52L6,50L4,47L4,45L6,40L6,36L5,33L5,30L4,28L4,23C11,23 8,15 10,14C20,8 19,6 20,0z',
				fill: '#EB8540',
				scaleX: .2,
				scaleY: .15
			});
			
			attr.primaryKey = key;
			this.ENTITY.add(key);
		}
		
		this.LIST_ATTR[numAttr] = attr;
		this.NUM_ATTR = numAttr;
		
	} else {
		console.log('Param error');
	}
};

Entity.prototype.addAttr = function(option) {
	var self = this;
	self._drawAttr(option);
	this.LAYER.draw();
};

Entity.prototype._draw = function() {
	var self = this;
	self._drawTitle();
	this.LAYER.draw();
};

Entity.prototype._setEventListener = function() {
	var self = this
		body = document.body;
	self.ENTITY.on('mouseover', function() {
		body.style.cursor = 'move';
	});
	self.ENTITY.on('mouseout', function() {
		body.style.cursor = 'default';
	});
	self.ENTITY.on('click', function() {
		alert('ok');
	});
};

Entity.prototype.init = function() {
	var self = this;
	self._draw();
	self._setEventListener();
};

























