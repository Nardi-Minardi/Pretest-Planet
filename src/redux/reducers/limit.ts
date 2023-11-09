import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface InitialState {
  page: number;
  limit: number;
}

const initialState: InitialState = {
  page: 1,
  limit: 10,
};

export const limitSlice = createSlice({
  name: 'increment',
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    }
  },
});

export default limitSlice.reducer;

export const { incrementPage } = limitSlice.actions;