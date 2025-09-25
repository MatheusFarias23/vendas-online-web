import Input from '../../../shared/components/inputs/input/Input';
import Button from '../../../shared/components/buttons/button/Button';
import SVGLogo from '../../../shared/components/icons/SVGHome';
import { useState } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import {
  BackgroundImage,
  ContainerLogin,
  LimitedContainer,
  TitleLogin,
} from '../styles/LoginScreen.styles';
import { useNavigate } from 'react-router';

const LoginScreen = () => {
  //O "useState" serve para criar um estado, ou seja, guardar um valor que pode mudar com o tempo (ex: um input que o usuário preenche).
  const [email, setEmail] = useState('');
  //"userName" é a variável de estado (valor).
  //"setUserName" é a função que muda o valor.
  //"useState('')" o '' é o valor inicial (nesse caso, string vazia).
  const [password, setPassWord] = useState('');
  const { authRequest, loading } = useRequests();
  const navigate = useNavigate();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    //" (event: React.ChangeEvent<HTMLInputElement>)" esse é o parâmetro da função, ou seja, o valor que ela recebe quando é chamada.
    //"event"  quando o usuário digita no input, o React dispara um 'evento de mudança', e passa esse evento como argumento para função.
    //"React.ChangeEvent<HTMLInputElement>" isso é o tipo do evento. Esse evento é um 'ChangeEvent' (mudança de valor) vindo de um '<input>' HTML.
    setEmail(event.target.value);
    //"event.target.value" => "event.target" é o elemento HTML que gerou o evento, ou seja, o <input>. "event.target.value" é o valor digitado no input.
    //"setEmail(event.target.value)" => Esse é o momento em que você atualiza o estado com o novo valor do input. Ex: pegue o que pessoa digitou no input e salve dentro da variavel 'username'.
  };

  const handlePassWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassWord(event.target.value);
  };

  const handleLogin = async () => {    
    await authRequest({
      //"postRequest<UserType>" espera que a resposta sega o formato da interface 'UserType'.
      email: email,
      password: password,
    }, navigate);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div>
      <BackgroundImage src="./background.png" />
      <ContainerLogin>
        <LimitedContainer>
          <SVGLogo />
          <TitleLogin>LOGIN</TitleLogin>
          <Input title="USUÁRIO:" onChange={handleEmail} value={email} />
          <Input
            type="password"
            title="SENHA:"
            onChange={handlePassWord}
            value={password}
            onKeyDown={handleKeyDown}
          />
          <Button type="primary" margin="64px 0px 16px" onClick={handleLogin} loading={loading}>
            ENTRAR
          </Button>
        </LimitedContainer>
      </ContainerLogin>
    </div>
  );
};

export default LoginScreen;
