const { find, maxBy, isArray, unset } = require('lodash');

class RateUtils {

  sliceMaximums(rates) {
    if (!isArray(rates)) {
      return [];
    }

    const result     = [];
    const serviceIDs = [];

    rates.forEach(item => {
      const serviceID = item.service.id;
      if ( serviceIDs.includes(serviceID) ) {
        return;
      };

      const foundItems = rates.filter(foundItem => {
        return foundItem.service.id === serviceID;
      });
      if (foundItems && foundItems.lenght === 1) {
        result.push(item);
        serviceIDs.push(serviceID);
        return;
      }

      const maxItem = maxBy(foundItems, 'startDate');
      if (maxItem) {
        result.push(maxItem);
        serviceIDs.push(serviceID);
      };
    });

    return result;
  }
}

module.exports = new RateUtils();
