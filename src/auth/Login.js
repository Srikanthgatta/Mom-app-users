import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { authenticateSelector, fetchlogin } from "../api/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { isAuthenticate } = useSelector(authenticateSelector);

  useEffect(()=>{
    // const token = localStorage.getItem('token')
    if(isAuthenticate){
      nav('/dashboard')
    }else{
      nav('/')
    }
  },[isAuthenticate])

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchlogin(data));
  };

  return (
    <div className="flex h-[100vh]">
      <div className="w-1/2 ml-10 md:flex hidden items-center">
        <img src={logo} alt="" className="" />
      </div>
      <div className="md:w-1/2 w-full md:mt-[15%] mt-[40%]">
        <Box className="">
          <Box mb={3} textAlign="center" className="mb-5 mt-5 ">
            <Typography
              variant="h5"
              component="h2"
              className="text-center text-indigo-900"
            >
              Login to user portal
            </Typography>
          </Box>
          <Box className="flex justify-center">
            <form onSubmit={submitHandler}>
              <div>
                <FormControl
                  sx={{ width: "100%", marginTop: "10px" }}
                  size="small"
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel>Enter Email</InputLabel>
                  <OutlinedInput
                    type="email"
                    required
                    label="Enter Email"
                    name="email" // Make sure to set the name attribute
                    value={data.email}
                    onChange={changeHandler}

                    // You can add more attributes or props as needed
                  />
                </FormControl>
              </div>

              <FormControl
                style={{ marginTop: "20px" }}
                size="small"
                variant="outlined"
                fullWidth
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Enter Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                  label="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={changeHandler}
                />
              </FormControl>
              {/* <TextField id="outlined-basic1" required='required' value={data.email} type='email' name='email' label="Email" onChange={changeHandler} variant="outlined" fullWidth /><br></br><br></br> */}
              {/* <TextField id="outlined-basic2" required='required' value={data.password} type='password' name='password' label="Password" onChange={changeHandler} variant="outlined" fullWidth /><br></br><br></br> */}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Login;
