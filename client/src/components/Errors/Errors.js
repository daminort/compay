import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty, isEqual } from 'lodash';
import { Message } from 'semantic-ui-react';

import Intl from '../../languages';

import { lang } from './lang';
import { Wrapper, Header, Info } from './Errors.style';

class Errors extends Component {

  static propTypes = {
    errors: PropTypes.arrayOf(PropTypes.shape({
      dataID  : PropTypes.string,
      range   : PropTypes.number,
      message : PropTypes.string.isRequired,
    })),
  }

  static defaultProps = {
    errors: [],
  }

  constructor(props) {
    super(props);
    this.onDismiss = this.onDismiss.bind(this);
    this.state = {
      dissmissed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = this.props;
    if (!isEqual(errors, nextProps.errors)) {
      this.setState({
        dissmissed: false,
      });
    }
  }

  onDismiss() {
    this.setState({
      dissmissed: true,
    });
  }

  render() {
    const { errors }     = this.props;
    const { dissmissed } = this.state;
    const isErrors       = !isEmpty(errors);

    const className = classnames({
      invisible : (!isErrors || dissmissed),
      visible   : (isErrors && !dissmissed),
    });

    const messages = errors.map( (error, index) => {
      const key = `error-${index}`;
      const showRange = Boolean(error.range);

      return (
        <Info key={key}>
          {showRange && (<span>{lang.range}</span>)}
          {showRange && (<span>{error.range}:</span>)}
          <span><Intl id={error.message} /></span>
        </Info>
      );
    });

    return (
      <Wrapper className={className}>
        <Message
          negative
          icon="exclamation"
          header={<Header>{lang.title}</Header>}
          content={messages}
          onDismiss={this.onDismiss}
        />
      </Wrapper>
    );
  }
}

export default Errors;
