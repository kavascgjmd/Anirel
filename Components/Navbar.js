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
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { AuthContext } from '../context/auth';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/finallogo.jpg'

import { Router, useRouter } from 'next/router';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Logout'];

const ResponsiveAppBar = ({userData}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {logout} = useContext(AuthContext);
  const router = useRouter()
  const [home , sethome ] = React.useState(false);
  const [explore , setexplore ] = React.useState(true);
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
  const handlehome = ()=>{
    sethome(true);
    setexplore (false);
    router.push('/');
  }
  const handleexplore =()=>{
    sethome (false);
    setexplore(true);
    router.push('/');
  }
  return (
    <AppBar position="static" >
      <Container maxWidth="xl" sx = {{backgroundColor  : "black"}}>
        <Toolbar disableGutters sx ={{display : "flex", justifyContent: "space-between" }}>
             <span  sx = {{width: "10rem" , display : "flex" , justifyContent : "center"}}>

             <Image src = {logo} sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} height = "60px" width = "60px" alt=""/>

             </span>
         
      

          <Box sx={{ flexGrow: 0 }} className  = 'navbar-cont '>

          { home ? <HomeIcon fontSize = "large" className = "nav-icons" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}></HomeIcon> :
          <HomeOutlinedIcon onClick ={handlehome} fontSize = "large" className = "nav-icons" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}></HomeOutlinedIcon>}
          {explore ? 
            <ExploreIcon fontSize = "large" className = "nav-icons" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}></ExploreIcon>
           :
           <ExploreOutlinedIcon onClick ={handleexplore} fontSize = "large" className = "nav-icons" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} ></ExploreOutlinedIcon>
           
          } 
            
             
             <Tooltip title="Open settings">
            
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="kavascg" src={userData?.photoURL} style ={{height : "2rem", width : "2rem"}} />
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
                   
                   <Link href ="/Profile">
                  <Typography textAlign="center" >Profile</Typography></Link>
                  
                
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
