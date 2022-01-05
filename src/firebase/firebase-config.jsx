import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAMyfY_XeJG-NKWv2x3XE9oAVnivt1j5l0",
    authDomain: "react-app-cursos-e6c04.firebaseapp.com",
    projectId: "react-app-cursos-e6c04",
    storageBucket: "react-app-cursos-e6c04.appspot.com",
    messagingSenderId: "741573313985",
    appId: "1:741573313985:web:cdcfdde64c3000dcc71b40",
    measurementId: "G-F0F8BX2Z3Z"
  };

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}