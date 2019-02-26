import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

const withThemeComponent = (WrappedComponent) => {

  class ThemedComponent extends Component {

    render() {
      const { App, ...restProps } = this.props;
      return (
        <WrappedComponent {...restProps} theme={App.theme} />
      );
    }
  }

  return inject('App')(observer(ThemedComponent));
};

export default withThemeComponent;
