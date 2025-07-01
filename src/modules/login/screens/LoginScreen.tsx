import { useState } from 'react';
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
  //O "useState" serve para criar um estado, ou seja, guardar um valor que pode mudar com o tempo (ex: um input que o usuário preenche).
  const [username, setUserName] = useState('');
  //"userName" é a variável de estado (valor).
  //"setUserName" é a função que muda o valor.
  //"useState('')" o '' é o valor inicial (nesse caso, string vazia).
  const [password, setPassWord] = useState('');

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    //" (event: React.ChangeEvent<HTMLInputElement>)" esse é o parâmetro da função, ou seja, o valor que ela recebe quando é chamada.
    //"event"  quando o usuário digita no input, o React dispara um 'evento de mudança', e passa esse evento como argumento para função.
    //"React.ChangeEvent<HTMLInputElement>" isso é o tipo do evento. Esse evento é um 'ChangeEvent' (mudança de valor) vindo de um '<input>' HTML.
    setUserName(event.target.value);
    //"event.target.value" => "event.target" é o elemento HTML que gerou o evento, ou seja, o <input>. "event.target.value" é o valor digitado no input.
    //"setUserName(event.target.value)" => Esse é o momento em que você atualiza o estado com o novo valor do input. Ex: pegue o que pessoa digitou no input e salve dentro da variavel 'username'.
  };

  const handlePassWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassWord(event.target.value);
  };

  return (
    <div>
      <BackgroundImage src="./background.png" />
      <ContainerLogin>
        <LimitedContainer>
          <LoginImage src="./logo.png" />
          <TitleLogin>LOGIN</TitleLogin>
          <Input title="USUÁRIO:" onChange={handleUserName} value={username} />
          <Input type='password' title="SENHA:" onChange={handlePassWord} value={password} />
          <Button type="primary" margin="64px 0px 16px">
            ENTRAR
          </Button>
        </LimitedContainer>
      </ContainerLogin>
    </div>
  );
};

export default LoginScreen;
