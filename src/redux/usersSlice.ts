import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { userType } from "../common/userType";

const initUsers:userType[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: initUsers,
  },
  reducers: {
    setUsers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const getUsers = (state: RootState) => state.users.value;
export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
