import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './Navbar';
import OrderGig from './OrderGig';
import EastIcon from '@mui/icons-material/East';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function GigPage() {
    const { gigid } = useParams();
    const [giginfo, setgiginfo] = useState([]);
    const [seller_info, set_seller_info] = useState({});

    const [openorder, setopenorder] = useState(false);

    async function getdata() {
        axios.get(`http://localhost:5000/gigsbyid/${gigid}`).then((e) => {
            setgiginfo(e.data[0]);
        })

    }

    useEffect(() => {
        getdata();
        if (giginfo.seller_uid) {
            axios.get(`http://localhost:5000/userdata/${giginfo.seller_uid}`).then((e) => {
                set_seller_info(e.data);
            })
        }
    }, [])

    return (
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
                                    <Link to={`/u/${giginfo.seller_uid}`}><img className='rounded-full w-10' src={seller_info.picture}></img></Link>
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
                            <button className='bg-black text-white font-semibold px-5 py-2 rounded-lg' onClick={() => setopenorder(true)}>Place Order</button>
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
    )
}