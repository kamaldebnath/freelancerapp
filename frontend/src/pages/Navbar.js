import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Opacity } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {
    const backend_url = 'https://freelancerapp-wdtf.onrender.com';

    const [user, loading] = useAuthState(auth);
    const [showMenu, setMenu] = useState(false);
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

        <div className='h-15 bg-lime-50 flex justify-around items-center p-4 font-display'>

            <div className='text-2xl font-semibold transition duration-500 hover:scale-105'>
                <a href='/'>Freelancer</a>
            </div>

            {!user && (
                <div className='animate-bounce'>
                    <Link to={'/join'} className='border-2 rounded-full border-black px-3 py-1 font-semibold' href='/join'>JOIN</Link>
                </div>
            )}

            {user && (
                <div className='flex items-center space-x-9'>

                    <div className='scale-150  hidden md:flex'>

                        <a href={`/u/${user.uid}`}><img className='w-[4vh] rounded-full border-2 border-lime-400'
                            src={user.photoURL}></img></a>

                    </div>

                    <button className='bg-lime-400 px-3 py-2 border-2 border-black hidden md:flex font-semibold rounded-full' onClick={logout}>log out</button>

                    <div className='md:hidden'>
                        <li className='list-none'><button onClick={() => setMenu(!showMenu)}>{!showMenu ? <MoreVertIcon /> : <CloseIcon />}</button>

                            <motion.ul className={`bg-lime-100 fixed w-full right-0 z-10 p-2 ${showMenu ? '' : 'hidden'}`} onClick={() => setMenu(true)}
                                initial={{ opacity: 0, x: "-100%" }}
                                whileInView={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: "100%" }}
                                transition={{ delay: 0.1 }}
                            >
                                <li className=''><a href={`/u/${user.uid}`}>Profile</a></li>
                                <div className='flex flex-col'>
                                    <Link className='' to={'/orders'} >My \n Orders</Link>
                                    <Link className='' to={'/ordersreceived'}>Orders Received</Link>
                                </div>

                                <div className=''>
                                    <button className='' onClick={logout}>Log out</button>
                                </div>

                            </motion.ul>
                        </li>
                    </div>

                </div>
            )}

        </div>


    )
}
