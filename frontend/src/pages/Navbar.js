import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  const backend_url='https://freelancerapp-wdtf.onrender.com';
  
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  function logout() {
    try {
      signOut(auth).then(() => {
        console.log("Signed out");
        localStorage.removeItem('token');
        navigate('/');
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='h-20 bg-gray-100 flex justify-around items-center p-4 border'>

      <div className='text-2xl transition duration-500 hover:scale-105'>
        <a href='/'>Freelancer</a>
      </div>

      {!user && (
        <div>
          <Link to={'/join'} className='bg-green-400 px-3 py-1' href='/join' >JOIN</Link>
        </div>
      )}

      {user && (
        <div className='flex items-center space-x-9'>
          <div className='scale-150'>
            <Link to={`/u/${user.uid}`}><img className='w-[4vh] rounded-full' src={user.photoURL}></img></Link>
          </div>
          <button className='bg-green-400 p-2 hidden md:flex' onClick={logout}>log out</button>
        </div>
      )}


    </div>
  )
}
