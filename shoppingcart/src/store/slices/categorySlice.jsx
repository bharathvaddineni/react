import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:'category',
    initialState:{
        productCategory:'all'
    },
    reducers:{
        setCategory: (state,action) => {
            state.productCategory = action.payload
        }
    }
})

export const {setCategory} = categorySlice.actions
export const productCategory = (state) =>state.category.productCategory
export default categorySlice.reducer


