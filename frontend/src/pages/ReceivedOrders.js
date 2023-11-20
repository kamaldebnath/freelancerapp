import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import OrderCardSellerSide from '../Cards/OrderCardSellerSide';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';


export default function ReceivedOrders() {
    const backend_url = 'https://freelancerapp-wdtf.onrender.com';

    const [receivedorders, setreceivedorders] = useState();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        try {
            axios.get(`${backend_url}/receivedorders/${user.accessToken}`).then((e) => {
                setreceivedorders(e.data);
            })
        } catch (error) {
            console.log(error);
        }
        
    })

    return (
        <div>
            <Navbar />

            <div className='bg-slate-100 flex justify-around items-center h-[10vh]'>
                <span className='text-4xl text-gray-600'>My orders</span>
                <div>

                </div>
            </div>

            <div className='flex flex-col items-center space-y-5 py-4'>
                {receivedorders && (
                    receivedorders.map((items) =>
                    (
                        <OrderCardSellerSide
                            order_id={items._id}
                            gigid={items.gigid}
                            date={items.date}
                            description={items.description}
                            buyer={items.buyer}
                        />
                    )
                    )
                )}
            </div>
        </div>
    )
}
