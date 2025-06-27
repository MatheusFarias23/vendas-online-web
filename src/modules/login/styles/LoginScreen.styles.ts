import styled from 'styled-components';

export const BackgroundImage = styled.img`
  height: 100vh;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  object-fit: cover;
`;

export const LoginImage = styled.img``;

export const ContainerLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  max-width: 646px;
  float: right;
  background-color: #d9d9d9;
`;

export const LimitedContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 498px;
  margin: 22px;
  border: solid black 2px;
`;
