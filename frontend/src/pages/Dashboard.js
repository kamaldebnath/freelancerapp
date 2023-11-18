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
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Dashboard() {

    const backend_url = 'https://freelancerapp-wdtf.onrender.com';

    const uid = useParams();
    const [user, loading] = useAuthState(auth);
    const [displayName, setdisplayName] = useState();
    const [email, setEmail] = useState();
    const [img, setimg] = useState();
    const [about, setAbout] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [github, setGithub] = useState();
    const [linkedin, setLinkedin] = useState();

    const [mygigs, setmygigs] = useState('');
    const [showUpdate, setShowUpdate] = useState(false);

    function getdata() {
        axios.get(`${backend_url}/userdata/${uid.id}`).then((userdata) => {
            setEmail(userdata.data.email);
            setdisplayName(userdata.data.name);
            setimg(userdata.data.picture);
            setAbout(userdata.data.about);
            setGender(userdata.data.gender);
            setAge(userdata.data.age);
            setGithub(userdata.data.github);
            setLinkedin(userdata.data.linkedin);
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
                <div className='grid grid-cols-1 md:grid-cols-2 w-4/5 gap-2'>
                    <div className='flex flex-col justify-center items-center p-9 space-y-4 border shadow rounded-xl'>
                        <div>
                            <img className='rounded-full' src={img}></img>
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{displayName}</p>
                        </div>

                        <div className='px-4 flex space-x-4'>
                            <p>Age : {age}</p>
                            <p>Gender : {gender}</p>
                        </div>

                        <div className='break-all'>
                            <p className=''>{email}</p>
                        </div>

                        <div className='flex justify-center items-center space-x-3'>
                            <div>
                                <a href={github} target='_blank'><GitHubIcon /></a>
                            </div>
                            <div>
                                <a href={linkedin} target='_blank'><LinkedInIcon /></a>
                            </div>
                        </div>

                        {
                            user && (
                                <div className={`${user.uid === uid.id ? '' : 'hidden'}`}>
                                    <div className='flex justify-center items-center bg-lime-400 p-2 rounded-xl'>
                                        <button onClick={() => { setTimeout(() => { setShowUpdate(true) }, 400) }} className='font-semibold'><span className='flex justify-center items-center'><EditIcon /> Edit profile</span></button>
                                    </div>
                                </div>
                            )
                        }


                    </div>

                    <div className='border shadow rounded-xl'>
                        <div className='p-4'>
                            <span className='text-2xl font-semibold'>About me</span>
                        </div>
                        
                        <div className='p-4'>
                            <span>{about}</span>
                        </div>

                        <div className={`${showUpdate ? '' : 'hidden'} flex flex-col justify-start overflow-y-scroll items-center gap-y-3 p-2 fixed inset-0 bg-lime-200 z-10`}>
                            <div>
                                <EditDashboard
                                    user={user}
                                    uid={uid}
                                    about={about}
                                    displayName={displayName}
                                    age={age}
                                    gender={gender}
                                    github={github}
                                    linkedin={linkedin}
                                />
                            </div>

                            <div className=''>
                                <button className='font-semibold border rounded-lg p-2 bg-red-400' onClick={() => setShowUpdate(false)}>Cancel</button>
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