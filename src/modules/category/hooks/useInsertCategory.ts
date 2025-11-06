import { useEffect, useState } from 'react';
import { URL_CATEGORY } from '../../../shared/constants/urls';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import type { InsertCategory } from '../../../shared/dtos/InsertCategory.dto';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

export const useInsertCategory = () => {
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const { setNotification } = useGlobalReducer();
  const [category, setCategory] = useState<InsertCategory>({
    name: '',
  });

  useEffect(() => {
    if (category.name.trim()) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [category]);

  const insertCategory = async () => {
    setLoading(true);
    await connectionAPIPost(URL_CATEGORY, category)
      .then(() => {
        setNotification('Sucesso', 'success', 'A categoria foi inserida corretamente');
        setCategory({
          name: '',
        });
      })
      .catch(() => {
        setNotification('Erro', 'error', 'Não foi possivel inserir a categoria');
      });
    setLoading(false);
  };

  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      name: event.target.value,
    });
  };

  const handleOnClickCanel = () => {
    setCategory({
      name: '',
    });
  };

  return {
    category,
    loading,
    disabledButton,
    insertCategory,
    handleOnChangeName,
    handleOnClickCanel,
  };
};
