import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../api/types';

interface CartState {
    cart: CartItem[];
}

const initialState: CartState = {
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const itemInCart = state.cart.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity += action.payload.quantity || 1;
            } else {
                state.cart.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = Math.max(1, action.payload.quantity);
            }
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item) item.quantity++;
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item) {
                if (item.quantity <= 1) {
                    state.cart = state.cart.filter((i) => i.id !== action.payload);
                } else {
                    item.quantity--;
                }
            }
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;