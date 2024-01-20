import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartCount: 0,
        totalCartPrice: 0,
        cartList: []
    },
    reducers:{
        addToCart: (state) => {
            state.cartCount++;
        },
        removeFromCart:(state) => {
            state.cartCount--
        },
        setCartCount:(state,action) => {
            state.cartCount = action.payload
        }
}
})

export const {addToCart, removeFromCart,setCartCount} = cartSlice.actions
export const selectCartCount = (state) =>state.cart.cartCount
export const selectCartList = (state) =>state.cart.cartList
export const selecttotalCartPrice = (state) =>state.cart.totalCartPrice
export default cartSlice.reducer;