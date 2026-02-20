import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { carsAPI } from '../../api/endpoints';
import type { Car } from '../../api/types';

interface CarsState {
  makes: string[];
  models: string[];
  years: number[];
  trims: string[];
  currentCar: Car | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CarsState = {
  makes: [],
  models: [],
  years: [],
  trims: [],
  currentCar: null,
  isLoading: false,
  error: null,
};

export const fetchMakes = createAsyncThunk(
  'cars/fetchMakes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await carsAPI.getMakes();
      return res.data as string[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const fetchModels = createAsyncThunk(
  'cars/fetchModels',
  async (make: string, { rejectWithValue }) => {
    try {
      const res = await carsAPI.getModels(make);
      return res.data as string[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const fetchYears = createAsyncThunk(
  'cars/fetchYears',
  async ({ make, model }: { make: string; model: string }, { rejectWithValue }) => {
    try {
      const res = await carsAPI.getYears(make, model);
      return res.data as number[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const fetchTrims = createAsyncThunk(
  'cars/fetchTrims',
  async ({ make, model, year }: { make: string; model: string; year: number }, { rejectWithValue }) => {
    try {
      const res = await carsAPI.getTrims(make, model, year);
      return res.data as string[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await carsAPI.getById(id);
      return res.data as Car;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Véhicule introuvable');
    }
  },
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    clearModels: (state) => { state.models = []; state.years = []; state.trims = []; },
    clearYears: (state) => { state.years = []; state.trims = []; },
    clearTrims: (state) => { state.trims = []; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMakes.pending, (state) => { state.isLoading = true; });
    builder.addCase(fetchMakes.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.isLoading = false; state.makes = action.payload;
    });
    builder.addCase(fetchMakes.rejected, (state) => { state.isLoading = false; });

    builder.addCase(fetchModels.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.models = action.payload;
    });
    builder.addCase(fetchYears.fulfilled, (state, action: PayloadAction<number[]>) => {
      state.years = action.payload;
    });
    builder.addCase(fetchTrims.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.trims = action.payload;
    });
    builder.addCase(fetchCarById.fulfilled, (state, action: PayloadAction<Car>) => {
      state.currentCar = action.payload;
    });
  },
});

export const { clearModels, clearYears, clearTrims } = carsSlice.actions;
export default carsSlice.reducer;
