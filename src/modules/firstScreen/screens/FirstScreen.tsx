import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ProductRoutesEnum } from '../../product/routes';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

const FirstScreen = () => {
  const { user } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ProductRoutesEnum.PRODUCT);
    }
  }, [user]);
  return <Spin />;
};

export default FirstScreen;
