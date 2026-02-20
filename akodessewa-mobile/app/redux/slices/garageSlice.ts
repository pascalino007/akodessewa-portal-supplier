import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { garageAPI } from '../../api/endpoints';
import type { GarageVehicle, Product } from '../../api/types';

interface GarageState {
  vehicles: GarageVehicle[];
  compatibleParts: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GarageState = {
  vehicles: [],
  compatibleParts: [],
  isLoading: false,
  error: null,
};

export const fetchGarageVehicles = createAsyncThunk(
  'garage/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await garageAPI.getMyVehicles();
      return res.data as GarageVehicle[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const addGarageVehicle = createAsyncThunk(
  'garage/add',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await garageAPI.addVehicle(data);
      return res.data as GarageVehicle;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Échec de l'ajout");
    }
  },
);

export const updateGarageVehicle = createAsyncThunk(
  'garage/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await garageAPI.updateVehicle(id, data);
      return res.data as GarageVehicle;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec de la mise à jour');
    }
  },
);

export const removeGarageVehicle = createAsyncThunk(
  'garage/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      await garageAPI.removeVehicle(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec de la suppression');
    }
  },
);

export const fetchCompatibleParts = createAsyncThunk(
  'garage/compatibleParts',
  async (vehicleId: string, { rejectWithValue }) => {
    try {
      const res = await garageAPI.getCompatibleParts(vehicleId);
      return res.data as Product[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    clearCompatibleParts: (state) => { state.compatibleParts = []; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGarageVehicles.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchGarageVehicles.fulfilled, (state, action: PayloadAction<GarageVehicle[]>) => {
      state.isLoading = false; state.vehicles = action.payload;
    });
    builder.addCase(fetchGarageVehicles.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(addGarageVehicle.fulfilled, (state, action: PayloadAction<GarageVehicle>) => {
      state.vehicles.push(action.payload);
    });

    builder.addCase(updateGarageVehicle.fulfilled, (state, action: PayloadAction<GarageVehicle>) => {
      const idx = state.vehicles.findIndex(v => v.id === action.payload.id);
      if (idx >= 0) state.vehicles[idx] = action.payload;
    });

    builder.addCase(removeGarageVehicle.fulfilled, (state, action: PayloadAction<string>) => {
      state.vehicles = state.vehicles.filter(v => v.id !== action.payload);
    });

    builder.addCase(fetchCompatibleParts.pending, (state) => { state.isLoading = true; });
    builder.addCase(fetchCompatibleParts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.isLoading = false; state.compatibleParts = action.payload;
    });
    builder.addCase(fetchCompatibleParts.rejected, (state) => { state.isLoading = false; });
  },
});

export const { clearCompatibleParts } = garageSlice.actions;
export default garageSlice.reducer;
