import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    isAuthenticated: false,
    user: null,
    loading: false,
    errorMsg: ""
}

export const login = createAsyncThunk("auth/login", async (data, thunkApi) => {
    try {
        const res = await axios.post("https://dummyjson.com/auth/login", data, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        return res?.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkApi.rejectWithValue(message);
    }
});

export const fetchUserInfo = createAsyncThunk("auth/fetchInfo", async(accessToken, thunkApi)=>{
    try {
        const res = await axios.get("https://dummyjson.com/auth/me", {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return res?.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkApi.rejectWithValue(message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");

            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        },
        clearError(state){
            state.errorMsg = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.loading = true;
            state.errorMsg = ""; 
        })
            .addCase(login.fulfilled, (state, action) => {
                const { accessToken, refreshToken, ...rest } = action.payload;
                state.user = rest;
                state.accessToken = accessToken;
                if (accessToken) localStorage.setItem("accessToken", accessToken);
                if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
                state.loading = false; 
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.errorMsg = action?.payload;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                const { accessToken, refreshToken, ...rest } = action.payload;
                state.user = rest;
                state.accessToken = accessToken;
                state.isAuthenticated = true
                if(accessToken) localStorage.setItem("accessToken", accessToken);
                if(refreshToken) localStorage.setItem("refreshToken", refreshToken);
            })
            .addCase(fetchUserInfo.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.accessToken = null;
                localStorage.removeItem("accessToken");
            })
    }
})

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;