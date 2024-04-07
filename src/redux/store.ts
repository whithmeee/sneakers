import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart.slice";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./storage";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice,
    },
});

store.subscribe(() => {
    saveState({ token: store.getState().user.token }, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
