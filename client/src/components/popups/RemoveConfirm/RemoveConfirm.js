import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import Button from '../../ui/Button';

import { lang } from './lang';
import { Wrapper } from './RemoveConfirm.style';

class RemoveConfirm extends Component {

  static propTypes = {
    id        : PropTypes.string.isRequired,
    onConfirm : PropTypes.object.isRequired,
    trigger   : PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props);
    this.onClick       = this.onClick.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  onClick() {
    const { id, onConfirm } = this.props;
    onConfirm(id);
  }

  renderContent() {

    return (
      <Wrapper>
        <div className="question">{lang.areYouSure}</div>
        <div>
          <Button size="mini" color="red" onClick={this.onClick}>
            {lang.yes}
          </Button>
        </div>
      </Wrapper>
    );
  }

  render() {
    const { trigger } = this.props;
    const popupContent = this.renderContent();

    return (
      <Popup
        trigger={trigger}
        content={popupContent}
        on="click"
      />
    );
  }
}

export default RemoveConfirm;
