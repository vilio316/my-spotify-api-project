import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        value : ""
    },
    reducers:{
        storeToken: (state, action) => {
            return {...state, value: action.payload}
        }
    }
})

export const access_token = state.token.value
export const {storeToken} = state.actions
export default tokenSlice.reducer