"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Header from '../Header';
const SriLanka = require('get-srilanka-districts-cities');
import {getDate, getDateTime} from '../../utils/GetDateTimeString'
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';

const page = ({searchParams:{id , type , summary , description , startDate , endDate , location}}) => {

  const EventForm = useForm();
  const [SlCities, setSlCities] = useState([])
  const [dates ,setdates ] = useState('');
  const [isLoad , setIsLoad] = useState(false);

  const handleBack = (event) => {
    event.preventDefault();
    window.location.href = "/";
  }

  useEffect(() => {
    if(type === "Event")
    {
      document.getElementById('startDate').defaultValue = getDateTime(new Date(Date.parse(startDate)));
      document.getElementById('endDate').defaultValue = getDateTime(new Date(Date.parse(endDate)));
    }
    else if(type === "Birthday")
    {
      document.getElementById('dateofbirth').defaultValue = getDate(new Date(Date.parse(startDate)));
    }
  },[])

  const handleEventSubmit = async (event) => {
    setIsLoad(true);
    try
    {
      const response = await axios.post(`/api/calendar/operations/update-event?id=${id}&type=${type}`,event)
      setIsLoad(false);
      window.location.href = '/';
    }
    catch(err)
    {
      setIsLoad(false);
      console.error(err);
    }
  }

  useEffect(() => {
    if(SlCities.length == 0)
    {
      SriLanka.provinceList()[0].map((provices) => {
        SriLanka.getDistrictList(provices)[0].map((cities) => {
          setSlCities(SlCities => [...SlCities , cities]);
        })
      })
    }
  }, [SlCities])
  if(type === "Event")
  {
    return (
      <>
        <Header/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className='absolute rounded-sm top-0 left-0 bg-black md:bg-white right-0 bottom-0 flex justify-center items-center'>
          <div className='w-[90%] md:w-1/2 rounded-sm xl:w-1/4 h-fit  bg-slate-50 p-4 drop-shadow-xl'>
            <form id='eventForms' onSubmit={EventForm.handleSubmit(handleEventSubmit)} className='w-full md:w-[90%] mx-auto'>
              <label className='text-sm' htmlFor="summary">Summary :</label>
              <input defaultValue={summary} name='summary' {...EventForm.register('summary', {required:true})} placeholder='Summary' type="text" className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 mb-3 outline-1 p-1 px-3 text-sm' id='summary' />
              {EventForm.formState.errors.summary && <p className='text-sm w-full text-red-600 mb-3'>summary required! (this is like a title)</p>}
  
              <label className='  text-sm' htmlFor="description">Description :</label>
              <textarea defaultValue={description} {...EventForm.register('description', {required:true})} name='description' placeholder='Description' className='bg-white outline-slate-200 mb-3 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='description' />
              {EventForm.formState.errors.description && <p className='text-sm w-full text-red-600 mb-3'>Description about event required!</p>}
  
              <label className='text-sm' htmlFor="startDate">Start Date & Time : </label>
              <input {...EventForm.register('startDate', {required:true})}  name='startDate' type="datetime-local" className='bg-white mb-3 outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='startDate' />
              {EventForm.formState.errors.startDate && <p className='text-sm w-full text-red-600 mb-3'>Starting Date required!</p>}
  
              <label className='text-sm' htmlFor="endDate">End Date & Time : </label>
              <input {...EventForm.register('endDate', {required:true})} name='endDate' type="datetime-local" className='bg-white mb-3 outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='endDate' />
              {EventForm.formState.errors.endDate && <p className='text-sm w-full text-red-600 mb-3'>Ending Date required!</p>}
  
              <label className='text-sm' htmlFor="location">Location :</label>
              <select defaultValue={location} {...EventForm.register('location', {required:true})} name='location' className='bg-white outline-slate-200 mb-3 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id="location">
              <option value={'Pitipana Homagama, Sri Lanka'}>Pitipana Homagama, Sri Lanka</option>
                {SlCities.length > 0 && SlCities.map((itemss) => {
                  return (<option key={`${Math.random()} ${itemss} `} value={`${itemss}, Sri Lanka`}>{itemss}, Sri Lanka</option>)
                })}
              </select>
              {EventForm.formState.errors.location && <p className='text-sm w-full text-red-600 mb-3'>Location required!</p>}
              <section className='w-full flex space-x-2'>
                <button><i className="fa fa-undo rounded-sm text-white p-3 bg-green-600 hover:bg-green-500" aria-hidden="true" onClick={handleBack}></i></button>
                <button className='relative w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700'>Update Event
                
                {isLoad && <span className='absolute bg-green-600 top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
                <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
                /><p className='pl-2'>updating ...</p></span>}
                </button>
              </section>
            </form>
          </div>
        </div>
      </>
    )
  }
  else if(type === "Birthday")
  {
    return (
      <>
        <Header/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className='absolute rounded-sm top-0 left-0 bg-black md:bg-white right-0 bottom-0 flex justify-center items-center'>
          <div className='w-[90%] md:w-1/2 rounded-sm xl:w-1/4 h-fit  bg-slate-50 p-4 drop-shadow-xl'>
            <form id='eventForms' onSubmit={EventForm.handleSubmit(handleEventSubmit)} className='w-full md:w-[90%] mx-auto'>
            <label className=' text-sm' htmlFor="birthdayPerson">Bidthday Boy / Girl Name :</label>
            <input defaultValue={summary} {...EventForm.register('birthdayPerson', {required:true})} name='birthdayPerson' type="text" placeholder='Happy Birthday' className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='birthdayPerson' />
            {EventForm.formState.errors.birthdayPerson && <p className='text-sm w-full text-red-600 mb-3'>Person Name / Post required!</p>}

            <label className=' text-sm' htmlFor="birthdaydescription">Who is he/her :</label>
            <textarea defaultValue={description} {...EventForm.register('birthdaydescription', {required:true})} name='birthdaydescription' placeholder='teacher security' className=' outline-slate-200 outline mb-3 rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='birthdaydescription' />
            {EventForm.formState.errors.birthdaydescription && <p className='text-sm w-full text-red-600 mb-3'>Some description required!</p>}

            <label className=' text-sm' htmlFor="dateofbirth">Date Of Birth : </label>
            <input {...EventForm.register('dateofbirth', {required:true})}  name='dateofbirth' type="date" className=' outline-slate-200 mb-3 bg-white outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='dateofbirth' />
            {EventForm.formState.errors.dateofbirth && <p className='text-sm w-full text-red-600 mb-3'>Date of Birth required!</p>}
  
              
              <section className='w-full flex space-x-2'>
                <button><i className="fa fa-undo rounded-sm text-white p-3 bg-green-600 hover:bg-green-500" aria-hidden="true" onClick={handleBack}></i></button>
                <button className='relative w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700'>Update Event
                {isLoad && <span className='absolute bg-green-600 top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
                <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
                /><p className='pl-2'>updating ...</p></span>}
                </button>
              </section>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default page