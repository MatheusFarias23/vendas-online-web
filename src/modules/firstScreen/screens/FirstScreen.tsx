import { Spin } from 'antd';
import { useEffect } from 'react';
import { getAuthorizationToken, removeAuthorizationToken } from '../../../shared/functions/connection/auth';
import { useNavigate } from 'react-router';
import { ProductRoutesEnum } from '../../product/routes';
import { LoginRoutesEnum } from '../../login/routes';
import { connectionAPIGet } from '../../../shared/functions/connection/connectionAPI';
import { URL_USER } from '../../../shared/constants/urls';

const FirstScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = getAuthorizationToken();
      if (token) {
        await connectionAPIGet(URL_USER)
          //Essa chamada vai na API (ex: http://localhost:8080/user) e pergunta: "Esse token realmente corresponde a um usuários valido?"
          .then(() => {
            navigate(ProductRoutesEnum.PRODUCT);
          })
          .catch(() => {
            removeAuthorizationToken();
            navigate(LoginRoutesEnum.LOGIN);
          });       
      } else {
        navigate(LoginRoutesEnum.LOGIN);
      }
    };
    verifyToken();
  }, []);
  return <Spin />;
};

export default FirstScreen;
