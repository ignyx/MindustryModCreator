const modMetaAttributes = [
  ['name', 'Name', 'string', 'My mod'],
  ['author', 'Author', 'string', 'Me'],
  ['description', 'Description', 'string', 'Provides new fun.'],
  ['version', 'Version', 'string', '1.0']
];
const blockCategories = [
  ['units', 'Units'] // indentifier, English name
]
const basicBlockAttributes = [
  ['id', 'id', 'string', 'my-special-building'],
  ['name', 'Name', 'string', 'My special building'], // identifier, English name, input type, palceholder, nullable (default: false)
  ['description', 'Description', 'string', 'Provides something special'],
  ['size', 'Size', 'number', 2],
];

const consumeBlockAttributes = [
  ['consumes', 'Consumption ', 'object', [
    ['power', 'Power consumption', 'number', '0.5 (30 power units/s)'],
    ['items', 'Items consumed', 'object', [
      ['items', 'Add consumed item', 'addablePairList', [{
        name: 'Item',
        value: 'item',
        type: 'string',
        placeholder: 'silicon'
      }, {
        name: 'Amount',
        value: 'amount',
        type: 'number',
        placeholder: '10'
      }]]
    ]]
  ]]
]


const blockAttributes = {
  'UnitFactory': basicBlockAttributes.concat([ // Building type
    ['unitType', 'Unit type', 'string', 'chrome-wraith'],
    ['produceTime', 'Production time', 'number', '350']
  ]).concat(consumeBlockAttributes)
}
const blockTypesThatConsume = ['UnitFactory']

function getBlock(type) {
  var block = {}
  basicBlockAttributes.forEach((attribute) => {
    block[attribute[0]] = {
      name: attribute[1],
      type: attribute[2],
      placeholder: attribute[3]
    };
  })
  blockAttributes[type].forEach((attribute) => {
    block[attribute[0]] = {
      name: attribute[1],
      type: attribute[2],
      placeholder: attribute[3]
    };
  });

  return block;
}
