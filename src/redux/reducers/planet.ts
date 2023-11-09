import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface InitialState {
  dataSource: any;
  isLoading: boolean;
  detailData: any;
  dataWishlist: any;
  countWishlist: number;
}

const initialState: InitialState = {
  dataSource: [],
  isLoading: true,
  detailData: null,
  dataWishlist: [],
  countWishlist: 0,
};

export const planetSlice = createSlice({
  name: 'planet',
  initialState,
  reducers: {
    showAllPlanet: (state, action: PayloadAction<any>) => ({
      ...state,
      dataSource: action.payload,
      isLoading: false,
    }),
    showDetailPlanet: (state, action: PayloadAction<any>) => ({
      ...state,
      detailData: action.payload,
    }),
    showWishlist: (state, action: PayloadAction<any>) => ({
      ...state,
      dataWishlist: action.payload,
      isLoading: false,
    }),
    showCountWishlist: (state, action: PayloadAction<any>) => ({
      ...state,
      countWishlist: action.payload,
    }),
  },
});

export default planetSlice.reducer;

export const { showAllPlanet, showDetailPlanet, showWishlist, showCountWishlist } = planetSlice.actions;