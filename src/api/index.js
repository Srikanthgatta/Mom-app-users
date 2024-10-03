import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import meetingReducer from './meeting';
import departmentReducer from './department';
import userReducer from './user';


export default configureStore({
    reducer:{
        auth:authReducer,
        meeting:meetingReducer,
        department:departmentReducer,
        user:userReducer,
    }
})