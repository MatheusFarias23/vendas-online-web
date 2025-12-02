import { renderHook } from '@testing-library/react';
import { useInsertProduct } from '../useInsertProduct';
import AxiosMockerAdapter from 'axios-mock-adapter';
import { act } from 'react';
import axios from 'axios';
import { URL_PRODUCT } from '../../../../shared/constants/urls';

const mockNavigate = jest.fn();
const mockSetNotification = jest.fn();

const mockAxios = new AxiosMockerAdapter(axios);

mockAxios.onPost(URL_PRODUCT, {});

jest.mock('react-router', () => ({
  useNavigate: mockNavigate,
}));

jest.mock('../../../../store/reducers/globalReducer/useGlobalReducer', () => ({
  useGlobalReducer: () => ({
    setNotification: mockSetNotification,
  }),
}));

describe('Test useInsertProduct', () => {
  it('should return initial values', () => {
    const { result } = renderHook(() => useInsertProduct());

    expect(result.current.loading).toEqual(false);
    expect(result.current.disabledButton).toEqual(true);
    expect(result.current.product).toEqual({
      name: '',
      price: 0,
      image: '',
      categoryId: undefined,
    });
  });

  it('should change select in handleChangeSelect', () => {
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.handleChangeSelect('2305');
    });

    expect(result.current.product.categoryId).toEqual(2305);
  });

  it('should change product in onChangeInput send name', () => {
    const TEST_MOCK = 'TEST_MOCK';
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.onChangeInput({ target: { value: TEST_MOCK } } as any, 'name');
    });

    expect(result.current.product.name).toEqual(TEST_MOCK);
  });

  it('should change product in onChangeInput send price', () => {
    const TEST_NUMBER = '2305';
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.onChangeInput({ target: { value: TEST_NUMBER } } as any, 'price', true);
    });

    expect(result.current.product.price).toEqual(Number(TEST_NUMBER));
  });

  it('should change disabled button in insert data', () => {
    const { result } = renderHook(() => useInsertProduct());

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.onChangeInput({ target: { value: '2305' } } as any, 'price', true);
    });

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.onChangeInput({ target: { value: 'name' } } as any, 'name');
    });

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.onChangeInput({ target: { value: 'http' } } as any, 'image');
    });

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.handleChangeSelect('2305');
    });

    expect(result.current.disabledButton).toEqual(false);
  });

  it('should call axios.Post', () => {
    const spyAxios = jest.spyOn(axios, 'post');
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.handleInsertProduct();
    });

    expect(spyAxios.mock.calls.length).toEqual(1);
  });
});
