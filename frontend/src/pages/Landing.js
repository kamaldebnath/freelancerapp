import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { auth } from '../Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import axios from 'axios'
import AllGig from './AllGig'

export default function Landing() {
    
    useEffect(() => {

    })

    return (
        <div>
            <Navbar />


            <div className={'z-0'}>
                <AllGig/>
            </div>
        </div>
    )
}
