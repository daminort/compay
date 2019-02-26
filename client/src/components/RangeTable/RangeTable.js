import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toInteger, toNumber, find, some } from 'lodash';

import { maxCounterValue } from '../../config';
import { RANGE_TABLE_MODE } from '../../constants/componentsUI';

import ButtonsBlock from '../ButtonsBlock';
import Table from '../shared/Table';
import Input from '../FormControls/Input';

import { lang } from './lang';
import { TableHolder, RangeHolder } from './RangeTable.style';

class RangeTable extends Component {

  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.shape({
      id         : PropTypes.string,
      range      : PropTypes.number,
      counterMin : PropTypes.number,
      counterMax : PropTypes.number,
    })),
    errors: PropTypes.arrayOf(PropTypes.shape({
      range   : PropTypes.number,
      message : PropTypes.string,
    })),

    mode     : PropTypes.string,
    onChange : PropTypes.func.isRequired,
  }

  static defaultProps = {
    dataSource : [],
    errors     : [],
    mode       : RANGE_TABLE_MODE.scale,
  }

  constructor(props) {
    super(props);
    this.onChangeField = this.onChangeField.bind(this);
    this.onRemoveRange = this.onRemoveRange.bind(this);
    this.renderCell    = this.renderCell.bind(this);

    this.columns = [
      { dataIndex: 'range', title: lang.range, render: this.renderCell },
      { dataIndex: 'counterMin', title: lang.counterMin, render: this.renderCell },
      { dataIndex: 'counterMax', title: lang.counterMax, render: this.renderCell },
    ];

    if (props.mode === RANGE_TABLE_MODE.scale) {
      this.columns.push({ dataIndex: 'actions', title: lang.actions, width: 1, render: this.renderCell });
    }
    if (props.mode === RANGE_TABLE_MODE.rate) {
      this.columns.push({ dataIndex: 'rate', title: lang.rate, render: this.renderCell });
    }
  }

  // Events -------------------------------------------------------------------
  onChangeField(id, { dataID, value }) {
    const { dataSource, onChange } = this.props;
    const rangeItem = find(dataSource, { id });

    rangeItem[dataID] = (dataID === 'counterMin' || dataID === 'counterMax')
      ? toInteger(value)
      : toNumber(value);

    onChange(dataSource);
  }

  onRemoveRange(id) {
    const { dataSource, onChange } = this.props;
    const newSource = dataSource.filter(item => item.id !== id);

    onChange(newSource);
  }

  // Renders ------------------------------------------------------------------
  renderCell(record, colName) {
    const { errors, mode } = this.props;

    const rangeID          = record.id;
    const rangeNumber      = record.range;
    const recValue         = record[colName];
    const isError          = some(errors, { range: rangeNumber });
    const countersDisabled = (mode === RANGE_TABLE_MODE.rate);

    switch (colName) {

      case 'range': {
        return (
          <RangeHolder>
            <span>{lang.range}</span>
            <span>{recValue}</span>
          </RangeHolder>
        );
      }

      case 'counterMin':
      case 'counterMax': {
        const counterValue = (
          (colName === 'counterMax' && recValue === maxCounterValue) || (recValue === 0)
        )
          ? ''
          : recValue;

        return (
          <Input
            noLabel
            type="number"
            error={isError}
            dataID={colName}
            value={counterValue}
            disabled={countersDisabled}
            onChange={data => this.onChangeField(rangeID, data)}
          />
        );
      }

      case 'rate': {
        return (
          <Input
            noLabel
            type="number"
            error={isError}
            dataID={colName}
            value={recValue}
            onChange={data => this.onChangeField(rangeID, data)}
          />
        );
      }

      case 'actions': {
        return (
          <ButtonsBlock
            id={rangeID}
            buttonSize="medium"
            useConfirm={false}
            remove
            onRemove={this.onRemoveRange}
          />
        );
      }

      default:
        return recValue;
    }
  }

  render() {
    const { dataSource } = this.props;

    return (
      <TableHolder>
        <Table
          columns={this.columns}
          dataSource={dataSource}
        />
      </TableHolder>
    );
  }
}

export default RangeTable;
