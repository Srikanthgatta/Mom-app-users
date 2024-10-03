import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  fetchScheduleMeetings, meetingSelector } from '../../api/meeting'
import { authenticateSelector } from '../../api/authSlice'
import DataTable from './DataTable'
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Index() {
  const {schedule_meetings} = useSelector(meetingSelector)
    const [filter, setFilter] = useState()
    const [filterVal, setFilterVal] = useState('')
    const dispatch = useDispatch()
    const { user } = useSelector(authenticateSelector)
  console.log(schedule_meetings)
  console.log(user?._id)

    useEffect(()=>{
      dispatch(fetchScheduleMeetings(user?._id))
    },[user])

    useEffect(()=>{
      if(filterVal == 'Active'){
        const filterData = schedule_meetings?.filter((item)=>{
          return(item.complition_status != true && item.cancled_status != true)
        })
        setFilter(filterData)
      }
      if(filterVal == 'Cancled'){
        const filterData = schedule_meetings?.filter((item)=>{
          return(item.cancled_status == true)
        })
        setFilter(filterData)
      }
      if(filterVal == 'Completed'){
        const filterData = schedule_meetings?.filter((item)=>{
          return(item.complition_status == true)
        })
        setFilter(filterData)
      }
      if(filterVal == 'All'){
        setFilter()
      }
    },[schedule_meetings,filterVal])


  return (
    <div>
      <div className='flex justify-end m-4 '>
        <FormControl>
      <InputLabel size='small' >Filter</InputLabel>
        <Select size='small' className='min-w-[140px]' label='Filter' onChange={(e)=>setFilterVal(e.target.value)} >
        <MenuItem value={'All'}>All</MenuItem>
        <MenuItem value={'Active'}>Active</MenuItem>
        <MenuItem value={'Completed'}>Completed</MenuItem>
        <MenuItem value={'Cancled'}>Cancled</MenuItem>
        </Select>
        </FormControl>
      </div>
      <DataTable data={filter ? filter : schedule_meetings} userId = {user?._id} />
    </div>
  )
}

export default Index