import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Drawer,Divider,List,ListItem,ListItemButton,ListItemIcon,ListItemText } from '@mui/material';
import { styled, useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { routes } from './RoutElements';
import logo from '../images/logo.png'
import DrawerNav from './DrawerNav';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateSelector, fetchUserProfile, logOut } from '../api/authSlice';
import { Link } from 'react-router-dom';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

export default function MenuAppBar({component}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch()
  const { user, userToken } = useSelector(authenticateSelector)

  React.useEffect(()=>{
    dispatch(fetchUserProfile(userToken))
  },[])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutHandel = () => {
    dispatch(logOut())
    handleClose()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <div className='md:hidden block'>
          <IconButton
          onClick={handleDrawerOpen}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          </div>
          <>
          <DrawerNav handleDrawerClose={handleDrawerClose} open={open} />
          </>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Photos */}
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem onClick={logoutHandel}  ><LogoutIcon/> &nbsp; Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <div className='flex'>
      <div className='md:block hidden'>
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
        open={true}
      >
        <DrawerHeader className=''>
          <img src={logo} alt="logo" className=" w-[70%] mr-[14%]  " />
          {/* <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List>
            {
                routes?.map((item,i)=>{
                    return(
                        <Link to={item?.href} key={i}>
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
            <Link to={'/organize_meeting'} >
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
          {/* <a to={"/dashboard"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>
          </a>
          <a to={"/approvals"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FingerprintIcon />
                </ListItemIcon>
                <ListItemText primary={"New Approvals"} />
              </ListItemButton>
            </ListItem>
          </a>
          <a to={"/individualUsers"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={"Individual Users"} />
              </ListItemButton>
            </ListItem>
          </a>
          <a to={"/broadcast"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BroadcastOnHomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Broadcast"} />
              </ListItemButton>
            </ListItem>
          </a> */}
        </List>
      </Drawer>
      <Box>
      </Box>
      </div>
      <div className='w-full'>
        {
          component
        }
      </div>
      </div>
    </Box>
  );
}
