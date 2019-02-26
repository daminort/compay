import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 10000;
  top: 20px;
  right: 20px;
  width: 30%;
  overflow-x: hidden;
`;

export const MessageHolder = styled.div`
  margin-bottom: 8px;
  position: relative;
  left: 100%;
  transition: all .5s linear;
  animation: slideIn .5s forwards;

  &.deleted {
    opacity: 0;
  }

  .message {
    cursor: pointer;
  }

  @keyframes slideIn {
    0% {
      left: 100%;
    }
    100% { 
      left: 0; 
    }
  }
`;

export const Header = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: .5em;
`;

export const Content = styled.div`

`;
