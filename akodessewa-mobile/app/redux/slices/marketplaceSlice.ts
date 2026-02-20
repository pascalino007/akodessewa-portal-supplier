import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { marketplaceAPI } from '../../api/endpoints';
import type { UsedVehicle } from '../../api/types';

interface MarketplaceState {
  items: UsedVehicle[];
  currentVehicle: UsedVehicle | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MarketplaceState = {
  items: [],
  currentVehicle: null,
  isLoading: false,
  error: null,
};

export const fetchUsedVehicles = createAsyncThunk(
  'marketplace/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const res = await marketplaceAPI.getAll(params);
      return res.data as UsedVehicle[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const fetchUsedVehicleById = createAsyncThunk(
  'marketplace/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await marketplaceAPI.getById(id);
      return res.data as UsedVehicle;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Véhicule introuvable');
    }
  },
);

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    clearCurrentVehicle: (state) => { state.currentVehicle = null; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsedVehicles.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchUsedVehicles.fulfilled, (state, action: PayloadAction<UsedVehicle[]>) => {
      state.isLoading = false; state.items = action.payload;
    });
    builder.addCase(fetchUsedVehicles.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(fetchUsedVehicleById.pending, (state) => { state.isLoading = true; });
    builder.addCase(fetchUsedVehicleById.fulfilled, (state, action: PayloadAction<UsedVehicle>) => {
      state.isLoading = false; state.currentVehicle = action.payload;
    });
    builder.addCase(fetchUsedVehicleById.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });
  },
});

export const { clearCurrentVehicle } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;
