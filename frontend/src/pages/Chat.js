import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ChatCard from '../Cards/ChatCard';
import Navbar from './Navbar';
import SendIcon from '@mui/icons-material/Send';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

export default function Chat() {

    const backend_url='https://freelancerapp-wdtf.onrender.com';
    
    const orderid = useParams();
    const [user,loading]=useAuthState(auth);
    const [msg, setmsg] = useState();
    const [allmessages, setallmessages] = useState();

    function handleChat(e) {
        e.preventDefault();
        axios.post(`${backend_url}/chat/${user.accessToken}`, {
            "orderid": orderid.order_id,
            "date": Date.now(),
            "message": msg
        }).then((e) => {
            console.log(e.data);
        })
        setmsg('');
    }

    function getchatdata(e) {
        axios.get(`${backend_url}/chatdata/${user.accessToken}/${orderid.order_id}`).then((e) => {
            setallmessages(e.data);
        })
    }

    useEffect(() => {
        getchatdata();
    })

    return (
        <div className='h-screen w-screen'>
            <div>
                <Navbar/>
            </div>

            <div className='h-[80vh] overflow-y-scroll scroll-smooth p-2 flex flex-col items-center space-y-4'>
                {
                    allmessages && (
                        allmessages.map((items) => (
                            <ChatCard
                                sender={items.sender}
                                date={items.date}
                                message={items.message}
                            />
                        ))
                    )
                }
            </div>

            <div className='h-[10vh] flex justify-center items-center'>
                <form className='flex justify-center items-center space-x-4 p-4' onSubmit={handleChat}>
                    <input className='p-2 outline-none border border-black rounded-lg' value={msg} onChange={(e) => { setmsg(e.target.value) }} type='text' placeholder='Enter message'></input>
                    <button><SendIcon/></button>
                </form>
            </div>
        </div>
    )
}
