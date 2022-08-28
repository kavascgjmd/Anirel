// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGkRenqYxzaID46K5btLT1IXfPkKSo6YM",
  authDomain: "anirel-a3392.firebaseapp.com",
  projectId: "anirel-a3392",
  storageBucket: "anirel-a3392.appspot.com",
  messagingSenderId: "1091718262650",
  appId: "1:1091718262650:web:72bd9c01ee0516eae470c3"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore();
export {auth , storage , db}
 export default app;
