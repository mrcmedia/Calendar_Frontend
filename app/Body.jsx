import Hamburger from 'hamburger-react';
import React, { useEffect, useState } from 'react'
import Clock from 'react-live-clock';

const Body = () => {
  const [date] = useState(new Date().toLocaleString("en-LK", {timeZone: "Asia/Colombo", dateStyle:'long'}));
  const [DayOfWeek] = useState(new Date().toLocaleString("en-LK", {timeZone: "Asia/Colombo", weekday:'long'}));

  return (
    <div className='flex-1 w-full relative'>
      <div className='absolute top-0 left-0 right-0 bottom-0 flex'>
        <div className='lg:flex-[0.2] md:flex-[0.4] shadow-2xl pb-5 overflow-scroll'>
          <section className='w-full bg-blue-600 text-white shadow-xl'>
            <section className='shadow-md flex items-center'>
              <section className='block md:hidden'><Hamburger size={'15'}/></section>
              <h2 className='p-1 sm:p-3 text-xl'>Calendar Operations.</h2>
            </section>
            <section className=' px-3 mt-1 sm:mt-3 w-full flex flex-col'>
              <Clock
              format={'hh:mm'}
              className="text-4xl sm:text-5xl"
              ticking={true} />
              <h1 className='text-xl sm:text-3xl'>{DayOfWeek}</h1>
              <h1 className='text-sm sm:text-xl relative bottom-2 mb-1 sm:mb-3'>{date}</h1>
          </section>
          </section>
          <section className='py-5 w-full shadow-md bg-slate-50'>
            <h1 className='text-center text-md'>Add Event</h1>
            <form className='w-[90%] mx-auto'>
              <label className='text-sm' htmlFor="summary">Summary :</label>
              <input type="text" className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='summary' />

              <label className='bg-white text-sm' htmlFor="description">Description :</label>
              <textarea className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mb-3 mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='description' />

              <label className='bg-white text-sm' htmlFor="startDate">Start Date & Time : </label>
              <input type="datetime-local" className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='startDate' />

              <label className='bg-white text-sm' htmlFor="endDate">End Date & Time : </label>
              <input type="datetime-local" className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='endDate' />

              <label className='bg-white text-sm' htmlFor="endDate">Location :</label>
              <select className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id="">
                <option value="">Homagama , Sri Lanka</option>
                <option value="">Sri Lanka</option>
                <option value="">Kalutara , Sri Lanka</option>
                <option value="">Gampaha , Sri Lanka</option>
                <option value="">Matara , Sri Lanka</option>
                <option value="">Galle , Sri Lanka</option>
                <option value="">Hambanthota , Sri Lanka</option>
                <option value="">Trincomale , Sri Lanka</option>
                <option value="">Madakalapuwa , Sri Lanka</option>
                <option value="">Jaffna , Sri Lanka</option>
                <option value="">Mulathiv , Sri Lanka</option>
                <option value="">Puththalama , Sri Lanka</option>
                <option value="">Anuradhapura , Sri Lanka</option>
                <option value="">Polonnaruwa , Sri Lanka</option>
                <option value="">Kandy , Sri Lanka</option>
                <option value="">Nuwara Eliya , Sri Lanka</option>
                <option value="">Badulla , Sri Lanka</option>
                <option value="">Badulla , Sri Lanka</option>
                <option value="">Badulla , Sri Lanka</option>
                <option value="">Halawatha , Sri Lanka</option>
                <option value="">Mannarama , Sri Lanka</option>
                <option value="">Matale , Sri Lanka</option>
                <option value="">Dambulla , Sri Lanka</option>
                <option value="">Katharagama , Sri Lanka</option>
              </select>
              <button className=' w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700'>Add Event</button>
            </form>
          </section>
          <p className='bg-white text-center mt-3 text-slate-400'> ------ OR ------ </p>
          <h1 className='bg-white text-center text-md mt-5'>Add Birthday</h1>
          <form className='bg-white w-[90%] mx-auto my-5'>
              <label className='bg-white text-sm' htmlFor="summary">Bidthday Boy / Girl Name :</label>
              <input type="text" className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='summary' />

              <label className='bg-white text-sm' htmlFor="description">Who is he/her :</label>
              <textarea className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mb-3 mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='description' />

              <label className='bg-white text-sm' htmlFor="startDate">Date Of Birth : </label>
              <input type="datetime-local" className=' outline-slate-200 bg-white outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='startDate' />


              <button className='w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700'>Add Birthday</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Body
