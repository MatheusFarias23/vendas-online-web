import { fireEvent, render, waitFor } from '@testing-library/react';
import ProductInsert from '../ProductInsert';
import { ProductInsertTestIdEnum } from '../../enum/ProductInsertTestIdEnum';
import { mockProductInsert } from '../../_mocks_/productInsert.mock';

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../../../store/reducers/categoryReducer/useCategoryReducer', () => ({
  useCategoryReducer: () => ({
    category: [],
    setCategory: jest.fn(),
  }),
}));

jest.mock('../../../../shared/hooks/useRequests', () => ({
  useRequests: () => ({
    request: jest.fn(),
  }),
}));

let value = '';
let type = '';

jest.mock('../../hooks/useInsertProduct', () => ({
  useInsertProduct: () => ({
    loading: false,
    product: mockProductInsert,
    disabledButton: false,
    handleOnClickCancel: jest.fn(),
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>, x: string) => {
      value = e.target.value;
      type = x;
    },
    handleChangeSelect: jest.fn(),
    handleInsertProduct: jest.fn(),
  }),
}));

describe('Test Product Insert', () => {
  it('should render', () => {
    const { getByTestId } = render(<ProductInsert />);
    waitFor(() => {
      expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INSERT_CONTAINER)).toBeDefined();
    });
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_NAME)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_SELECT)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL)).toBeDefined();
  });

  it('should call onChangeInput in change name', () => {
    const { getByTestId } = render(<ProductInsert />);

    const input = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_NAME);
    fireEvent.change(input, { target: { value: 'MOCK_VALUE' } });
    expect(value).toEqual('MOCK_VALUE');
    expect(type).toEqual('name');
  });

  it('should call onChangeInput in change price', () => {
    const { getByTestId } = render(<ProductInsert />);

    const input = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE);
    fireEvent.change(input, { target: { value: '2305' } });
    expect(value).toEqual('23.05');
    expect(type).toEqual('price');
  });

  it('should call onChangeInput in change image', () => {
    const { getByTestId } = render(<ProductInsert />);

    const input = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE);
    fireEvent.change(input, { target: { value: 'http-image' } });
    expect(value).toEqual('http-image');
    expect(type).toEqual('image');
  });
});

/* 
3. queryAllByTestId vs getByTestId vs getByText

getBy()* lança erro se não encontrar → use quando você espera que o elemento exista.

queryAllBy()* retorna array vazio se não encontrar → ideal para checar ausência (length === 0).

getByText() procura pelo conteúdo textual (ótimo para botões que o usuário vê).
*/
