import styled from 'styled-components';
import { Typography } from 'antd';

const {Text} = Typography;

export const BoxInput = styled.div`
  width: 100%;
  margin-top: 32px;
`;

export const TitleInput = styled(Text)`
  font-family: 'Poppins';
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 1px;
  margin: 12px;
`;
