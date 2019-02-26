const { CALCULATION_METHOD } = require('../constants/calculationMethods');

class CalculationUtils {

  createCalculation(period, rate, counterMin = 0) {
    const calc = {
      period,
      counterMin,
      rate    : rate.id,
      service : rate.serviceID,
    };

    return calc;
  }
}

module.exports = new CalculationUtils();
