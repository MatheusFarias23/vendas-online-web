import { Input as InputAntd } from 'antd';
import type { InputProps as InputPropsAntd} from 'antd';
import { BoxInput, TitleInput } from './Input.styles';

interface InputProps extends InputPropsAntd {
  title?: string;
  //A interface no TypeScript serve para definir o formato das props que o componente espera receber.
  //title?: prop 'title' é opcional e do tipo string
  //'InputProps extends InputPropsAntd' aceita tudo o que o InputAntd aceita (value, onChange, placeholder...)
}

const Input = ({ title /*Valor que você passa para um componente*/, ...props /*Passa todas as props restantes que foram recebidas*/}: InputProps) => {
  //Usa o prop (propriedade) 'title', que vem de um objeto com o formato definido por 'InputProps'.
  return (
    <BoxInput>
      {title && <TitleInput>{title}</TitleInput>}
      <InputAntd {...props} />
    </BoxInput>
  );
};

export default Input;
