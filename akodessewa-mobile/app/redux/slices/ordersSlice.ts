import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ordersAPI } from '../../api/endpoints';
import type { Order } from '../../api/types';

interface OrdersState {
  items: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  currentOrder: null,
  isLoading: false,
  isCreating: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const res = await ordersAPI.getAll(params);
      return res.data as Order[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement des commandes');
    }
  },
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await ordersAPI.getById(id);
      return res.data as Order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Commande introuvable');
    }
  },
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await ordersAPI.create(data);
      return res.data as Order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec de la création de la commande');
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status, note }: { id: string; status: string; note?: string }, { rejectWithValue }) => {
    try {
      const res = await ordersAPI.updateStatus(id, status, note);
      return res.data as Order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec de la mise à jour');
    }
  },
);

export const cancelOrderItem = createAsyncThunk(
  'orders/cancelItem',
  async ({ orderId, itemId, reason }: { orderId: string; itemId: string; reason?: string }, { rejectWithValue }) => {
    try {
      const res = await ordersAPI.cancelItem(orderId, itemId, reason);
      return res.data as Order;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Échec de l'annulation");
    }
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => { state.currentOrder = null; },
    clearOrderError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
      state.isLoading = false; state.items = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(fetchOrderById.pending, (state) => { state.isLoading = true; });
    builder.addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
      state.isLoading = false; state.currentOrder = action.payload;
    });
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    builder.addCase(createOrder.pending, (state) => { state.isCreating = true; state.error = null; });
    builder.addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
      state.isCreating = false; state.items.unshift(action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isCreating = false; state.error = action.payload as string;
    });

    builder.addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
      const idx = state.items.findIndex(o => o.id === action.payload.id);
      if (idx >= 0) state.items[idx] = action.payload;
    });

    builder.addCase(cancelOrderItem.fulfilled, (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
      const idx = state.items.findIndex(o => o.id === action.payload.id);
      if (idx >= 0) state.items[idx] = action.payload;
    });
  },
});

export const { clearCurrentOrder, clearOrderError } = ordersSlice.actions;
export default ordersSlice.reducer;
