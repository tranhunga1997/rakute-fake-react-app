import { createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";

export const getShoseGenres = createAsyncThunk("category/getParentShose", async (params, thunkApi) => {
    try {
        return await productApi.getShoseGenres(params);
    } catch (err) {
        throw new Error(err.message);
    }
})