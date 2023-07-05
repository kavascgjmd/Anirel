import React, {  useState, useContext ,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import { requirePropFactory } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'next/image';
import imag from './otaku.jpg';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import  Link  from 'next/link'
function Index() {
  const router = useRouter();
  const [email, setemail] = useState('');
  const [password,setpassword] = useState('');
  const [error, seterror] = useState('');
  const [loading , setloading] = useState(false);
  const {forgot , user} = useContext(AuthContext);
  const [over , setover] = useState(false);
  useEffect(()=>{
  
    if(user){
      router.push('/');
    }

  })
  const handleclick = async ()=>{
try{
  setloading(true);
  seterror('');
  await forgot  (email, password);
  console.log("Sent Email");
  router.push('/login') ;
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
    <div className='login-container'>
      <div className='dance' style ={{height : "20rem", width : "20rem" , position : "relative"}} onMouseEnter={()=>{setover(true)}} onMouseLeave = {()=>{setover(false)}}>
        {
          over ?   <Image src = "/zero2.gif" layout='fill' alt = ''></Image> :   <Image src = "/zero1.gif" layout='fill' alt = ''></Image>
        }
      
      </div>
    <div className ='forgot-login-card' style ={{height : "12 rem"}}>
        
        <div className='otaku' > <div className='error-logo'>
          {error != '' && <Image src = '/mob_phyco.gif' layout='fill' alt =''></Image> 
}
          </div></div>
        <div className='textarea'>
    <TextField id="outlined-basic" label="email" variant="outlined" size='small' fullWidth margin='dense' value ={email} onChange={(e)=>{setemail(e.target.value)}}/>
    { error != '' && 
      <div style={{color : "red"}}>{error.message} </div>}
    </div>
    <Button color = "warning" variant="contained" fullWidth  style ={{marginTop : "0.5rem"}} onClick = {handleclick} >Send Email</Button>

    </div>
    <div className='login-bottom-card'>
     Do not Have an Account?<Link href = "/signup"><span style={{color:'blue'}}>Sign Up</span>
     </Link> </div>
    </div>
  )
}

export default Index