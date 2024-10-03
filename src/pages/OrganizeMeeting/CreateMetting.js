import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { departmentSelector, fetchAlldepartment } from '../../api/department';
import { useNavigate } from 'react-router-dom';
import { fetchAllusers, userSelector } from '../../api/user';
import { createmeeting } from '../../api/meeting';
import { authenticateSelector } from '../../api/authSlice';
import { toast } from 'react-toastify';



function CreateMetting() {
  const dispatch = useDispatch()
  const nav = useNavigate()
  const [formData, setFormData] = useState({
    title : '',
    description : '',
    location : '',
    date : '',
    time : ''
  })
  const [attendees, setAttendees] = useState([])
  const [selDepar, setSelDepar] = useState('')
  const { department } = useSelector(departmentSelector)
  const { all_user } = useSelector(userSelector)
  const [deptPeople, setDeptPeople] = useState([])
  const { user } = useSelector(authenticateSelector)
  console.log(user)

    useEffect(()=>{
      dispatch(fetchAlldepartment())
      dispatch(fetchAllusers())
    },[])

    useEffect(()=>{
      const selDeptPeople = all_user?.filter((item)=>{
        return item.department?._id === selDepar
      })
      setDeptPeople(selDeptPeople)
    },[selDepar])

    const handelValue = (e) => {
      setFormData({...formData,[e.target.name]: e.target.value})
    }

  const onFinish = (e) => {
    e.preventDefault()
    if( user && user._id){
      dispatch(createmeeting({...formData,department:selDepar,attendees,meeting_organizer:user?._id}))
    nav(-1)
    }else{
      toast.error(`something went wrong`, {
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
  return (
    <div>
      <div className='flex justify-center'>
      <form className="md:w-1/2 w-full px-6 mt-5 " onSubmit={onFinish} >
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        {/* <InputLabel>Category</InputLabel> */}
        <TextField
          required
            variant="outlined"
            type="text"
            name="title"
            label="Title"
            value={formData?.title}
            onChange={handelValue}
          />
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        <InputLabel>Department</InputLabel>
        <Select
          required
            name="department"
            label="Department"
            value={selDepar}
            onChange={(e)=>{setSelDepar(e.target.value);setAttendees([])}}
          >
            {
              department?.map((item,i)=>{
                return(
                  <MenuItem key={i} value={item?._id}>{item?.department_name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        <InputLabel>Participants</InputLabel>
        <Select
          required
          multiple
            name="attendees"
            label="Attendees"
            value={attendees}
            onChange={(e)=>setAttendees(e.target.value)}
            // onChange={handelValue}
          >
            {
              deptPeople?.map((item,i)=>{
                return(
                  <MenuItem key={i} value={item?._id}>{item?.emp_name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        {/* <InputLabel>Category</InputLabel> */}
        <TextField
          required
          multiline
            variant="outlined"
            type="text"
            name="description"
            label="Description"
            rows={3}
            maxRows={6}
            value={formData?.description}
            onChange={handelValue}
          />
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        {/* <InputLabel>Category</InputLabel> */}
        <TextField
          required
            variant="outlined"
            type="text"
            name="location"
            label="Location"
            value={formData?.location}
            onChange={handelValue}
          />
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        <TextField
          required
            variant="outlined"
            type="date"
            name="date"
            value={formData?.date}
            onChange={handelValue}
          />
      
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        <TextField
          required
            variant="outlined"
            type="time"
            name="time"
            // label="Phone Number"
            value={formData?.time}
            onChange={handelValue}
          />
        </FormControl>
        <FormControl sx={{ marginTop: "20px"}}>
          <Button size="large" variant="contained" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
    </div>
  )
}

export default CreateMetting