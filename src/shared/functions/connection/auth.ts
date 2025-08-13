//Esse arquivo é responsavel por lidar especificamente com o token.

import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};
//"setAuthorizationToken" salva o token no 'localStorage'. Só sala o token se existir.

export const removeAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);
//Remove o token do 'localStorage'.

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);
//Busca o token no 'localStorage'.
