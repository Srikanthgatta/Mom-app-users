import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { keyUri, config } from "../key";
import { json } from "react-router-dom";
import { toast } from "react-toastify";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const user = localStorage.getItem("userinfo")
  ? localStorage.getItem("userinfo")
  : null;

export const initialState = {
  loading: false,
  hasError: false,
  isAuthenticate: userToken ? true : false,
  user: user,
  userToken: userToken,
};

export const authenticateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getlogin: (state) => {
      state.loading = true;
    },

    getAuthenticate: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticate = true;
      state.user = payload.user;
      state.userToken = payload.token;
    },
    isAuthenticateError: (state) => {
      state.hasError = true;
      state.loading = false;
      state.isAuthenticate = false;
    },
    getUserProfile: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isAuthenticate = true;
    },
  },
});

export const {
  getlogin,
  getUserProfile,
  getAuthenticate,
  isAuthenticateError,
} = authenticateSlice.actions;

export const authenticateSelector = (state) => state.auth;
export default authenticateSlice.reducer;

export const logOut = () => async (dispatch) => {
  console.log("logout");
  try {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  } catch (error) {
    dispatch(isAuthenticateError());
  }
};

export const fetchlogin = (logindata) => async (dispatch) => {
  dispatch(getlogin());
  try {
    const { data } = await axios.post(
      keyUri.BACKEND_URI + "/userAuth",
      logindata,
      config
    );
    localStorage.setItem("userToken", data.token);
    console.log(data)
    toast.success(`${data.message}`, {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(getAuthenticate(data));
  } catch (response) {
    setTimeout(() => {
      toast.error(`${response.response.data.message}`, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }, 200);
    dispatch(isAuthenticateError(response));
  }
};



export const fetchUserProfile = (token) => async (dispatch) => {

  const loginConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch(getlogin());
  try {
    const { data } = await axios.get(
      keyUri.BACKEND_URI + "/userProfile",
      loginConfig
    );
    dispatch(getUserProfile(data));
  } catch (error) {
    console.log(error);
    dispatch(logOut());
  }
};
