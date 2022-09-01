import React,{useContext, useState, useEffect} from 'react'
import Navbar from './Navbar'
import Image from 'next/image'
import { AuthContext } from '../context/auth'
import otaku from './otaku.jpg'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../Firebase'
function ProfileComp() {
    const {user}  = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [posts , setPosts] = useState([]);
    const [postids, setpostids] = useState([]);
   useEffect(()=>{
    console.log(user.uid);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc)=>{
        console.log(doc.data());
        setUserData(doc.data());
        setpostids(doc.data().posts)
    })
    return ()=>{
        unsub();
    }
   } , [user])
   
 useEffect(()=>{
    let tempArray = [];
    console.log(postids);
    postids.map((postid, idx)=>{
        const unsub =  onSnapshot(doc(db, 'posts', postid), (doc)=>{
            tempArray.push(doc.data());
            console.log(tempArray);
            setPosts([...tempArray]);
        })
    })
 } , [postids])

  return (
    <div>
        <Navbar/>
        <div className='profile-post-cont'>
        <img src={userData?.photoURL} height="150px" width = '150px' alt=""/>
        <div className='maihu'>
        <div className = "nam">{userData?.name}</div>
        <div className='postshu'>Post : <span style={{fontWeight : "bold" , fontSize : "x-large"}}>{userData?.posts?.length}</span></div>
        </div>
       
        </div>
        
        <div  style ={{display : 'flex', flexWrap : "wrap", justifyContent: 'center', backgroundColor : 'white', gap: '3rem'}}>
     {
        posts.map((post)=>(
            <>
            {
                post.type === "video" ?     <video className='profile-haihum' src ={post.postURL} autoPlay ={true} loop = 'infinte'></video> : <></>
               }
               {
                   post.type === "image" ? <img className='profile-haihum' src={post.postURL} alt ="kavascg" width= "100%"  />:<></>
               }
               {
                   post.type === "audio" ? <audio className='profile-haihum' src ={post.postURL} autoPlay = {true} />: <></>
               }
               </>
         
        ))
     }
        </div>
    </div>
  )
}

export default ProfileComp