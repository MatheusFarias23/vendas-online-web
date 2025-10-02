import { useEffect, useState } from 'react';
import Screen from '../../../shared/components/screen/Screen';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { ProductRoutesEnum } from '../routes';
import { useRequests } from '../../../shared/hooks/useRequests';
import { MethodsEnum } from '../../../shared/enums/methods.enums';
import { URL_CATEGORY, URL_PRODUCT } from '../../../shared/constants/urls';
import { ProductInsertContainer } from '../styles/productInsert.styles';
import Input from '../../../shared/components/inputs/input/Input';
import Button from '../../../shared/components/buttons/button/Button';
import Select from '../../../shared/components/inputs/select/Select';
import type { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';

const ProductInsert = () => {
  const [product, setProduct] = useState<InsertProduct>({
    name: '',
    price: undefined,
    image: '',
    categoryId: undefined,
  });
  const { categories, setCategories } = useDataContext();
  const { request } = useRequests();
  const { setNotification } = useGlobalContext();

  useEffect(() => {
    if (categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);

  const handleInsertProduct = async () => {
    await connectionAPIPost(URL_PRODUCT, product).then(() => {
      setNotification('Sucesso', 'success', 'O produto foi inserido corretamente');
      setProduct({
        name: '',
        price: undefined,
        image: '',
        categoryId: undefined,
      });
    }).catch(() => {
      setNotification('Erro', 'error', 'Não foi possivel inserir o produto')
    });
  };

  const handleOnClickCancel = () => {
    setProduct({
      name: '',
      price: undefined,
      image: '',
      categoryId: undefined,
    });
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setProduct({
      ...product,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleChange = (value: string) => {
    setProduct({
      ...product,
      categoryId: Number(value),
    });
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
      <ProductInsertContainer>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => onChange(event, 'name')}
            value={product.name}
            title="Nome"
            placeholder="Digite o nome"
          />
          <Input
            onChange={(event) => onChange(event, 'price', true)}
            value={product.price ?? ''}
            title="Preço"
            placeholder="Digite o preço"
          />
          <Input
            onChange={(event) => onChange(event, 'image')}
            value={product.image}
            title="URL Imagem"
            placeholder="Insira a url da imagem"
          />
          <Select
            title="Categoria"
            placeholder="Escolha a cateogira"
            onChange={handleChange}
            value={product.categoryId ? String(product.categoryId) : undefined}
            options={categories.map((category) => ({
              value: `${category.id}`,
              label: `${category.name}`,
            }))}
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 15px" width={120}>
              <Button onClick={handleInsertProduct} margin="30px 0" type="primary">
                Inserir Produto
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button danger onClick={handleOnClickCancel} margin="30px 0 " type="primary">
                Cancelar
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </ProductInsertContainer>
    </Screen>
  );
};

export default ProductInsert;
