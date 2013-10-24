//create Main panel
var Main = function() {
    var stage = new Kinetic.Stage({
        container: 'mainPanel',
        width: 1200,
        height: 700
    });
    var layer = new Kinetic.Layer();
    this.stage = stage;
    this.layer = layer;
};