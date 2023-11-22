import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';

import GoogleIcon from '@mui/icons-material/Google';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Join() {

  const backend_url = 'https://freelancerapp-wdtf.onrender.com';

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function google_login() {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      localStorage.setItem('token', result.user.accessToken);
      axios.post(`${backend_url}/user_update/${result.user.accessToken}`, {
        'name': result.user.displayName,
        'picture': result.user.photoURL,
        'email': result.user.email,
        'email_verified': result.user.emailVerified,
        'uid': result.user.uid,
        'about': '',
        'age': '',
        'gender': '',
        'github': '',
        'linkedin': ''
      }).then((e) => { console.log(e) });

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (user) {
      navigate('/');
    }
  })

  return (
    <div className='h-screen flex justify-center items-center bg-lime-50 font-display'>
      {!user && (
        <div className='w-[35vh] h-[40vh] flex flex-col gap-y-20 justify-center p-2 items-center bg-lime-300 rounded-xl border-4 border-black'>

          <div className='text-3xl font-semibold underline'>
            <span> Join Today</span>
          </div>

          <button className='flex justify-around space-x-2 w-[30vh] p-3 rounded-full border-2 border-black bg-white' onClick={google_login}>
            <div>
              <GoogleIcon />
            </div>
            <div className='font-semibold'>
              Sign in with Google
            </div>
          </button>

        </div>
      )}

    </div>
  )
}
