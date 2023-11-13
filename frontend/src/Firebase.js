// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,browserLocalPersistence,indexedDBLocalPersistence} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeFNcHbrDNdB7fBdTu_YYWgCLJmkqATCI",
  authDomain: "freelancer-117e7.firebaseapp.com",
  projectId: "freelancer-117e7",
  storageBucket: "freelancer-117e7.appspot.com",
  messagingSenderId: "1006040888065",
  appId: "1:1006040888065:web:0e9b4a9c3089ef336ee100",
  measurementId: "G-4JL0M6WNVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage= getStorage(app);
