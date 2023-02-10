"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Header from '../Header';
const SriLanka = require('get-srilanka-districts-cities');

const page = ({searchParams:{id , type , summary , description , startDate , endDate , location}}) => {

  const EventForm = useForm();
  const [SlCities, setSlCities] = useState([])
  const [dates ,setdates ] = useState('');

  const handleBack = (event) => {
    event.preventDefault();
    window.location.href = "/";
  }

  const getDateTime = (d) => {
    // const d =  new Date(Date.parse(startDate))
    const year = (d.getFullYear()).toString();
    const month = ((d.getMonth()) + 101).toString().slice(-2);
    const date = ((d.getDate()) + 100).toString().slice(-2);

    const hours = ((d.getHours()) + 100).toString().slice(-2);
    const mins = ((d.getMinutes()) + 100).toString().slice(-2);

    return `${year}-${month}-${date}T${hours}:${mins}`;
  }

  useEffect(() => {
    document.getElementById('startDate').defaultValue = getDateTime(new Date(Date.parse(startDate)));
    document.getElementById('endDate').defaultValue = getDateTime(new Date(Date.parse(endDate)));
  },[])

  const handleEventSubmit = async (event) => {
    console.log(event)
    // setLoad(true);
    // try
    // {
    //   const response = await axios.post('/api/calendar/operations/create-event',event)
    //   document.getElementById('eventForms').reset();
    //   setLoad(false);
    //   console.log(response);
    //   EventForm.reset();
    // }
    // catch(err)
    // {
    //   setLoad(false);
    //   console.error(err.response);
    // }
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
                <button className=' w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700'>Update Event</button>
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
            <label className='bg-white text-sm' htmlFor="birthdayPerson">Bidthday Boy / Girl Name :</label>
            <input {...EventForm.register('birthdayPerson', {required:true})} name='birthdayPerson' type="text" placeholder='Happy Birthday' className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='birthdayPerson' />
            {EventForm.formState.errors.birthdayPerson && <p className='text-sm w-full text-red-600 mb-3'>Person Name / Post required!</p>}

            <label className='bg-white text-sm' htmlFor="birthdaydescription">Who is he/her :</label>
            <textarea {...EventForm.register('birthdaydescription', {required:true})} name='birthdaydescription' placeholder='teacher security' className='bg-white outline-slate-200 outline mb-3 rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='birthdaydescription' />
            {EventForm.formState.errors.birthdaydescription && <p className='text-sm w-full text-red-600 mb-3'>Some description required!</p>}

            <label className='bg-white text-sm' htmlFor="dateofbirth">Date Of Birth : </label>
            <input {...EventForm.register('dateofbirth', {required:true})}  name='dateofbirth' type="datetime-local" defaultValue={'2023-01-01T12:00'}className=' outline-slate-200 mb-3 bg-white outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='dateofbirth' />
            {EventForm.formState.errors.dateofbirth && <p className='text-sm w-full text-red-600 mb-3'>Date of Birth required!</p>}
  
              
              <section className='w-full flex space-x-2'>
                <button><i className="fa fa-undo rounded-sm text-white p-3 bg-green-600 hover:bg-green-500" aria-hidden="true" onClick={handleBack}></i></button>
                <button className=' w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700'>Update Event</button>
              </section>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default page