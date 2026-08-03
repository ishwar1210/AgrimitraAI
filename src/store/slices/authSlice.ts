import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types/user';
import { authApi, LoginPayload } from '../../services/authApi';
import { storage, STORAGE_KEYS } from '../../utils/storage';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Async thunk to restore session from AsyncStorage on app startup
export const loadStoredAuth = createAsyncThunk('auth/loadStoredAuth', async () => {
  const token = await storage.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
  const user = await storage.getItem<User>(STORAGE_KEYS.USER_DATA);
  if (token && user) {
    return { token, user };
  }
  return null;
});

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.login(payload);
      await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      await storage.setItem(STORAGE_KEYS.USER_DATA, response.user);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed. Please try again.');
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await authApi.logout();
  await storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  await storage.removeItem(STORAGE_KEYS.USER_DATA);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Load stored auth session
    builder
      .addCase(loadStoredAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(loadStoredAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });

    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout user
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
