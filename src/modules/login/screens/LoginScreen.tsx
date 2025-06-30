import Button from '../../../shared/inputs/input/buttons/button/Button';
import Input from '../../../shared/inputs/input/Input';
import {
  BackgroundImage,
  ContainerLogin,
  LimitedContainer,
  LoginImage,
  TitleLogin,
} from '../styles/LoginScreen.styles';

const LoginScreen = () => {
  return (
    <div>
      <BackgroundImage src="./background.png" />
      <ContainerLogin>
        <LimitedContainer>
          <LoginImage src="./logo.png" />
          <TitleLogin>LOGIN</TitleLogin>
          <Input title='USUÁRIO:' />
          <Input title='SENHA:' />
          <Button type='primary' margin='64px 0px 16px'>ENTRAR</Button>
        </LimitedContainer>
      </ContainerLogin>
    </div>
  );
};

export default LoginScreen;
