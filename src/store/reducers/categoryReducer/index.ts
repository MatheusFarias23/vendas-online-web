import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CategoryType } from '../../../shared/types/CategoryType';


interface CategorytState {
  category: CategoryType[];
}

const initialState: CategorytState = {
  category: [],
};

export const counterSlice = createSlice({
  name: 'categoryReducer',
  initialState,
  reducers: {
    setCategoriesAction: (state, action: PayloadAction<CategoryType[]>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategoriesAction } = counterSlice.actions;
export default counterSlice.reducer;
