import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';

import GoogleIcon from '@mui/icons-material/Google';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Join() {
  const [user, loading] = useAuthState(auth);
  const navigate=useNavigate();

  async function google_login() {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      localStorage.setItem('token',result.user.accessToken);
      axios.post(`http://localhost:5000/user_update/${result.user.accessToken}`,{
        'name': result.user.displayName,
        'picture': result.user.photoURL,
        'email': result.user.email,
        'email_verified': result.user.emailVerified,
        'uid': result.user.uid,
        'about':''
      }).then((e)=>{console.log(e)});

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    if(user){
      navigate('/');
    }
  })

  return (
    <div className='bg-green-200 h-screen flex justify-center items-center'>
      {!user && (
        <div>
          <button className='flex space-x-2 bg-white p-3 rounded-full' onClick={google_login}>
            <div>
              <GoogleIcon />
            </div>
            <div>
              join
            </div>

          </button>
        </div>
      )}

    </div>
  )
}
