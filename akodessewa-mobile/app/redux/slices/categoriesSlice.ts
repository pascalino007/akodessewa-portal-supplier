import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { categoriesAPI } from '../../api/endpoints';
import type { Category } from '../../api/types';

interface CategoriesState {
  items: Category[];
  currentCategory: Category | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  currentCategory: null,
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (type: string | undefined, { rejectWithValue }) => {
    try {
      const res = await categoriesAPI.getAll(type);
      return res.data as Category[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement des catégories');
    }
  },
);

export const fetchCategoryBySlug = createAsyncThunk(
  'categories/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await categoriesAPI.getBySlug(slug);
      return res.data as Category;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Catégorie introuvable');
    }
  },
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await categoriesAPI.getById(id);
      return res.data as Category;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Catégorie introuvable');
    }
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCurrentCategory: (state) => { state.currentCategory = null; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
      state.isLoading = false; state.items = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(fetchCategoryBySlug.fulfilled, (state, action: PayloadAction<Category>) => {
      state.currentCategory = action.payload;
    });
    builder.addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
      state.currentCategory = action.payload;
    });
  },
});

export const { clearCurrentCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
