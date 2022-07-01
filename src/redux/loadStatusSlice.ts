import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const loadStatusSlice = createSlice({
  name: 'loadStatus',
  initialState: {
    isLoading: false
  },
  reducers: {
    setStart: (state) => {
      state.isLoading = true;
    },
    setEnd: (state) => {
      state.isLoading = false;
    },
  },
});

export const getloadStatus = (state: RootState) => state.loadStatus.isLoading;
export const { setStart, setEnd } = loadStatusSlice.actions;
export default loadStatusSlice.reducer;
