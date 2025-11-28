import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { CategoryRoutesEnum } from '../routes';
import { useInsertCategory } from '../hooks/useInsertCategory';

const CategoryInsert = () => {
  const {
    loading,
    category,
    disabledButton,
    insertCategory,
    handleOnChangeName,
    handleOnClickCanel,
  } = useInsertCategory();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'CATEGORIAS',
          navigateTo: CategoryRoutesEnum.CATEGORY,
        },
        {
          name: 'INSERIR CATEGORIAS',
        },
      ]}
    >
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            onChange={handleOnChangeName}
            value={category.name}
            title="Nome"
            placeholder="Digite o nome da categoria"
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 15px" width={120}>
              <Button
                loading={loading}
                disabled={disabledButton}
                onClick={insertCategory}
                margin="30px 0"
                type="primary"
              >
                Inserir categoria
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button onClick={handleOnClickCanel} danger margin="30px 0 " type="primary">
                Cancelar
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default CategoryInsert;
