import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { spinner2 as Spinner } from 'react-icons-kit/icomoon/spinner2';
import { Wrapper, Container, Info } from './AppLoader.style';
import { lang } from './lang';

class AppLoader extends Component {

  static propTypes = {
    visible: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
  }

  render() {
    const { visible } = this.props;

    return (
      <Wrapper visible={visible}>
        <Container>
          <Icon icon={Spinner} size={96} className="spinner" />
          <Info>{lang.wait}</Info>
        </Container>
      </Wrapper>
    );
  }
}

export default AppLoader;
