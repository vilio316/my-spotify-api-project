import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        value : "",
    },
    reducers:{
        storeToken: (state, action) => {
            return {...state, value: action.payload}
        },
        clearToken: () =>{
            return{ ...state, value: ""}
        },
    }
})

export const access_token = (state) => state.token.value
export const {storeToken, clearToken} = tokenSlice.actions
export default tokenSlice.reducer