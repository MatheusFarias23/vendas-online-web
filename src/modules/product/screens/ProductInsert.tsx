import Screen from '../../../shared/components/screen/Screen';
import { ProductRoutesEnum } from '../routes';
import Input from '../../../shared/components/inputs/input/Input';
import Button from '../../../shared/components/buttons/button/Button';
import Select from '../../../shared/components/inputs/select/Select';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import {  DisplayFlexJustifyCenter,  DisplayFlexJustifyRight,} from '../../../shared/components/styles/display.styled';
import InputMoney from '../../../shared/components/inputs/inputMoney/InputMoney';
import { useInsertProduct } from '../hooks/useInsertProduct';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { useEffect } from 'react';
import { URL_CATEGORY } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enums';
import type { CategoryType } from '../../../shared/types/CategoryType';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProductInsertTestIdEnum } from '../enum/ProductInsertTestIdEnum';

const ProductInsert = () => {
  const { category, setCategory } = useCategoryReducer();
  const { request } = useRequests();
  const {
    loading,
    product,
    disabledButton,
    handleOnClickCancel,
    onChangeInput,
    handleChangeSelect,
    handleInsertProduct,
  } = useInsertProduct();

  useEffect(() => {
    request<CategoryType[]>(URL_CATEGORY, MethodsEnum.GET, setCategory);
  }, []);

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
      <DisplayFlexJustifyCenter data-testid={ProductInsertTestIdEnum.PRODUCT_INSERT_CONTAINER}>
        <LimitedContainer width={400}>
          <Input
            data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_NAME}
            onChange={(event) => onChangeInput(event, 'name')}
            value={product.name}
            title="Nome"
            placeholder="Digite o nome"
          />
          <InputMoney
            data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE}
            onChange={(event) => onChangeInput(event, 'price', true)}
            value={product.price}
            title="Preço"
            placeholder="Digite o preço"
          />
          <Input
            data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE}
            onChange={(event) => onChangeInput(event, 'image')}
            value={product.image}
            title="URL Imagem"
            placeholder="Insira a url da imagem"
          />
          <Select
            data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_SELECT}
            title="Categoria"
            placeholder="Escolha a cateogira"
            onChange={handleChangeSelect}
            value={product.categoryId ? String(product.categoryId) : undefined}
            options={category.map((category) => ({
              value: `${category.id}`,
              label: `${category.name}`,
            }))}
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 15px" width={120}>
              <Button
                data-testid={ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT}
                loading={loading}
                disabled={disabledButton}
                onClick={handleInsertProduct}
                margin="30px 0"
                type="primary"
              >
                Inserir Produto
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                data-testid={ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL}
                danger
                onClick={handleOnClickCancel}
                margin="30px 0 "
                type="primary"
              >
                Cancelar
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default ProductInsert;
