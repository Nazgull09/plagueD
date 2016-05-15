var width = window.innerWidth;
var height = window.innerHeight;


var inventory = {}


//Экспериментальный глобал, потом переделать
var mahSlot = {
  index: 10,
  count: 5,
  color: 'rgb(255,32,56)'
}

var mahStep = 100;
//===========================================


var stage = new Konva.Stage({
      container: 'konvaContainerInventory',
      width: 0.4*width,
      height: height
    });

var layer = new Konva.Layer();

var inventoryLayer = new Konva.Layer();

var rect = new Konva.Rect({
      x: 50,
      y: 50,
      width: 75,
      height: 75,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    }); 

rect.on('dragmove',function () {
  $('#mytext').text('Lol, it\'s moving!' + '   x: ' + rect.x() + '      y: ' + rect.y());
})

rect.on('dragend',function () {
  anchoring(rect,100)
  $('#mytext').text('Lol, it stopped!' + '   x: ' + rect.x() + '      y: ' + rect.y());
})

function anchorThem(){
  anchorThemNow(layer)
}

function anchorThemNow(layer){
  console.log(layer.children[0])
  _.map(layer.children,anchorMagic)
//  anchorMagic(layer.children[1])
  stage.draw()
}


function showInventory () {
  inventory = addCollection2Inventory(initializeInventory({},7,9),generateSlots(15))
  drawInventory(inventory,100);
}

    // add the shape to the layer
    layer.add(rect);

    // add the layer to the stage
    stage.add(inventoryLayer)
    stage.add(layer);

function drawInventory (invent,step) {
  var inventoryRect = new Konva.Rect({
    x:0,
    y:0,
    width:step*invent.sizeX,
    height:step*invent.sizeY,
    fill: 'rgb(150,200,150)',
    stroke: 'black',
    strokeWidth: 1
  })

  var lines = {
    lx : [],
    ly : []
  }

  function createlines(lines,invent,step){
    for(var i = 0; i<invent.sizeY;i++){
      var lineY = new Konva.Line({
        points: [0,i*step,invent.sizeX*step,i*step],
        stroke: 'black',
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
      });
      inventoryLayer.add(lineY)
    }
    for(var i = 0; i<invent.sizeX;i++){
      var lineY = new Konva.Line({
        points: [i*step,0,i*step,invent.sizeY*step],
        stroke: 'black',
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
      });
      inventoryLayer.add(lineY)  
    }
  }

  inventoryLayer.add(inventoryRect);
  createlines(lines,invent,100);
  stage.add(inventoryLayer)
  stage.add(layer);
}

function anchorMagic (object){
  var x = (object.width()/2) + object.x()
  var y = (object.height()/2) + object.y()
  xCell = _.floor(x / mahStep);
  yCell = _.floor(y / mahStep);
  object.x(xCell*mahStep+(mahStep/2)-object.width()/2)
  object.y(yCell*mahStep+(mahStep/2)-object.height()/2)
  stage.draw()
}

function anchoring (object,step) {
  var x = (object.width()/2) + object.x()
  var y = (object.height()/2) + object.y()
  xCell = _.floor(x / step);
  yCell = _.floor(y / step);
  object.x(xCell*step+(step/2)-object.width()/2)
  object.y(yCell*step+(step/2)-object.height()/2)
  stage.draw()
}

//Experiments

slotsGroup = new Konva.Group({
  x: 0,
  y: 0,
  rotation: 0
})

function callDrawSlots(){
  drawSlots(inventory);
}

function drawSlots (invent) {
  if(!_.isEmpty(invent.slots)){
    _.each(_.map(invent.slots,slot2pic),function (o) {slotsGroup.add(o)})
  }
  layer.add(slotsGroup)
  stage.draw()
}


function slot2pic (slot) {
  item = new Konva.Rect({
      x: (50 + mahStep*slot.x),           //Нужно каррирование. Пока оставлю magic numbers
      y: (50 + mahStep*slot.y),   //вместо invent.sizeX/Y. 
      width: 75,
      height: 75,
      fill: slot.color,
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });  
    return item;
}

function changeZIndex () {
  move2Pos(inventory.slots[3],5,6)
  console.log(inventory.slots[3])
}

//==================================================================================================
//===================================Управление инвентарём==========================================
//==================================================================================================
stage.on('dragend', function(evt){
  node = evt.target;
  if(node){
    node.width(node.width()/1.1)
    node.height(node.height()/1.1)
    anchorMagic(node)
    node.moveDown();
    layer.draw();
  }
})

stage.on('dragstart', function (evt){
  node = evt.target;
  if(node){
    node.width(node.width()*1.1)
    node.height(node.height()*1.1)
    node.moveToTop()
    layer.draw(); 
  }
})



//==================================================================================================
//===================================Экспериментальные функции======================================
//==================================================================================================
function generateSlot () {
  slot = {
    index: 10,
    count: _.random(1,8),
    color: 'rgb(' + _.random(0,255) + ',' + _.random(0,255) + ',' + _.random(0,255) + ')' 
  }
  return slot
}

function generateSlots (с) {
  slots = _.times(с,generateSlot)
  return slots;
}

function move2Pos(slot,x,y){
  var fstInd = slot.index 
  console.log(slot)
  slot.x = x;
  slot.y = y;
  layer.children[fstInd].x(slot.x*mahStep+(mahStep/2)-layer.children[fstInd].width()/2)
  layer.children[fstInd].y(slot.y*mahStep+(mahStep/2)-layer.children[fstInd].height()/2)
  slot.index=x
  if(y){  slot.index=x*y  }
  console.log('x: ', layer.children[fstInd].x(), ' y: ',  layer.children[fstInd].y())
  return slots
}

function function_name (argument) {
  // body...
}
