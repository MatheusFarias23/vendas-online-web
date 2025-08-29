import { useGlobalContext } from "../../../shared/hooks/useGlobalContext";

const Product = () => {
  const {user} = useGlobalContext();

  return <div>{`Produtos ${user?.name}`}</div>;
};

export default Product;
//Pega o usuário logado direto do GlobalContext. Isso significa que quando o usuário estiver autenticado, o 'user' vai estar preenchido (com nome, email, etc). Se não estiver logado, ou seja o token for invalido, o 'verifyLoggedIn' vai mandar de volta pra tela de login.