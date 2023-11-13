import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

import { storage } from '../Firebase';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { ref } from 'firebase/storage';

export default function Gig() {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth)
    const [category, setcategory] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/categories').then((e) => {
            setcategory(e.data);

        })
    }, [])

    const [gig_title, setgigtitle] = useState('');
    const [gig_description, setgigdescription] = useState('');
    const [deadline, setdeadline] = useState('');
    const [gig_category, setgigcategory] = useState('');
    const [price, setprice] = useState('');
    const [imageBase64, setimageBase64] = useState();
    const [imageFile, setimageFile] = useState();

    function ConvertToBase64(e) {
        setimageFile(e.target.files[0]);
        if (e.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                console.log(reader.result);
                setimageBase64(reader.result);
            }
            reader.onerror = (error) => {
                console.log(error);
            }
        }
    }

    function removeImage(e) {
        e.preventDefault();
        setimageBase64('');
        setimageFile('');

    }

    async function createGig(e) {
        e.preventDefault();

        if (imageFile) {
            const ImageRef = ref(storage, `images/${imageFile.name}`);
            await uploadBytes(ImageRef,imageFile);
            await getDownloadURL(ImageRef).then((img_url) => {
                axios.post(`http://localhost:5000/creategig/${user.accessToken}`, {
                    'title': gig_title,
                    'description': gig_description,
                    'gigcategory': gig_category.value,
                    'deadline': deadline,
                    'price': price,
                    'thumbnail': img_url
                }).then((e) => {
                    if (e.data == 'success') {
                        setgigtitle('')
                        setgigdescription('')
                        setdeadline('')
                        setgigcategory('')
                        setimageBase64('')
                        setimageFile('')
                        setprice('')
                        navigate(`/u/${user.uid}`);
                    }
                })
            });
            
        }
    }

    return (
        <div>

            <Navbar />

            <div className='flex p-4 justify-center items-center'>
                <form className='flex flex-col space-y-16 bg-white w-[110vh] h-fit border rounded-lg p-5 shadow shadow-gray-200' onSubmit={createGig}>
                    <div className='grid grid-cols-3 gap-5'>
                        <label className='flex flex-col'>
                            <span className='font-semibold'>Title of the Gig</span>
                            <span className='text-sm font-extralight'>As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</span>
                        </label>
                        <div className='col-span-2'>
                            <input className='border w-full h-full p-4 outline-none rounded-lg' value={gig_title} onChange={(e) => setgigtitle(e.target.value)} type='text' placeholder='title'></input>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-5'>
                        <label className='flex flex-col'>
                            <span className='font-semibold'>Gig Description</span>
                            <span className='font-extralight text-sm'>Briefly Describe Your Gig</span>
                        </label>
                        <div className='col-span-2'>
                            <textarea className='border w-full h-full p-4 outline-none max-h-[40vh] min-h-[30vh] rounded-lg' value={gig_description} onChange={(e) => setgigdescription(e.target.value)} placeholder='description'></textarea>
                        </div>

                    </div>
                    <div className='grid grid-cols-3 gap-5'>
                        <label className='flex flex-col'>
                            <span className='font-semibold'>Delivery time</span>
                            <span className='text-sm font-extralight'>(in days)</span>
                        </label>
                        <div className='col-span-2'>
                            <input className='border w-full h-full p-4 outline-none rounded-lg' value={deadline} onChange={(e) => setdeadline(e.target.value)} type='number' min={1} placeholder='Enter delivery time'></input>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-5'>
                        <label className='flex flex-col'>
                            <span className='font-semibold'>Price</span>
                            <span className='text-sm font-extralight'>(in rupees)</span>

                        </label>
                        <div className='col-span-2'>
                            <input className='border w-full h-full p-4 outline-none rounded-lg' value={price} onChange={(e) => setprice(e.target.value)} type='number' min={0} placeholder='Enter price'></input>
                        </div>
                    </div>


                    <div className='grid grid-cols-3 gap-5'>
                        <label className='flex flex-col'>
                            <span className='font-semibold'>Category</span>
                            <span className='font-extralight text-sm'>Choose the category most suitable for your Gig.</span>
                        </label>
                        <div className='col-span-2'>
                            <Select options={category} value={gig_category} onChange={(e) => setgigcategory(e)} />
                        </div>

                    </div>


                    <div className='grid grid-cols-3 gap-5'>
                        <label className='flex flex-col'>
                            <span className='font-semibold'>Thumbnail</span>
                            <span className='font-extralight text-sm'>Get noticed by the right buyers with visual example of your services.</span>
                        </label>
                        <div className='col-span-2 space-y-5'>

                            <div class="flex items-center justify-center w-full">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 transition duration-500 hover:cursor-pointer rounded-lg hover:bg-slate-100">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
                                    </div>
                                    <input id="dropzone-file" accept='image/*' type="file" onChange={ConvertToBase64} class="hidden" />
                                </label>
                            </div>


                            {
                                imageBase64 && (
                                    <div className='space-x-20'>
                                        <img onClick={removeImage} className='h-[30vh]' src={imageBase64}></img>
                                    </div>
                                )
                            }


                        </div>

                    </div>

                    <div className='grid grid-cols-2'>
                        <div className='flex justify-center'>
                            <button onClick={() => navigate(`/u/${user.uid}`)} className='font-semibold px-5 py-2 rounded-lg border border-gray-200 transition duration-500 hover:bg-slate-100'>Cancel</button>
                        </div>
                        <div className='flex justify-center'>
                            <button className='font-semibold bg-black text-white px-5 py-2 rounded-lg border border-gray-200 transition duration-500 hover:bg-gray-700'>Save</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
