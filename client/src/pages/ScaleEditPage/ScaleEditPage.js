import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';

import MainContainer from '../../containers/MainContainer';
import SelectService from '../../containers/SelectService';
import ToolBar from '../../containers/Toolbars/ScaleEdit';
import RangeTable from '../../components/RangeTable';
import Errors from '../../components/Errors';
import FormControl from '../../components/FormControls/FormControl';
import Grid, { Row, Col } from '../../components/ui/Grid';

import { lang } from './lang';

class ScaleEditPage extends Component {

  static propTypes = {
    ScaleEdit    : PropTypesMobX.observableObject.isRequired,
    ServicesList : PropTypesMobX.observableObject.isRequired,
    match        : PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const { id } = props.match.params;

    this.onChangeBaseField = this.onChangeBaseField.bind(this);
    this.onChangeRange     = this.onChangeRange.bind(this);

    this.state = {
      editMode: Boolean(id),
    };
  }

  componentDidMount() {
    const { ScaleEdit, ServicesList, match } = this.props;
    const { editMode } = this.state;
    const { id } = match.params;

    if (editMode) {
      ScaleEdit.reloadScaleData(id);

    } else {
      const newScale = {
        id        : null,
        serviceID : null,
        range     : [],
        deleted   : false,
      };
      ScaleEdit.setScaleData(newScale);
      ScaleEdit.setScaleID(null);
      ScaleEdit.setScaleRange([]);
			ScaleEdit.clearErrors();
    }

    if (!ServicesList.isList) {
      ServicesList.reloadList();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;
    const { editMode } = this.state;
    if (!editMode && Boolean(id)) {
      this.setState({ editMode: true });
    }
  }

  // Events -------------------------------------------------------------------

  onChangeBaseField({ value, dataID }) {
    const { ScaleEdit } = this.props;
    ScaleEdit.setScaleData({
      [dataID]: value,
    });
  }

  onChangeRange(range) {
    const { ScaleEdit } = this.props;
    ScaleEdit.setScaleRange(range);
  }

  // Renders ------------------------------------------------------------------
  render() {
    const { ScaleEdit } = this.props;
    const { editMode } = this.state;
    const { scaleItem, scaleItemRanges, errors } = ScaleEdit;
    const { serviceID } = scaleItem;

    return (
      <MainContainer>
          <ToolBar />
          <Grid>
            <Row>
              <Col width={16}>
                <FormControl label={lang.service} labelWidth="14.3%">
                  <SelectService
                    dataID="serviceID"
                    value={serviceID}
                    disabled={editMode}
                    onChange={this.onChangeBaseField}
                  />
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col width={16}>
                <RangeTable
                  dataSource={scaleItemRanges}
                  errors={errors}
                  onChange={this.onChangeRange}
                />
              </Col>
            </Row>
            <Row>
              <Col width={16}>
                <Errors errors={errors} />
              </Col>
            </Row>
          </Grid>
      </MainContainer>
    );
  }
}

export default inject('ScaleEdit', 'ServicesList')(observer(ScaleEditPage));
