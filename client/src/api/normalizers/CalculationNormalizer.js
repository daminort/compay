
class CalculationNormalizer {

  normalizeForServerAll(calculationList) {
    const result = [];

    calculationList.forEach(calculation => {
      const { selected } = calculation;
      if (selected) {
        result.push( this.normalizeForServer(calculation) );
      }
    });

    return result;
  }

  normalizeForServer(clientData = {}) {

    return {
      id         : clientData.id,
      counterMin : clientData.counterMin,
      counterMax : clientData.counterMax,
      calcResult : clientData.calcResult,
      paymentSum : clientData.paymentSum,
      comment    : clientData.comment,
    };
  }
}

export default new CalculationNormalizer();
