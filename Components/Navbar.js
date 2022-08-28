import * as React  from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../context/auth';

import Image from 'next/image';
import otaku from './otaku.jpg'

import { Router, useRouter } from 'next/router';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {logout} = useContext(AuthContext);
  const router = useRouter()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handlelogout = async()=> {
    await logout();
    router.push('/login');
    handleCloseNavMenu();


  }
  return (
    <AppBar position="static" >
      <Container maxWidth="xl" sx = {{backgroundColor  : "black"}}>
        <Toolbar disableGutters sx ={{display : "flex", justifyContent: "space-between" }}>
         
             <Image src = {otaku} sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} height = "60px" width = "60px" alt=""/>
         
      

          <Box sx={{ flexGrow: 0 }} className  = 'navbar-cont '>
          <HomeIcon fontSize = "large" className = "nav-icons"></HomeIcon>
            <ExploreIcon fontSize = "large" className = "nav-icons"></ExploreIcon>
             
             <Tooltip title="Open settings">
            
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="kavascg" src="/static/images/avatar/2.jpg" style ={{height : "2rem", width : "2rem"}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem  onClick={handlelogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
