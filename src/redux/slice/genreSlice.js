import { createSlice } from "@reduxjs/toolkit";
import { getShoseGenres } from "../thunk/genreThunk";

const initialState = {
    brothers: [],
    current: {},
    childrens: [],
    pending: false,
    success: false,
    error: false
}

const genreSlice = createSlice({
    name: "genre list",
    initialState: initialState,
    reducers: {
        resetStatus: state => {
            console.log("bắt đầu reset state...");
            state.pending = false;
            state.success = false;
            state.error = false;
        },
        resetState: state => state = initialState,
    },
    extraReducers: {
        [getShoseGenres.pending]: state => {
            state.pending = true;
            state.success = false;
            state.error = false;
        },
        [getShoseGenres.fulfilled]: (state, action) => {
            state.pending = false;
            state.success = true;
            state.error = false;
            state.brothers = action.payload.brothers;
            state.current = action.payload.current;
            state.childrens = action.payload.children;
        },
        [getShoseGenres.rejected]: state => {
            state.pending = false;
            state.success = false;
            state.error = true;
        },
    }
})

const { reducer, actions } = genreSlice;
export const { resetStatus } = actions;
export default reducer;