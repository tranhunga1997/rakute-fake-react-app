const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    subTotalPrice: 0,
}

const userCartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(state.items))
        },

        updateItem: (state, action) => {
            let idx = state.items.findIndex(item => item?.itemCode === action.payload.itemCode);
            state.items[idx] = action.payload;
            localStorage.setItem('cart', JSON.stringify(state.items))
        },

        deleteItem: (state, action) => {
            let idx = state.items.findIndex(item => item?.itemCode === action.payload);
            state.items.splice(idx, 1);
            localStorage.setItem('cart', JSON.stringify(state.items))
        },

        deleteAllItem: state => {
            state.items = [];
            localStorage.removeItem('cart');
        },

        subTotalPriceCalc: state => {
            if (state.items.length <= 0) {
                state.subTotalPrice = 0;
            } else {
                const subTotalPrice = state.items.reduce((item1, item2) => item1 + item2.itemPrice * item2.quantity, 0)
                state.subTotalPrice = subTotalPrice;
            }

        }
    },
})

const { reducer, actions } = userCartSlice;
export const { addItem, updateItem, deleteItem, deleteAllItem, subTotalPriceCalc } = actions;
export default reducer;