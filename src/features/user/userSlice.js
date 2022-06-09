import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

// get user from local storage
const user = JSON.parse(localStorage.getItem("user"));
const profile = JSON.parse(localStorage.getItem("profile"));

const initialState = {
    user: user ? user : null,
    profile: profile ? profile : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    msg: ''
}


// get profile
export const getProfile = createAsyncThunk(
    'user/getProfile',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user;
            return await userService.getProfile(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// create slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.user = null;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            localStorage.setItem("profile", JSON.stringify(action.payload));
        });
    }
});


// export reducer
export const { reset, setUser } = userSlice.actions;
export default userSlice.reducer;