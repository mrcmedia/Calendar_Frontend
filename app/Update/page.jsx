"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Header from '../Header';
const SriLanka = require('get-srilanka-districts-cities');

const page = ({searchParams:{id}}) => {

  const EventForm = useForm();
  const [SlCities, setSlCities] = useState([])

  const handleEventSubmit = async (event) => {
    setLoad(true);
    try
    {
      const response = await axios.post('/api/calendar/operations/create-event',event)
      document.getElementById('eventForms').reset();
      setLoad(false);
      console.log(response);
      EventForm.reset();
    }
    catch(err)
    {
      setLoad(false);
      console.error(err.response);
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

  console.log(id)
  return (
    <>
      <Header/>
      <div className='absolute rounded-sm top-0 left-0 bg-black md:bg-white right-0 bottom-0 flex justify-center items-center'>
        <div className='w-[90%] md:w-1/2 rounded-sm xl:w-1/4 h-fit  bg-slate-50 p-4 shadow-md'>
          <form id='eventForms' onSubmit={EventForm.handleSubmit(handleEventSubmit)} className='w-full md:w-[90%] mx-auto'>
            <label className='text-sm' htmlFor="summary">Summary :</label>
            <input name='summary' {...EventForm.register('summary', {required:true})} placeholder='Summary' type="text" className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 mb-3 outline-1 p-1 px-3 text-sm' id='summary' />
            {EventForm.formState.errors.summary && <p className='text-sm w-full text-red-600 mb-3'>summary required! (this is like a title)</p>}

            <label className=' bg-white text-sm' htmlFor="description">Description :</label>
            <textarea {...EventForm.register('description', {required:true})} name='description' placeholder='Description' className='bg-white outline-slate-200 mb-3 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='description' />
            {EventForm.formState.errors.description && <p className='text-sm w-full text-red-600 mb-3'>Description about event required!</p>}

            <label className='bg-white text-sm' htmlFor="startDate">Start Date & Time : </label>
            <input {...EventForm.register('startDate', {required:true})}  name='startDate' defaultValue={'2023-01-01T12:00'} type="datetime-local" className='bg-white mb-3 outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='startDate' />
            {EventForm.formState.errors.startDate && <p className='text-sm w-full text-red-600 mb-3'>Starting Date required!</p>}

            <label className='bg-white text-sm' htmlFor="endDate">End Date & Time : </label>
            <input {...EventForm.register('endDate', {required:true})} name='endDate' defaultValue={'2023-01-01T12:00'} type="datetime-local" className='bg-white mb-3 outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='endDate' />
            {EventForm.formState.errors.endDate && <p className='text-sm w-full text-red-600 mb-3'>Ending Date required!</p>}

            <label className='bg-white text-sm' htmlFor="location">Location :</label>
            <select defaultValue='Pitipana Homagama, Sri Lanka' {...EventForm.register('location', {required:true})} name='location' className='bg-white outline-slate-200 mb-3 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id="location">
            <option value={'Pitipana Homagama, Sri Lanka'}>Pitipana Homagama, Sri Lanka</option>
              {SlCities.length > 0 && SlCities.map((itemss) => {
                return (<option key={`${Math.random()} ${itemss} `} value={`${itemss}, Sri Lanka`}>{itemss}, Sri Lanka</option>)
              })}
            </select>
            {EventForm.formState.errors.location && <p className='text-sm w-full text-red-600 mb-3'>Location required!</p>}
            <button className=' w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700'>Update Event</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default page