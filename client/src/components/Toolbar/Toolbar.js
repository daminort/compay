import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Checkbox } from 'semantic-ui-react';

import IconButton from '../shared/IconButton';
import { Container, Group } from './ToolBar.style';
import { lang } from './lang';

const buttonPropTypes = {
  title   : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick : PropTypes.func,
};
const flagPropTypes = {
  title    : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  checked  : PropTypes.bool,
  onChange : PropTypes.func,
};

class Toolbar extends Component {

  static propTypes = {
    primary: PropTypes.oneOfType([PropTypes.any, PropTypes.shape({
      create    : buttonPropTypes,
      save      : buttonPropTypes,
      calculate : buttonPropTypes,
      refresh   : buttonPropTypes,
    })]),
    middle: PropTypes.oneOfType([PropTypes.any, PropTypes.shape({
      range   : buttonPropTypes,
    })]),
    operations: PropTypes.oneOfType([PropTypes.any, PropTypes.shape({
      remove  : buttonPropTypes,
      restore : buttonPropTypes,
      reset   : buttonPropTypes,
    })]),
    flags: PropTypes.oneOfType([PropTypes.any, PropTypes.shape({
      showDeleted : flagPropTypes,
      showEmpty   : flagPropTypes,
    })]),
    extra: PropTypes.arrayOf(PropTypes.element),

    order: PropTypes.arrayOf(
      PropTypes.oneOf(['primary', 'middle', 'operations', 'flags', 'extra']),
    ),

    deleted  : PropTypes.bool,
    disabled : PropTypes.bool,
  }

  static defaultProps = {
    primary: {
      create    : null,
      save      : null,
      calculate : null,
      refresh   : null,
    },
    middle: {
      range: null,
    },
    operations: {
      remove  : null,
      restore : null,
      reset   : null,
    },
    flags: {
      showDeleted : null,
      showEmpty   : null,
    },
    extra: [],

    order    : ['primary', 'middle', 'operations', 'flags', 'extra'],
    deleted  : false,
    disabled : false,
  }

  constructor(props) {
    super(props);
    this.renderPrimary    = this.renderPrimary.bind(this);
    this.renderMiddle     = this.renderMiddle.bind(this);
    this.renderOperations = this.renderOperations.bind(this);
    this.renderFlags      = this.renderFlags.bind(this);
    this.renderExtra      = this.renderExtra.bind(this);
  }

  renderPrimary() {
    const { primary, disabled } = this.props;
    const { create, save, calculate, refresh } = primary;
    const isPrimary = (create || save || calculate || refresh);
    if (!isPrimary) {
      return null;
    }

    const createTitle    = (create && create.title)       ? create.title    : lang.create;
    const saveTitle      = (save && save.title)           ? save.title      : lang.save;
    const calculateTitle = (calculate && calculate.title) ? calculate.title : lang.calculate;
    const refreshTitle   = (refresh && refresh.title)     ? refresh.title   : lang.refresh;

    return (
      <Group>
        {create && (
          <IconButton
            color="teal"
            iconName="add"
            title={createTitle}
            disabled={disabled}
            onClick={create.onClick}
          />
        )}
        {save && (
          <IconButton
            color="blue"
            iconName="save"
            title={saveTitle}
            disabled={disabled}
            onClick={save.onClick}
          />
        )}
        {calculate && (
          <IconButton
            color="teal"
            iconName="calculator"
            title={calculateTitle}
            disabled={disabled}
            onClick={calculate.onClick}
          />
        )}
        {refresh && (
          <IconButton
            color="instagram"
            iconName="sync"
            title={refreshTitle}
            disabled={disabled}
            onClick={refresh.onClick}
          />
        )}
      </Group>
    );
  }

  renderMiddle() {
    const { middle, disabled } = this.props;
    const { range } = middle;
    const isMiddle = (range);
    if (!isMiddle) {
      return null;
    }

    const rangeTitle = (range && range.title) ? range.title : lang.range;

    return (
      <Group>
        {range && (
          <IconButton
            color="green"
            iconName="add"
            title={rangeTitle}
            disabled={disabled}
            onClick={range.onClick}
          />
        )}
      </Group>
    );
  }

  renderOperations() {
    const { operations, deleted, disabled } = this.props;
    const { remove, restore, reset } = operations;
    const isOperations = (remove || restore || reset);
    if (!isOperations) {
      return null;
    }

    const showRemove  = (remove && !deleted);
    const showRestore = (restore && deleted);
    const showReset   = (reset);

    const removeTitle  = (showRemove && remove.title)   ? remove.title  : lang.remove;
    const restoreTitle = (showRestore && restore.title) ? restore.title : lang.restore;
    const resetTitle   = (showReset && reset.title)     ? reset.title   : lang.reset;

    return (
      <Group>
        {showRemove && (
          <IconButton
            color="red"
            iconName="delete"
            title={removeTitle}
            disabled={disabled}
            onClick={remove.onClick}
          />
        )}
        {showRestore && (
          <IconButton
            color="teal"
            iconName="undo"
            title={restoreTitle}
            disabled={disabled}
            onClick={restore.onClick}
          />
        )}
        {showReset && (
          <IconButton
            color="teal"
            iconName="undo"
            title={resetTitle}
            disabled={disabled}
            onClick={reset.onClick}
          />
        )}
      </Group>
    );
  }

  renderFlags() {
    const { flags, disabled } = this.props;
    const { showDeleted, showEmpty } = flags;
    const isFlags = (showDeleted || showEmpty);
    if ( !isFlags) {
      return null;
    }

    const showDeletedTitle = (showDeleted && showDeleted.title) ? showDeleted.title : lang.showDeleted;
    const showEmptyTitle   = (showEmpty && showEmpty.title)     ? showEmpty.title   : lang.showEmpty;

    return (
      <Group>
        {showDeleted && (
          <Checkbox
            label={showDeletedTitle}
            checked={showDeleted.checked}
            disabled={disabled}
            onChange={(event, data) => showDeleted.onChange(data.checked)}
          />
        )}
        {showEmpty && (
          <Checkbox
            label={showEmptyTitle}
            checked={showEmpty.checked}
            disabled={disabled}
            onChange={(event, data) => showEmpty.onChange(data.checked)}
          />
        )}
      </Group>
    );
  }

  renderExtra() {
    const { extra } = this.props;
    const isExtra = !isEmpty(extra);
    if (!isExtra) {
      return null;
    }

    return (
      <Group>
        {extra.map(component => component)}
      </Group>
    );
  }

  render() {
    const { order } = this.props;

    const blocks = {
      primary    : this.renderPrimary(),
      middle     : this.renderMiddle(),
      operations : this.renderOperations(),
      flags      : this.renderFlags(),
      extra      : this.renderExtra(),
    };

    const content = order.map(blockName => {
      return (
        <Fragment key={blockName}>
          {blocks[blockName]}
        </Fragment>
      );
    });

    return (
      <Container>
        {content}
      </Container>
    );
  }
}

export default Toolbar;
