import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { mechanicsAPI } from '../../api/endpoints';
import type { MechanicShop } from '../../api/types';

interface MechanicsState {
  items: MechanicShop[];
  currentShop: MechanicShop | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MechanicsState = {
  items: [],
  currentShop: null,
  isLoading: false,
  error: null,
};

export const fetchMechanicShops = createAsyncThunk(
  'mechanics/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const res = await mechanicsAPI.getAll(params);
      return res.data as MechanicShop[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const fetchMechanicShopById = createAsyncThunk(
  'mechanics/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await mechanicsAPI.getById(id);
      return res.data as MechanicShop;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Garage introuvable');
    }
  },
);

const mechanicsSlice = createSlice({
  name: 'mechanics',
  initialState,
  reducers: {
    clearCurrentMechanicShop: (state) => { state.currentShop = null; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMechanicShops.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchMechanicShops.fulfilled, (state, action: PayloadAction<MechanicShop[]>) => {
      state.isLoading = false; state.items = action.payload;
    });
    builder.addCase(fetchMechanicShops.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(fetchMechanicShopById.pending, (state) => { state.isLoading = true; });
    builder.addCase(fetchMechanicShopById.fulfilled, (state, action: PayloadAction<MechanicShop>) => {
      state.isLoading = false; state.currentShop = action.payload;
    });
    builder.addCase(fetchMechanicShopById.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });
  },
});

export const { clearCurrentMechanicShop } = mechanicsSlice.actions;
export default mechanicsSlice.reducer;
