import styled from 'styled-components';

const alignment = {
  left   : 'flex-start',
  center : 'center',
  right  : 'flex-end',
};

export const Wrapper = styled.div`
  display: flex;
  justify-content: ${({ align }) => alignment[align]};
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: ${({ visibleOnHover }) => visibleOnHover ? 0 : 1};
  transition: all .3s linear;

  button {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }

  &:hover {
    opacity: 1;
  }
`;
