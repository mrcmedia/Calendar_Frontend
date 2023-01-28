"use client";
import React, { useState } from 'react'
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';

const Body = () => {

  const [isLoad, setIsLoad] = useState(false);
  const handleSignIn = () => {
    setIsLoad(true)
    axios.get('/api/calendar/auth').then((response) => {
      window.location.href = response.data.url;
    });
  }
  return (
    <div className='absolute top-0 left-0 bottom-0 right-0 bg-slate-900 flex items-center justify-center'>
        <section className='md:w-1/2 py-10 w-[80%] lg:w-1/4 h-fit p-5 rounded-sm shadow-lg bg-slate-200'>
            <h1 className='text-center text-xl mb-5'>Welcome To MRC Calander</h1>
            <button onClick={() => handleSignIn()} className='bg-black relative text-white hover:bg-slate-900
             w-full mt-1 p-3 rounded-sm'><i className="fa fa-google-plus pr-3" aria-hidden="true"></i>Continue With Google
             
             {isLoad && <span className='absolute bg-green-900/80 top-0 left-0 right-0 bottom-0 flex items-center justify-center'><RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            /></span>}
             </button>
        </section>
    </div>
  )
}
export default Body