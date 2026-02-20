import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, usersAPI } from '../../api/endpoints';
import { setTokens, clearTokens } from '../../api/client';
import type { User, Address, AuthResponse } from '../../api/types';

interface AuthState {
  user: User | null;
  addresses: Address[];
  isAuthenticated: boolean;
  isLoading: boolean;
  isProfileLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  addresses: [],
  isAuthenticated: false,
  isLoading: false,
  isProfileLoading: false,
  error: null,
};

// ─── THUNKS ─────────────────────────────────────────────────────────────────

export const login = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(data);
      const { accessToken, refreshToken, user } = res.data as AuthResponse;
      await setTokens(accessToken, refreshToken);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec de la connexion');
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string; firstName?: string; lastName?: string; phone?: string }, { rejectWithValue }) => {
    try {
      const res = await authAPI.register(data);
      const { accessToken, refreshToken, user } = res.data as AuthResponse;
      await setTokens(accessToken, refreshToken);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Échec de l'inscription");
    }
  },
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getMe();
      return res.data as User;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement du profil');
    }
  },
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const res = await usersAPI.updateMe(data);
      return res.data as User;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec de la mise à jour');
    }
  },
);

export const fetchAddresses = createAsyncThunk(
  'auth/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const res = await usersAPI.getMyAddresses();
      return res.data as Address[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du chargement des adresses');
    }
  },
);

export const createAddress = createAsyncThunk(
  'auth/createAddress',
  async (data: Partial<Address>, { rejectWithValue }) => {
    try {
      const res = await usersAPI.createAddress(data);
      return res.data as Address;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Échec de l'ajout de l'adresse");
    }
  },
);

export const deleteAddress = createAsyncThunk(
  'auth/deleteAddress',
  async (id: string, { rejectWithValue }) => {
    try {
      await usersAPI.deleteAddress(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Échec de la suppression");
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
    } catch (_err) {
      // Silently fail — we clear tokens regardless
    } finally {
      await clearTokens();
    }
  },
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) return null;
      const res = await usersAPI.getMe();
      return res.data as User;
    } catch (err: any) {
      await clearTokens();
      return null;
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
      await authAPI.changePassword(data);
      return true;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Échec du changement de mot de passe');
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      await authAPI.forgotPassword(email);
      return true;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Échec de l'envoi");
    }
  },
);

// ─── SLICE ──────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false; state.isAuthenticated = true; state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    // Register
    builder.addCase(register.pending, (state) => { state.isLoading = true; state.error = null; });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false; state.isAuthenticated = true; state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false; state.error = action.payload as string;
    });

    // Fetch profile
    builder.addCase(fetchProfile.pending, (state) => { state.isProfileLoading = true; });
    builder.addCase(fetchProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.isProfileLoading = false; state.user = action.payload;
    });
    builder.addCase(fetchProfile.rejected, (state) => { state.isProfileLoading = false; });

    // Update profile
    builder.addCase(updateProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    });

    // Addresses
    builder.addCase(fetchAddresses.fulfilled, (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    });
    builder.addCase(createAddress.fulfilled, (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    });
    builder.addCase(deleteAddress.fulfilled, (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(a => a.id !== action.payload);
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null; state.isAuthenticated = false; state.addresses = [];
    });

    // Restore session
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload; state.isAuthenticated = true;
      }
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
