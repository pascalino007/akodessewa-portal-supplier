import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { searchAPI } from '../../api/endpoints';
import type { Product } from '../../api/types';

interface SearchState {
  results: Product[];
  suggestions: string[];
  vinResults: Product[];
  isLoading: boolean;
  isVinLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  suggestions: [],
  vinResults: [],
  isLoading: false,
  isVinLoading: false,
  error: null,
};

export const searchProducts = createAsyncThunk(
  'search/products',
  async (q: string, { rejectWithValue }) => {
    try {
      const res = await searchAPI.searchProducts(q);
      return res.data as Product[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec de la recherche');
    }
  },
);

export const advancedSearch = createAsyncThunk(
  'search/advanced',
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await searchAPI.advancedSearch(params);
      return res.data as Product[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec de la recherche');
    }
  },
);

export const searchByVin = createAsyncThunk(
  'search/vin',
  async (vin: string, { rejectWithValue }) => {
    try {
      const res = await searchAPI.searchByVin(vin);
      return res.data as Product[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'VIN introuvable');
    }
  },
);

export const fetchSuggestions = createAsyncThunk(
  'search/suggestions',
  async (q: string, { rejectWithValue }) => {
    try {
      const res = await searchAPI.getSuggestions(q);
      return res.data as string[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec');
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => { state.results = []; state.suggestions = []; state.error = null; },
    clearVinResults: (state) => { state.vinResults = []; },
  },
  extraReducers: (builder) => {
    builder.addCase(searchProducts.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(searchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.isLoading = false; state.results = action.payload;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(advancedSearch.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(advancedSearch.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.isLoading = false; state.results = action.payload;
    });
    builder.addCase(advancedSearch.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(searchByVin.pending, (state) => { state.isVinLoading = true; state.error = null; });
    builder.addCase(searchByVin.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.isVinLoading = false; state.vinResults = action.payload;
    });
    builder.addCase(searchByVin.rejected, (state, action) => {
      state.isVinLoading = false; state.error = action.payload as string;
    });

    builder.addCase(fetchSuggestions.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    });
  },
});

export const { clearSearch, clearVinResults } = searchSlice.actions;
export default searchSlice.reducer;
