import axios from 'axios';
import { useState } from 'react';
import { useGlobalContext } from './useGlobalContext';
import { connectionAPIPost } from '../functions/connection/connectionAPI';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  //Cria o estado "loading", que começa com false. Ele vai ser usado para indicar se a requisição está em andamento (ex: mostrar "carregando...").
  const { setNotification } = useGlobalContext();

  const getRequest = async (url: string) => {
    setLoading(true);
    //Antes de iniciar a requisição. define "loading = true" (para exibir algum indicador visual, por exemplo) .
    return await axios({
      method: 'get',
      url: url,
    })
      .then((result) => {
        return result.data;
      })
      .catch(() => {
        alert('Erro');
      });
    setLoading(false);
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

  return {
    loading,
    getRequest,
    postRequest,
  };
};
