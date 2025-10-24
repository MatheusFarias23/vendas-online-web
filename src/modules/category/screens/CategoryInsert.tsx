import Screen from "../../../shared/components/screen/Screen";
import { CategoryRoutesEnum } from "../routes";


const CategoryInsert = () => {
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
        <div>Inserir Categoria</div>
      </Screen>
    );
}

export default CategoryInsert;