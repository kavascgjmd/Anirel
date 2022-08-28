import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Upload from './Upload'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../context/auth';
import { doc, onSnapshot, query, collection ,orderBy} from 'firebase/firestore';
import { db } from '../Firebase';
import Post from './Post';
function Feed() {
    const {user}  = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [posts , setPosts] = useState([]);
   useEffect(()=>{
    console.log(user.uid);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc)=>{
        console.log(doc.data());
        setUserData(doc.data());
    })
    return ()=>{
        unsub();
    }
   } , [user])


   useEffect(()=>{
    const unsub = onSnapshot(query(collection (db , 'posts'),orderBy("timestamp", "desc")),
    (snapshot) =>{
        let tempArray = [];
        snapshot.docs.map((doc)=>{
           tempArray.push(doc.data())
        })
        setPosts([...tempArray])
        console.log(tempArray);
    })
    return ()=>{
        unsub();
    }
   }, [])
  return (
    <div className ='Feed-cont'>
   <Navbar userData = {userData}></Navbar>
   <Upload userData = {userData}></Upload>
   <div className='videos-cont'>
    {
        posts.map((post)=>{
          
            return <Post postData = {post} userData = {userData}/>
        })
    }
   </div>
    </div>
  )
}

export default Feed