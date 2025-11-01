import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProductType } from '../../../shared/types/ProductType';

// Define a type for the slice state
interface ProductState {
  products: ProductType[];
}

// Define the initial state using that type
const initialState: ProductState = {
  products: [],
};

export const counterSlice = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    setProductsAction: (state, action: PayloadAction<ProductType[]>) => {
        //"setProductsAction" é a ação que atualiza a lista de produtos.
      state.products = action.payload;
      //Passa a informação que irá ser atualizada dentro do "state.products"
    },
  },
});

export const { setProductsAction } = counterSlice.actions;
export default counterSlice.reducer;
