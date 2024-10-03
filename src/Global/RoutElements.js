import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from '@mui/icons-material/Home';
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import LogoutIcon from "@mui/icons-material/Logout";
import BroadcastOnHomeIcon from '@mui/icons-material/BroadcastOnHome';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';


export const routes = [
    {
        title : "Home",
        href : "/dashboard",
        icon : <HomeIcon/>,
    },
    // {
    //     title : "New Approvals",
    //     href : "/dashboard",
    //     icon : <FingerprintIcon/>,
    // },
    {
        title : "Meetings",
        href : "/meetings",
        icon : <GroupsIcon/>,
    },
    // {
    //     title : "Broadcast",
    //     href : "/dashboard",
    //     icon : <BroadcastOnHomeIcon/>,
    // },
    // {
    //     title : "Organize Meeting",
    //     href : "/organize_meeting",
    //     icon : <MeetingRoomIcon/>,
    // },
]