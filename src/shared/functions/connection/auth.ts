//Esse arquivo é responsavel por lidar especificamente com o token.
import type { UserType } from '../../../modules/login/types/userType';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';
import { connectionAPIGet } from './connectionAPI';
import { URL_USER } from '../../constants/urls';
import { LoginRoutesEnum } from '../../../modules/login/routes';

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};
//"setAuthorizationToken" salva o token no 'localStorage'. Só salva o token se existir.

export const removeAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);
//Remove o token do 'localStorage'.

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);
//Busca o token no 'localStorage'.

export const verifyLoggedIn = async (setUser: (user: UserType) => void, user?: UserType) => {
  const token = getAuthorizationToken();
  if (!token) {
    location.href = LoginRoutesEnum.LOGIN;
  }
  if (!user) {
    await connectionAPIGet<UserType>(URL_USER).then((userReturn) => {
      setUser(userReturn);
      //salva os dados no 'useGlobalContext' e depois re-renderiza a pagina novamente, porém com os dados salvos e mantando o usuário na pagina atual em que se encontra.
    }).catch(() => {
      removeAuthorizationToken();
      location.href = LoginRoutesEnum.LOGIN;
    })
  }
  return null;
};
