import React from 'react';
import PropTypes from 'prop-types';

import ProcessIndicator from '../ProcessIndicator';
import { Wrapper, Item } from './ProcessListIndicator.style';

const ProcessListIndicator = ({ dataSource }) => {

  const items = dataSource.map(item => {
    const { titleID, loading, completed, error } = item;
    return (
      <Item key={titleID}>
        <ProcessIndicator
          showInert
          loading={loading}
          completed={completed}
          error={error}
          inertTitleID={titleID}
          loadingTitleID={titleID}
          completedTitleID={titleID}
          errorTitleID={titleID}
        />
      </Item>
    );
  });

  return (
    <Wrapper>
      {items}
    </Wrapper>
  );
};

ProcessListIndicator.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({
    titleID   : PropTypes.string.isRequired,
    loading   : PropTypes.bool.isRequired,
    completed : PropTypes.bool.isRequired,
    error     : PropTypes.bool.isRequired,
  })).isRequired,
};

export default ProcessListIndicator;
