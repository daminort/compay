import React from 'react';
import { propTypes, defaultProps } from '../propTypes';

const Undo = ({ size, color, lineWidth }) => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={lineWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" />
    </svg>
  );
};

Undo.propTypes    = propTypes;
Undo.defaultProps = defaultProps;

export default Undo;
