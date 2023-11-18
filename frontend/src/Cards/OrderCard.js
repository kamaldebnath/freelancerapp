import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import PaidIcon from '@mui/icons-material/Paid';


function OrderCard({ order_id, gigid, date, description, seller }) {

    const backend_url = 'https://freelancerapp-wdtf.onrender.com';

    const [gigdata, setgigdata] = useState([]);
    const [seller_info, set_seller_info] = useState([]);

    const [showDes, setShowDes] = useState(false);

    function getGigdata() {
        if (gigdata) {
            axios.get(`${backend_url}/gigsbyid/${gigid}`).then((e) => {
                setgigdata(e.data[0]);
            });
        }
    }

    function getSellerdata() {
        if (seller) {
            axios.get(`${backend_url}/userdata/${seller}`).then((e) => {
                set_seller_info(e.data);
            });
        }
    }

    useEffect(() => {
        getGigdata();
        getSellerdata();
    }, [])

    return (

        <div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 p-1 border rounded-lg shadow-sm'>
                <div className='flex flex-col justify-center overflow-hidden'>
                    <div className='flex justify-center items-center'>
                        <img className='rounded-full w-[5vh]' src={seller_info.picture}></img>
                    </div>
                    <div className='flex justify-center items-center'>
                        <a href={`/u/${seller}`}><p className='underline'>{seller_info.name}</p></a>
                    </div>
                </div>


                <div className='flex space-x-4 justify-center items-center overflow-hidden'>
                    <div>
                        <button onClick={() => { setShowDes(!showDes) }}><InfoIcon /></button>
                    </div>

                    <div>
                        <Link to={`/orders/chat/${order_id}`}><button className=''><ChatIcon /></button></Link>
                    </div>

                </div>

                <div className='flex justify-center items-center w-[30vh] overflow-hidden'>
                    <div>
                        <Link to={`/gigs/${gigid}`}><p className='font-semibold underline'>{gigdata.title}</p></Link>
                    </div>
                </div>

            </div>

            <div className={`${showDes ? '' : 'hidden'} border rounded-lg bg-gray-100 flex items-center p-2 max-w-[130vh]`}>
                <p>{description}</p>
            </div>
        </div>


    )
}

export default OrderCard