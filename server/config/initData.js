const { ICONS } = require('../constants/icons');

const serviceIDs = {
  home     : '5b7b08d4b89d2f2e54e6144b',
  water    : '5b7b08d4b89d2f2e54e6144c',
  hot      : '5b7b08d4b89d2f2e54e6144d',
  electric : '5b7b08d4b89d2f2e54e6144e',
  gas      : '5b7b08d4b89d2f2e54e6144f',
  garbage  : '5b7b08d4b89d2f2e54e61450',
  internet : '5b7b08d4b89d2f2e54e61451',
  tv       : '5b7b08d4b89d2f2e54e61452',
  garage   : '5b7b08d4b89d2f2e54e61453',
};

const scaleID = '5b7b2a9b9d3c1b092830c27a';

const defaultServiceProperties = {
  info            : '',
  personalAccount : '',
  
  account  : { number: '', bank: '', mfo: '', okpo: '' },
	contacts : { address: '', phone: '' },
	online   : { website: '', login: '', password: '', email: '' },
}

const services = [
  {
    _id     : serviceIDs.home,
    name    : 'Rent',
    deleted : false,
    icon    : ICONS.home,
    ...defaultServiceProperties,
  },
  {
    _id     : serviceIDs.water,
    name    : 'Water',
    deleted : false,
    icon    : ICONS.water,
    ...defaultServiceProperties,
  },
  {
    _id     : serviceIDs.hot,
    name    : 'Heat',
    deleted : false,
    icon    : ICONS.hot,
    ...defaultServiceProperties,
  },
  {
    _id     : serviceIDs.electric,
    name    : 'Electricity',
    deleted : false,
    icon    : ICONS.electric,
    ...defaultServiceProperties,
  },
  {
    _id     : serviceIDs.gas,
    name    : 'Gas',
    deleted : false,
    icon    : ICONS.gas,
    ...defaultServiceProperties,
  },
  {
    _id     : serviceIDs.garbage,
    name    : 'Garbage',
    deleted : false,
    icon    : ICONS.garbage,
    ...defaultServiceProperties,
  },
  {
    _id     : serviceIDs.internet,
    name    : 'Internet',
    deleted : false,
    icon    : ICONS.internet,
    ...defaultServiceProperties,
  },
  {
    _id     : serviceIDs.tv,
    name    : 'TV',
    deleted : false,
    icon    : ICONS.tv,
    ...defaultServiceProperties,
  },
  {
    _id     : serviceIDs.garage,
    name    : 'Garage',
    deleted : false,
    icon    : ICONS.garage,
    ...defaultServiceProperties,
  },
];

module.exports = {
  services,
  serviceIDs,
  scaleID,
};
