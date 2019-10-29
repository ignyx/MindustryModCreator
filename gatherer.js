function gatherModMeta() {
  return Read.attributeSet('modMeta', modMetaAttributes);
}

function gatherBlocks() {
  var result = []
  blocks.forEach((index) => {
    var type = document.getElementById('block-' + index + '-type').innerHTML;
    var block = Read.attributeSet('block-' + index, blockAttributes[type]);
    block.type = type;
    result.push(block);
  })

  return result;
}

function saveMod() {
  var zip = new JSZip();
  zip.file("mod.json", JSON.stringify(gatherModMeta()));
  gatherBlocks().forEach((block) => {
    zip.file("content/blocks/" + block.id + ".json", JSON.stringify(block));
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

var myzip; // TODO
function importMod(zip) {
  myzip = zip;
  // Import mod metadata
  zip.file("mod.json").async("string").then(function(data) {
    var modMeta = JSON.parse(data);
    modMetaAttributes.forEach((attribute) => {
      Write.keyValue('modMeta-' + attribute[0], modMeta[attribute[0]])
    });
  });
  // Import Blocks
  zip.folder('content/blocks/').forEach((path, file) => {
    file.async('string').then(text => importBlock(path.slice(0, -5), JSON.parse(text)))
  });
}


function importBlock(id, block) {
  console.log(block)
  index = addBlock(block.type);
  Write.attributeSet('block-' + index, block, blockAttributes[block.type]);
}
