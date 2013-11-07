function LineJoint(layer, x, y) {
    this.beginX = x;
    this.beginY = y;
    this.endX = x;
    this.endY = y;
    this.d = 100;
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

LineJoint.prototype._layGiao = function() {
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
   //bang 1 nam trong bang 2
   if (
           //neu bang 2 nam trong bang 1
           (beginX1 >= endX1 && beginY1 >= endY1 && beginX2 <= endX2 && beginY2 <= endY2)
           ||
           (beginX1 < endX1 && beginY1 > endY1 && beginX2 > endX2 && beginY2 <= endY2)
           ||
           (beginX1 > endX1 && beginY1 < endY1 && beginX2 < endX2 && beginY2 > endY2)
      ) {
       return 1;
   }
   //truong hop 2
   //bang 2 nam tren ben trai bang mot
   if (
           //neu bang 2 lon bang 1
           (endX1 < beginX1 && endY1 < beginY1 && endX2 <= beginX2 && endY2 > beginY2 && endX2 >= beginX1)
           ||
           //nguoc lai
           (endX1 < beginX1 && endY1 >= beginY1 && endX2 <= beginX2 && endY2 <= beginY2 && endX2 > beginX1 && endY2 > beginY1)
       ) {
       return 2;
   }
   //truong hop 3
   //bang 2 nam tren goc tren ben trai bang mot hoac nguoc lai
   if (endX1 < beginX1 && endY1 < beginY1 && endX2 < beginX2 && endY2 <= beginY2 && endX2 > beginX1 && endY2 >= beginY1) {
       return 3;
   }
   //truong hop 4
   //bang 2 nam tren bang mot
   if (
           //neu bang 2 lon hon
           (endX1 <= beginX1 && endY1 < beginY1 && endX2 >= beginX2 && endY2 <= beginY2 && endY2 > beginY1)
           ||
           //nguoc lai
           (endX1 >= beginX1 && endY1 < beginY1 && endX2 <= beginX2 && endY2 <= beginY2 && endY2 > beginY1)
       ) {
       return 4;
   }
   //truong hop 5
   //bang 2 nam goc tren ben phai bang mot
   if (endX1 >= beginX1 && endY1 < beginY1 && endX2 > beginX2 && endY2 <= beginY2 && endX1 < beginX2 && endY2 > beginY1) {
       return 5;
   }
   //truong hop 6
   //bang 2 nam tren ben phai bang mot
   if (
           //neu bang 2 lon hon
           (endX1 >= beginX1 && endY1 <= beginY1 && endX2 > beginX2 && endY2 >= beginY2 && endX1 < beginX2)
           ||
           //nguoc lai
           (endX1 >= beginX1 && endY1 >= beginY1 && endX2 > beginX2 && endY2 <= beginY2 && endX1 < beginX2)
       ) {
       return 6;
   }
   //truong hop 7
   //bang 2 nam goc duoi ben phai bang mot
   if (endX1 >= beginX1 && endY1 >= beginY1 && endX2 > beginX2 && endY2 > beginY2 && endX1 < beginX2) {
       return 7;
   }
   //truong hop 8
   //bang 2 nam duoi bang mot
   if (
           //neu bang 2 lon hon
           (endX1 <= beginX1 && endY1 >= beginY1 && endX2 >= beginX2 && endY2 >= beginY2 && beginY2 > endY1)
           ||
           //nguoc lai
           (endX1 >= beginX1 && endY1 >= beginY1 && endX2 <= beginX2 && endY2 >= beginY2 && endY1 < beginY2)
       ) {
       return 8;
   }
   //truong hop 9
   //bang 2 nam goc duoi ben trai bang mot
   if (endX2 >= beginX1 && endY1 >= beginY1 && endX2 < beginX2 && endY2 > beginY2 && endY1 <= beginY2) {
       return 9;
   }
   //ko giao nhau
   return 0;
};

LineJoint.prototype.joint = function() {
    var self            = this,
        d               = this.d;
    var entityBegin     = this.entityBegin,
        entityEnd       = this.entityEnd;
    var beginX1         = entityBegin.newX,
        beginY1         = entityBegin.newY,
        endX1           = entityEnd.newX,
        endY1           = entityEnd.newY,
        beginW          = entityBegin.getWidth(),
        beginH          = entityBegin.getHeight(),
        endW            = entityEnd.getWidth(),
        endH            = entityEnd.getHeight();
    var beginX2         = beginX1 + beginW,
        beginY2         = beginY1 + beginH,
        endX2           = endX1 + endW,
        endY2           = endY1 + endH;
    var giao            = self._layGiao();
    console.log(giao);
    this.line.destroy();
    switch (giao) {
        case 1:
            var trX     = (beginX1 - endX1) + beginW + d; 
            var x1      = beginX2,
                y1      = beginY1 + parseInt(beginH/2),
                x2      = beginX2 + d,
                y2      = y1;
            var l = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            entityEnd.updatePosition(trX, false);
            self.LAYER.add(l);
            self.lines.push(l);
            self.LAYER.draw();
        break;
        case 2:
            var trX     = -((endX2 - beginX1) + d); 
            var x1      = beginX1,
                y1      = beginY1 + parseInt(beginH/2),
                x2      = beginX1 - d,
                y2      = y1;
            var l = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            entityEnd.updatePosition(trX, false);
            self.LAYER.add(l);
            self.lines.push(l);
            self.LAYER.draw();
        break;
        case 3:
            var d2      = parseInt(d/2);
            var trX     = -((endX2 - beginX1) + d2),
                trY     = -((endY2 - beginY1) + d2); 
            var x1      = beginX1,
                y1      = beginY1 + parseInt(beginH/2),
                x2      = beginX1 - d2 - parseInt(endW/2),
                y2      = y1;
            var l1 = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            var x1      = beginX1 - d2 - parseInt(endW/2),
                y1      = beginY1 + parseInt(beginH/2),
                x2      = beginX1 - d2 - parseInt(endW/2),
                y2      = beginY1 - d2;
            var l2 = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            entityEnd.updatePosition(trX, trY);
            self.LAYER.add(l1).add(l2);
            self.lines.push(l1, l2);
            self.LAYER.draw();
        break;
        case 4:
            var trY     = -((endY2 - beginY1) + d); 
            var x1      = beginX1 + parseInt(beginW/2),
                y1      = beginY1,
                x2      = x1,
                y2      = beginY1 - d;
            var l = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            entityEnd.updatePosition(false, trY);
            self.LAYER.add(l);
            self.lines.push(l);
            self.LAYER.draw();
        break;
        case 5:
            var d2      = parseInt(d/2);
            var trX     = beginX2 - endX1 + d2,
                trY     = -(endY2 - beginY1 + d2); 
            var x1      = beginX2,
                y1      = beginY1 + parseInt(beginH/2),
                x2      = beginX2 + d2 + parseInt(endW/2),
                y2      = y1;
            var l1 = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            var x1      = beginX2 + d2 + parseInt(endW/2),
                y1      = beginY1 + parseInt(beginH/2),
                x2      = x1,
                y2      = beginY1 - d2;
            var l2 = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            entityEnd.updatePosition(trX, trY);
            self.LAYER.add(l1).add(l2);
            self.lines.push(l1, l2);
            self.LAYER.draw();
        break;
        case 6:
            var trX     = (beginX1 - endX1) + beginW + d; 
            var x1      = beginX2,
                y1      = beginY1 + parseInt(beginH/2),
                x2      = beginX2 + d,
                y2      = y1;
            var l = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            entityEnd.updatePosition(trX, false);
            self.LAYER.add(l);
            self.lines.push(l);
            self.LAYER.draw();
        break;
        case 7:
            var d2      = parseInt(d/2);
            var trX     = beginX2 - endX1 + d2,
                trY     = beginY2 - endY1 + d2; 
            var x1      = beginX2,
                y1      = beginY1 + parseInt(beginH/2),
                x2      = beginX2 + d2 + parseInt(endW/2),
                y2      = y1;
            var l1 = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            var x1      = beginX2    + d2 + parseInt(endW/2),
                y1      = beginY1 + parseInt(beginH/2),
                x2      = x1,
                y2      = beginY2 + d2;
            var l2 = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            entityEnd.updatePosition(trX, trY);
            self.LAYER.add(l1).add(l2);
            self.lines.push(l1, l2);
            self.LAYER.draw();
        break;
        case 8:
            var trY     = (beginY2 - endY1) + d; 
            var x1      = beginX1 + parseInt(beginW/2),
                y1      = beginY2,
                x2      = x1,
                y2      = beginY2 + d;
            var l = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            entityEnd.updatePosition(false, trY);
            self.LAYER.add(l);
            self.lines.push(l);
            self.LAYER.draw();
        break;
        case 9:
            var d2      = parseInt(d/2);
            var trX     = -((endX2 - beginX1) + d2),
                trY     = (beginY2 - endY1) + d2; 
            var x1      = beginX1,
                y1      = beginY1 + parseInt(beginH/2),
                x2      = beginX1 - d2 - parseInt(endW/2),
                y2      = y1;
            var l1 = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            var x1      = beginX1 - d2 - parseInt(endW/2),
                y1      = beginY1 + parseInt(beginH/2),
                x2      = beginX1 - d2 - parseInt(endW/2),
                y2      = beginY2 + d2;
            var l2 = new Kinetic.Line({
                points: [x1, y1, x2, y2],
                stroke: 'blue',
                strokeWidth: 2,
                lineCap: 'round'
            });
            entityEnd.updatePosition(trX, trY);
            self.LAYER.add(l1).add(l2);
            self.lines.push(l1, l2);
            self.LAYER.draw();
        break;
    }    
};

LineJoint.prototype.setEventListener = function() {
//    var numLine = this.lines.length,
//            l = this.lines,
//            i = 0,
//            beginX, beginY, endX, endY;
//    //console.log(l[0].getAttrs().points[0].x);
//    for (i = 0; i < numLine; i += 1) {
//        beginX = l[i].getAttrs().points[0].x;
//        beginY = l[i].getAttrs().points[0].y;
//        endX = l[i].getAttrs().points[1].x;
//        endY = l[i].getAttrs().points[1].y;
//        if (beginX == endX) {
//            this.lines[i].on('mouseover', function() {
//                document.body.style.cursor = 'e-resize';
//            });
//            this.lines[i].on('mouseout', function() {
//                document.body.style.cursor = 'default';
//            });
//            this.lines[i].setAttr('dragBoundFunc', function(pos){
//                return {
//                    x: pos.x,
//                    y: this.getAbsolutePosition().y
//                }
//            });
//        }
//        if (beginY == endY) {
//            this.lines[i].on('mouseover', function() {
//                document.body.style.cursor = 'n-resize';
//            });
//            this.lines[i].on('mouseout', function() {
//                document.body.style.cursor = 'default';
//            });
//            this.lines[i].setAttr('dragBoundFunc', function(pos){
//                return {
//                    x: this.getAbsolutePosition().x,
//                    y: pos.y
//                }
//            });
//        }
//    }
};