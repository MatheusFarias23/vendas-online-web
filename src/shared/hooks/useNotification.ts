import { notification as notificationAntd } from 'antd';
import { useGlobalContext } from './useGlobalContext';
import { useEffect } from 'react';

export const useNotification = () => {
  const [api, contextHolder] = notificationAntd.useNotification();
  //"api" Um objeto com metodos como 'success, info, error, etc'. Usa-se para disparar a notificação programatica.
  //"contextHolder" Um componente JSX que você precisa renderizar dentro do seu app para que a notificação apareça corretamente.
  const { notification } = useGlobalContext();
  //Aqui, pegamos a notificação armazenada no estado global usando 'useGlobalContext'. Toda ve que alguém chamar 'setNotification(...)', esse valor muda - e o 'useEffect' vai reagir a isso.

  useEffect(() => {
    //"useEffect" é chamado toda vez que a dependencia dentro de [] mudar. Aqui, ele será executado sempre que 'notificaiton' mudar.
    if (notification?.message && notification.type) {
      //"if(notification?.message && notification.type)" Verifica se a notificação existe e se tem uma 'message' e um 'type' válido (como 'success', 'error', etc).
      //"notification?.message" Usa 'optional chaining' para evitar erro caso 'notification' seja 'undefined'.

      api[notification.type]({
        message: `${notification.message}`,
        description: notification.description,
        placement: 'bottomRight',
      });
    }
  }, [notification]);
  //Quando coloca '[]' vazio o React entende que é para o 'useEffect' rodar apenas uma vez.

  return {
    api,
    contextHolder,
  };
};
