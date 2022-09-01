import React, { useContext, useEffect ,useState} from 'react'
import { Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import { AuthContext } from '../context/auth';
import { async } from '@firebase/util';
import { addDoc, arrayRemove, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextField from '@mui/material/TextField';
import Comments from './Comments';
function Post({postData, userData}) {
 const {user} = useContext(AuthContext); 
 const [like, setlike ] = useState(false);
 const [comment, setcomment] = useState(false);
 const [open, setOpen] = useState(false);
 const [text  , settext] = useState('');
 const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
   setcomment(false);
 };
 const handlelike = async()=>{
    if(like){
       await updateDoc(doc(db, "posts", postData.postId), {
        likes : arrayRemove(user.uid)
       })
    }
    else{
        await updateDoc(doc(db, "posts", postData.postId), {
            likes : arrayUnion(user.uid)
           })
    }
 }

 const handlecomment = async()=>{
    let obj = {
        text : text,
        uProfileURL :  userData.photoURL,
        uPorfileName : userData.name
    }
    console.log(obj);
   const docref =  await addDoc(collection(db , "comments"),obj);
   const commentref = doc(db,"posts",postData.postId);
   await updateDoc(commentref, {
    comments : [...postData.comments, docref.id]
   })
   console.log('doc_updated');
   settext('');
    
 }

 
  return (
    <div>
            <div className = 'post-cont'>

            {
             postData.type === "video" ?     <video src ={postData.postURL} controls  muted="muted"></video> : <></>
            }
            {
                postData.type === "image" ? <img src={postData.postURL} alt ="kavascg" width= "100%"  />:<></>
            }
            {
                postData.type === "audio" ? <audio src ={postData.postURL} autoPlay = {true} />: <></>
            }
    
       
        <div className='info-cont'>
            <div className='avatar-cont'>
            <Avatar alt="kavascg" src= {postData.profileURL} style ={{height : "2rem", width : "2rem"}} />
            <div>{postData.profileName}</div>
            </div>
            <div className='like-cont'>
            <FavoriteIcon style ={like ? {color : "black"} : {color : "white"}} onClick = {handlelike}></FavoriteIcon>
            <div className='count'>{postData.likes.length > 0  && postData.likes.length}</div>
            </div>
      
        </div>
        <div className = "divider" style ={{color : 'white'}}><hr></hr></div>
        <div className = 'comment-cont' onClick={()=>{setcomment(!comment)}}>
            {
                comment ? <ChatBubbleOutlinedIcon ></ChatBubbleOutlinedIcon>:<ChatBubbleOutlineOutlinedIcon onClick={handleClickOpen}></ChatBubbleOutlineOutlinedIcon>
            } </div>
    </div>

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth ={true}
        maxWidth = 'md'
     >
       
        <div className = 'mondal'>
            <div className='vi-cont'>
            <div className='vi'>
            {
             postData.type === "video" ?     <video src ={postData.postURL} controls  autoPlay={true} loop></video> : <></>
            }
            {
                postData.type === "image" ? <img src={postData.postURL} alt ="kavascg" width= "100%"  />:<></>
            }
            {
                postData.type === "audio" ? <audio src ={postData.postURL} autoPlay = {true} />: <></>
            }
            </div>
           
            </div>
            <div className = 'comm-cont'>
    <Card variant='outlined' className = 'card1'>
        <Comments postData={postData}></Comments>    
    </Card>
    <Card variant='outlined' className = 'card2'>
    <div className='like-con'>
        {like ? <FavoriteIcon onClick = {handlelike} style={{color : "red"}}></FavoriteIcon> : <FavoriteBorderIcon onClick = {handlelike}></FavoriteBorderIcon>}
            </div>
      <Typography>{postData.likes.length === 0 ?  '': postData.likes.length === 1 ? <div>Liked by 1 user</div>:  <div>Liked by {postData.likes.length} users</div> }</Typography>
    <div className='comment-bar'>
    <TextField id="outlined-basic" color='warning' size ='small' sx = {{width : '80%'}}label="Comment" variant="outlined" margin='dense' value ={text} onChange={(e)=>{settext(e.target.value)}}/>
    <Button onClick = {handlecomment} variant="text"  style ={{ maxHeight : "10rem" ,maxWidth: "20%" }}>Post</Button>
    </div>
    </Card>
         
            </div>
        </div>
      </Dialog>

    </div>
  )
}

export default Post