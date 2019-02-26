
class RateNormalizer {

  normalizeForServer(clientData = {}) {

    const ranges = clientData.ranges.map(item => ({
      counterMin : item.counterMin,
      counterMax : item.counterMax,
      rate       : item.rate,
    }));

    return {
      startDate : clientData.startDate,
      rate      : clientData.rate,
      methodID  : clientData.methodID,
      formulaID : clientData.formulaID,
      argument  : clientData.argument,
      service   : clientData.serviceID,
      scale     : clientData.scaleID,
      deleted   : clientData.deleted,
      ranges,
    };
  }
}

export default new RateNormalizer();
