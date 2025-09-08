import { Tag } from 'antd';
import type { CategoryType } from '../../../shared/types/CategoryType';

interface CategoryColumnProps {
  category?: CategoryType;
}

const colors: string[] = [
  'geekblue',
  'magenta',
  'green',
  'volcano',
  'lime',
  'blue',
  'cyan',
  'purple',
  'red',
  'orange',
  'gold',
];

const CategoryColumn = ({ category }: CategoryColumnProps) => {
  if (!category) {
    return null;
  }
  const currentColor = colors[category.id - 1] || colors[0];
  return <Tag color={currentColor}>{category.name}</Tag>;
};

export default CategoryColumn;
