import {createSlice} from '@reduxjs/toolkit'

const wishlistInitialState = {
    items: []
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: wishlistInitialState,
    reducers: {
        addToWishlist(state, action) {
            const isIncluded = state.items.some(item => item._id === action.payload._id);
            if(!isIncluded) {
                state.items = [...state.items, action.payload]
            } else {
                state.items = state.items
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload._id);
          },
        clearWishlist: (state) => {
            state.items = []
        }
    }
})

export const wishlistActions = wishlistSlice.actions
export default wishlistSlice.reducer