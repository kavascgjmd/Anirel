import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Upload from './Upload'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../context/auth';
import { doc, onSnapshot, query, collection ,orderBy} from 'firebase/firestore';
import { db } from '../Firebase';
import Counter from './Counter';
import Post from './Post';
function Feed() {
    const {user}  = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [posts , setPosts] = useState([]);
   useEffect(()=>{
    
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc)=>{
  
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
        
    })
    return ()=>{
        unsub();
    }
   }, [])

   const callback = (entries) =>{
    entries.forEach((entry)=>{
       
        
        let ele = entry.target.childNodes[0];
        if(ele){
        let elem = ele.querySelector('video');
        if(elem){
        
            elem.play().then(()=>{
                if(!elem.paused && !entry.isIntersecting){
                    elem.pause();
                }
            })
        }
    }})
   }
   useEffect(()=>{
     const elements = document.querySelectorAll('.videos-cont>*');
     elements.forEach((element)=>{
    
        observer.observe(element)
     })
     return ()=>{
        observer.disconnect();
     }
   },[posts])
   let observer = new IntersectionObserver(callback, {threshold : 0.6});
  return (
    <div className ='Feed-cont'>
   <Navbar userData = {userData}></Navbar>
   <Upload userData = {userData}></Upload>
  
   <div className='videos-cont'>
    {
        posts.map((post , i )=>{
          
            return <Post key={i} postData = {post} userData = {userData}/>
        })
    }
   </div>
    </div>
  )
}

export default Feed