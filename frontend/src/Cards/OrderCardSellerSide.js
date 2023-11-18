import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import PaidIcon from '@mui/icons-material/Paid';


function OrderCard({ order_id, gigid, date, description, buyer }) {

    const backend_url = 'https://freelancerapp-wdtf.onrender.com';

    const [gigdata, setgigdata] = useState([]);
    const [buyer_info, set_buyer_info] = useState([]);

    const [showDes, setShowDes] = useState(false);

    function getGigdata() {
        if (gigdata) {
            axios.get(`${backend_url}/gigsbyid/${gigid}`).then((e) => {
                setgigdata(e.data[0]);
            });
        }
    }

    function getBuyerdata() {
        if (buyer) {
            axios.get(`${backend_url}/userdata/${buyer}`).then((e) => {
                set_buyer_info(e.data);
            });
        }
    }

    useEffect(() => {
        getGigdata();
        getBuyerdata();
    }, [])

    return (

        <div className='font-display'>
            <div className='grid grid-cols-1 md:grid-cols-3 p-1 border rounded-lg shadow-sm w-[37vh] sm:w-[80vh]'>

                <div className='flex flex-col justify-center overflow-hidden'>
                    <div className='flex justify-center items-center'>
                        <img className='rounded-full w-[5vh]' src={buyer_info.picture}></img>
                    </div>

                    <div className='flex justify-center items-center'>
                        <a href={`/u/${buyer}`}><p className='underline'>{buyer_info.name}</p></a>
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

                <div className='flex justify-center items-center'>
                    <div>
                        <Link to={`/gigs/${gigid}`}><p className='underline'>{gigdata.title}</p></Link>
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