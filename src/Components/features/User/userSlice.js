import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        logged: false,
        info: [],
        wallet: {
            balance: 0,
            performance: 0,
            variation: 0,
            profit: 0,
            variation_details: []
              
        },
        stocks:[]
    },
    reducers: {
        userLogin: (state) => {
            state.logged = true
            
        },
        userLogoff: (state) => {
            localStorage.removeItem('@radarinvest:token');
            state.logged = false
            state.info = []
            state.wallet = {
                balance: 0,
                performance: 0,
                variation: 0,
                profit: 0,
                variation_details: []
            }
            state.stocks = []
        },
        addUserInfo: (state, action) => {
            state.info = action.payload
            console.log(state.info.confirmado)
        },
        updateWallet: (state, action) => {
            state.wallet = action.payload
        },
        updateStocks: (state, action) => {
            state.stocks = action.payload
        }
    }
})

export const { userLogin, userLogoff, addUserInfo, updateWallet, updateStocks } = userSlice.actions
export default userSlice.reducer