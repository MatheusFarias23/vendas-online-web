import Screen from '../../../shared/components/screen/Screen';
import { ProductRoutesEnum } from '../routes';
import Input from '../../../shared/components/inputs/input/Input';
import Button from '../../../shared/components/buttons/button/Button';
import Select from '../../../shared/components/inputs/select/Select';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { DisplayFlexJustifyCenter, DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import InputMoney from '../../../shared/components/inputs/inputMoney/InputMoney';
import { useInsertProduct } from '../hooks/useInsertProduct';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';

const ProductInsert = () => {
  const { category } = useCategoryReducer();
  const {
    loading,
    product,
    disabledButton,
    handleOnClickCancel,
    onChangeInput,
    handleChangeSelect,
    handleInsertProduct,
  } = useInsertProduct();

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
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => onChangeInput(event, 'name')}
            value={product.name}
            title="Nome"
            placeholder="Digite o nome"
          />
          <InputMoney
            onChange={(event) => onChangeInput(event, 'price', true)}
            value={product.price}
            title="Preço"
            placeholder="Digite o preço"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'image')}
            value={product.image}
            title="URL Imagem"
            placeholder="Insira a url da imagem"
          />
          <Select
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
              <Button danger onClick={handleOnClickCancel} margin="30px 0 " type="primary">
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
