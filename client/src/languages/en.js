const messages = {

  // Common -------------------------------------------------------------------
  'common.wait'            : 'Please, wait...',
  'common.actions'         : 'Actions',
  'common.name'            : 'Name',
  'common.personalAccount' : 'Personal Account',
  'common.save'            : 'Save',
  'common.status'          : 'Status',
  'common.active'          : 'Active',
  'common.unused'          : 'Unused',
  'common.edit'            : 'Edit',
  'common.remove'          : 'Remove',
  'common.restore'         : 'Restore',
  'common.reset'           : 'Reset',
  'common.refresh'         : 'Refresh',
  'common.create'          : 'Create',
  'common.calculate'       : 'Calculate',
  'common.range'           : 'Range',
  'common.showDeleted'     : 'Show deleted',
  'common.showEmpty'       : 'Show empty',
  'common.service'         : 'Service',
  'common.from'            : 'From',
  'common.to'              : 'To',
  'common.method'          : 'Method',
  'common.scale'           : 'Scale',
  'common.rate'            : 'Rate',
  'common.formula'         : 'Formula',
  'common.area'            : 'Area',
  'common.people'          : 'People',
  'common.argument'        : 'Argument',
  'common.counter'         : 'Counter',
  'common.calcResult'      : 'Calculation result',
  'common.paymentSum'      : 'Payment sum',
  'common.comment'         : 'Comment',
  'common.loading'         : 'Loading...',
  'common.completed'       : 'Completed',
  'common.error'           : 'Error',
  'common.waiting'         : 'Waiting',
  'common.services'        : 'Services',
  'common.scales'          : 'Scales',
  'common.rates'           : 'Rates',
  'common.calculations'    : 'Calculations',
  'common.process'         : 'Process',
  'common.download'        : 'Download',
  'common.clearDB'         : 'Clearing DB',
  'common.selectFile'      : 'Select file...',
  'common.areYouSure'      : 'Are you sure?',
  'common.yes'             : 'Yes',
  'common.no'              : 'No',

  // Sidebar ------------------------------------------------------------------
  'sidebar.dahboard'     : 'Dashboard',
  'sidebar.services'     : 'Services',
  'sidebar.rates'        : 'Rates',
  'sidebar.scales'       : 'Scales',
  'sidebar.calculations' : 'Calculations',
  'sidebar.reports'      : 'Reports',
  'sidebar.settings'     : 'Settings',

  // Pages --------------------------------------------------------------------
  'pages.dahboard'     : 'Dashboard',
  'pages.servicesList' : 'Services',
  'pages.serviceEdit'  : 'Edit Service',
  'pages.scalesList'   : 'Scales',
  'pages.scaleEdit'    : 'Edit Scale',
  'pages.scaleCreate'  : 'Create Scale',
  'pages.ratesList'    : 'Rates',
  'pages.rateEdit'     : 'Edit Rate',
  'pages.rateCreate'   : 'Create Rate',

  'pages.calculations' : 'Calculations',
  'pages.reports'      : 'Reports',
  'pages.settings'     : 'Settings',

  // Services -----------------------------------------------------------------
  'service.edit.info'            : 'Additional information',

  'service.edit.account'         : 'Payment account',
  'service.edit.accountNumber'   : 'Number',
  'service.edit.accountBank'     : 'Bank',
  'service.edit.accountMFO'      : 'MFO',
  'service.edit.accountOKPO'     : 'OKPO',

  'service.edit.contacts'        : 'Contacts',
  'service.edit.contactsAddress' : 'Address',
  'service.edit.contactsPhone'   : 'Phone',

  'service.edit.online'          : 'Online Service',
  'service.edit.onlineWebsite'   : 'Website',
  'service.edit.onlineLogin'     : 'Login',
  'service.edit.onlinePassword'  : 'Password',
  'service.edit.onlineEmail'     : 'E-mail',

  // Scales -------------------------------------------------------------------
  'scale.edit.createWarning'   : 'Notice that after creating the scale you will not be able to change service',

  // Rates --------------------------------------------------------------------
  'rates.list.startDate'  : 'Start date',
  'rates.list.method'     : 'Method',
  'rates.list.info'       : 'Info',
  'rates.list.rate'       : 'Rate',

  'rateInfo.info.manual'       : 'The payment amount is entered during the calculation',
  'rateInfo.info.fixSum'       : 'The payment amount is constant',
  'rateInfo.info.formula'      : 'The payment amount is calculated by the constant formula',
  'rateInfo.info.counter'      : 'The payment amount is calculated by the values of counter',
  'rateInfo.info.counterScale' : 'The payment amount is calculated by the values of counter with applying scale',

  'rate.edit.startFrom': 'Start from',

  // Calculations -------------------------------------------------------------
  'calculations.list.calcResult'  : 'Result',
  'calculations.list.paymentSum'  : 'Payment',

  // Settings -----------------------------------------------------------------
  'settings.dataBaseOperations' : 'Database operations',
  'settings.servicesOrder'      : 'Services order',
  'settings.storeDatabase'      : 'Database backup',
  'settings.restoreDatabase'    : 'Restore database',
  'settings.resetDatabase'      : 'Reset database',
  'settings.removeMarkedDocs'   : 'Remove marked documents',
  'settings.reset.alertTitle'   : 'Attention!',
  'settings.reset.alertInfo'    : 'Resetting database will delete all information and fill database with default values',
  'settings.reset'              : 'Reset',
  'settings.reset.loading'      : 'Performing resetting...',
  'settings.reset.completed'    : 'Database is clear',
  'settings.reset.error'        : 'Reseting is failed',
  'settings.backup'             : 'Backup',
  'settings.restore'            : 'Restore',

  // Notifications ------------------------------------------------------------
  'notification.title.success' : 'Success',
  'notification.title.error'   : 'Error',
  'notification.title.warning' : 'Warning',
  'notification.title.info'    : 'Information',

  // Notifications: Service
  'notification.error.serviceListReload' : 'Loading services failed',
  'notification.error.serviceDataReload' : 'Loading service data failed',
  'notification.error.serviceDataUpdate' : 'Updating service failed',
  'notification.error.serviceRemove'     : 'Removing service failed',
  'notification.error.serviceRestore'    : 'Restoring service failed',

  'notification.success.serviceDataUpdate' : 'Service has been updated successfully',
  'notification.success.serviceRemove'     : 'Service has been removed successfully',
  'notification.success.serviceRestore'    : 'Service has been restored successfully',

  // Notifications: Scale
  'notification.error.scaleListReload' : 'Loading scales failed',
  'notification.error.scaleDataReload' : 'Loading scale data failed',
  'notification.error.scaleDataCreate' : 'Creating scale failed',
  'notification.error.scaleDataUpdate' : 'Updating scale failed',
  'notification.error.scaleRemove'     : 'Removing scale failed',
  'notification.error.scaleRestore'    : 'Restoring scale failed',

  'notification.error.scaleRangeIsErrors'              : 'Validation errors',
  'notification.error.scaleRangeIsEmpty'               : 'Ranges are empty',
  'notification.error.scaleRangeIsSingle'              : 'Scale must have more then one range',
  'notification.error.scaleRangeFirstMustBeEmpty'      : 'Min counter value in first range has to be empty',
  'notification.error.scaleRangeLastMustBeEmpty'       : 'Max counter value in last range has to be empty',
  'notification.error.scaleRangeMinGreaterMax'         : 'Min counter value is greater then max one',
  'notification.error.scaleRangeMinEqualMax'           : 'Min counter value is equal max one',
  'notification.error.scaleRangeMinEqualPreviousMax'   : 'Min counter value is equal previous max one',
  'notification.error.scaleRangeMinLessPreviousMax'    : 'Min counter value is less then previous max one',
  'notification.error.scaleRangeMinGreaterPreviousMax' : 'Min counter value has to be greater previous max on 1',

  'notification.success.scaleDataCreate' : 'Scale has been created successfully',
  'notification.success.scaleDataUpdate' : 'Scale has been updated successfully',
  'notification.success.scaleRemove'     : 'Scale has been removed successfully',
  'notification.success.scaleRestore'    : 'Scale has been restored successfully',

  // Notifications: Rate
  'notification.error.rateListReload' : 'Loading rates failed',
  'notification.error.rateDataReload' : 'Loading rate data failed',
  'notification.error.rateDataCreate' : 'Creating rate failed',
  'notification.error.rateDataUpdate' : 'Updating rate failed',
  'notification.error.rateRemove'     : 'Removing rate failed',
  'notification.error.rateRestore'    : 'Restoring rate failed',

  'notification.error.rateIsErrors'         : 'Validation errors',
  'notification.error.rateStartDateIsEmpty' : 'Start date is empty',
  'notification.error.rateServiceIsEmpty'   : 'Service is empty',
  'notification.error.rateMethodIsEmpty'    : 'Method is empty',
  'notification.error.rateRateIsEmpty'      : 'Rate is empty',
  'notification.error.rateFormulaIsEmpty'   : 'Formula is empty',
  'notification.error.rateArgumentIsEmpty'  : 'Argument is empty',
  'notification.error.rateScaleIsEmpty'     : 'Scale is empty',
  'notification.error.rateRangesIsEmpty'    : 'Ranges is empty',

  'notification.success.rateDataCreate' : 'Rate has been created successfully',
  'notification.success.rateDataUpdate' : 'Rate has been updated successfully',
  'notification.success.rateRemove'     : 'Rate has been removed successfully',
  'notification.success.rateRestore'    : 'Rate has been restored successfully',

  // Notifications: Calculation
  'notification.error.calculationListReload' : 'Loading calculations failed',
  'notification.error.calculationDataCreate' : 'Creating calculation failed',
  'notification.error.calculationDataUpdate' : 'Updating calculation failed',
  'notification.error.calculationRemove'     : 'Removing calculation failed',
  'notification.error.calculationRestore'    : 'Restoring calculation failed',

  'notification.error.calculationIncorrectManual'  : 'Incorrect manual value',
  'notification.error.calculationIncorrectCounters': 'Incorrect counter indications',
  'notification.error.calculationNotCalculated'    : 'Calculation is not fulfilled',

  'notification.success.calculationDataCreate' : 'Calculation has been created successfully',
  'notification.success.calculationDataUpdate' : 'Calculation has been updated successfully',
  'notification.success.calculationRemove'     : 'Calculation has been removed successfully',
  'notification.success.calculationRestore'    : 'Calculation has been restored successfully',

  // Range Table --------------------------------------------------------------
  'rangeTable.range'      : 'Range',
  'rangeTable.counterMin' : 'Min counter value',
  'rangeTable.counterMax' : 'Max counter value',

  // Calculation methods ------------------------------------------------------
  'calcMethod.manual': 'Manual',
  'calcMethod.fixSum': 'Fixed sum',
  'calcMethod.formula': 'Fixed formula',
  'calcMethod.counter': 'Counter',
  'calcMethod.counterScale': 'Counter with scale',

  // Formulas -----------------------------------------------------------------
  'formula.area': '(Area) x (Rate)',
  'formula.people': '(People) x (Rate)',

  // Months -------------------------------------------------------------------
  'months.january'   : 'January',
  'months.february'  : 'February',
  'months.march'     : 'March',
  'months.april'     : 'April',
  'months.may'       : 'May',
  'months.june'      : 'June',
  'months.july'      : 'July',
  'months.august'    : 'August',
  'months.september' : 'September',
  'months.october'   : 'October',
  'months.november'  : 'November',
  'months.december'  : 'December',
};

export default messages;
