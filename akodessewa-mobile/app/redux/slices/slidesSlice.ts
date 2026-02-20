import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { slidesAPI } from '../../api/endpoints';
import type { Slide } from '../../api/types';

interface SlidesState {
  items: Slide[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SlidesState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchActiveSlides = createAsyncThunk(
  'slides/fetchActive',
  async (position: string | undefined, { rejectWithValue }) => {
    try {
      const res = await slidesAPI.getActive(position);
      return res.data as Slide[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement des bannières');
    }
  },
);

const slidesSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActiveSlides.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchActiveSlides.fulfilled, (state, action: PayloadAction<Slide[]>) => {
      state.isLoading = false; state.items = action.payload;
    });
    builder.addCase(fetchActiveSlides.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });
  },
});

export default slidesSlice.reducer;
