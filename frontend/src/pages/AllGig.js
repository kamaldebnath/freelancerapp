import axios from 'axios';
import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import GigCard from './GigCard';
import Select from 'react-select'

export default function () {

    const backend_url='https://freelancerapp-wdtf.onrender.com';
    
    const [category, setcategory] = useState();
    const [selected_cat, set_selected_cat] = useState();
    const [allgigs, setallgigs] = useState('');

    function getdata() {
        axios.get('${backend_url}/categories').then((e) => {
            setcategory(e.data);

        })
        axios.get(`${backend_url}/allgigs`).then((e) => {
            setallgigs(e.data);
        })
    }
    useEffect(() => {
        getdata();
    }, [])

    function clearFilter(e) {
        e.preventDefault();
        set_selected_cat('');
    }

    return (
        <div className='flex flex-col items-center p-3'>

            <form className='flex items-center justify-center space-x-4 w-full md:justify-end'>
                <div>
                    <Select className='w-[20vh]' options={category} placeholder={'all'} value={selected_cat} onChange={(e) => set_selected_cat(e)} />
                </div>
                <div>
                    <button className='text-sm' onClick={clearFilter}>Clear Filter</button>
                </div>
            </form>

            <div className=''>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                    {allgigs && (
                        allgigs.filter((items) => {
                            return !selected_cat ? items : items.gigcategory.includes(selected_cat.value)
                        }).map((items) =>
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
                </div>
            </div>

        </div>
    )
}
