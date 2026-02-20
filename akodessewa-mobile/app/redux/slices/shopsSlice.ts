import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { shopsAPI } from '../../api/endpoints';
import type { Shop } from '../../api/types';

interface ShopsState {
  items: Shop[];
  currentShop: Shop | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ShopsState = {
  items: [],
  currentShop: null,
  isLoading: false,
  error: null,
};

export const fetchShops = createAsyncThunk(
  'shops/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const res = await shopsAPI.getAll(params);
      return res.data as Shop[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement des boutiques');
    }
  },
);

export const fetchShopBySlug = createAsyncThunk(
  'shops/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await shopsAPI.getBySlug(slug);
      return res.data as Shop;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Boutique introuvable');
    }
  },
);

export const fetchShopById = createAsyncThunk(
  'shops/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await shopsAPI.getById(id);
      return res.data as Shop;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Boutique introuvable');
    }
  },
);

const shopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    clearCurrentShop: (state) => { state.currentShop = null; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShops.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchShops.fulfilled, (state, action: PayloadAction<Shop[]>) => {
      state.isLoading = false; state.items = action.payload;
    });
    builder.addCase(fetchShops.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(fetchShopBySlug.pending, (state) => { state.isLoading = true; });
    builder.addCase(fetchShopBySlug.fulfilled, (state, action: PayloadAction<Shop>) => {
      state.isLoading = false; state.currentShop = action.payload;
    });
    builder.addCase(fetchShopBySlug.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(fetchShopById.pending, (state) => { state.isLoading = true; });
    builder.addCase(fetchShopById.fulfilled, (state, action: PayloadAction<Shop>) => {
      state.isLoading = false; state.currentShop = action.payload;
    });
    builder.addCase(fetchShopById.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });
  },
});

export const { clearCurrentShop } = shopsSlice.actions;
export default shopsSlice.reducer;
