import { useState } from 'react';
import axios from 'axios';
import Button from '../../../shared/buttons/button/Button';
import Input from '../../../shared/inputs/input/Input';
import SVGLogo from '../../../shared/icons/SVGHome';
import {
  BackgroundImage,
  ContainerLogin,
  LimitedContainer,
  TitleLogin,
} from '../styles/LoginScreen.styles';

const LoginScreen = () => {
  //O "useState" serve para criar um estado, ou seja, guardar um valor que pode mudar com o tempo (ex: um input que o usuário preenche).
  const [email, setEmail] = useState('');
  //"userName" é a variável de estado (valor).
  //"setUserName" é a função que muda o valor.
  //"useState('')" o '' é o valor inicial (nesse caso, string vazia).
  const [password, setPassWord] = useState('');

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    //" (event: React.ChangeEvent<HTMLInputElement>)" esse é o parâmetro da função, ou seja, o valor que ela recebe quando é chamada.
    //"event"  quando o usuário digita no input, o React dispara um 'evento de mudança', e passa esse evento como argumento para função.
    //"React.ChangeEvent<HTMLInputElement>" isso é o tipo do evento. Esse evento é um 'ChangeEvent' (mudança de valor) vindo de um '<input>' HTML.
    setEmail(event.target.value);
    //"event.target.value" => "event.target" é o elemento HTML que gerou o evento, ou seja, o <input>. "event.target.value" é o valor digitado no input.
    //"setUserName(event.target.value)" => Esse é o momento em que você atualiza o estado com o novo valor do input. Ex: pegue o que pessoa digitou no input e salve dentro da variavel 'username'.
  };

  const handlePassWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassWord(event.target.value);
  };

  const handleLogin = async () => {
    //"async" faz a função ser assincrona, porque vai fazer algo que demora: uma requisição HTTP.
    await axios({
      method: 'post',
      url: 'http://localhost:8080/auth',
      data: {
        email: email,
        password: password,
      },
      //Estamos usando uma biblioteca (axios) para enviar uma requisição POST para a URL: "http://localhost:8080/auth". Está enviando como corpor da requisição (data) os dados "email" e "password".
    })
      .then((result) => {
        //"then" é chamado quando a requisição dá certo
        alert('Fez login');
        return result.data;
      })
      .catch(() => {
        //"catch" é chamado quando a requisição falha
        alert('Usuário ou senha inválido');
      });
    //"axios()" aqui estamos usando 'axios' (uma biblioteca pra fazer requisições HTTP, tipo buscar dados de um servidor) para enviar dados pro backend. E como isso demora um pouco, ele coloca um "await" para dizer: 'Espere o servior responder antes de continuar para a próxima linha';
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      handleLogin();
    }
  }

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
          <Button type="primary" margin="64px 0px 16px" onClick={handleLogin}>
            ENTRAR
          </Button>
        </LimitedContainer>
      </ContainerLogin>
    </div>
  );
};

export default LoginScreen;
