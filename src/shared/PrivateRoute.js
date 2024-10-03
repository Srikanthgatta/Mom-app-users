import { useSelector } from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'
import { authenticateSelector } from '../api/authSlice'

const PrivateRoutes = ()=>{
    const  {isAuthenticate} = useSelector(authenticateSelector)

    return (
        isAuthenticate ? <Outlet/> : <Navigate to ="/"/>
    )
}

export default PrivateRoutes