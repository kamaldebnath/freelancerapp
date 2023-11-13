import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GigCard({ gigid, seller_uid, title, description, deadline,price,thumbnail, }) {

    return (
        <div className='p-4'>
            <a href={`/gigs/${gigid}`}>
                <div className='h-[35vh] flex flex-col gap-y-4 w-[30vh] bg-gray-100 hover:cursor-pointer transition duration-500 hover:scale-105 rounded-lg p-2 overflow-hidden shadow shadow-black'>
                    
                    <div className=''>
                        <img className='rounded-lg w-[30vh] h-[20vh] object-cover' src={thumbnail}></img>
                    </div>

                    <div className='font-semibold'>
                        <p className='truncate'>{title}</p>
                    </div>

                    <div className='grid grid-cols-2'>
                        <div className='flex font-semibold'>
                            <span>₹</span>
                            <p>{price}</p>
                        </div>
                    </div>

                </div>
            </a>
        </div>
    )
}
