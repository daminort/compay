import React from 'react';
import Intl from '../../../languages';
import { CALCULATION_METHOD } from '../../../constants/calculationMethods';

export const lang = {
  titleManual       : <Intl id="calcMethod.manual" />,
  titleFixSum       : <Intl id="calcMethod.fixSum" />,
  titleFormula      : <Intl id="calcMethod.formula" />,
  titleCounter      : <Intl id="calcMethod.counter" />,
  titleCounterScale : <Intl id="calcMethod.counterScale" />,

  infoManual       : <Intl id="rateInfo.info.manual" />,
  infoFixSum       : <Intl id="rateInfo.info.fixSum" />,
  infoFormula      : <Intl id="rateInfo.info.formula" />,
  infoCounter      : <Intl id="rateInfo.info.counter" />,
  infoCounterScale : <Intl id="rateInfo.info.counterScale" />,
};

export const titles = {
  [CALCULATION_METHOD.manual]       : lang.titleManual,
  [CALCULATION_METHOD.fixSum]       : lang.titleFixSum,
  [CALCULATION_METHOD.formula]      : lang.titleFormula,
  [CALCULATION_METHOD.counter]      : lang.titleCounter,
  [CALCULATION_METHOD.counterScale] : lang.titleCounterScale,
};

export const infos = {
  [CALCULATION_METHOD.manual]       : lang.infoManual,
  [CALCULATION_METHOD.fixSum]       : lang.infoFixSum,
  [CALCULATION_METHOD.formula]      : lang.infoFormula,
  [CALCULATION_METHOD.counter]      : lang.infoCounter,
  [CALCULATION_METHOD.counterScale] : lang.infoCounterScale,
};
