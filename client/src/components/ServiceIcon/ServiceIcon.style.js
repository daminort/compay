import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: ${({ centered }) => centered ? 'center' : 'flex-start'};
  align-items: center;
  width: 100%;
  height: ${({ size }) => size}px;
`;

export const Image = styled.img`  
  width: 100%;
  height: 100%;
  display: inline-block;
  object-fit: contain;
  object-position: center;
`;
