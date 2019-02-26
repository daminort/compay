import Formatter from '../../helpers/Formatter';
import { CALCULATION_METHOD } from '../../constants/calculationMethods';

class RateFactory {

  createEmptyRate(methodID = CALCULATION_METHOD.manual) {

    return {
      methodID,
      id        : null,
      formulaID : null,
      argument  : null,
      serviceID : null,
      scaleID   : null,
      startDate : Formatter.startMonth(),
      deleted   : false,
      ranges    : [],
      rate      : 0,
    };
  }
}

export default new RateFactory();
