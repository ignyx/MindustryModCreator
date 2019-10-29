let Read = {}

Read.keyValue = function(id) {
  var value = document.getElementById(id).value;
  return Read.null(value);
}

Read.null = function(string) {
  if (string == "") return undefined;
  return string;
}

Read.string = Read.keyValue;

Read.number = Read.keyValue;

Read.pair = function(id, values) { // values : [value1, value2]
  var result = {}
  result[values[0]] = Read.null(document.getElementById(`${id}-${values[0]}`).value);
  result[values[1]] = Read.null(document.getElementById(`${id}-${values[1]}`).value);
  return result;
}

Read.pairList = function(id) {
  let objects = pairListObjects[id];
  let index = pairListIndexes[id];
  var result = [];
  var i;
  for (i = 0; i < index; i++) {
    if (document.getElementById(id + '-' + i + '-' + objects[0].value) == null) continue;
    var set = {}
    set[objects[0].value] = document.getElementById(id + '-' + i + '-' + objects[0].value).value;
    set[objects[1].value] = document.getElementById(id + '-' + i + '-' + objects[1].value).value;
    result.push(set);
  }
  return result;
}

Read.addablePairList = Read.pairList;

Read.attributeSet = function(id, set) {
  var result = {};
  set.forEach((attribute) => {
    result[attribute[0]] = Read[attribute[2]](id + '-' + attribute[0], attribute[3])
  })

  return result;
}

Read.object = function(id, object) {
  /*var result = {};

  object.forEach((attribute) => {
    Draw[attribute[2]](id + '-' + attribute[0], attribute[1], attribute[3], location);
  })*/
  return Read.attributeSet(id, object);
}
