import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditDashboard({user,uid,about}) {

    const backend_url='https://freelancerapp-wdtf.onrender.com';

    const [newAbout, setNewAbout] = useState();
    async function updateUserData(e) {
        e.preventDefault();
        await axios.patch(`${backend_url}/update_userdata/${user.accessToken}/${uid.id}`,{
            'about':newAbout
        }).then((e) => {
            console.log(e.data);
            window.location.reload();
        })
    }
    return (
        <div>
            <form onSubmit={updateUserData}>
                <textarea className='min-w-full p-2 min-h-[40vh] max-h-[40vh] max-w-full outline-none border' value={newAbout} defaultValue={about} onChange={(e) => setNewAbout(e.target.value)}></textarea>
                <button className='text-white bg-black font-semibold p-2 rounded-lg'>Save</button>
            </form>
        </div>
    )
}

export default EditDashboard