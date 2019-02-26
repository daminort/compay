import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'semantic-ui-react';

import { FORMULAS } from '../../constants/formulas';
import Item from './Item';

const options = [
  { value: FORMULAS.area,   text: (<Item intlID={FORMULAS[1]} />) },
  { value: FORMULAS.people, text: (<Item intlID={FORMULAS[2]} />) },
];

class SelectFormula extends PureComponent {

  static propTypes = {
    dataID         : PropTypes.string.isRequired,
    value          : PropTypes.number,
    onChange       : PropTypes.func.isRequired,
    disabled       : PropTypes.bool,
  }

  static defaultProps = {
    value          : null,
    disabled       : false,
  }

  constructor(props) {
    super(props);
    this.onChangeFormula = this.onChangeFormula.bind(this);
  }

  onChangeFormula(event, data) {
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
        value={value}
        options={options}
        onChange={this.onChangeFormula}
      />
    );
  }
}

export default SelectFormula;
