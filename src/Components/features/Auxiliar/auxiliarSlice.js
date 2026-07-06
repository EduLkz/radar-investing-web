import { createSlice } from "@reduxjs/toolkit";

export const auxiliarSlice = createSlice({
    name: 'auxiliar',
    initialState: {
        lastPage: ''
    },
    reducers:{
        setPage: (state, action) => {
            state.lastPage = action.payload
        },
    }
})

export const { setPage } = auxiliarSlice.actions
export default auxiliarSlice.reducer