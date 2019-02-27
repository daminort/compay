import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CircleButton from '../shared/CircleButton';
import RemoveConfirm from '../popups/RemoveConfirm';
import { Wrapper } from './ButtonsBlock.styled';

class ButtonsBlock extends Component {

  static propTypes = {
    id             : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    edit           : PropTypes.bool,
    remove         : PropTypes.bool,
    restore        : PropTypes.bool,
    onEdit         : PropTypes.func,
    onRemove       : PropTypes.func,
    onRestore      : PropTypes.func,
    editTitle      : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    removeTitle    : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    restoreTitle   : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    align          : PropTypes.oneOf(['left', 'center', 'right']),
    buttonSize     : PropTypes.oneOf(['small', 'medium', 'large']),
    disabled       : PropTypes.bool,
    visibleOnHover : PropTypes.bool,
    useConfirm     : PropTypes.bool,
  }

  static defaultProps = {
    edit           : false,
    remove         : false,
    restore        : false,
    onEdit         : null,
    onRemove       : null,
    onRestore      : null,
    editTitle      : 'Edit',
    removeTitle    : 'Remove',
    restoreTitle   : 'Restore',
    align          : 'center',
    buttonSize     : 'small',
    disabled       : false,
    visibleOnHover : false,
    useConfirm     : true,
  }

  constructor(props) {
    super(props);
    this.onClickEdit           = this.onClickEdit.bind(this);
    this.onClickRestore        = this.onClickRestore.bind(this);
    this.onConfirmRemove       = this.onConfirmRemove.bind(this);
    this.renderRemove          = this.renderRemove.bind(this);
  }

  // Events -------------------------------------------------------------------
  onClickEdit(event) {
    const { id, onEdit } = this.props;
    if (!onEdit) {
      return;
    }

    onEdit(id, event);
  }

  onClickRestore(event) {
    const { id, onRestore } = this.props;
    if (!onRestore) {
      return;
    }

    onRestore(id, event);
  }

  onConfirmRemove() {
    const { id, onRemove } = this.props;
    if (!onRemove) {
      return;
    }

    onRemove(id);
  }

  // Renders ------------------------------------------------------------------
  renderRemove() {
    const { id, useConfirm, removeTitle, buttonSize, disabled } = this.props;
    if (!useConfirm) {
      return (
        <CircleButton
          icon="cancel"
          title={removeTitle}
          size={buttonSize}
          disabled={disabled}
          onClick={this.onConfirmRemove}
        />
      );
    }

    return (
      <RemoveConfirm
        id={id}
        onConfirm={this.onConfirmRemove}
        trigger={(
          <CircleButton
            icon="cancel"
            title={removeTitle}
            size={buttonSize}
            disabled={disabled}
          />
        )}
      />
    );
  }

  render() {
    const {
      edit,
      remove,
      restore,
      editTitle,
      restoreTitle,
      align,
      buttonSize,
      disabled,
      visibleOnHover,
    } = this.props;

    return (
      <Wrapper align={align} visibleOnHover={visibleOnHover} className="buttons-block">
        {edit && (
          <CircleButton
            icon="edit"
            title={editTitle}
            size={buttonSize}
            disabled={disabled}
            onClick={this.onClickEdit}
          />
        )}
        {restore && (
          <CircleButton
            icon="undo"
            title={restoreTitle}
            size={buttonSize}
            disabled={disabled}
            onClick={this.onClickRestore}
          />
        )}
        {remove && this.renderRemove()}
      </Wrapper>
    );
  }
}

export default ButtonsBlock;
