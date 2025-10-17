import styled from 'styled-components';
import { LogoutOutlined } from '@ant-design/icons';

export const HeaderContainer = styled.header`
  height: 80px;
  margin-left: auto;
  width: calc(100% - 250px);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;

  -webkit-box-shadow: -2px 4px 6px 0px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: -2px 4px 6px 0px rgba(0, 0, 0, 0.47);
  box-shadow: -2px 4px 6px 0px rgba(0, 0, 0, 0.47);
`;

export const LogoExit = styled(LogoutOutlined)`
    font-size: 25px;
`;