import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WishlistItem } from '../../api/types';

interface WishlistState {
    wishList: WishlistItem[];
}

const initialState: WishlistState = {
    wishList: [],
};

export const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        addTowishList: (state, action: PayloadAction<WishlistItem>) => {
            const exists = state.wishList.find((item) => item.id === action.payload.id);
            if (!exists) {
                state.wishList.push(action.payload);
            }
        },
        removeFromwishList: (state, action: PayloadAction<string>) => {
            state.wishList = state.wishList.filter((item) => item.id !== action.payload);
        },
        toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const exists = state.wishList.find((item) => item.id === action.payload.id);
            if (exists) {
                state.wishList = state.wishList.filter((item) => item.id !== action.payload.id);
            } else {
                state.wishList.push(action.payload);
            }
        },
        clearWishlist: (state) => {
            state.wishList = [];
        },
    },
});

export const { addTowishList, removeFromwishList, toggleWishlist, clearWishlist } = wishListSlice.actions;

export default wishListSlice.reducer;