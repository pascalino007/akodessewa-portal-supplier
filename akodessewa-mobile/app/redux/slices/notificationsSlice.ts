import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notificationsAPI } from '../../api/endpoints';
import type { Notification } from '../../api/types';

interface NotificationsState {
  items: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchAll',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const res = await notificationsAPI.getAll(params);
      return res.data as Notification[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement');
    }
  },
);

export const fetchUnreadCount = createAsyncThunk(
  'notifications/unreadCount',
  async (_, { rejectWithValue }) => {
    try {
      const res = await notificationsAPI.getUnreadCount();
      return res.data as { count: number };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec');
    }
  },
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markRead',
  async (id: string, { rejectWithValue }) => {
    try {
      await notificationsAPI.markAsRead(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec');
    }
  },
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllRead',
  async (_, { rejectWithValue }) => {
    try {
      await notificationsAPI.markAllAsRead();
      return true;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec');
    }
  },
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => { state.isLoading = true; });
    builder.addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
      state.isLoading = false; state.items = action.payload;
    });
    builder.addCase(fetchNotifications.rejected, (state) => { state.isLoading = false; });

    builder.addCase(fetchUnreadCount.fulfilled, (state, action: PayloadAction<{ count: number }>) => {
      state.unreadCount = action.payload.count;
    });

    builder.addCase(markNotificationAsRead.fulfilled, (state, action: PayloadAction<string>) => {
      const item = state.items.find(n => n.id === action.payload);
      if (item) { item.isRead = true; state.unreadCount = Math.max(0, state.unreadCount - 1); }
    });

    builder.addCase(markAllNotificationsAsRead.fulfilled, (state) => {
      state.items.forEach(n => { n.isRead = true; });
      state.unreadCount = 0;
    });
  },
});

export default notificationsSlice.reducer;
