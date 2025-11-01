import styled from 'styled-components';

export const DisplayFlex = styled.div`
  display: flex;
`;

export const DisplayFlexJustifyRight = styled(DisplayFlex)`
  justify-content: right;
`;

export const DisplayFlexJustifyBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`;

export const DisplayFlexJustifyCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;