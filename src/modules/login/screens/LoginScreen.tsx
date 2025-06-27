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
        </LimitedContainer>
      </ContainerLogin>
    </div>
  );
};

export default LoginScreen;
