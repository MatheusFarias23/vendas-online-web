import { useEffect } from 'react';
import Screen from '../../../shared/components/screen/Screen';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { ProductRoutesEnum } from '../routes';
import { useRequests } from '../../../shared/hooks/useRequests';
import { MethodsEnum } from '../../../shared/enums/methods.enums';
import { URL_CATEGORY } from '../../../shared/constants/urls';
import { LimitedContainer } from '../styles/productInsert.styles';
import Input from '../../../shared/components/inputs/input/Input';
import Button from '../../../shared/components/buttons/button/Button';
import { Select } from 'antd';

const ProductInsert = () => {
  const { categories, setCategories } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    if (categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PRODUTOS',
          navigateTo: ProductRoutesEnum.PRODUCT,
        },
        {
          name: 'INSERIR PRODUTOS',
        },
      ]}
    >
      <LimitedContainer>
        <Input title="Nome" placeholder="Nome" />
        <Input title="Preço" placeholder="Preço" />
        <Input title="URL Imagem" placeholder="URL Imagem" />
        <Select
          defaultValue="Categoria"
          style={{ width: '100%', marginTop: '30px' }}
          onChange={handleChange}
          options={
            categories.map((category) => ({
              value: `${category.id}`,
              label: `${category.name}`
            }))}
        />
        <Button margin="25px 0" type="primary">
          Inserir Produto
        </Button>
      </LimitedContainer>
    </Screen>
  );
};

export default ProductInsert;
