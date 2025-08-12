import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const removeAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);
