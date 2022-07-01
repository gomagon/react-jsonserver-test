import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loadStatusSlice from './loadStatusSlice';
import userTextSlice from './userTextSlice';
import ageTextSlice from './ageTextSlice';
import usersSlice from "./usersSlice";
import radioButtonSlice from './radioButtonSlice';

export const store = configureStore({
  reducer: {
    loadStatus: loadStatusSlice,
    userText: userTextSlice,
    ageText: ageTextSlice,
    users: usersSlice,
    radioButton: radioButtonSlice,
  },
  devTools: false
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
