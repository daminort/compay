const messages = {

  // Common -------------------------------------------------------------------
  'common.wait'            : 'Пожалуйста, подождите...',
  'common.actions'         : 'Действия',
  'common.name'            : 'Наименование',
  'common.personalAccount' : 'Лицевой счет',
  'common.save'            : 'Сохранить',
  'common.status'          : 'Статус',
  'common.active'          : 'Активен',
  'common.unused'          : 'Не используется',
  'common.edit'            : 'Изменить',
  'common.remove'          : 'Удалить',
  'common.restore'         : 'Восстановить',
  'common.reset'           : 'Сбросить',
  'common.refresh'         : 'Обновить',
  'common.create'          : 'Создать',
  'common.calculate'       : 'Рассчитать',
  'common.range'           : 'Порог',
  'common.showDeleted'     : 'Показывать удаленные',
  'common.showEmpty'       : 'Показывать пустые',
  'common.service'         : 'Услуга',
  'common.from'            : 'от',
  'common.to'              : 'до',
  'common.method'          : 'Метод',
  'common.scale'           : 'Шкала',
  'common.rate'            : 'Тариф',
  'common.formula'         : 'Формула',
  'common.area'            : 'Жилая площадь',
  'common.people'          : 'Прописано людей',
  'common.argument'        : 'Аргумент формулы',
  'common.counter'         : 'Счетчик',
  'common.calcResult'      : 'Результат расчета',
  'common.paymentSum'      : 'Сумма платежа',
  'common.comment'         : 'Комментарий',
  'common.loading'         : 'Загрузка...',
  'common.completed'       : 'Выполнено',
  'common.error'           : 'Ошибка',
  'common.waiting'         : 'Ожидание',
  'common.services'        : 'Услуги',
  'common.scales'          : 'Шкалы',
  'common.rates'           : 'Тарифы',
  'common.calculations'    : 'Расчеты',
  'common.process'         : 'Процесс',
  'common.download'        : 'Скачать',
  'common.clearDB'         : 'Очистка БД',
  'common.selectFile'      : 'Выберите файл...',

  // Sidebar ------------------------------------------------------------------
  'sidebar.dahboard'     : 'Сводка',
  'sidebar.services'     : 'Услуги',
  'sidebar.rates'        : 'Тарифы',
  'sidebar.scales'       : 'Шкалы',
  'sidebar.calculations' : 'Расчеты',
  'sidebar.reports'      : 'Отчеты',
  'sidebar.settings'     : 'Настройки',

  // Pages --------------------------------------------------------------------
  'pages.dahboard'     : 'Сводка',
  'pages.servicesList' : 'Услуги',
  'pages.serviceEdit'  : 'Редактирование услуги',
  'pages.scalesList'   : 'Шкалы',
  'pages.scaleEdit'    : 'Редактирование шкалы',
  'pages.scaleCreate'  : 'Создание шкалы',
  'pages.ratesList'    : 'Тарифы',
  'pages.rateEdit'     : 'Редактирование тарифа',
  'pages.rateCreate'   : 'Создание тарифа',

  'pages.calculations' : 'Расчеты',
  'pages.reports'      : 'Отчеты',
  'pages.settings'     : 'Настройки',

  // Services -----------------------------------------------------------------
  'service.edit.info'            : 'Дополнительная информация',

  'service.edit.account'         : 'Платежные реквизиты',
  'service.edit.accountNumber'   : 'Счет получателя',
  'service.edit.accountBank'     : 'Банк',
  'service.edit.accountMFO'      : 'МФО',
  'service.edit.accountOKPO'     : 'ОКПО',

  'service.edit.contacts'        : 'Контакты поставщика',
  'service.edit.contactsAddress' : 'Адрес',
  'service.edit.contactsPhone'   : 'Телефон',

  'service.edit.online'          : 'Личный кабинет',
  'service.edit.onlineWebsite'   : 'Web-адрес',
  'service.edit.onlineLogin'     : 'Логин',
  'service.edit.onlinePassword'  : 'Пароль',
  'service.edit.onlineEmail'     : 'E-mail регистрации',

  // Scales -----------------------------------------------------------------
  'scale.edit.createWarning'   : 'Обратите внимание, что после создания шкалы вы не сможете изменить сервис',

  // Rates --------------------------------------------------------------------
  'rates.list.startDate'  : 'Дата начала',
  'rates.list.method'     : 'Способ расчета',
  'rates.list.info'       : 'Инфо',
  'rates.list.rate'       : 'Тариф',

  'rateInfo.info.manual'       : 'Сумма платежа вводится во время расчета',
  'rateInfo.info.fixSum'       : 'Сумма платежа постоянна',
  'rateInfo.info.formula'      : 'Сумма платежа рассчитывается по формуле',
  'rateInfo.info.counter'      : 'Сумма платежа рассчитывается по значениям счетчика',
  'rateInfo.info.counterScale' : 'Сумма платежа рассчитывается по значениям счетчика с применением шкалы',

  'rate.edit.startFrom': 'Действует с',

  // Calculations -------------------------------------------------------------
  'calculations.list.calcResult'  : 'Результат',
  'calculations.list.paymentSum'  : 'Оплата',

  // Settings -----------------------------------------------------------------
  'settings.dataBaseOperations' : 'Операции над базой данных',
  'settings.servicesOrder'      : 'Порядок услуг',
  'settings.storeDatabase'      : 'Бэкап базы данных',
  'settings.restoreDatabase'    : 'Восстановление базы данных',
  'settings.resetDatabase'      : 'Сброс базы данных',
  'settings.removeMarkedDocs'   : 'Удаление помеченных документых',
  'settings.reset.alertTitle'   : 'Внимание!',
  'settings.reset.alertInfo'    : 'Сброс базы данных удалит всю информацию и заполнит базу значениями по умолчанию',
  'settings.reset'              : 'Сбросить',
  'settings.reset.loading'      : 'Выполнение сброса...',
  'settings.reset.completed'    : 'База данных очищена',
  'settings.reset.error'        : 'Сброс не удался',
  'settings.backup'             : 'Сохранить',
  'settings.restore'            : 'Восстановить',

  // Notifications ------------------------------------------------------------
  'notification.title.success' : 'Успех',
  'notification.title.error'   : 'Ошибка',
  'notification.title.warning' : 'Предупреждение',
  'notification.title.info'    : 'Информация',

  // Notifications: Service
  'notification.error.serviceListReload' : 'Загрузка списка услуг не удалась',
  'notification.error.serviceDataReload' : 'Загрузка данных услуги не удалась',
  'notification.error.serviceDataUpdate' : 'Обновление услуги не удалось',
  'notification.error.serviceRemove'     : 'Удаление услуги не удалось',
  'notification.error.serviceRestore'    : 'Восстановление услуги не удалось',

  'notification.success.serviceDataUpdate' : 'Услуга успешно обновлена',
  'notification.success.serviceRemove'     : 'Услуга успешно удалена',
  'notification.success.serviceRestore'    : 'Услуга успешно восстановлена',

  // Notifications: Scale
  'notification.error.scaleListReload' : 'Загрузка списка шкал не удалась',
  'notification.error.scaleDataReload' : 'Загрузка данных шкалы не удалась',
  'notification.error.scaleDataCreate' : 'Создание шкалы не удалось',
  'notification.error.scaleDataUpdate' : 'Обновление шкалы не удалось',
  'notification.error.scaleRemove'     : 'Удаление шкалы не удалось',
  'notification.error.scaleRestore'    : 'Восстановление шкалы не удалось',

  'notification.error.scaleRangeIsErrors'              : 'Ошибка валидации',
  'notification.error.scaleRangeIsEmpty'               : 'Шкала должна иметь два и более порогов',
  'notification.error.scaleRangeIsSingle'              : 'Шкала должна иметь больше одного порога',
  'notification.error.scaleRangeFirstMustBeEmpty'      : 'Минимальное значение в первом пороге должно быть пустым',
  'notification.error.scaleRangeLastMustBeEmpty'       : 'Максимальное значение в последнем пороге должно быть пустым',
  'notification.error.scaleRangeMinGreaterMax'         : 'Минимальное значение превышает максимальное',
  'notification.error.scaleRangeMinEqualMax'           : 'Минимальное значение равно максимальному',
  'notification.error.scaleRangeMinEqualPreviousMax'   : 'Минимальное значение равно предыдущему максимальному',
  'notification.error.scaleRangeMinLessPreviousMax'    : 'Минимальное значение меньше предыдущего максимального',
  'notification.error.scaleRangeMinGreaterPreviousMax' : 'Минимальное значение должно быть больше предыдущего максимального на 1',

  'notification.success.scaleDataCreate' : 'Шкала успешно создана',
  'notification.success.scaleDataUpdate' : 'Шкала успешно обновлена',
  'notification.success.scaleRemove'     : 'Шкала успешно удалена',
  'notification.success.scaleRestore'    : 'Шкала успешно восстановлена',

  // Notifications: Rate
  'notification.error.rateListReload' : 'Загрузка списка тарифов не удалась',
  'notification.error.rateDataReload' : 'Загрузка данных тарифа не удалась',
  'notification.error.rateDataCreate' : 'Создание тарифа не удалось',
  'notification.error.rateDataUpdate' : 'Обновление тарифа не удалось',
  'notification.error.rateRemove'     : 'Удаление тарифа не удалось',
  'notification.error.rateRestore'    : 'Восстановление тарифа не удалось',

  'notification.error.rateIsErrors'         : 'Ошибка валидации',
  'notification.error.rateStartDateIsEmpty' : 'Дата начала не заполнена',
  'notification.error.rateServiceIsEmpty'   : 'Услуга не заполнена',
  'notification.error.rateMethodIsEmpty'    : 'Метод не заполнен',
  'notification.error.rateRateIsEmpty'      : 'Тариф не заполнен',
  'notification.error.rateFormulaIsEmpty'   : 'Формула не заполнена',
  'notification.error.rateArgumentIsEmpty'  : 'Аргумент формулы не заполнен',
  'notification.error.rateScaleIsEmpty'     : 'Шкала не заполнена',
  'notification.error.rateRangesIsEmpty'    : 'Пороги не заполнены',

  'notification.success.rateDataCreate' : 'Тариф успешно создан',
  'notification.success.rateDataUpdate' : 'Тариф успешно обновлен',
  'notification.success.rateRemove'     : 'Тариф успешно удален',
  'notification.success.rateRestore'    : 'Тариф успешно восстановлен',

  // Notifications: Calculation
  'notification.error.calculationListReload' : 'Загрузка списка расчетов не удалась',
  'notification.error.calculationDataCreate' : 'Создание расчета не удалось',
  'notification.error.calculationDataUpdate' : 'Обновление расчета не удалось',
  'notification.error.calculationRemove'     : 'Удаление расчета не удалось',
  'notification.error.calculationRestore'    : 'Восстановление расчета не удалось',

  'notification.error.calculationIncorrectManual'  : 'Некорректное ручное значение',
  'notification.error.calculationIncorrectCounters': 'Некорректные показания счетчика',
  'notification.error.calculationNotCalculated'    : 'Расчет оплаты не выполнен',

  'notification.success.calculationDataCreate' : 'Расчет успешно создан',
  'notification.success.calculationDataUpdate' : 'Расчет успешно обновлен',
  'notification.success.calculationRemove'     : 'Расчет успешно удален',
  'notification.success.calculationRestore'    : 'Расчет успешно восстановлен',

  // Range Table --------------------------------------------------------------
  'rangeTable.range'      : 'Порог',
  'rangeTable.counterMin' : 'Показания счетчика (мин)',
  'rangeTable.counterMax' : 'Показания счетчика (макс)',

  // Calculation methods ------------------------------------------------------
  'calcMethod.manual': 'Ручной ввод',
  'calcMethod.fixSum': 'Фиксированная сумма',
  'calcMethod.formula': 'Фиксированная формула',
  'calcMethod.counter': 'По счетчику',
  'calcMethod.counterScale': 'По счетчику со шкалой',

  // Formulas -----------------------------------------------------------------
  'formula.area': '(Жилая площадь) x (Тариф)',
  'formula.people': '(Прописано людей) x (Тариф)',

  // Months -------------------------------------------------------------------
  'months.january'   : 'Январь',
  'months.february'  : 'Февраль',
  'months.march'     : 'Март',
  'months.april'     : 'Апрель',
  'months.may'       : 'Май',
  'months.june'      : 'Июнь',
  'months.july'      : 'Июль',
  'months.august'    : 'Август',
  'months.september' : 'Сентябрь',
  'months.october'   : 'Октябрь',
  'months.november'  : 'Ноябрь',
  'months.december'  : 'Декабрь',
};

export default messages;
