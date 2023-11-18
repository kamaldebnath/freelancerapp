import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditDashboard({ user, uid, about, displayName }) {

    const backend_url = 'https://freelancerapp-wdtf.onrender.com';
    const navigate = useNavigate();
    const [newAbout, setNewAbout] = useState();
    const [newName, setNewName] = useState();

    async function updateUserData(e) {
        e.preventDefault();
        await axios.patch(`${backend_url}/update_userdata/${user.accessToken}/${uid.id}`, {
            'about': newAbout,
            'name': newName,
        }).then((e) => {
            console.log(e.data);
            window.location.reload();
        })
    }
    return (
        <div className=''>
            <form className='flex flex-col gap-y-4' onSubmit={updateUserData}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <label className='flex flex-col'>
                        <span className='font-semibold'>Display name</span>
                    </label>
                    <div className='col-span-2'>
                        <textarea className='resize-none p-2 w-[35vh]' defaultValue={displayName} value={newName} onChange={(e) => setNewName(e.target.value)}></textarea>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <label className='flex flex-col'>
                        <span className='font-semibold'>About me</span>
                    </label>
                    <div className='col-span-2'>
                        <textarea className='resize-none p-2 w-[35vh] h-[40vh]' value={newAbout} defaultValue={about} onChange={(e) => setNewAbout(e.target.value)}></textarea>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <label className='flex flex-col'>
                        <span className='font-semibold'>Github</span>
                        <span className='text-xs'>(profile link)</span>
                    </label>
                    <div className='col-span-2'>
                        <textarea className='resize-none p-2 w-[35vh]' defaultValue={displayName} value={newName} onChange={(e) => setNewName(e.target.value)}></textarea>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <label className='flex flex-col'>
                        <span className='font-semibold'>Linkedin</span>
                        <span className='text-xs'>(profile link)</span>
                    </label>
                    <div className='col-span-2'>
                        <textarea className='resize-none p-2 w-[35vh]' defaultValue={displayName} value={newName} onChange={(e) => setNewName(e.target.value)}></textarea>
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <button className='text-white bg-black font-semibold p-2 rounded-lg'>Save</button>
                </div>
            </form>

        </div>
    )
}

export default EditDashboard