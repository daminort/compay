const titlePrefix   = 'notification.title';
const errorPrefix   = 'notification.error';
const successPrefix = 'notification.success';

export const NOTIFICATION_TYPES = {
  error   : 'error',
  success : 'success',
  warning : 'warning',
  info    : 'info',
};

export const NOTIFICATION_COLORS = {
  error   : 'red',
  success : 'green',
  warning : 'orange',
  info    : 'blue',
};

export const NOTIFICATION_ICONS = {
  error   : 'times',
  success : 'check',
  warning : 'exclamation',
  info    : 'info',
};

export const NOTIFICATION_TITLE = {
  success : `${titlePrefix}.success`,
  error   : `${titlePrefix}.error`,
  warning : `${titlePrefix}.warning`,
  info    : `${titlePrefix}.info`,
};

export const NOTIFICATION_ERRORS = {

  // Service ------------------------------------------------------------------
  serviceListReload : `${errorPrefix}.serviceListReload`,
  serviceDataReload : `${errorPrefix}.serviceDataReload`,
  serviceDataUpdate : `${errorPrefix}.serviceDataUpdate`,
  serviceRemove     : `${errorPrefix}.serviceRemove`,
  serviceRestore    : `${errorPrefix}.serviceRestore`,

  // Scale --------------------------------------------------------------------
  scaleListReload : `${errorPrefix}.scaleListReload`,
  scaleDataReload : `${errorPrefix}.scaleDataReload`,
  scaleDataCreate : `${errorPrefix}.scaleDataCreate`,
  scaleDataUpdate : `${errorPrefix}.scaleDataUpdate`,
  scaleRemove     : `${errorPrefix}.scaleRemove`,
  scaleRestore    : `${errorPrefix}.scaleRestore`,

  // Scale Validation ---------------------------------------------------------
  scaleRangeIsErrors              : `${errorPrefix}.scaleRangeIsErrors`,
  scaleRangeIsEmpty               : `${errorPrefix}.scaleRangeIsEmpty`,
  scaleRangeIsSingle              : `${errorPrefix}.scaleRangeIsSingle`,
  scaleRangeFirstMustBeEmpty      : `${errorPrefix}.scaleRangeFirstMustBeEmpty`,
  scaleRangeLastMustBeEmpty       : `${errorPrefix}.scaleRangeLastMustBeEmpty`,
  scaleRangeMinGreaterMax         : `${errorPrefix}.scaleRangeMinGreaterMax`,
  scaleRangeMinEqualMax           : `${errorPrefix}.scaleRangeMinEqualMax`,
  scaleRangeMinEqualPreviousMax   : `${errorPrefix}.scaleRangeMinEqualPreviousMax`,
  scaleRangeMinLessPreviousMax    : `${errorPrefix}.scaleRangeMinLessPreviousMax`,
  scaleRangeMinGreaterPreviousMax : `${errorPrefix}.scaleRangeMinGreaterPreviousMax`,

  // Rates --------------------------------------------------------------------
  rateListReload : `${errorPrefix}.rateListReload`,
  rateDataReload : `${errorPrefix}.rateDataReload`,
  rateDataCreate : `${errorPrefix}.rateDataCreate`,
  rateDataUpdate : `${errorPrefix}.rateDataUpdate`,
  rateRemove     : `${errorPrefix}.rateRemove`,
  rateRestore    : `${errorPrefix}.rateRestore`,

  // Rate Validation ----------------------------------------------------------
  rateIsErrors         : `${errorPrefix}.rateIsErrors`,
  rateStartDateIsEmpty : `${errorPrefix}.rateStartDateIsEmpty`,
  rateServiceIsEmpty   : `${errorPrefix}.rateServiceIsEmpty`,
  rateMethodIsEmpty    : `${errorPrefix}.rateMethodIsEmpty`,
  rateRateIsEmpty      : `${errorPrefix}.rateRateIsEmpty`,
  rateFormulaIsEmpty   : `${errorPrefix}.rateFormulaIsEmpty`,
  rateArgumentIsEmpty  : `${errorPrefix}.rateArgumentIsEmpty`,
  rateScaleIsEmpty     : `${errorPrefix}.rateScaleIsEmpty`,
  rateRangesIsEmpty    : `${errorPrefix}.rateRangesIsEmpty`,

  // Calculations -------------------------------------------------------------
  calculationListReload : `${errorPrefix}.calculationListReload`,
  calculationDataCreate : `${errorPrefix}.calculationDataCreate`,
  calculationDataUpdate : `${errorPrefix}.calculationDataUpdate`,
  calculationRemove     : `${errorPrefix}.calculationRemove`,
  calculationRestore    : `${errorPrefix}.calculationRestore`,

  calculationIncorrectManual   : `${errorPrefix}.calculationIncorrectManual`,
  calculationIncorrectCounters : `${errorPrefix}.calculationIncorrectCounters`,
  calculationNotCalculated     : `${errorPrefix}.calculationNotCalculated`,
};

export const NOTIFICATION_SUCCESS = {

  // Service ------------------------------------------------------------------
  serviceDataUpdate : `${successPrefix}.serviceDataUpdate`,
  serviceRemove     : `${successPrefix}.serviceRemove`,
  serviceRestore    : `${successPrefix}.serviceRestore`,

  // Scale --------------------------------------------------------------------
  scaleDataCreate : `${successPrefix}.scaleDataCreate`,
  scaleDataUpdate : `${successPrefix}.scaleDataUpdate`,
  scaleRemove     : `${successPrefix}.scaleRemove`,
  scaleRestore    : `${successPrefix}.scaleRestore`,

  // Rate ---------------------------------------------------------------------
  rateDataCreate : `${successPrefix}.rateDataCreate`,
  rateDataUpdate : `${successPrefix}.rateDataUpdate`,
  rateRemove     : `${successPrefix}.rateRemove`,
  rateRestore    : `${successPrefix}.rateRestore`,

  // Calculation --------------------------------------------------------------
  calculationDataCreate : `${successPrefix}.calculationDataCreate`,
  calculationDataUpdate : `${successPrefix}.calculationDataUpdate`,
  calculationRemove     : `${successPrefix}.calculationRemove`,
  calculationRestore    : `${successPrefix}.calculationRestore`,
};
