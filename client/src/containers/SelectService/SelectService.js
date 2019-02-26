import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { isArray, isEmpty } from 'lodash';

import { Dropdown } from 'semantic-ui-react';

import Item from './Item';

class SelectService extends Component {

  static propTypes = {
    dataID         : PropTypes.string.isRequired,
    ServicesList   : PropTypesMobX.observableObject.isRequired,
    value          : PropTypes.string,
    onChange       : PropTypes.func.isRequired,
    noIcon         : PropTypes.bool,
    includeDeleted : PropTypes.bool,
    disabled       : PropTypes.bool,
  }

  static defaultProps = {
    value          : '',
    noIcon         : false,
    includeDeleted : false,
    disabled       : false,
  }

  static createOptions(list, noIcon) {
    if (!isArray(list) || isEmpty(list)) {
      return [];
    }

    const options = list.map( service => {
      const iconName = noIcon ? null : service.icon;

      return {
        value : service.id,
        text  : (<Item name={service.name} iconName={iconName} />),
      };
    });

    return options;
  }

  constructor(props) {
    super(props);
    this.onChangeService = this.onChangeService.bind(this);
  }

  componentWillMount() {
    const { ServicesList, includeDeleted } = this.props;
    const { list } = ServicesList;

    if (!isArray(list) || isEmpty(list)) {
      ServicesList.reloadList(includeDeleted);
    }
  }

  onChangeService(event, data) {
    const { dataID, onChange } = this.props;
    onChange({
      dataID,
      event,
      value: data.value,
    });
  }

  render() {
    const { ServicesList, value, noIcon, disabled } = this.props;
    const { list } = ServicesList;

    const options = SelectService.createOptions(list, noIcon);

    return (
      <Dropdown
        fluid
        selection
        item
        disabled={disabled}
        value={value}
        options={options}
        onChange={this.onChangeService}
      />
    );
  }
}

export default inject('ServicesList')(observer(SelectService));
