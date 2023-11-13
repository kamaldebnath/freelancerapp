import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OrderCard from '../Cards/OrderCard';
import Navbar from './Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

export default function MyOrders() {

    const[user,loading]=useAuthState(auth);
    const [myorders, setmyorders] = useState();

    useEffect(() => {
        axios.get(`http://localhost:5000/myorders/${user.accessToken}`).then((e) => {
            setmyorders(e.data);
        })
    })

    return (
        <div>
            <Navbar/>
            <div className='bg-slate-100 flex justify-around items-center h-[10vh]'>
                <span className='text-4xl text-gray-600'>My orders</span>
                <div>
                    
                </div>
            </div>

            <div className='md:flex flex-col items-center space-y-5 py-4 hidden'>
                {myorders && (
                    myorders.map((items) =>
                    (
                        <OrderCard
                            order_id={items._id}
                            gigid={items.gigid}
                            date={items.date}
                            description={items.description}
                            seller={items.seller}
                        />
                    )
                    )
                )}
            </div>
        </div>
    )
}
