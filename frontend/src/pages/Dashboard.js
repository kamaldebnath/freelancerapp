import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Navbar from './Navbar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import GigCard from './GigCard';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EditDashboard from '../Cards/EditDashboard';

export default function Dashboard() {

    const backend_url = 'https://freelancerapp-wdtf.onrender.com';

    const uid = useParams();
    const [user, loading] = useAuthState(auth);
    const [displayName, setdisplayName] = useState();
    const [email, setEmail] = useState();
    const [img, setimg] = useState();
    const [about, setAbout] = useState();
    const [mygigs, setmygigs] = useState('');
    const [showUpdate, setShowUpdate] = useState(false);

    function getdata() {
        axios.get(`${backend_url}/userdata/${uid.id}`).then((userdata) => {
            setEmail(userdata.data.email);
            setdisplayName(userdata.data.name);
            setimg(userdata.data.picture);
            setAbout(userdata.data.about);
        })

        axios.get(`${backend_url}/mygigs/${uid.id}`).then((mygigsdata) => {
            setmygigs(mygigsdata.data);
        })
    }

    useEffect(() => {
        getdata();
    }, [])

    return (
        <div>
            <Navbar />

            <div className='flex flex-col justify-center items-center gap-4 my-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 w-2/3 gap-2'>
                    <div className='flex flex-col justify-center items-center p-9 space-y-4 border shadow'>
                        <div>
                            <img className='rounded-full' src={img}></img>
                        </div>
                        <div>
                            <p className='text-xl'>{displayName}</p>
                        </div>
                        {
                            user && (
                                <div className={`${user.uid === uid.id ? '' : 'hidden'}`}>
                                    <div className='flex justify-center items-center'>
                                        <button onClick={() => setShowUpdate(true)} className='font-semibold'><span className='flex justify-center items-center'><EditIcon /> Edit bio</span></button>
                                    </div>
                                </div>
                            )
                        }


                    </div>

                    <div className='border shadow'>
                        <div className='p-4'>
                            {about}
                        </div>

                        <div className={`${showUpdate ? '' : 'hidden'} flex flex-col gap-y-3 p-2`}>
                            <div>
                                <EditDashboard
                                    user={user}
                                    uid={uid}
                                    about={about}
                                />
                            </div>

                            <div>
                                <button className='font-semibold border rounded-lg p-2' onClick={() => setShowUpdate(false)}>Cancel</button>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='flex gap-5'>
                    <div className='bg-black text-white p-2 rounded-lg font-semibold'>
                        <Link to={'/orders'}>myorders</Link>
                    </div>
                    <div className='bg-black text-white p-2 rounded-lg font-semibold'>
                        <Link to={'/ordersreceived'}>orders received</Link>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {mygigs && (
                        mygigs.map((items) =>
                        (
                            <GigCard
                                gigid={items._id}
                                seller_uid={items.seller_uid}
                                title={items.title}
                                description={items.description}
                                deadline={items.deadline}
                                price={items.price}
                                thumbnail={items.thumbnail}
                            />)
                        )
                    )}

                    <div className='p-4'>
                        <Link to={'/creategig'}>
                            <div className='w-[30vh] h-[35vh] border rounded-lg flex flex-col justify-center items-center space-y-4'>
                                <div className=''>
                                    <AddIcon className='scale-150' />
                                </div>
                                <div>
                                    <span className='font-semibold'>Create a new gig</span>
                                </div>
                            </div>
                        </Link>
                    </div>


                </div>




            </div>
        </div >
    )
}