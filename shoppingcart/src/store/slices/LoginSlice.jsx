import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:'login',
    initialState:{
        isLoggedIn:false
    },
    reducers:{
        setLogin: (state) => {
            state.isLoggedIn = !state.isLoggedIn
        }
    }
})

export const {setLogin} = loginSlice.actions
export const logiValue = (state) =>state.login.isLoggedIn
export default loginSlice.reducer


