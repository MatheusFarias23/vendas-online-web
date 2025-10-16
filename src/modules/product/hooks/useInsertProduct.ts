import { useEffect, useState } from 'react';
import type { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';

export const useInsertProduct = () => {
  const { setNotification } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [product, setProduct] = useState<InsertProduct>({
    name: '',
    price: 0,
    image: '',
    categoryId: undefined,
  });

  useEffect(() => {
    if (product.name && product.price > 0 && product.image && product.categoryId) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [product]);

  const handleOnClickCancel = () => {
    setProduct({
      name: '',
      price: 0,
      image: '',
      categoryId: undefined,
    });
  };

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setProduct({
      ...product,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleChangeSelect = (value: string) => {
    setProduct({
      ...product,
      categoryId: Number(value),
    });
    console.log(`selected ${value}`);
  };

  const handleInsertProduct = async () => {
    setLoading(true);
    await connectionAPIPost(URL_PRODUCT, product)
      .then(() => {
        setNotification('Sucesso', 'success', 'O produto foi inserido corretamente');
        setProduct({
          name: '',
          price: 0,
          image: '',
          categoryId: undefined,
        });
      })
      .catch(() => {
        setNotification('Erro', 'error', 'Não foi possivel inserir o produto');
      });
      setLoading(false);
  };

  return {
    loading,
    product,
    disabledButton,
    handleOnClickCancel,
    onChangeInput,
    handleChangeSelect,
    handleInsertProduct,
  };
};
