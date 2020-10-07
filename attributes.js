const modMetaAttributes = [
  ['name', 'Name', 'string', 'My name mod for translator'],
  ['displayName', 'Display Name', 'string', 'My name mod'],
  ['author', 'Author', 'string', 'Me'],
  ['description', 'Description', 'string', 'Provides new fun.'],
  ['version', 'Version', 'string', '1.0']
];
const blockCategories = [{
    value: 'units',
    name: 'Units'
  }, {
    value: 'crafting',
    name:'Crafting'
  }, {
    value:'upgrade',
    name:'Upgrade'
  }, {
    value:'effect',
    name:'Effect'
  }, {
    value:'defense',
    name:'Defense'
  }, {
    value:'power',
    name:'Power'
  }, {
    value:'liquid',
    name:'Liquid'
  }, {
    value:'distribution',
    name:'Distribution'
  }, {
    value:'production',
    name:'Production'
  }, {
    value:'turret',
    name:'Turret'
  } // indentifier, English name
]
const basicBlockAttributes = [
  ['id', 'id', 'string', 'my-special-building'],
  ['name', 'Name', 'string', 'My special building'], // identifier, English name, input type, palceholder, nullable (default: false)
  ['description', 'Description', 'string', 'Provides something special'],
  ['size', 'Size', 'number', 2],
  ['category', 'Category', 'select', blockCategories],
  ['requirements', 'Items used on build', 'addablePairList', [{
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
  ]).concat(consumeBlockAttributes),
  'GenericSmelter': basicBlockAttributes,
  'Wall': basicBlockAttributes
}

const blockSprites = { // identifier, name, saveLocation
  'UnitFactory': [
    ['icon', 'Icon', ''],
    ['top', 'Top', '-top']
  ],
  'GenericSmelter': [
      ['icon', 'Icon', ''],
      ['top','Top','-top']
  ],
  'Wall':[
    ['icon','Icon','']
  ]
}

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
