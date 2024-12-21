import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../Api/authApi";
import userApi from "../Api/authApi";

// Thunk for user registration
export const registerUser = createAsyncThunk(
    "user/registerUser",
    async(user, { rejectWithValue }) => {
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
    async(user, { rejectWithValue }) => {
        try {
            const data = await authApi.login(user); // API call for login
            console.log("Response từ server:", data);
            const { accessToken, user: userInfo, refreshToken } = data.data.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            localStorage.setItem("currentUser", JSON.stringify(userInfo));

            return data.data; // Return user data on success
        } catch (error) {
            return rejectWithValue(error.response.data); // Return error on failure
        }
    }
);

export const LogoutUser = createAsyncThunk(
    "user/LogoutUser",
    async(_, { rejectWithValue }) => {
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
export const fetchUserDetail = async() => {
    try {
        const response = await userApi.getUserById()
        console.log("User Details:", response.data)
        return response.data
    } catch (error) {
        console.log(error);

    }
}
const userSlice = createSlice({
    name: "user",
    initialState: {
        _id: "",
        name: "",
        email: "",
        avatar: "",
        mobile: "",
        verify_email: "",
        last_login_date: "",
        status: "",
        address_details: [],
        shopping_cart: [],
        orderHistory: [],
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
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.avatar = action.payload.avatar
            state.mobile = action.payload.mobile
            state.last_login_date = action.payload.last_login_date
            state.status = action.payload.status
            state.address_details = action.payload.address_details
            state.shopping_cart = action.payload.shopping_cart
            state.orderHistory = action.payload.orderHistory

        },
        logoutDetails: (state) => {
            state._id = ""
            state.name = ""
            state.email = ""
            state.avatar = ""
            state.mobile = ""
            state.last_login_date = ""
            state.status = ""
            state.address_details = ""
            state.shopping_cart = ""
            state.orderHistory = ""
        }
    },
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
export const { setUserDetails, logoutDetails } = userSlice.actions;
export default userSlice.reducer;