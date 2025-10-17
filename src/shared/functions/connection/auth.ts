//Esse arquivo é responsavel por lidar especificamente com o token.
import type { UserType } from '../../types/UserType';
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

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    location.href = LoginRoutesEnum.LOGIN;
  }
  await connectionAPIGet<UserType>(URL_USER).catch(() => {
    removeAuthorizationToken();
    location.href = LoginRoutesEnum.LOGIN;
  });

  return null;
};

export const logout = () => {
  removeAuthorizationToken();
  location.href = LoginRoutesEnum.LOGIN;
}