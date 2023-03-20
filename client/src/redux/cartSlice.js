import {createSlice} from '@reduxjs/toolkit'

const cartInitialState = {
    products: [],
    quantity:0,
    total: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        // setProducts: (state, action) => {
        //     state.products = action.payload;
        //   },
        addToCart(state, action) {
            const isIncluded = state.products.some(product => product._id === action.payload._id);
            if(!isIncluded) {
                state.products = [...state.products, action.payload]
                state.quantity++
                state.total += action.payload.price 
            } else {
                state.products = state.products
            }
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter((item) => item._id !== action.payload._id);
            state.quantity--
            state.total = state.total - action.payload.price
          },
          clearCart: (state) => {
            state.products = []
            state.quantity = 0
            state.total = 0
          }

    }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer