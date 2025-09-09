import styled from 'styled-components';

export const ContainerExternal = styled.div`
  display: none;
  position: absolute;
  bottom: -170px;
  padding: 4px;
  z-index: 2;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ContainerTooltip = styled.div`
  position: relative;
  &:hover ${ContainerExternal} {
    display: block;
  }
`;