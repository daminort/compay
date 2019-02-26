import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toInteger } from 'lodash';

import { Dropdown } from 'semantic-ui-react';

import { CALCULATION_METHOD } from '../../constants/calculationMethods';
import Item from './Item';

const options = [
  { value: CALCULATION_METHOD.manual,       text: (<Item intlID={CALCULATION_METHOD[1]} />) },
  { value: CALCULATION_METHOD.fixSum,       text: (<Item intlID={CALCULATION_METHOD[2]} />) },
  { value: CALCULATION_METHOD.formula,      text: (<Item intlID={CALCULATION_METHOD[3]} />) },
  { value: CALCULATION_METHOD.counter,      text: (<Item intlID={CALCULATION_METHOD[4]} />) },
  { value: CALCULATION_METHOD.counterScale, text: (<Item intlID={CALCULATION_METHOD[5]} />) },
];

class SelectMethod extends PureComponent {

  static propTypes = {
    dataID         : PropTypes.string.isRequired,
    value          : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange       : PropTypes.func.isRequired,
    disabled       : PropTypes.bool,
  }

  static defaultProps = {
    value          : '',
    disabled       : false,
  }

  constructor(props) {
    super(props);
    this.onChangeMethod = this.onChangeMethod.bind(this);
  }

  onChangeMethod(event, data) {
    const { dataID, onChange } = this.props;
    onChange({
      dataID,
      event,
      value: data.value,
    });
  }

  render() {
    const { value, disabled } = this.props;

    return (
      <Dropdown
        fluid
        selection
        item
        disabled={disabled}
        value={toInteger(value) || null}
        options={options}
        onChange={this.onChangeMethod}
      />
    );
  }
}

export default SelectMethod;
