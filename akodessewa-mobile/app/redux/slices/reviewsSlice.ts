import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { reviewsAPI } from '../../api/endpoints';
import type { Review } from '../../api/types';

interface ReviewsState {
  items: Review[];
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  items: [],
  isLoading: false,
  isCreating: false,
  error: null,
};

export const fetchProductReviews = createAsyncThunk(
  'reviews/fetchByProduct',
  async ({ productId, params }: { productId: string; params?: any }, { rejectWithValue }) => {
    try {
      const res = await reviewsAPI.getProductReviews(productId, params);
      return res.data as Review[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement des avis');
    }
  },
);

export const createReview = createAsyncThunk(
  'reviews/create',
  async (data: { productId: string; rating: number; title?: string; comment?: string }, { rejectWithValue }) => {
    try {
      const res = await reviewsAPI.create(data);
      return res.data as Review;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Échec de l'envoi de l'avis");
    }
  },
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviews: (state) => { state.items = []; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductReviews.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchProductReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
      state.isLoading = false; state.items = action.payload;
    });
    builder.addCase(fetchProductReviews.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(createReview.pending, (state) => { state.isCreating = true; state.error = null; });
    builder.addCase(createReview.fulfilled, (state, action: PayloadAction<Review>) => {
      state.isCreating = false; state.items.unshift(action.payload);
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.isCreating = false; state.error = action.payload as string;
    });
  },
});

export const { clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
