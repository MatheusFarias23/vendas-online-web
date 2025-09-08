import { useEffect } from 'react';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enums';
import type { ProductType } from '../types/ProductType';
import TableAntd from '../../../shared/components/table/Table';
import type { TableProps } from 'antd';


const columns: TableProps<ProductType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <a>{text}</a>,
  },
];

const Product = () => {
  const { products, setProducts } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);

  return <TableAntd<ProductType> columns={columns} dataSource={products} />;
};

export default Product;
//Pega o usuário logado direto do GlobalContext. Isso significa que quando o usuário estiver autenticado, o 'user' vai estar preenchido (com nome, email, etc). Se não estiver logado, ou seja o token for invalido, o 'verifyLoggedIn' vai mandar de volta pra tela de login.
