import { Input, type TableProps } from 'antd';
import Screen from '../../../shared/components/screen/Screen';
import TableAntd from '../../../shared/components/table/Table';
import type { CategoryType } from '../../../shared/types/CategoryType';
import { useCategory } from '../hooks/useCategory';
import Button from '../../../shared/components/buttons/button/Button';
import { useNavigate } from 'react-router';
import { CategoryRoutesEnum } from '../routes';
import { useEffect, useState } from 'react';
import { LimitedSizeButton, LimitedSizeInput } from '../../../shared/components/styles/limited.styled';
import { DisplayFlexJustifyBetween } from '../../../shared/components/styles/display.styled';

const { Search } = Input;

const columns: TableProps<CategoryType>['columns'] = [
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
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Produtos',
    dataIndex: 'amountProducts',
    key: 'amountProducts',
    render: (text) => <a>{text}</a>,
  },
];

const Category = () => {
  const [ categoryFiltered, setCategoryFiltered ] = useState<CategoryType[]>([]);
  const { categories } = useCategory();
  const navigate = useNavigate();

  useEffect(() => {
    setCategoryFiltered(categories);
  }, [categories]);

  const handleCategoryInsert = () => {
    navigate(CategoryRoutesEnum.CATEGORY_INSERT);
  };

  const onSearch = (value: string) => {
    const term = value.trim().toLowerCase();

    if (!term) {
      setCategoryFiltered([...categories]);
    } else {
      setCategoryFiltered(
        categories.filter((category) => category.name.toLowerCase().includes(value)),
      );
    }
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'CATEGORIAS',
        },
      ]}
    >
      <DisplayFlexJustifyBetween>
        <LimitedSizeInput>
          <Search placeholder="Buscar categoria" onSearch={onSearch} enterButton />
        </LimitedSizeInput>
        <LimitedSizeButton>
          <Button type="primary" onClick={handleCategoryInsert}>
            Inserir Categoria
          </Button>
        </LimitedSizeButton>
      </DisplayFlexJustifyBetween>
      <TableAntd<CategoryType> columns={columns} dataSource={categoryFiltered} />
    </Screen>
  );
};

export default Category;
