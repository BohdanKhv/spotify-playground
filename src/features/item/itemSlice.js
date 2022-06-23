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
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.accessToken;
            const { type, timeRange } = data;
            const { limit, offset } = thunkAPI.getState().item;
            return await itemService.getTop({type, timeRange, offset, limit, offset}, token);
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


// get top artists
export const playlist = createAsyncThunk(
    "item/palylist",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.accessToken;
            return await itemService.playlist(token);
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

        // playlist
        builder.addCase(playlist.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = "";
        });
        builder.addCase(playlist.fulfilled, (state, action) => {
            state.items = action.payload.items.map(item => item.track);
            const data = [];
            action.payload.items.forEach(item => {
                data.push({
                    artist: item.track.artists[0].name,
                    name: item.track.name,
                    image: item.track.album.images[0].url,
                    id: item.track.id,
                    preview: item.track.preview_url
                });
            });
            console.log(data)
            state.isLoading = false;
            state.isError = false;
            state.msg = "";
        });
        builder.addCase(playlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});


export const { reset } = itemSlice.actions;
export default itemSlice.reducer;