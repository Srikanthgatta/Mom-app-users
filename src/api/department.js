
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { keyUri, config } from "../key";
import { toast } from "react-toastify";

export const initialState = {

    loading: false,
    hasErrors: false,
    department:[],
    currentdepartment:null,
}

export const departmentSlice = createSlice({
    name:"department",
    initialState,
    reducers:{

        getdepartment: state =>{

            state.loading = true
        },

        getdepartmentSuccess: (state, {payload}) =>{
            state.loading = false
            state.department = payload
            
        },

        getCurrentdepartment: (state, {payload}) =>{
            state.loading = false
            state.currentdepartment = payload
            
        },
        getdepartmentFailure: (state, {payload}) =>{

            state.loading = false
            state.department = payload
            
        },

    }
})

export const {getdepartment, getdepartmentSuccess, getCurrentdepartment, getdepartmentFailure } = departmentSlice.actions
      
export const departmentSelector = state => state.department
export default departmentSlice.reducer



export const  fetchAlldepartment = () => async dispatch =>{
      dispatch(getdepartment())
      
    try {

        const {data} = await axios.get(keyUri.BACKEND_URI +'/department');
        // console.log(data)
        dispatch(getdepartmentSuccess(data))

    } catch (error) {

        dispatch(getdepartmentFailure())
        toast.error(`${error?.response?.data?.message}`, {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

    }
    
}

export const  fetchOnedepartment = (id) => async dispatch =>{

    dispatch(getdepartment())
    
  try {

      const {data} = await axios.get(keyUri.BACKEND_URI +`/department/${id}`);
      dispatch(getCurrentdepartment(data))

  } catch ({response}) {

      dispatch(getdepartmentFailure())
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 });

  }
  
}


export const  createdepartment = (values) => async dispatch =>{
    dispatch(getdepartment())
    
  try {

      const {data} = await axios.post(keyUri.BACKEND_URI +'/department', values, config);
      setTimeout(() => {

        toast.success(`${data?.message}`, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
            theme: "light",
          });
      }, 500) 
        dispatch(fetchAlldepartment())

  } catch ({response}) {
       dispatch(getdepartmentFailure())
  }
  
}


export const  deletedepartment = (id) => async dispatch =>{
    const key = "department"
    dispatch(getdepartment())
    
  try {

      const {data} = await axios.delete(keyUri.BACKEND_URI +`/department/${id}`);
      toast.success(`${data?.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "light",
      });
      dispatch(fetchAlldepartment())

  } catch (error) {

      dispatch(getdepartmentFailure())
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

  }
  
}


export const  updatedepartment = (id, values) => async dispatch =>{
    dispatch(getdepartment())
    
  try {

      const {data} = await axios.put(keyUri.BACKEND_URI +`/department/${id}`, values, config);
      toast.success(`${data?.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "light",
      });
      window.location.reload()
      dispatch(fetchAlldepartment())

  } catch (error) {

      dispatch(getdepartmentFailure())
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

  }
  
}




