let Draw = {}

Draw.element = function(code, location) {
  if (location == null) return code;
  else {
    var element = document.createElement('div');
    element.innerHTML = code;
    document.getElementById(location).appendChild(element);
  }
}

Draw.keyValue = function(id, key, placeholder, type, location) {
  var result = `<div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">${key}</span>
    </div>
    <input id="${id}" type="${type}" class="form-control" placeholder="${placeholder}">
  </div>`;
  return Draw.element(result, location);
}

Draw.string = function(id, key, placeholder, location) {
  return Draw.keyValue(id, key, placeholder, 'text', location);
}

Draw.number = function(id, key, placeholder, location) {
  return Draw.keyValue(id, key, placeholder, 'number', location);
}

Draw.dropdown = function(id, name, elements, location) { // elements : [{name:"String", callback:function, id:"optional string"}]
  var buttons = "";
  elements.forEach((element) => {
    var buttonId = "";
    if (element.id != null) buttonId = `id=${element.id}`;
    buttons += `<button class="dropdown-item" type="button" ${buttonId} onclick="${element.callback}">${element.name}</button>`;
  })
  var result = `<div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" id="${id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      ${name}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuBlocks">
      ${buttons}
    </div>
  </div>`;
  return Draw.element(result, location);
}

Draw.select = function(id, name, options, location) { // options : [{name:"String", value:"Value"}]
  var theOptions = "";
  options.forEach((option) => {
    theOptions += `<option value="${option.value}">${option.name}</option>`;
  })
  var result = `<label for="${id}">${name} :</label>
  <div class="input-group mb-3"><select class="form-control" id="${id}">${theOptions}</select></div>`;
  return Draw.element(result, location);
}

/**
 * In order to get objects such as {item:"myitem", amount:2}
 */
// TODO add remove onClick
Draw.pair = function(id, objects, location) { // objects : [{type:"string/number", placeholder, name, value}]
  var result = `<div id="${id}" class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">${objects[0].name}</span>
          </div>
          <input id="${id}-${objects[0].value}" type="${objects[0].type}" placeholder="${objects[0].placeholder}" class="form-control">
          <div class="input-group-prepend">
            <span class="input-group-text">${objects[1].name}</span>
          </div>
          <input id="${id}-${objects[1].value}" type="${objects[1].type}" placeholder="${objects[1].placeholder}" class="form-control">
          <span class="badge badge-pill badge-danger" onclick="delPairItem('${id}')">Remove</span>
        </div>`;

  return Draw.element(result, location)
}

Draw.addablePairList = function(id, buttonName, objects, location) {
  var result = `<button class="btn btn-primary mb-3" type="button" onclick="Draw.pairInList('${id}')">${buttonName}</button>
  <div id="${id}" class="mb-3"></div>`;
  pairListObjects[id] = objects;
  return Draw.element(result, location);
}

Draw.pairInList = function(location) {
  if (pairListIndexes[location] == null) pairListIndexes[location] = 0;
  var index = pairListIndexes[location]++;
  Draw.pair(location + '-' + index, pairListObjects[location], location);
  return index;
}

Draw.selectImage = function(id, name, location) {
  var result = `<div class="input-group mb-3"><span>${name} :</span>
  <img id="${id}" class="mr-3" alt="..."><input id="${id}-src" type="file" /></div>`;
  var last = Draw.element(result, location);
  selectImage(document.getElementById(id + '-src'), document.getElementById(id));
  return last;
}

Draw.attributeSet = function(id, set, location) {
  if (location == null) location = id;
  set.forEach((attribute) => {
    Draw[attribute[2]](id + '-' + attribute[0], attribute[1], attribute[3], location);
  })
}

Draw.object = function(id, name, object, location) {
  if (location == null) location = id;
  Draw.element(`<div id="${id}"></div>`, location);
  Draw.attributeSet(id, object);
}

Draw.imageInputGroup = function(id, name, array, location) {
  if (location == null) location = id;
  Draw.element(`<div id="${id}"><span>${name}</span></div>`, location);
  array.forEach((image) => {
    Draw.selectImage(id + '-' + image[0], image[1], id);
  })
}
