import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../Api/authApi";

// Thunk for user registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const data = await authApi.register(user); // API call for registration
      return data; // Return data on success
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error on failure
    }
  }
);

// Thunk for user login
export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, { rejectWithValue }) => {
    try {
      const data = await authApi.login(user); // API call for login
      console.log("Response từ server:", data);
      const { accessToken, user: userInfo, refreshToken } = data.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      localStorage.setItem("currentUser", JSON.stringify(userInfo));
      return data; // Return user data on success
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error on failure
    }
  }
);
export const LogoutUser = createAsyncThunk(
  "user/LogoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.logout(); // Gọi API đăng xuất

      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("persist:root");
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Trả lỗi nếu thất bại
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    logout: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle registration
      .addCase(registerUser.pending, (state) => {
        state.register.isFetching = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.register.success = true;
        state.register.isFetching = false;
        state.register.error = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.register.error = true;
        state.register.isFetching = false;
      })
      // Handle login
      .addCase(LoginUser.pending, (state) => {
        state.login.isFetching = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.login.isFetching = false;
        state.login.currentUser = action.payload;
        state.login.error = false;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.login.isFetching = false;
        state.login.error = true;
      })
      .addCase(LogoutUser.pending, (state) => {
        state.logout.isFetching = true;
        state.logout.error = false;
        state.logout.success = false;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.logout.isFetching = false;
        state.logout.success = true;
        state.logout.error = false;
        state.login.currentUser = null;
      })

      .addCase(LogoutUser.rejected, (state) => {
        state.logout.isFetching = false;
        state.logout.error = true;
        state.logout.success = false;
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
