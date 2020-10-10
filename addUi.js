var blockIndex = 0;
var blocks = []

function addBlock(type) {
  //let block = getBlock(type);
  Draw.element(`<hr><div class="media">
  <div class="media-body">
    <h5 class="mt-0" id="block-${blockIndex}-type">${type}</h5>
    <div id="block-${blockIndex}"></div>
  </div>
</div>`, 'blocks');
  Draw.attributeSet('block-' + blockIndex, blockAttributes[type]);
  Draw.imageInputGroup('block-' + blockIndex + '-images', 'Sprites', blockSprites[type], 'block-' + blockIndex);

  blocks.push(blockIndex);
  return blockIndex++;
}

function addBlockButton() {
  var elements = []
  Object.keys(blockAttributes).forEach((key) => {
    elements.push({
      name: key,
      callback: `addBlock('${key}')`
    });
  })
  Draw.dropdown('addBlockButton', 'Add block', elements, 'addBlockButtonGroup');
}

function load() {
  Draw.attributeSet('modMeta', modMetaAttributes);
  addBlockButton()
}

function selectImage(src, target) {
  var fr = new FileReader();
  fr.onload = function(e) {
    target.src = this.result;
  };
  src.addEventListener("change", function() {
    spriteFiles[target.id] = src.files[0];
    // fill fr with image data
    fr.readAsDataURL(src.files[0]);
  });
}

function delPairItem(id) {
  var index = document.getElementById(id);
  index.remove();
}
