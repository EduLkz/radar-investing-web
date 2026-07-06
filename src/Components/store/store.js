import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/User/userSlice";
import { auxiliarSlice } from "../features/Auxiliar/auxiliarSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        auxiliar: auxiliarSlice
    },
})