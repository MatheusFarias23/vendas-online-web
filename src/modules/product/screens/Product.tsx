import { useEffect, useState } from 'react';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enums';
import type { ProductType } from '../../../shared/types/ProductType';
import TableAntd from '../../../shared/components/table/Table';
import { Input, type TableProps } from 'antd';
import CategoryColumn from '../components/CategoryColumn';
import ToolTipImage from '../components/ToolTipImage';
import { convertNumberToMoney } from '../../../shared/functions/money';
import Screen from '../../../shared/components/screen/Screen';
import Button from '../../../shared/components/buttons/button/Button';
import { useNavigate } from 'react-router';
import { ProductRoutesEnum } from '../routes';
import { BoxButtons, LimitedSizeButton, LimitedSizeInput } from '../styles/product.style';

const { Search } = Input;

const columns: TableProps<ProductType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (_, product) => <ToolTipImage product={product} />,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    //'localCompare' ordena strings corretamente (considera acentuação).
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'category',
    render: (_, product) => <CategoryColumn category={product.category} />,
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    sorter: (a, b) => a.price - b.price,
    //ordena numericamente.
    render: (_, product) => <a>{convertNumberToMoney(product.price)}</a>,
  },
];

const ListBreadcrumb = [
  {
    name: 'HOME',
  },
  {
    name: 'PRODUTOS',
  },
];

const Product = () => {
  const { products, setProducts } = useDataContext();
  const [ productsFiltered, setProductsFiltered] = useState<ProductType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setProductsFiltered(products);
  }, [products]);
  //Toda vez que 'products' (do useDataContext) muda, atualiza 'productsFiltered' para ser a mesma lista. Isso garante que, após a requisição que preenche 'products', a tebela receba os dados (evitar mostrar lista vazia).

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);

  const handleOnClickInsert = () => {
    navigate(ProductRoutesEnum.PRODUCT_INSERT);
  };

  const onSearch = (value: string) => {
    const term = value.trim().toLowerCase();
    //"trim()" remove espaços em branco no começo e no fim (ex: " cam " vira "cam")
    //"toLowerCase()" transforma tudo em minusculas para fazer a busca 'case-insensitive' (não diferenciar maiuscula de miniscula).
    if (!term) {
      setProductsFiltered([...products])
    }else {
      setProductsFiltered(products.filter((product) => product.name.toLowerCase().includes(value)));
      //"products.filter(...)" cria um novo array contendo apenas os produtos cujo 'name' satisfaça a condição.
    }
  };

  return (
    <Screen listBreadcrumb={ListBreadcrumb}>
      <BoxButtons>
        <LimitedSizeInput>
          <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
        </LimitedSizeInput>
        <LimitedSizeButton>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir Produto
          </Button>
        </LimitedSizeButton>
      </BoxButtons>
      <TableAntd<ProductType> columns={columns} dataSource={productsFiltered} />
    </Screen>
  );
};
//"dataSource={productsFiltered}" a tabela mostra a lista filtrada.

export default Product;
//Pega o usuário logado direto do GlobalContext. Isso significa que quando o usuário estiver autenticado, o 'user' vai estar preenchido (com nome, email, etc). Se não estiver logado, ou seja o token for invalido, o 'verifyLoggedIn' vai mandar de volta pra tela de login.
