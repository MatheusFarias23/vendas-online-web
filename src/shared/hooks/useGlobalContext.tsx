import { createContext, useContext, useState } from 'react';
import type { UserType } from '../../modules/login/types/userType';
/*import { getAuthorizationToken, setAuthorizationToken } from '../functions/connection/auth';*/
//"createContext" cria o contexto. "useContext" acessa o contexto de dentro de componentes. "useState" para guardar o valor que será compartilhado (como o token).

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  message: string;
  type: NotificationType;
  description?: string;
}

interface GlobalData {
  notification?: NotificationProps;
  user?: UserType;
}

interface GlobalContextProps {
  globalData: GlobalData;
  //Esse é um objeto que vai conter os dados globais da aplicação, ele segue a 'interface GlobalData, que foi definida antes. Ou seja, esse 'globalData' pode conter um 'accessToken' que é uma string (ou poder ser undefined se não existir ainda).
  setGlobalData: (globalData: GlobalData) => void;
  //É uma função que vai atualizar os dados globais (o GlobalData), ela recebe um objeto 'globalData' como parâmetro e não retorna nada (=> void). Todo o contexto precisa de valores (o que vai ser lido por outros componentes) e de funções para atualizar esses valores.
}

const GlobalContext = createContext({} as GlobalContextProps);
//"createContext" é uma função do React que cria um novo Contexto. Esse contexto serve como um 'armazem' de dados que podem ser acessados por qualquer componente dentro do seu provedor(Provider).
//"{} as GlobalContextProps" o React exije um valor mesmo que seja vazio, porém o React reclama do valor vazio mesmo assim, então usa-se o 'as' para dizer pro TypeScript considerar isso como se fosse um 'GlobalContextProps'.

interface GlobalProviderProps {
  children: React.ReactNode;
  //"React.ReactNode" é o tipo de dado que representa qualquer coisa renderizavel no React: JSX, string, número, array de componenets, etc. Perguntar se ts tá incluso!!!!!!!!
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData>({});
  //"const [globalData, setGlobalData] = useState<GlobalData>({});" cria um estado interno para armazenar os dados globais.
  //"useState<GlobalData>({})" defini que o 'useState' siga o formato 'GlobalData' ({ accessToken?: string }).
  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
    //"{children}" Aqui estamos renderizando os filhos dentro do Provider, ou seja, tudo que estiver dentro de '<GlobalProvider>' na suaárvore React terá acesso ao contexto.
  );
};

export const useGlobalContext = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);

  const setNotification = (message: string, type: NotificationType, description?: string) => {
    setGlobalData({
      ...globalData,
      notification: {
        message,
        type,
        description
      }
    })
  }
  const setUser = (user: UserType) => {
    setGlobalData({
      ...globalData,
      user,
    })
  }

  return {
    notification: globalData?.notification,
    user: globalData?.user,
    setUser,
    setNotification,
  };
};
