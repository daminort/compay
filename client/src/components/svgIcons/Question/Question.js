import React from 'react';
import { propTypes, defaultProps } from '../propTypes';

const Question = ({ size, color, lineWidth }) => {

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
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12" y2="17" />
    </svg>
  );
};

Question.propTypes    = propTypes;
Question.defaultProps = defaultProps;

export default Question;
