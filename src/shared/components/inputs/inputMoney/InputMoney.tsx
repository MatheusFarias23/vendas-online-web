import { useEffect, useState } from 'react';
import type { InputProps } from '../input/Input';
import Input from '../input/Input';

interface InputMoneyProps extends InputProps {
  value: number;
  addonBefore?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DECIMAL_SIZE = 2;

const InputMoney = ({ value, addonBefore = 'R$', onChange, ...props }: InputMoneyProps) => {
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);

  useEffect(() => {
    const valueString = `${value}`;

    if (!/\D/.test(valueString.replace('.', ''))) {
      setCurrentValue(value.toFixed(DECIMAL_SIZE).toString().replace('.', ','));
    }
  }, [value]);

  const handleOnChangeMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
    //0.006
    const valueRemoved = event.target.value.replace(',', '');
    //0006
    const sizeSlice = valueRemoved.length - DECIMAL_SIZE;
    const newValue = [
      valueRemoved.slice(0, sizeSlice), //00
      '.',
      valueRemoved.slice(sizeSlice), //06
    ].join('');
    //00.06
    onChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };

  return (
    <Input
      addonBefore={addonBefore}
      value={currentValue}
      onChange={handleOnChangeMoney}
      {...props}
    />
  );
};

export default InputMoney;
