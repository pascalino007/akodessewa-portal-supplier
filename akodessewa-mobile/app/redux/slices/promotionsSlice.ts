import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { promotionsAPI } from '../../api/endpoints';
import type { Promotion } from '../../api/types';

interface PromotionsState {
  active: Promotion[];
  validatedPromo: Promotion | null;
  isLoading: boolean;
  isValidating: boolean;
  error: string | null;
}

const initialState: PromotionsState = {
  active: [],
  validatedPromo: null,
  isLoading: false,
  isValidating: false,
  error: null,
};

export const fetchActivePromotions = createAsyncThunk(
  'promotions/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const res = await promotionsAPI.getActive();
      return res.data as Promotion[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const validatePromoCode = createAsyncThunk(
  'promotions/validate',
  async (code: string, { rejectWithValue }) => {
    try {
      const res = await promotionsAPI.validateCode(code);
      return res.data as Promotion;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Code invalide');
    }
  },
);

const promotionsSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    clearValidatedPromo: (state) => { state.validatedPromo = null; state.error = null; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActivePromotions.pending, (state) => { state.isLoading = true; });
    builder.addCase(fetchActivePromotions.fulfilled, (state, action: PayloadAction<Promotion[]>) => {
      state.isLoading = false; state.active = action.payload;
    });
    builder.addCase(fetchActivePromotions.rejected, (state) => { state.isLoading = false; });

    builder.addCase(validatePromoCode.pending, (state) => { state.isValidating = true; state.error = null; });
    builder.addCase(validatePromoCode.fulfilled, (state, action: PayloadAction<Promotion>) => {
      state.isValidating = false; state.validatedPromo = action.payload;
    });
    builder.addCase(validatePromoCode.rejected, (state, action) => {
      state.isValidating = false; state.error = action.payload as string;
    });
  },
});

export const { clearValidatedPromo } = promotionsSlice.actions;
export default promotionsSlice.reducer;
