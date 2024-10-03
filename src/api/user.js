import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { keyUri, config } from "../key";
import { toast } from "react-toastify";

const initialState = {
  all_user: [],
  user: [],
  loading: false,
  hasError: false,
  current_user: null,

  view: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getuser: (state) => {
      state.loading = true;
    },

    getAll_user_success: (state, { payload }) => {
      state.loading = false;
      state.all_user = payload?.user;
    },

    get_user_success: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },

    getCurrentSuccess: (state, { payload }) => {
      state.loading = false;
      state.current_user = payload.user;
    },

    get_user_Failure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

export const {
  getuser,
  get_user_success,
  getCurrentSuccess,
  get_user_Failure,
  getAll_user_success,
} = userSlice.actions;

export const userSelector = (state) => state.user;

export const createuser = (values) => async (dispatch) => {
  dispatch(getuser());
  // message.loading({ content: 'loading...', key })

  try {
    const { data } = await axios.post(
      keyUri.BACKEND_URI + `/user`,
      values,
      config
    );
    //  data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchusers());
  } catch ({ response }) {
    //   response.data && message.error({ content: response.data.msg, key, duration: 2 })
    dispatch(get_user_Failure());
  }
};

export const fetchAllusers = () => async (dispatch) => {
  dispatch(getuser());
  try {
    const { data } = await axios.get(
      keyUri.BACKEND_URI + `/user`,
      config
    );
    dispatch(getAll_user_success(data));
  } catch (error) {
    dispatch(get_user_Failure());
  }
};

export const fetchusers = () => async (dispatch) => {
  dispatch(getuser());
  try {
    const { data } = await axios.get(
      keyUri.BACKEND_URI + `/user`,
      config
    );
    dispatch(get_user_success(data));
  } catch (error) {
    dispatch(get_user_Failure());
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
};

export const deleteuser = ( id ) => async (dispatch) => {
  dispatch(getuser());
  console.log(id)
  //   message.loading({ content: 'loading...', key })
  try {
    const { data } = await axios.delete(
      keyUri.BACKEND_URI + `/user/${id} `,
      config
    );
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
    //   data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllusers());
  } catch (error) {
    dispatch(get_user_Failure());
  }
};

export const fetchOneuser = (id) => async (dispatch) => {
  dispatch(getuser());
  try {
    const { data } = await axios.get(
      keyUri.BACKEND_URI + `/user/${id}`,
      config
    );
    dispatch(getCurrentSuccess(data));
  } catch (error) {
    dispatch(get_user_Failure());
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
};

export const updateuser = (id, values) => async (dispatch) => {
  const key = "user";
  dispatch(getuser());
  //   message.loading({ content: 'loading...', key })
  try {
    const { data } = await axios.put(
      keyUri.BACKEND_URI + `/user/${id}`,
      values,
      config
    );
    // data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllusers())
    dispatch(fetchusers())
    toast.success(`${data?.message}`, {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
 

} catch (error) {
    dispatch(get_user_Failure())
    toast.error(`${error?.response?.data?.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
        theme: "light",
      });  

}
}

export default userSlice.reducer;
