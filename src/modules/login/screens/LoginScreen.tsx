import Input from '../../../shared/inputs/input/Input';
import {
  BackgroundImage,
  ContainerLogin,
  LimitedContainer,
  LoginImage,
} from '../styles/LoginScreen.styles';

const LoginScreen = () => {
  return (
    <div>
      <BackgroundImage src="./background.png" />
      <ContainerLogin>
        <LimitedContainer>
          <LoginImage src="./logo.png" />
          <Input title='USUÁRIO:' />
          <Input title='SENHA:' />
        </LimitedContainer>
      </ContainerLogin>
    </div>
  );
};

export default LoginScreen;
