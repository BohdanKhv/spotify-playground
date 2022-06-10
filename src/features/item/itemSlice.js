import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itemService from "./itemService";


const initialState = {
    items: [],
    isLoading: false,
    isError: false,
    msg: "",
    limit: 20,
    offset: 0,
    total: 0,
    hasMore: false
};


// get top artists
export const getTop = createAsyncThunk(
    "item/getTop",
    async (type, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user;
            const { limit, offset } = thunkAPI.getState().item;
            return await itemService.getTop({type, limit, offset}, token);
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


// get top songs
export const getTopSongs = createAsyncThunk(
    "item/getTopSongs",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user;
            return await itemService.getTopSongs(token);
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
const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        reset: (state) => {
            state.items = [];
            state.isLoading = false;
            state.isError = false;
            state.offset = 0;
            state.limit = 20;
            state.total = 0;
            state.msg = "";
            state.hasMore = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTop.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = "";
        });
        builder.addCase(getTop.fulfilled, (state, action) => {
            state.items = [...state.items, ...action.payload.items];
            state.isLoading = false;
            state.isError = false;
            state.msg = "";
            state.offset = state.offset + state.limit;
            state.limit = action.payload.limit;
            state.total = action.payload.total;
            state.hasMore = state.offset + state.limit < state.total;
        });
        builder.addCase(getTop.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});


export const { reset } = itemSlice.actions;
export default itemSlice.reducer;