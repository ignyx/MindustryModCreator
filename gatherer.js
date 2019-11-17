function gatherModMeta() {
  return Read.attributeSet('modMeta', modMetaAttributes);
}

function gatherBlocks() {
  var result = []
  blocks.forEach((index) => {
    let block = {}
    var type = document.getElementById('block-' + index + '-type').innerHTML;
    block.properties = Read.attributeSet('block-' + index, blockAttributes[type]);
    block.properties.type = type;
    block.id = block.properties.id;
    block.properties.id = undefined;
    // Load Sprites
    block.sprites = Read.imageInputGroup('block-' + index + '-images', blockSprites[type]);
    result.push(block);
  });

  return result;
}

function saveMod() {
  var zip = new JSZip();
  // Save mod Metadata
  zip.file("mod.json", JSON.stringify(gatherModMeta()));
  // Save blocks
  gatherBlocks().forEach((block) => {
    zip.file("content/blocks/" + block.id + ".json", JSON.stringify(block.properties));
    block.sprites.forEach((image) => {
      if (image.value != null)
        zip.file("sprites/blocks/" + block.properties.category + "/" + block.id + image.extension + '.png', image.value);
    })
  });
  zip.generateAsync({
      type: "blob"
    })
    .then(function(content) {
      modMeta = gatherModMeta();
      var modFileName = modMeta.name + '-v' + modMeta.version + '.zip'
      saveAs(content, modFileName.replace(/ /g, '_'));
    });
}

function handleFileSelect(evt) {
  var file = evt.target.files[0];
  JSZip.loadAsync(file).then(importMod);
}

if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
} else {
  alert('The File APIs are not fully supported in this browser, update ;) . Imports are not available.');
  document.getElementById('files').hidden = true;
}

var myzip; // TODO remove
var rootFolder;

function importMod(zip) {
  myzip = zip;
  rootFolder = zip;

  metaFile = zip.file("mod.json");
  if (metaFile == null) {
    rootFolder = zip.folder(Object.keys(zip.files)[0]);
    metaFile = rootFolder.file('mod.json');
  }

  // Import mod metadata
  metaFile.async("string").then(function(data) {
    var modMeta = JSON.parse(data);
    modMetaAttributes.forEach((attribute) => {
      Write.keyValue('modMeta-' + attribute[0], modMeta[attribute[0]])
    });
  });
  // Import Blocks
  rootFolder.folder('content/blocks/').forEach((path, file) => {
    if (file.name.match(/.json/))
      file.async('string').then(text => importBlock(path.slice(0, -5), JSON.parse(text), rootFolder.folder('sprites/blocks'))).catch((err) => {
        console.log(err), console.log(file.name)
      });
  });
}


function importBlock(id, block, spriteFolder) {
  block.id = id;
  index = addBlock(block.type);
  Write.attributeSet('block-' + index, block, blockAttributes[block.type]);
  Write.imageInputGroup('block-' + index, id, spriteFolder);
}
