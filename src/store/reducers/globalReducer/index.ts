import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from '../../../shared/types/UserType';
import type { NotificationType } from '../../../shared/types/NotificationType';

interface GlobaltState {
  notification?: NotificationType;
  user?: UserType;
}

const initialState: GlobaltState = {
  notification: undefined,
  user: undefined,
};

export const counterSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setNotificationAction: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload;
    },
    setUserAction: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setNotificationAction, setUserAction } = counterSlice.actions;
export default counterSlice.reducer;
