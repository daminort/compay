import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Confirm } from 'semantic-ui-react';

import CircleButton from '../shared/CircleButton';
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
    this.onClickRemove         = this.onClickRemove.bind(this);
    this.onClickRestore        = this.onClickRestore.bind(this);
    this.onConfirmRemoveCancel = this.onConfirmRemoveCancel.bind(this);
    this.onConfirmRemove       = this.onConfirmRemove.bind(this);

    this.state = {
      removeConfirmOpen: false,
    };
  }

  // Events -------------------------------------------------------------------

  onClickEdit(event) {
    const { id, onEdit } = this.props;
    if (!onEdit) {
      return;
    }

    onEdit(id, event);
  }

  onClickRemove() {
    this.setState({ removeConfirmOpen: true });
  }

  onClickRestore(event) {
    const { id, onRestore } = this.props;
    if (!onRestore) {
      return;
    }

    onRestore(id, event);
  }

  onConfirmRemoveCancel() {
    this.setState({ removeConfirmOpen: false });
  }

  onConfirmRemove() {
    const { id, onRemove } = this.props;
    if (!onRemove) {
      return;
    }

    onRemove(id);
  }

  // Renders ------------------------------------------------------------------

  render() {
    const {
      edit,
      remove,
      restore,
      editTitle,
      removeTitle,
      restoreTitle,
      align,
      buttonSize,
      disabled,
      visibleOnHover,
      useConfirm,
    } = this.props;
    const { removeConfirmOpen } = this.state;

    return (
      <Wrapper align={align} visibleOnHover={visibleOnHover} className="buttons-block">
        {edit && (
          <CircleButton
            iconName="edit"
            title={editTitle}
            size={buttonSize}
            disabled={disabled}
            onClick={this.onClickEdit}
          />
        )}
        {restore && (
          <CircleButton
            iconName="undo"
            title={restoreTitle}
            size={buttonSize}
            disabled={disabled}
            onClick={this.onClickRestore}
          />
        )}
        {remove && (
          <CircleButton
            iconName="delete"
            title={removeTitle}
            size={buttonSize}
            disabled={disabled}
            onClick={useConfirm ? this.onClickRemove : this.onConfirmRemove}
          />
        )}

        <Confirm
          open={removeConfirmOpen}
          onCancel={this.onConfirmRemoveCancel}
          onConfirm={this.onConfirmRemove}
        />
      </Wrapper>
    );
  }
}

export default ButtonsBlock;
