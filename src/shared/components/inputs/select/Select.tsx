import { Select as SelectAntd } from 'antd';
import type { SelectProps as SelectPropsAntd } from 'antd';
import { BoxSelect, TitleSelect } from './select.style';

interface SelectProps extends SelectPropsAntd {
  title?: string;
}

const Select = ({ title, ...props }: SelectProps) => {
  return (
    <BoxSelect>
      {title && <TitleSelect>{title}</TitleSelect>}
      <SelectAntd style={{ width: '100%' }} {...props} />
    </BoxSelect>
  );
};

export default Select;
