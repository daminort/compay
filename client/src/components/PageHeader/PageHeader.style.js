import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

export const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const PreContent = styled.div`
  margin-right: 8px;
`;

export const PostContent = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export const IconHolder = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  i.icon {
    font-size: 3rem;
    height: auto;
  }
`;
