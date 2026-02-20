import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { productsAPI } from '../../api/endpoints';
import type { Product, PaginatedResponse } from '../../api/types';

interface ProductsState {
  items: Product[];
  featured: Product[];
  currentProduct: Product | null;
  relatedProducts: Product[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  isDetailLoading: boolean;
  isFeaturedLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  featured: [],
  currentProduct: null,
  relatedProducts: [],
  total: 0,
  page: 1,
  totalPages: 1,
  isLoading: false,
  isDetailLoading: false,
  isFeaturedLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const res = await productsAPI.getAll(params);
      return res.data as PaginatedResponse<Product>;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement des produits');
    }
  },
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async (limit: number = 10, { rejectWithValue }) => {
    try {
      const res = await productsAPI.getFeatured(limit);
      return res.data as Product[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await productsAPI.getById(id);
      return res.data as Product;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Produit introuvable');
    }
  },
);

export const fetchProductBySlug = createAsyncThunk(
  'products/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await productsAPI.getBySlug(slug);
      return res.data as Product;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Produit introuvable');
    }
  },
);

export const fetchRelatedProducts = createAsyncThunk(
  'products/fetchRelated',
  async ({ id, limit }: { id: string; limit?: number }, { rejectWithValue }) => {
    try {
      const res = await productsAPI.getRelated(id, limit);
      return res.data as Product[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const fetchShopProducts = createAsyncThunk(
  'products/fetchByShop',
  async ({ shopId, params }: { shopId: string; params?: any }, { rejectWithValue }) => {
    try {
      const res = await productsAPI.getByShop(shopId, params);
      return res.data as PaginatedResponse<Product>;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => { state.currentProduct = null; state.relatedProducts = []; },
    clearProducts: (state) => { state.items = []; state.total = 0; state.page = 1; state.totalPages = 1; },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchProducts.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<PaginatedResponse<Product>>) => {
      state.isLoading = false;
      state.items = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    // Featured
    builder.addCase(fetchFeaturedProducts.pending, (state) => { state.isFeaturedLoading = true; });
    builder.addCase(fetchFeaturedProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.isFeaturedLoading = false; state.featured = action.payload;
    });
    builder.addCase(fetchFeaturedProducts.rejected, (state) => { state.isFeaturedLoading = false; });

    // By ID
    builder.addCase(fetchProductById.pending, (state) => { state.isDetailLoading = true; });
    builder.addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
      state.isDetailLoading = false; state.currentProduct = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.isDetailLoading = false; state.error = action.payload as string;
    });

    // By Slug
    builder.addCase(fetchProductBySlug.pending, (state) => { state.isDetailLoading = true; });
    builder.addCase(fetchProductBySlug.fulfilled, (state, action: PayloadAction<Product>) => {
      state.isDetailLoading = false; state.currentProduct = action.payload;
    });
    builder.addCase(fetchProductBySlug.rejected, (state, action) => {
      state.isDetailLoading = false; state.error = action.payload as string;
    });

    // Related
    builder.addCase(fetchRelatedProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.relatedProducts = action.payload;
    });

    // Shop products
    builder.addCase(fetchShopProducts.pending, (state) => { state.isLoading = true; });
    builder.addCase(fetchShopProducts.fulfilled, (state, action: PayloadAction<PaginatedResponse<Product>>) => {
      state.isLoading = false;
      state.items = action.payload.data;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchShopProducts.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });
  },
});

export const { clearCurrentProduct, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
