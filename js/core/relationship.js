function LineJoint(layer, x, y) {
    this.beginX = x;
    this.beginY = y;
    this.endX = x;
    this.endY = y;
    this.lines = new Array();
    this.numLine = 0;
    this.entityBegin = undefined;
    this.entityEnd = undefined;
    this.LAYER = layer;
    var blueLine = new Kinetic.Line({
        points: [x, y, x, y],
        stroke: 'blue',
        strokeWidth: 2,
        lineCap: 'round'
    });
    this.line = blueLine;
    this.LAYER.add(blueLine);
    this.LAYER.draw();
}
LineJoint.prototype.update = function(x, y) {
    this.endX = x;
    this.endY = y;
    if (x > this.beginX) {
        x = x - 2;
    } else {
        x = x + 2;
    }
    if (y > this.beginY) {
        y = y - 2;
    } else {
        y = y + 2;
    }
    this.line.setPoints([this.beginX, this.beginY, x, y]);
    this.LAYER.draw();
};

LineJoint.prototype._layGiaoX = function() {
    var entityBegin = this.entityBegin,
        entityEnd = this.entityEnd;
    var beginX1 = entityBegin.newX,
        beginY1 = entityBegin.newY,
        endX1 = entityEnd.newX,
        endY1 = entityEnd.newY,
        beginW = entityBegin.getWidth(),
        beginH = entityBegin.getHeight(),
        endW = entityEnd.getWidth(),
        endH = entityEnd.getHeight();
    var beginX2 = beginX1 + beginW,
        beginY2 = beginY1 + beginH,
        endX2 = endX1 + endW,
        endY2 = endY1 + endH;

   //truong hop 1
   //bang 1 nam trong bang 2 hoac bang 2 nam trong bang 1
   if (
           //neu bang 2 nam trong bang 1
           (endX1 >= beginX1 && endY1 >= beginY1 && endX2 <= beginX2 && endY2 <= beginY2)
           ||
           //new bang 1 nam trong bang 2
           (beginX1 >= endX1 && beginY1 >= endY1 && beginX2 <= endX2 && beginY2 <= endY2)
      ) {
       return 1;
   }
   //truong hop 2
   //bang 2 nam tren ben trai bang mot hoac nguoc lai
   if (
           //neu bang 2 lon bang 1
           (endX1 < beginX1 && endY1 > beginY1 && endX2 <= beginX2 && endY2 < beginY2)
           ||
           //nguoc lai
           (beginX1 < endX1 && beginY1 < endY1 && beginX2 <= endX2 && beginY2 > endY2)
       ) {
       return 2;
   }
   //truong hop 3
   //bang 2 nam tren goc tren ben trai bang mot hoac nguoc lai
   if (endX1 < beginX1 && endY1 < beginY1 && endX2 < beginX2 && endY2 < beginY2 && endX2 > beginX1 && endY2 > beginY1) {
       return 3;
   }
   //truong hop 4
   //bang 2 nam tren bang mot hoac nguoc lai
   if (
           //neu bang 2 nam tren bang 1
           (endX1 >= beginX1 && endY1 < beginY1 && endX2 <= beginX2 && endY2 <= beginY2 && endX2 >= beginX1 && endY2 >= beginY1)
           ||
           //nguoc lai
           (beginX1 >= endX1 && beginY1 < endY1 && beginX2 <= endX2 && beginY2 <= endY2)
       ) {
       return 4;
   }
   //truong hop 5
   //bang 2 nam goc tren ben phai bang mot hoac nguoc lai
   if (
           //neu bang 2 nam tren bang 1
           (endX1 > beginX1 && endY1 > beginY1 && endX2 > beginX2 && endY2 <= beginY2)
           ||
           //nguoc lai
           (beginX1 > endX1 && beginY1 > endY1 && beginX2 > endX2 && beginY2 <= endY2)
       ) {
       return 5;
   }
   //truong hop 6
   //bang 2 nam tren ben phai bang mot hoac nguoc lai
   if (
           //neu bang 2 nam tren bang 1
           (endX1 >= beginX1 && endY1 < beginY1 && endX2 <= beginX2 && endY2 <= beginY2)
           ||
           //nguoc lai
           (beginX1 >= endX1 && beginY1 < endY1 && beginX2 <= endX2 && beginY2 <= endY2)
       ) {
       return 4;
   }
};

LineJoint.prototype.joint = function() {
    var self = this;
    var entityBegin = this.entityBegin,
        entityEnd = this.entityEnd;
    var beginX = entityBegin.newX,
        beginY = entityBegin.newY,
        endX = entityEnd.newX,
        endY = entityEnd.newY,
        beginW = entityBegin.getWidth(),
        beginH = entityBegin.getHeight(),
        endW = entityEnd.getWidth(),
        endH = entityEnd.getHeight();
    
};

LineJoint.prototype.setEventListener = function() {
    var numLine = this.lines.length,
            l = this.lines,
            i = 0,
            beginX, beginY, endX, endY;
    //console.log(l[0].getAttrs().points[0].x);
    for (i = 0; i < numLine; i += 1) {
        beginX = l[i].getAttrs().points[0].x;
        beginY = l[i].getAttrs().points[0].y;
        endX = l[i].getAttrs().points[1].x;
        endY = l[i].getAttrs().points[1].y;
        if (beginX == endX) {
            this.lines[i].on('mouseover', function() {
                document.body.style.cursor = 'e-resize';
            });
            this.lines[i].on('mouseout', function() {
                document.body.style.cursor = 'default';
            });
            this.lines[i].setAttr('dragBoundFunc', function(pos){
                return {
                    x: pos.x,
                    y: this.getAbsolutePosition().y
                }
            });
        }
        if (beginY == endY) {
            this.lines[i].on('mouseover', function() {
                document.body.style.cursor = 'n-resize';
            });
            this.lines[i].on('mouseout', function() {
                document.body.style.cursor = 'default';
            });
            this.lines[i].setAttr('dragBoundFunc', function(pos){
                return {
                    x: this.getAbsolutePosition().x,
                    y: pos.y
                }
            });
        }
    }
};