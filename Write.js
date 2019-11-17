let Write = {}

Write.keyValue = function(id, value) {
  document.getElementById(id).value = value;
}

Write.string = Write.keyValue;

Write.number = Write.keyValue;

Write.select = Write.keyValue;

Write.pair = function(id, objects) { // objects : [{name, value}]
  objects.forEach((object) => {
    Write.keyValue(id + '-' + object.name, object.value);
  });
}

Write.pairList = function(id, values, attributes) { // values [[{name,value},{name, value}]]
  values.forEach((object) => {
    var index = Draw.pairInList(id, attributes);
    var set = []
    attributes.forEach((attribute) => {
      let obj = {}
      obj.name = attribute.value;
      obj.value = object[attribute.value];
      set.push(obj);
    })
    Write.pair(id + '-' + index, set);
  })
}

Write.addablePairList = Write.pairList;

Write.attributeSet = function(id, values, attributes) {
  attributes.forEach((attribute) => {
    if (values[attribute[0]] != null) Write[attribute[2]](id + '-' + attribute[0], values[attribute[0]], attribute[3]);
  })
}

Write.object = function(id, object, attributes) {
  /*var result = {};

  object.forEach((attribute) => {
    Draw[attribute[2]](id + '-' + attribute[0], attribute[1], attribute[3], location);
  })*/
  return Write.attributeSet(id, object, attributes);
}

Write.imageInputGroup = function(id, name, folder) {
  let files = folder.file(new RegExp(name));
  files.forEach((file) => {
    if (!file.dir) {
      var type = file.name.split(name)[1].replace('.png', '').replace('-', '');
      if (type == '') type = 'icon';

      file.async('base64').then((img) => {
        var html = document.getElementById(id + '-images-' + type);
        if (html) html.setAttribute('src', 'data:image/png;base64,' + img);
        else alert('Found unknown image type ' + type + ' when loading ' + name);
      });
    }
  })
}
