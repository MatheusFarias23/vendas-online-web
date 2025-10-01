import { useEffect, useState } from 'react';
import Screen from '../../../shared/components/screen/Screen';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { ProductRoutesEnum } from '../routes';
import { useRequests } from '../../../shared/hooks/useRequests';
import { MethodsEnum } from '../../../shared/enums/methods.enums';
import { URL_CATEGORY, URL_PRODUCT } from '../../../shared/constants/urls';
import { LimitedContainer } from '../styles/productInsert.styles';
import Input from '../../../shared/components/inputs/input/Input';
import Button from '../../../shared/components/buttons/button/Button';
import Select from '../../../shared/components/inputs/select/Select';
import type { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';


const ProductInsert = () => {
  const [ product, setProduct ] = useState<InsertProduct>({
    name: '',
    price: 0,
    image: '',
  });
  const { categories, setCategories } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    if (categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);

  const handleInsertProduct = () => {
    connectionAPIPost(URL_PRODUCT, product);
  }

  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      price: Number(event.target.value),
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setProduct({
      ...product,
      [nameObject]: event.target.value,
    })
  }

  const handleChange = (value: string) => {
    setProduct({
      ...product,
      categoryId: Number(value),
    })
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
        <Input onChange={(event) => onChange(event, 'name')} value={product.name} title="Nome" placeholder="Nome" />
        <Input onChange={onChangePrice} value={product.price} title="Preço" placeholder="Preço" />
        <Input onChange={(event) => onChange(event, 'image')} value={product.image} title="URL Imagem" placeholder="URL Imagem" />
        <Select
          title='Categoria'          
          onChange={handleChange}
          options={
            categories.map((category) => ({
              value: `${category.id}`,
              label: `${category.name}`
            }))}
        />
        <Button onClick={handleInsertProduct} margin="30px 0" type="primary">
          Inserir Produto
        </Button>
      </LimitedContainer>
    </Screen>
  );
};

export default ProductInsert;
