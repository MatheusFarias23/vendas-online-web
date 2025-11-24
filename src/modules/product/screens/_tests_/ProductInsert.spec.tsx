import { render, waitFor } from '@testing-library/react';
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

jest.mock('../../hooks/useInsertProduct', () => ({
  useInsertProduct: () => ({
    loading: false,
    product: mockProductInsert,
    disabledButton: false,
    handleOnClickCancel: jest.fn(),
    onChangeInput: jest.fn(),
    handleChangeSelect: jest.fn(),
    handleInsertProduct: jest.fn(),
  }),
}));

describe('Test Product Insert', () => {
  it('should render container and logo', () => {
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
});

/* 
3. queryAllByTestId vs getByTestId vs getByText

getBy()* lança erro se não encontrar → use quando você espera que o elemento exista.

queryAllBy()* retorna array vazio se não encontrar → ideal para checar ausência (length === 0).

getByText() procura pelo conteúdo textual (ótimo para botões que o usuário vê).
*/
