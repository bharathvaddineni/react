import { configureStore } from "@reduxjs/toolkit";
import cartRedcuer from './store/slices/cartSlice'
import categoryReducer from './store/slices/categorySlice'
import loginReducer from './store/slices/LoginSlice'


export const Store = configureStore({
    reducer:{
        cart: cartRedcuer,
        category: categoryReducer,
        login: loginReducer
    }
})