import { useEffect } from "react";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enums";
import type { ProductType } from "../types/ProductType";

const Product = () => {
  const { products, setProducts } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts)
  }, []);

  return products.map((product) => <div key={product.id}>{product.name}</div>);
};

export default Product;
//Pega o usuário logado direto do GlobalContext. Isso significa que quando o usuário estiver autenticado, o 'user' vai estar preenchido (com nome, email, etc). Se não estiver logado, ou seja o token for invalido, o 'verifyLoggedIn' vai mandar de volta pra tela de login.