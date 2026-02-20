import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { brandsAPI } from '../../api/endpoints';
import type { Brand } from '../../api/types';

interface BrandsState {
  items: Brand[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BrandsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchBrands = createAsyncThunk(
  'brands/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await brandsAPI.getAll();
      return res.data as Brand[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement des marques');
    }
  },
);

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchBrands.fulfilled, (state, action: PayloadAction<Brand[]>) => {
      state.isLoading = false; state.items = action.payload;
    });
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });
  },
});

export default brandsSlice.reducer;
