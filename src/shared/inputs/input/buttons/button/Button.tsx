import type { ButtonProps } from 'antd';
import { ButtonAntd } from './Button.styles';

interface ButtonCurrentProps extends ButtonProps {
    margin?: string;
}

const Button = ({ margin, ...props }: ButtonCurrentProps) => {
  return <ButtonAntd style={{margin}} {...props} />;
};

export default Button;
