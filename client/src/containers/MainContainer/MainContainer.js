import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Container  } from 'semantic-ui-react';
import { Segment } from './MainContainer.style';

class MainContainer extends Component {

  static propTypes = {
    header : PropTypes.element,
    title  : PropTypes.string,
  }

  static defaultProps = {
    header : null,
    title  : '',
  }

  render() {
    const { header, title, children, ...restProps } = this.props;
    const pageHeader = header || title;

    return (
      <Segment {...restProps}>
        {pageHeader && (
          <Header size="large" dividing>{pageHeader}</Header>
        )}
        <Container>
          {children}
        </Container>
      </Segment>
    );
  }
}

export default MainContainer;
