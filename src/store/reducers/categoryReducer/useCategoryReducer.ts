import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import type { CategoryType } from '../../../shared/types/CategoryType';
import { setCategoriesAction } from '.';

export const useCategoryReducer = () => {
  const { category } = useAppSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();

  const setCategory = (category: CategoryType[]) => {
    dispatch(setCategoriesAction(category));
  };

  return {
    category,
    setCategory,
  };
};
