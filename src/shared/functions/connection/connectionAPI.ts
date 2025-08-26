import axios, { type AxiosRequestConfig } from 'axios';
import { MethodsEnum } from '../../enums/methods.enums';
import { ERROR_ACCESS_DENIED, ERROR_CONNECTION } from '../../constants/errosStatus';
import { getAuthorizationToken } from './auth';

export default class ConnectionAPI {
  static async call<T>(url: string, method: string, body?: unknown): Promise<T> {
    //"call" é um método puro que faz a requisição HTTP usando axios e retorna os dados (.data), ele não trata erros, só executa a chamada.

    const config: AxiosRequestConfig = {
      //"const config: AxiosRequestConfig = { ... }" aqui estamos criando um objeto de configuração para o Axios.
      headers: {
        //"headers" são cabeçalhos HTTP que vão junto na requisição.
        Authorization: getAuthorizationToken(),
        //Essa é a parte mais importante: adiciona o token no cabeçalho da requisição. A função 'getAuthorizationToken()' pega o token salvo no 'localStorage' e retona no formato certo (geralmente 'Bearer <token>').
        'Content-Type': 'application/json',
        //Informa que o corpo da requisição está sendo enviado em JSON. Isso é necessário, por exemplo, em requisição 'POST' ou 'PUT'
      },
    };

    switch (method) {
      //"switch" o switch permite escolher o método HTTP (GET, POST, etc) de forma centralizada. Ao inves de escrever 'axios.get(...)' espalhado por todo o projeto, fica tudo num só lugar.
      case MethodsEnum.GET:
        return (await axios.get<T>(url, config)).data;
      //"(await axios.get<T>(url)).data" 'await' espera a requisição terminar, e o '.data' pega somente o corpo da resposta (o 'axios' retorna um objeto com várias informações). O '<T>' informa ao TypeScript o formato dos dados que vamos receber.
      case MethodsEnum.DELETE:
        return (await axios.delete<T>(url, config)).data;
      case MethodsEnum.POST:
        return (await axios.post<T>(url, body, config)).data;
      //O 'body' só é passado quando o método suporta envio de dados (POST, PUT e PATCH).
      case MethodsEnum.PUT:
        return (await axios.put<T>(url, body, config)).data;
      case MethodsEnum.PATCH:
      default:
        return (await axios.patch<T>(url, body, config)).data;
    }
  }

  static async connect<T>(url: string, method: string, body?: unknown): Promise<T> {
    //"connect" é um envoltório em volta do 'call'. Ele chama o 'call', mas trata os erros antes de deixar a resposta chegar para quem chamou.
    return ConnectionAPI.call<T>(url, method, body).catch((error) => {
      if (error.response) {
        //"error.response" O axios coloca aqui os dados da resposta do servidor em caso de erro.
        switch (error.response.status) {
          //"switch (error.response.status)" verifica o código de status HTTP (401, 403, etc).
          case 401:
          case 403:
            throw new Error(ERROR_ACCESS_DENIED);
          //"throw new Error(...)" dispara um erro personalizado com a mensagem definida nas constantes.
          default:
            throw new Error(ERROR_CONNECTION);
        }
      }
      throw new Error(ERROR_CONNECTION);
    });
  }
}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.GET);
};

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.DELETE);
};

export const connectionAPIPost = async <T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.POST, body);
};

export const connectionAPIPut = async <T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.PUT, body);
};

export const connectionAPIPatch = async <T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.PATCH, body);
};
