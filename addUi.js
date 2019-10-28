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
  // when image is loaded, set the src of the image where you want to display it
  fr.onload = function(e) {
    target.src = this.result;
  };
  src.addEventListener("change", function() {
    // fill fr with image data
    fr.readAsDataURL(src.files[0]);
  });
}
