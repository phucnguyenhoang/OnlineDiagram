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
    var beginX = entityBegin.newX,
        endX = entityEnd.newX,
        beginW = entityBegin.getWidth(),
        endW = entityEnd.getWidth();

    if (beginX <= endX && beginX + beginW >= endX + endW) {
        return endW;
    } else if (beginX <= endX && beginX + beginW >= endX + endW) {
        return beginW;
    } else if (beginX < endX && beginX + beginW <= endX + endW) {
        if (beginX + beginW - endX > 0) {
            return (beginX + beginW - endX);
        }
        return 0;
    } else {
        if (endX + endW - beginX > 0) {
            return (endX + endW - beginX);
        }
        return 0;
    }
    return 0;
};

LineJoint.prototype._layGiaoY = function() {
    var entityBegin = this.entityBegin,
        entityEnd = this.entityEnd;
    var beginY = entityBegin.newY,
        endY = entityEnd.newY,
        beginH = entityBegin.getHeight(),
        endH = entityEnd.getHeight();

    if (beginY <= endY && beginY + beginH >= endY + endH) {
        return endH;
    } else if (beginY <= endY && beginY + beginH >= endY + endH) {
        return beginH;
    } else if (beginY < endY && beginY + beginH <= endY + endH) {
        if (beginY + beginH - endY > 0) {
            return (beginY + beginH - endY);
        }
        return 0;
    } else {
        if (endY + endH - beginY > 0) {
            return (endY + endH - beginY);
        }
        return 0;
    }
    return 0;
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
    //bang 2 nam ben phai ngang bang 1
    var giaoY = self._layGiaoY(),
        giaoX = self._layGiaoX();
    if (giaoY >= 40) {
        var x1, x2, y1, y2;
        
        if (endX > beginX) {
            x1 = beginX + beginW;
            x2 = endX;
        } else {
            x1 = beginX;
            x2 = endX + endW;
        }
        
        if (giaoY === beginH) {
            y1 = y2 = beginY + parseInt(beginH/2);
        } else if (giaoY === endH) {
            y1 = y2 = endY + parseInt(endH/2);
        } else if ((beginY + parseInt(giaoY/2)) > endY && (beginY + parseInt(giaoY/2)) < (endY + endH)) {
            y1 = y2 = beginY + parseInt(giaoY/2);
        } else{
            y1 = y2 = beginY + beginH - parseInt(giaoY/2);
        }
        
        var l = new Kinetic.Line({
            points: [x1, y1, x2, y2],
            stroke: 'blue',
            strokeWidth: 2,
            lineCap: 'round',
            draggable: true
        });       
        this.lines.push(l);
        this.LAYER.add(l);
        l.moveToBottom();
        this.line.destroy();
        this.LAYER.draw();
    } else if (giaoX >= 50) {
        var x1, x2, y1, y2;
        
        if (endY > beginY) {
            y1 = beginY + beginH;
            y2 = endY;
        } else {
            y1 = beginY;
            y2 = endY + endH;
        }
        
        if (giaoX === beginW) {
            x1 = x2 = beginX + parseInt(beginW/2);
        } else if (giaoX === endW) {
            x1 = x2 = endX + parseInt(endW/2);
        } else if ((beginX + parseInt(giaoX/2)) > endX && (beginX + parseInt(giaoX/2)) < (endX + endW)) {
            x1 = x2 = beginX + parseInt(giaoX/2);
        } else{
            x1 = x2 = beginX + beginW - parseInt(giaoX/2);
        }
        
        var l = new Kinetic.Line({
            points: [x1, y1, x2, y2],
            stroke: 'blue',
            strokeWidth: 2,
            lineCap: 'round',
            draggable: true
        });       
        this.lines.push(l);
        this.LAYER.add(l);
        l.moveToBottom();
        this.line.destroy();
        this.LAYER.draw();
    } else if (giaoY < 40) {
        var x1, x2, y1, y2;       
        if (endX >= beginX + beginW) {
            x1 = beginX + beginW;
        } else {
            x1 = beginX;
        }
        y1 = beginY + parseInt(beginH/2);
        x2 = endX + parseInt(endW/2);
        y2 = beginY + parseInt(beginH/2);
        var l1 = new Kinetic.Line({
            points: [x1, y1, x2, y2],
            stroke: 'blue',
            strokeWidth: 2,
            lineCap: 'round',
            draggable: true
        });
        x1 = endX + parseInt(endW/2);
        y1 = beginY + parseInt(beginH/2);
        x2 = endX + parseInt(endW/2);
        if (endY > beginY) {
            y2 = endY;
        } else {
            y2 = endY + endH;
        }  
        var l2 = new Kinetic.Line({
            points: [x1, y1, x2, y2],
            stroke: 'blue',
            strokeWidth: 2,
            lineCap: 'round',
            draggable: true
        });
        this.lines.push(l1, l2);
        this.LAYER.add(l1).add(l2);
        l1.moveToBottom();
        l2.moveToBottom();
        this.line.destroy();
        this.LAYER.draw();       
    }
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