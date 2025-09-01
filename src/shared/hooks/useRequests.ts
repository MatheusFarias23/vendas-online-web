import { useState } from 'react';
import { useGlobalContext } from './useGlobalContext';
import ConnectionAPI, { connectionAPIPost, type methodType } from '../functions/connection/connectionAPI';
import { URL_AUTH } from '../constants/urls';
import { ERROR_INVALID_DATA } from '../constants/errosStatus';
import { useNavigate } from 'react-router';
import { ProductRoutesEnum } from '../../modules/product/routes';
import { setAuthorizationToken } from '../functions/connection/auth';
import type { AuthType } from '../../modules/login/types/AuthType';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  //Cria o estado "loading", que começa com false. Ele vai ser usado para indicar se a requisição está em andamento (ex: mostrar "carregando...").
  const navigate = useNavigate();
  const { setNotification, setUser } = useGlobalContext();

  const request = async <T>(url: string, method: methodType, saveGlobal?: (object: T) => void, body?: unknown): Promise<T | undefined> => {
    setLoading(true);
    //Antes de iniciar a requisição. define "loading = true" (para exibir algum indicador visual, por exemplo) .
    const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      });
    setLoading(false);
    return returnObject;
  };

  const postRequest = async <T>(url: string, body: unknown): Promise<T | undefined> => {
    setLoading(true);
    const returnData = await connectionAPIPost<T>(url, body)
      .then((result) => {
        //"then" é chamado quando a requisição dá certo
        setNotification('Login...', 'success', 'Entrando em sua conta.');
        return result;
      })
      .catch(() => {
        //"catch" é chamado quando a requisição falha
        setNotification('Dados inválidos', 'error', 'Senha ou email estão incorretos.');
        return undefined;
      });
    //"axios()" aqui estamos usando 'axios' (uma biblioteca pra fazer requisições HTTP, tipo buscar dados de um servidor) para enviar dados pro backend. E como isso demora um pouco, ele coloca um "await" para dizer: 'Espere o servior responder antes de continuar para a próxima linha';
    setLoading(false);
    return returnData;
  };

  const authRequest = async (body: unknown): Promise<void> => {
    setLoading(true);
    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setNotification('Login...', 'success', 'Você entrou em sua conta.');
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        navigate(ProductRoutesEnum.PRODUCT);
        return result;
      })
      .catch(() => {
        setNotification(ERROR_INVALID_DATA, 'error');
      });
    setLoading(false);
  };

  return {
    loading,
    authRequest,
    request,
    postRequest,
  };
};
