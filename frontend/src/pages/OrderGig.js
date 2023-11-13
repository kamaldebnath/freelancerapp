import axios from 'axios';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { auth } from '../Firebase';

export default function ({ gigid, seller_uid }) {
    const backend_url='https://freelancerapp-wdtf.onrender.com';
    
    const [order_description, set_order_description] = useState();
    const navigate = useNavigate();
    const[user,loading]=useAuthState(auth);
    function createOrder(e) {
        e.preventDefault();
        axios.post(`${backend_url}/createOrder/${user.accessToken}`, {
            "gigid": gigid,
            "seller": seller_uid,
            "date": Date.now(),
            "description": order_description
        }).then((e) => { navigate('/orders') });
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <form className='flex flex-col space-y-5'>
                <div className='flex justify-center items-center'>
                    <textarea className='min-w-[35vh] p-2 min-h-[40vh] max-h-[40vh] max-w-[35vh] outline-none' value={order_description} onChange={(e) => { set_order_description(e.target.value) }} placeholder='What are you ordering'></textarea>
                </div>

                <div className='flex flex-col gap-y-4'>
                    <div className=''>
                        <span className='text-3xl'>Enter Payment Details</span>
                    </div>
                    <div className='bg-gray-300 p-4 rounded-lg'>
                        <label className='flex flex-col'>
                            <span>Full name</span>
                            <input className='p-2 outline-none' type='text' placeholder='name'></input>
                        </label>

                        <label className='flex flex-col'>
                            <span>Card Number</span>
                            <input className='p-2 outline-none' type='text' placeholder='card no'></input>
                        </label>

                        <label className='flex flex-col'>
                            <span>Expiration Date</span>
                            <input className='p-2 outline-none' type='text' placeholder='MM/YY'></input>
                        </label>

                        <label className='flex flex-col'>
                            <span>CVC</span>
                            <input className='p-2 outline-none' type='text' placeholder='cvc'></input>
                        </label>
                    </div>
                </div>

                <div className='flex justify-around items-center'>
                    <button onClick={()=>navigate(`/gigs/${gigid}`)} className='text-white bg-black p-2 rounded-lg'>Cancel</button>
                    <button onClick={createOrder} className='text-white bg-black p-2 rounded-lg'>Place Order</button>
                </div>


            </form>
        </div>
    )
}
