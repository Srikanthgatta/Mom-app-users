import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import DataTable from './DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllmeeting, fetchOrganizedMeetings, meetingSelector } from '../../api/meeting';
import { authenticateSelector } from '../../api/authSlice'

function Index() {
    const nav = useNavigate()
    const {organized_meetings} = useSelector(meetingSelector)
    const [filter, setFilter] = useState()
    const dispatch = useDispatch()
    const { user } = useSelector(authenticateSelector)
  // console.log(organized_meetings)

    useEffect(()=>{
      dispatch(fetchOrganizedMeetings(user?._id))
    },[user])

    
  return (
    <div>
        <div className='py-5 mr-4 flex justify-end'>
        <Button variant='contained' onClick={()=>nav('/createMeeting')} ><AddIcon/>New Meeting</Button>
        </div>
        <div>
            <DataTable data={filter ? filter : organized_meetings} />
        </div>
    </div>
  )
}

export default Index