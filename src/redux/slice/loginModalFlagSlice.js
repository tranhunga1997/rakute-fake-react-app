import { createSlice } from "@reduxjs/toolkit";

const loginModalFlagSlice = createSlice({
    name: "login modal flag",
    initialState: false,
    reducers: {
        openLoginModal: state => {
            state = true
        },
        closeLoginModal: state => {
            state = false
        }
    }
})

const {reducer, actions} = loginModalFlagSlice;
export const {openLoginModal, closeLoginModal} = actions;
export default reducer;