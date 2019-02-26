import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isArray, isEmpty, toNumber } from 'lodash';
import { Table as TableSUI } from 'semantic-ui-react';

import { Wrapper } from './Table.style';

const TableHeader     = TableSUI.Header;
const TableRow        = TableSUI.Row;
const TableHeaderCell = TableSUI.HeaderCell;
const TableBody       = TableSUI.Body;
const TableCell       = TableSUI.Cell;

class Table extends Component {

  static propTypes = {
    columns       : PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSource    : PropTypes.arrayOf(PropTypes.object).isRequired,

    rowKey        : PropTypes.string,
    basic         : PropTypes.bool,
    verticalAlign : PropTypes.oneOf(['bottom', 'middle', 'top']),
    rowClassName  : PropTypes.func,
    totals        : PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    rowKey        : 'id',
    basic         : true,
    verticalAlign : 'middle',
    rowClassName  : null,
    totals        : [],
  }

  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderRows   = this.renderRows.bind(this);
    this.renderTotals = this.renderTotals.bind(this);
  }

  // Renders ------------------------------------------------------------------
  renderHeader() {
    const { columns } = this.props;
    if (!isArray(columns) || isEmpty(columns)) {
      return null;
    }

    const cells = columns.map( column => {
      const { dataIndex, title, width } = column;
      const widthSettings   = width ? { width } : {};
      const headerClass     = column.headerClass || '';
      const headerComponent = column.headerComponent || null;

      return (
        <TableHeaderCell
          key={dataIndex}
          className={headerClass}
          {...widthSettings}
        >
          {headerComponent || title}
        </TableHeaderCell>
      );
    });

    return (
      <TableRow>
        {cells}
      </TableRow>
    );
  }

  renderRows() {
    const { columns, dataSource, rowKey, rowClassName } = this.props;
    if (!isArray(columns) || isEmpty(columns)) {
      return null;
    }
    if (!isArray(dataSource) || isEmpty(dataSource)) {
      return null;
    }

    const rows = dataSource.map( row => {

      const cells = columns.map( column => {
        const { dataIndex } = column;
        let cellValue = row[dataIndex];
        if (column.render) {
          cellValue = column.render(row, dataIndex);
        }
        const cellClassName = classNames({
          [column.className]: column.className,
        });

        return (
          <TableCell key={dataIndex} className={cellClassName}>
            {cellValue}
          </TableCell>
        );
      });

      const className = rowClassName ? rowClassName(row) : '';

      return (
        <TableRow key={row[rowKey]} className={className}>
          {cells}
        </TableRow>
      );
    });

    return rows;
  }

  renderTotals() {
    const { columns, dataSource, totals } = this.props;
    if (!isArray(totals) || isEmpty(totals)) {
      return null;
    }
    if (!isArray(columns) || isEmpty(columns)) {
      return null;
    }
    if (!isArray(dataSource) || isEmpty(dataSource)) {
      return null;
    }

    const row = columns.reduce((result, column) => {
      const { dataIndex } = column;
      if (!totals.includes(dataIndex)) {
        result[dataIndex] = '';
        return result;
      }

      const total = dataSource.reduce((sum, record) => {
        const numValue = toNumber(record[dataIndex]);
        const value = !Number.isNaN(numValue) ? numValue : 0;

        return sum + value;
      }, 0);

      result[dataIndex] = total;
      return result;
    }, {});

    const cells = columns.map( column => {
      const { dataIndex } = column;
      let cellValue = row[dataIndex];
      if (column.render) {
        cellValue = column.render(row, dataIndex);
      }
      const cellClassName = classNames({
        [column.className]: column.className,
      });

      return (
        <TableCell key={dataIndex} className={cellClassName}>
          {cellValue}
        </TableCell>
      );
    });

    return (
      <TableRow key="totals" className="table-totals">
        {cells}
      </TableRow>
    );
  }

  render() {
    const { basic, verticalAlign } = this.props;

    const tableHeader = this.renderHeader();
    const tableRows   = this.renderRows();
    const tableTotals = this.renderTotals();

    return (
      <Wrapper verticalAlign={verticalAlign}>
        <TableSUI
          singleLine
          basic={basic ? 'very' : false}
          verticalAlign={verticalAlign}
        >
          <TableHeader>
            {tableHeader}
          </TableHeader>

          <TableBody>
            {tableRows}
            {tableTotals}
          </TableBody>
        </TableSUI>
      </Wrapper>
    );
  }
}

export default Table;
