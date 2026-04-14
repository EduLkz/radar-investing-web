import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        logged: false,
        info: []
    },
    reducers: {
        userLogin: (state) => {
            state.logged = true
        },
        userLogoff: (state) => {
            state.logged = false
            state.info = []
        },
        addUserInfo: (state, action) => {
            state.info = action.payload
        }
    }
})

export const { userLogin, userLogoff, addUserInfo } = userSlice.actions
export default userSlice.reducer