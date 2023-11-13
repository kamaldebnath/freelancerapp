import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import PaidIcon from '@mui/icons-material/Paid';


function OrderCard({ order_id, gigid, date, description, buyer }) {
    const [gigdata, setgigdata] = useState([]);
    const [buyer_info, set_buyer_info] = useState([]);

    const [showDes, setShowDes] = useState(false);

    function getGigdata() {
        if (gigdata) {
            axios.get(`http://localhost:5000/gigsbyid/${gigid}`).then((e) => {
                setgigdata(e.data[0]);
            });
        }
    }

    function getBuyerdata() {
        if (buyer) {
            axios.get(`http://localhost:5000/userdata/${buyer}`).then((e) => {
                set_buyer_info(e.data);
            });
        }
    }

    useEffect(() => {
        getGigdata();
        getBuyerdata();
    }, [])

    return (

        <div>
            <div className='grid grid-cols-4 gap-5 p-1 border rounded-lg shadow-sm'>
                <div className='flex flex-col justify-center overflow-hidden'>
                    <div className='flex justify-center items-center'>
                        <img className='rounded-full w-[5vh]' src={buyer_info.picture}></img>
                    </div>
                    <div className='flex justify-center items-center'>
                        <p>{buyer_info.name}</p>
                    </div>
                </div>

                <div className='flex justify-center items-center w-[30vh] overflow-hidden'>
                    <div>
                        <Link to={`/gigs/${gigid}`}><p className='font-semibold underline'>{gigdata.title}</p></Link>
                    </div>
                </div>


                <div className='flex space-x-4 justify-center items-center overflow-hidden'>
                    <div>
                        <button onClick={()=>{setShowDes(!showDes)}}><InfoIcon /></button>
                    </div>

                    <div>
                        <Link to={`/orders/chat/${order_id}`}><button className=''><ChatIcon /></button></Link>
                    </div>

                </div>

                <div className='flex justify-center items-center space-x-4 overflow-hidden'>
                    <button><PaidIcon /></button>
                    <p>Payment status</p>
                </div>

            </div>

            <div className={`${showDes ? '' : 'hidden'} border rounded-lg bg-gray-100 flex items-center p-2 max-w-[130vh]`}>
                <p>{description}</p>
            </div>
        </div>


    )
}

export default OrderCard