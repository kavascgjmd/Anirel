import React,{useEffect, useState} from 'react'
import { auth } from '../Firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
export const  AuthContext = React.createContext();
function AuthWrapper({children}) {
    const [user , setuser] = useState('');
    const [loading , setloading] = useState(true);

    useEffect(()=>{
      onAuthStateChanged(auth , (user)=>{
        if(user){
      setuser(user);
     }
    else {
        setuser('');
    } })
      setloading(false);
    },[])
  function login(email, password){
   return  signInWithEmailAndPassword(auth, email, password);
  }
  function signup(email , password){
 return createUserWithEmailAndPassword(auth, email, password);
  }
  function logout(){
    return signOut(auth);
     }
  function forgot(email){
    return sendPasswordResetEmail(email)
  }
  function signinwithgoogle(){
    const  provider = new GoogleAuthProvider();
    return signInWithPopup(auth , provider);
  }
 
   const store = {
    user, 
    login ,
    signup,
    logout,
    forgot ,
    signinwithgoogle
    
   }
   
  return (
   <AuthContext.Provider value = {store}> 
    {!loading && children}
   </AuthContext.Provider>
 
  )
}

export default AuthWrapper