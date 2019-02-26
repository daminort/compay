import React from 'react';
import Intl, { translate } from '../../languages';

export const lang = {
  info            : <Intl id="service.edit.info" />,

  account         : <Intl id="service.edit.account" />,
  accountNumber   : <Intl id="service.edit.accountNumber" />,
  accountBank     : <Intl id="service.edit.accountBank" />,
  accountMFO      : <Intl id="service.edit.accountMFO" />,
  accountOKPO     : <Intl id="service.edit.accountOKPO" />,

  contacts        : <Intl id="service.edit.contacts" />,
  contactsAddress : <Intl id="service.edit.contactsAddress" />,
  contactsPhone   : <Intl id="service.edit.contactsPhone" />,

  online          : <Intl id="service.edit.online" />,
  onlineWebsite   : <Intl id="service.edit.onlineWebsite" />,
  onlineLogin     : <Intl id="service.edit.onlineLogin" />,
  onlinePassword  : <Intl id="service.edit.onlinePassword" />,
  onlineEmail     : <Intl id="service.edit.onlineEmail" />,

  save            : <Intl id="common.save" />,
  name            : <Intl id="common.name" />,
  personalAccount : <Intl id="common.personalAccount" />,
  status          : <Intl id="common.status" />,

  active          : translate('common.active'),
  unused          : translate('common.unused'),
};
