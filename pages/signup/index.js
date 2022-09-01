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
import Carousel from 'react-bootstrap/Carousel';
import juzo from './juzo.jpg';
import uta from './uta.jpg'
import dead from './dead.gif';


function Index() {
    const router = useRouter();
    const [email, setemail] = useState('');
    const [password,setpassword] = useState('');
    const [error, seterror] = useState('');
    const [loading , setloading] = useState(false);
    const {signup , user , signinwithgoogle} = useContext(AuthContext);
    const [name, setname] = useState('');
    const [file , setfile ] = useState(null);

    const signingoogle = async()=>{
      try{
        setloading(true);
        seterror('')
        let res = await signinwithgoogle();
      
        let obj = {
          name : res.user.displayName ,
          email : res.user.email,
          uid : res.user.uid,
          photoURL : res.user.photoURL,
          posts : [],
  
        }
        await setDoc(doc(db, "users",res.user.uid), obj);
        console.log("doc added");
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
    <>
    <div style ={{backgroundColor : "red"}}>
      <div className='blackbox'>
        <div className='caro'>
        <video muted autoPlay loop="infinite" style ={{height : "100%" , width: "100%"}}>
       <source src="/trailer.mp4" type="video/mp4"/>
       </video>
     
    </div> 
      </div>
    <div className='signup-container'>

      <div className='card-cont'>
    <div className ='signup-card'>
        
        <div className='otaku' > <div className='otaku-logo'><Image src = "/finallogo.jpg" layout = "fill"></Image></div></div>
    <Button  color = "warning" variant="contained" fullWidth  style ={{marginTop : "0.5rem", textTransform : "none", fontFamily: 'monospace'}} onClick={signingoogle} disabled = {loading} size = "small" margin="dense">Sign up with google</Button>
       
        <div className='textarea'>
    <TextField color = "warning" inputProps ={{style : {fontSize : 10}}} InputLabelProps ={{style : {fontSize : 10, fontFamily : 'monospace '}}} sx= {{outline : "none", textTransform : "none"}} id="outlined-basic" label="email" variant="outlined" size='small' fullWidth margin='dense' value = {email} onChange = {(e)=>{setemail(e.target.value)}} />
    <TextField color = "warning" inputProps ={{style : {fontSize : 10}}} InputLabelProps ={{style : {fontSize : 10, fontFamily : 'monospace '}}} id="outlined-basic" label="password" variant="outlined" size='small' fullWidth margin='dense' value = {password} onChange = {(e)=>{setpassword(e.target.value)}}/>
    <TextField color = "warning" inputProps ={{style : {fontSize : 10}}} InputLabelProps ={{style : {fontSize : 10, fontFamily : 'monospace '}}} id="outlined-basic" label="full name" variant="outlined" size='small' fullWidth margin='dense' value = {name} onChange = {(e)=>{setname(e.target.value)}}/>
    <Button color = "warning" variant="outlined" fullWidth component="label" style ={{marginTop : "0.5rem", textTransform : "none", fontFamily: 'monospace'}} size ="small"><input style ={{display : "none"}} type="file" accept="image/*" onChange={(e)=>{setfile(e.target.files[0])}} ></input>Profile Image</Button>
    
    </div>
    <Button color = "warning" style = {{ fontFamily: 'monospace', outline : "none", textTransform : "none",marginTop : '0.5rem'}} variant="contained" fullWidth   onClick={handleclick} disabled = {loading} size = "small" margin="dense">Sign Up</Button>

    </div>
    <div className='bottom-card' style ={{width : "18rem" , fontSize : 10 , fontFamily : "monospace"}}>
     Already Have an Account? <Link href = "/login"><span style={{color:'red'}}>Login</span></Link>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Index