import { createSlice } from "@reduxjs/toolkit";
import { filterShose } from "../thunk/productThunk";

const initialState = {
    items: [],
    keyword: "",
    page: 1,
    totalPage: 1,
    limit: 10,
    pending: false,
    success: false,
    error: false
}

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [filterShose.pending]: state => {
            state.pending = true;
            state.success = false;
            state.error = false;
        },
        [filterShose.fulfilled]: (state, action) => {
            const { Items, page, pageCount, hits, keyword } = action.payload;
            state.pending = false;
            state.success = true;
            state.error = false;
            state.items = Items;
            state.keyword = keyword;
            state.page = page;
            state.totalPage = pageCount;
            state.limit = hits;
        },
        [filterShose.rejected]: state => {
            state.pending = false;
            state.success = false;
            state.error = true;
        }
    },
})

const { reducer, actions } = productSlice;
export default reducer;