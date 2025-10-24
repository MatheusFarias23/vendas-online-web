import styled from 'styled-components';

interface LimitedContainerProps {
  width: number;
  margin?: string;
}

export const LimitedContainer = styled.div<LimitedContainerProps>`
  width: ${(props) => props.width}px;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')}
`;

export const LimitedSizeButton = styled.div`
  width: 120px;
`;

export const LimitedSizeInput = styled.div`
  width: 300px;
`;