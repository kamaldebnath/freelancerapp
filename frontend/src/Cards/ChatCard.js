import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

function ChatCard({ sender, date, message }) {
  const backend_url='https://freelancerapp-wdtf.onrender.com';

  const [sender_data, set_sender_data] = useState({});
  const[user,loading]=useAuthState(auth);

  useEffect(() => {
    axios.get(`${backend_url}/userdata/${sender}`).then((e) => {
      set_sender_data(e.data);
    })
  }, [])

  return (
    <div className={`border rounded-lg w-[30vh] h-fit p-2 flex flex-col space-y-2 ${user.uid === sender ? 'bg-lime-300' : 'bg-gray-200'}`}>
      <div className='flex justify-start space-x-2'>
        <div>
              <img className='rounded-full w-[3vh]' src={sender_data.picture}></img>
        </div>
        <div className='flex justify-center items-center'>
              <p className='font-semibold text-sm'>{sender_data.name}</p>
        </div>

      </div>

      <div className='break-words'>
        <p>{message}</p>
      </div>

    </div>
  )
}

export default ChatCard