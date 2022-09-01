import React, { useState } from 'react'
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import {v4 as uuidv4} from 'uuid';
import { arrayUnion, doc, serverTimestamp, setDoc , updateDoc } from 'firebase/firestore';
import { db , storage} from '../Firebase';
import { ref ,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import Counter from './Counter';
function Upload({userData}) {
    const [loading , setloading] = useState(false);
    const [error, seterror] = useState('');
    const [progress, setprogress] = useState(0);
    const handlechange =  (e)=>{
     const file = e.target.files[0];
     if(file == null){
        seterror("please select a file ");
        setTimeout(()=>{
          seterror('');
        }, 2000)
        return;
     }
     if((file.size /( 1024 * 1024 )) > 50){
        seterror(" Please select a small file ")
        setTimeout(()=>{
           seterror('');
        }, 2000)
        return;
     }
     let uid = uuidv4();
     setloading(true);
     let type = file.type.slice(0,5);
     console.log(type);
     const storageRef = ref(storage, `${userData.uid}/Posts/${uid}`);
     const uploadTask = uploadBytesResumable(storageRef, file);
     uploadTask.on('state_changed', 
       (snapshot) => {
         const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         setprogress(prog);
         console.log('Upload is ' + prog + '% done');
       }, 
       (error) => {
         console.log(error);
         seterror(error.message);
         setTimeout(()=>{
            seterror('');
         }, 2000)
         return;
       }, 
       () => {
        setloading (false);
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
           console.log('File available at', downloadURL);
           let obj = {
             comments : [],
             likes : [],
             postId : uid,
             postURL : downloadURL,
             profileName : userData.name,
             profileURL :userData.photoURL,
             uid : userData.uid,
             timestamp : serverTimestamp(),
             type : type,
             
     
           }
           console.log(obj);
           await setDoc(doc(db, "posts", uid),obj);
           console.log('post_added');
           await updateDoc(doc(db, "users", userData.uid),
           {
            posts : arrayUnion(uid)
           })
           console.log("doc added");
           setprogress(0);
         });
       }
     );
     

    }
  return (
    <div>
        {
        error != ''  ? 
        <Alert severity="error">This is an error alert — check it out!</Alert>
        :
         <Button className = 'butt' color = "warning" variant="contained" onChange={handlechange}  component="label" startIcon = {<MovieIcon/>} style ={{marginTop : "0.5rem", position : 'absolute', right : "0.5rem"}}><input style ={{display : "none"}} type="file" accept="audio/*,video/*,image/*" ></input>upload</Button>

        }
   {
    loading && <> <LinearProgress variant="determinate" value={progress} /></>
   } 
</div>
    
  )
}

export default Upload