import { useState } from 'react';
import { useGlobalContext } from './useGlobalContext';
import ConnectionAPI, {
  connectionAPIPost,
  type methodType,
} from '../functions/connection/connectionAPI';
import { URL_AUTH } from '../constants/urls';
import { ERROR_INVALID_DATA } from '../constants/errosStatus';
import { ProductRoutesEnum } from '../../modules/product/routes';
import { setAuthorizationToken } from '../functions/connection/auth';
import type { AuthType } from '../types/AuthType';
import type { NavigateFunction } from 'react-router';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  //Cria o estado "loading", que começa com false. Ele vai ser usado para indicar se a requisição está em andamento (ex: mostrar "carregando...").
  const { setNotification, setUser } = useGlobalContext();

  const request = async <T>(
    url: string,
    method: methodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
  ): Promise<T | undefined> => {
    setLoading(true);
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

  const authRequest = async (body: unknown, navigate: NavigateFunction): Promise<void> => {
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
  };
};
