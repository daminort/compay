import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import { Wrapper, Left, Right, Title, PreContent, PostContent, IconHolder } from './PageHeader.style';

class PageHeader extends Component {

  static propTypes = {
    title       : PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    iconName    : PropTypes.string,
    preContent  : PropTypes.element,
    postContent : PropTypes.element,
  }

  static defaultProps = {
    iconName    : null,
    preContent  : null,
    postContent : null,
  }

  render() {
    const { title, iconName, preContent, postContent } = this.props;

    const isIcon        = Boolean(iconName);
    const isPreContent  = Boolean(preContent);
    const isPostContent = Boolean(postContent);

    return (
      <Wrapper>
        <Left>
          {isPreContent && (
            <PreContent>{preContent}</PreContent>
          )}
          {isIcon && (
            <IconHolder>
              <Icon name={iconName} />
            </IconHolder>
          )}
          <Title>{title}</Title>
        </Left>

        <Right>
          {isPostContent && (
            <PostContent>{postContent}</PostContent>
          )}
        </Right>
      </Wrapper>
    );
  }
}

export default PageHeader;
