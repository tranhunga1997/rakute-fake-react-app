import { createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";

export const filterShose = createAsyncThunk("product/filterShose", async (params, thunkApi) => {
    try {
        const results = await productApi.shoseFilter(params);
        results.keyword = params.keyword || "";
        return results;
    } catch (err) {
        throw new Error(err.message);
    }
})