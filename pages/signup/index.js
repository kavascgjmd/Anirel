import React,{useState, useContext, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { requirePropFactory } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'next/image';
import imag from './otaku.jpg';
import Link  from 'next/link';
import {useRouter} from 'next/router';
import { AuthContext } from '../../context/auth';
import { storage } from '../../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { async } from '@firebase/util';
function Index() {
    const router = useRouter();
    const [email, setemail] = useState('');
    const [password,setpassword] = useState('');
    const [error, seterror] = useState('');
    const [loading , setloading] = useState(false);
    const {signup , user} = useContext(AuthContext);
    const [name, setname] = useState('');
    const [file , setfile ] = useState(null);
        useEffect(()=>{
  
        if(user){
          router.push('/');
        }
    
      })

      const handleclick = async ()=>{
        try{
          setloading(true);
          seterror('');
         const user =  await signup (email, password);
          console.log("signedup");
          const storageRef = ref(storage, `${user.user.uid}/Profile`);

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
   getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
      let obj = {
        name : name ,
        email : email,
        uid : user.user.uid,
        photoURL : downloadURL,
        posts : [],

      }
      await setDoc(doc(db, "users", user.user.uid), obj);
      console.log("doc added");
    });
  }
);

        }
        catch(err){
          console.log(err);
          seterror(err);
          setTimeout(()=>{
          seterror('');
          }, 2000
          )
        }
          setloading(false);
          }
  return (
    <div className='signup-container'>
    <div className ='signup-card'>
        
        <div className='otaku' > <div className='otaku-logo'><Image  src={imag} alt=""></Image></div></div>
        <div className='textarea'>
    <TextField id="outlined-basic" label="email" variant="outlined" size='small' fullWidth margin='dense' value = {email} onChange = {(e)=>{setemail(e.target.value)}}/>
    <TextField id="outlined-basic" label="password" variant="outlined" size='small' fullWidth margin='dense' value = {password} onChange = {(e)=>{setpassword(e.target.value)}}/>
    <TextField id="outlined-basic" label="full name" variant="outlined" size='small' fullWidth margin='dense' value = {name} onChange = {(e)=>{setname(e.target.value)}}/>
    <Button variant="outlined" fullWidth component="label" style ={{marginTop : "0.5rem"}}><input style ={{display : "none"}} type="file" accept="image/*" onChange={(e)=>{setfile(e.target.files[0])}}></input>upload</Button>
    <Button variant="contained" fullWidth  style ={{marginTop : "0.5rem"}} onClick={handleclick} disabled = {loading}>Sign Up</Button>
    
    </div>
    </div>
    <div className='bottom-card'>
     Already Have an Account? <Link href = "/login"><span style={{color:'blue'}}>Login</span></Link>
    </div>
    </div>
  )
}

export default Index