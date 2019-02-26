import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { isArray, isEmpty } from 'lodash';

import { Dropdown } from 'semantic-ui-react';

import Item from './Item';

class SelectScale extends Component {

  static propTypes = {
    dataID         : PropTypes.string.isRequired,
    ScalesList     : PropTypesMobX.observableObject.isRequired,
    serviceID      : PropTypes.string,
    value          : PropTypes.string,
    onChange       : PropTypes.func.isRequired,
    disabled       : PropTypes.bool,
  }

  static defaultProps = {
    serviceID      : '',
    value          : '',
    disabled       : false,
  }

  static createOptions(list, serviceID) {
    if (!isArray(list) || isEmpty(list)) {
      return [];
    }

    const options = list
      .filter(scale => scale.serviceID === serviceID)
      .map(scale => ({
          value : scale.id,
          text  : (<Item name={scale.name} />),
      }));

    return options;
  }

  constructor(props) {
    super(props);
    this.onChangeScale = this.onChangeScale.bind(this);
  }

  componentWillMount() {
    const { ScalesList } = this.props;
    const { list } = ScalesList;

    if (!isArray(list) || isEmpty(list)) {
      ScalesList.reloadList();
    }
  }

  onChangeScale(event, data) {
    const { dataID, onChange } = this.props;
    onChange({
      dataID,
      event,
      value: data.value,
    });
  }

  render() {
    const { ScalesList, serviceID, value, disabled } = this.props;
    const { list } = ScalesList;

    const options = SelectScale.createOptions(list, serviceID);

    return (
      <Dropdown
        fluid
        selection
        item
        disabled={disabled}
        value={value}
        options={options}
        onChange={this.onChangeScale}
      />
    );
  }
}

export default inject('ScalesList')(observer(SelectScale));
