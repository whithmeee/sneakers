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
            const { id } = action.payload;
            const existingItem = state.cart.find((item) => item.id === id);

            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.cart.push({ ...action.payload, count: 1 });
            }
        },
        decrementToCart: (state, action) => {
            const { id } = action.payload;

            const decrementCart = state.cart.find((item) => item.id === id);

            if (decrementCart) {
                decrementCart.count--;
            }

            if (decrementCart?.count === 0) {
                decrementCart.count = 1;
            }
        },
        removeToCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload
            );
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const { addToCart, removeToCart, clearCart, decrementToCart } =
    cartSlice.actions;
export default cartSlice.reducer;
