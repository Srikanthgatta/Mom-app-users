import React from 'react'
import { Drawer,Divider,List,ListItem,ListItemButton,ListItemIcon,ListItemText, IconButton } from '@mui/material';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { routes } from './RoutElements';
import logo from '../images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { authenticateSelector, fetchUserProfile } from '../api/authSlice';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function DrawerNav({handleDrawerClose,open}) {
  const theme = useTheme();
  const dispatch = useDispatch()
  const { user, userToken } = useSelector(authenticateSelector)

  React.useEffect(()=>{
    dispatch(fetchUserProfile(userToken))
  },[])

  return (
    <div>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        onClose={handleDrawerClose}
        open={open}
      >
        <DrawerHeader className=''>
          <img src={logo} alt="logo" className=" w-[70%] mr-[14%]  " />
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {
                routes?.map((item,i)=>{
                    return(
                        <Link to={item?.href} key={i} onClick={handleDrawerClose}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item?.icon}
                </ListItemIcon>
                <ListItemText primary={item?.title} />
              </ListItemButton>
            </ListItem>
          </Link>
                    )
                })
            }
             {
            user?.role == 'Meeting Organizer' ? 
            <Link to={'/organize_meeting'} onClick={handleDrawerClose} >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MeetingRoomIcon/>
                </ListItemIcon>
                <ListItemText primary='Organize Meeting' />
              </ListItemButton>
            </ListItem>
          </Link> : <></>
          }
          <ListItem disablePadding >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export default DrawerNav