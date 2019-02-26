import styled from 'styled-components';
import withTheme from '../../../themes/withTheme';

export const Wrapper = withTheme(styled.div`
  position: absolute;
  z-index: 1000;
  display: ${({ visible }) => visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.bg.dim};
  color: ${({ theme }) => theme.grey.soft};
`);

export const Container = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -70px;

  .spinner {
    color: ${({ theme }) => theme.text.mainLight};
    margin-bottom: 30px;
    animation-name: spin;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @keyframes spin { 
        from { 
            transform: rotate(0deg); 
        } to { 
            transform: rotate(360deg); 
        }
    }
  }
`);

export const Info = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;
