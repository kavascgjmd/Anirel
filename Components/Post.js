import React, { useContext, useEffect ,useState} from 'react'
import { Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import { AuthContext } from '../context/auth';
import { async } from '@firebase/util';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
function Post({postData, userData}) {
 const {user} = useContext(AuthContext); 
 const [like, setlike ] = useState(false);
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
 useEffect(()=>{
    if(postData.likes.includes(user.uid)){
        setlike(true);
    }
    else {
        setlike(false);
    }
 },[postData])
  return (
    <div>
            <div className = 'post-cont'>

            {
             postData.type === "video" ?     <video src ={postData.postURL}  loop = 'infinte'></video> : <></>
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
            <div>Name</div>
            </div>
            <div className='like-cont'>
            <FavoriteIcon style ={like ? {color : "red"} : {color : "white"}} onClick = {handlelike}></FavoriteIcon>
            <div className='count'>{postData.likes.length > 0  && postData.likes.length}</div>
            </div>

        </div>
    </div>
    </div>
  )
}

export default Post