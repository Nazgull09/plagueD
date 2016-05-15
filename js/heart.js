var inventory = {}

function initializeInventory (inventory,sizeX,sizeY) {
  inventory = {
    sizeX: sizeX,
    sizeY: sizeY,
    capacity: sizeX*sizeY,
    slots: [],
  }
  return inventory;
}

function fillInventory(inventory,thing){
  for(var i = 0; i<inventory.capacity; i++){
    inventory.slots.push(thing)
  }
  return inventory;
}

function add2Inventory (inventory,thing,count) {
  for(var i = 0; i<count; i++){
    if (i<inventory.capacity) {
      var clone = _.clone(thing)
      clone.y = _.floor(inventory.slots.length/inventory.sizeX)
      clone.x = inventory.slots.length % inventory.sizeX
      clone.index = inventory.slots.length
      //console.log('i.s.length ', inventory.slots.length, ' i.sizeY ', inventory.sizeY, ' i.sizeX ', inventory.sizeX, ' % ', inventory.slots.length % inventory.sizeY, ' floor ', _.floor(inventory.slots.length/inventory.sizeX));
      inventory.slots.push(clone)
    };
  }
  return inventory;
}

function addCollection2Inventory (inventory,collection) {
  for(var i = 0; i<collection.length; i++){
    if (i<inventory.capacity) {
      var clone = _.clone(collection[i])
      clone.y = _.floor(inventory.slots.length/inventory.sizeX)
      clone.x = inventory.slots.length % inventory.sizeX
      clone.index = inventory.slots.length
      //console.log('i.s.length ', inventory.slots.length, ' i.sizeY ', inventory.sizeY, ' i.sizeX ', inventory.sizeX, ' % ', inventory.slots.length % inventory.sizeY, ' floor ', _.floor(inventory.slots.length/inventory.sizeX));
      inventory.slots.push(clone)
    };
  }
  return inventory;
}