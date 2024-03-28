import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "../page/Cart/Cart";

interface CartSliceState {
    cart: CartProduct[];
}

const initialState: CartSliceState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        removeToCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});

export const { addToCart, removeToCart } = cartSlice.actions;
export default cartSlice.reducer;
