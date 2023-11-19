import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './Navbar';
import OrderGig from './OrderGig';
import EastIcon from '@mui/icons-material/East';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClipLoader from "react-spinners/ClipLoader";

export default function GigPage() {

    const backend_url = 'https://freelancerapp-wdtf.onrender.com';

    const [isLoading, setLoading] = useState(false);

    const { gigid } = useParams();
    const [giginfo, setgiginfo] = useState([]);
    const [seller_info, set_seller_info] = useState({});

    const [openorder, setopenorder] = useState(false);

    async function getdata() {
        axios.get(`${backend_url}/gigsbyid/${gigid}`).then((e) => {
            setgiginfo(e.data[0]);
        }).then(()=>{
            if (giginfo.seller_uid) {
                axios.get(`${backend_url}/userdata/${giginfo.seller_uid}`).then((e) => {
                    set_seller_info(e.data);
                })
            }
        })

    }

    useEffect(() => {
        getdata();
    })

    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },1000)
    },[])

    return (
        <div className='font-display'>
            {isLoading && (
                <div className='flex h-screen w-screen justify-center items-center'>
                    <ClipLoader
                        color={'lime'}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}

            {!isLoading && (
                <div>
                    <Navbar />
                    <div className='flex justify-center'>
                        <div className='w-2/3 grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-0'>
                            <div className=''>
                                <div className='flex flex-col space-y-10'>
                                    <div>
                                        <p className='text-3xl font-semibold'>{giginfo.title}</p>
                                    </div>

                                    <div className='flex items-center space-x-3'>
                                        <div>
                                            <Link to={`/u/${giginfo.seller_uid}`}><img className='rounded-full w-14 border-2 border-black' src={seller_info.picture}></img></Link>
                                        </div>
                                        <div>
                                            <Link to={`/u/${giginfo.seller_uid}`}><p className='hover:underline'>{seller_info.name}</p></Link>
                                        </div>
                                    </div>

                                    <div className='flex justify-start items-center'>
                                        <img className='w-[70vh]' src={giginfo.thumbnail}></img>
                                    </div>

                                    <div>
                                        <p>{giginfo.description}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='flex flex-col justify-center gap-y-5 items-center h-[20vh] border'>
                                    <div className='flex flex-col md:flex-row gap-3'>
                                        <div className='flex justify-center items-center space-x-1 font-semibold '>
                                            <span><AccessTimeIcon /></span>
                                            <span>{giginfo.deadline}</span>
                                            <span>{giginfo.deadline > 1 ? 'days delivery' : 'day delivery'}</span>
                                        </div>

                                        <div className='flex justify-center items-center font-semibold space-x-1 '>
                                            <span>₹{giginfo.price}</span>
                                            <span>rupees</span>
                                        </div>
                                    </div>
                                    <button className='bg-black text-white font-semibold px-5 py-2 rounded-lg' onClick={() => setTimeout(()=>{setopenorder(true)},400)}>Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`fixed top-0 h-screen w-screen bg-slate-400 ${openorder ? '' : 'hidden'}`}>
                        <OrderGig
                            gigid={gigid}
                            seller_uid={giginfo.seller_uid}
                        />
                    </div>


                </div>
            )}
        </div>
    )
}
