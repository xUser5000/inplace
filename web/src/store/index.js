import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import LangaugeReducer from './Lng'
const store = configureStore({
    reducer: {
        user: userReducer,
        lang:LangaugeReducer
    }
});

export default store;