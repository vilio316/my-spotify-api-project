import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        value : "",
        userID: ''
    },
    reducers:{
        storeToken: (state, action) => {
            return {...state, value: action.payload}
        },
        clearToken: () =>{
            return{ ...state, value: ""}
        },
        setUserID: (state, action) => {
            return {...state, userID :action.payload }
        }
    }
})

export const access_token = (state) => state.token.value
export const user_id = (state) => state.token.userID
export const {storeToken, clearToken, setUserID} = tokenSlice.actions
export default tokenSlice.reducer