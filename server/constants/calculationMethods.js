const CALCULATION_METHOD = {
  manual       : 1,
  fixSum       : 2,
  formula      : 3,
  counter      : 4,
  counterScale : 5,
};

const CALCULATION_NAME = {
  1: 'Manual',
  2: 'Fixed sum',
  3: 'Fixed formula',
  4: 'Counter',
  5: 'Counter with scale',
};

module.exports = { 
  CALCULATION_METHOD,
  CALCULATION_NAME,
};
