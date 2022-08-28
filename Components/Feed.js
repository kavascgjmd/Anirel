import React from 'react'
import Navbar from './Navbar'
import Upload from './Upload'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
function Feed() {
  return (
    <div className ='Feed-cont'>
   <Navbar></Navbar>
   <Upload></Upload>
   <div className='videos-cont'>
    <div className = 'post-cont'>
        <video></video>
        <video></video>
        <div className='info-cont'>
            <div className='avatar-cont'>
            <Avatar alt="kavascg" src="/static/images/avatar/2.jpg" style ={{height : "2rem", width : "2rem"}} />
            <div>Name</div>
            </div>
            <div className='like-cont'>
            <FavoriteIcon></FavoriteIcon>
            <div className='count'>10 </div>
            </div>

        </div>
    </div>
   </div>
    </div>
  )
}

export default Feed