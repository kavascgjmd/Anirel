import React, { useContext } from 'react'
import ProfileComp from '../Components/ProfileComp'
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'

function Profile() {
    const {user} = useContext(AuthContext);
    const Redirect = ()=>{
       const  router = useRouter();
        router.push('/login')
        return null;
    }
  return (
    <>
    {
        user ?.uid?  <div><ProfileComp></ProfileComp></div> : <Redirect/>
    }
    </>
   
  )
}

export default Profile