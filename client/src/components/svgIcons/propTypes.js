import PropTypes from 'prop-types';

export const propTypes = {
  size      : PropTypes.number,
  color     : PropTypes.string,
  lineWidth : PropTypes.number,
};

export const defaultProps = {
  size      : 16,
  color     : '#000000',
  lineWidth : 2,
};
