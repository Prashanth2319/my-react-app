import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import "../styles/dashboard.css";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../providers/authprovider'; 
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Button from '@mui/material/Button';
import store from '../redux/store';
import { fetchStudents } from '../redux/counterSlice';

store.dispatch(fetchStudents());

const pages = [{title:'Employee',url:"/dashboard/employee"}, {title:'Student',url:"/dashboard/student"}, {title:'Redux',url:"/dashboard/counter-reducer"}];

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () =>{
        logout();
        navigate("/")
    }

    const handleRedirectToAnotherPage = (url) =>{
        navigate(url)
    }


    
    return (
        <>


      <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            React App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,index) => (
              <Button
                key={index}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={()=>{handleRedirectToAnotherPage(page.url)}}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                 onClick={handleLogout}
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
              {/* <Menu
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu> */}
            </div>
        </Toolbar>
        </Container>
      </AppBar>
{/* 

         <Box sx={{ flexGrow: 2 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    React App
                </Typography>
                <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                </Menu>
              </div>
                </Toolbar>
               
            </AppBar>
        </Box> */}
        <div className='App container outlet-css'>
            <Outlet />
        </div>
    </>
    )
}

export default Dashboard;
