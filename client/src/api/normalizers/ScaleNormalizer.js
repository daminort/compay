
class ScaleNormalizer {

  normalizeForServer(clientData = {}) {

    const range = clientData.range.map(item => ({
      counterMin: item.counterMin,
      counterMax: item.counterMax,
    }));

    return {
      service: clientData.serviceID,
      deleted: clientData.deleted,
      range,
    };
  }
}

export default new ScaleNormalizer();
