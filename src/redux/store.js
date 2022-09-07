import { configureStore } from "@reduxjs/toolkit";
import genreSlice from "./slice/genreSlice";
import productSlice from "./slice/productSlice";
import userLoginSlice from "./slice/userLoginSlice";
import userCartSlice from "./slice/userCartSlice";
import loginModalFlagSlice from "./slice/loginModalFlagSlice";
const store = configureStore({
    reducer: {
        genre: genreSlice,
        product: productSlice,
        userLogin: userLoginSlice,
        cart: userCartSlice,
        userModal: loginModalFlagSlice,
    }
})

export default store;