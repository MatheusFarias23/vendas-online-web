import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import type { ProductType } from '../../../shared/types/ProductType';
import { setProductsAction } from '.';

export const useProductReducer = () => {
  const { products } = useAppSelector((state) => state.productReducer);
  //"useAppSelector" lê os produtos atuais da store.
  /*"state" é o estado global completo da sua aplicação, ou seja, tudo que tá guardado dentro da store. O estado global (state) vai ter a estrutura do 'store/index.ts':

  "{ productReducer: { products: [ ... ] } }"

  Então o parâmetro "state" é esse objeto, e o que o Redux faz é passar uma função que diga qual parte do estado você quer acessar.*/
  const dispatch = useDispatch();

  const setProducts = (products: ProductType[]) => {
    dispatch(setProductsAction(products));
    //"useDispatch" manda uma ação pro Redux mudar o estado.
  };

  return {
    products,
    setProducts,
    //"setProducts" dispara o "setProductsAction" (que atualiza os produtos).
  };
};
