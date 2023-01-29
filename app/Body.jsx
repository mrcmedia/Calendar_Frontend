import React, { useEffect, useState } from 'react'
import Clock from 'react-live-clock';

const Body = () => {
  const [date] = useState(new Date().toLocaleString("si-LK", {timeZone: "Asia/Colombo", dateStyle:'long'}));
  const [DayOfWeek] = useState(new Date().toLocaleString("si-LK", {timeZone: "Asia/Colombo", weekday:'long'}));

  return (
    <div className='flex-1 w-full relative '>
      <div className='absolute top-0 left-0 right-0 bottom-0 flex'>
        <div className='lg:flex-[0.2] md:flex-[0.4] shadow-2xl'>
          <section className='w-full p-3 bg-blue-500 text-white text-xl'>
            <h2>Calendar Operations.</h2>
          </section>
          <section className='w-full px-3 shadow-md flex flex-col'>
            <Clock
            format={'hh:mm'}
            className="text-5xl"
            ticking={true} />
            <h1 className='text-3xl'>{DayOfWeek}</h1>
            <h1 className='text-xl relative bottom-2 mb-3'>{date}</h1>
          </section>
          <section className='mt-5 w-full shadow-md'>
            <h1 className='text-center text-lg mb-3'>Add Events</h1>
            <form className='w-[90%] mx-auto'>
              <label htmlFor="summary">Summary :</label>
              <input type="text" className='outline-blue-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-2' id='summary' />

              <label htmlFor="description">Description :</label>
              <textarea className='outline-blue-200 outline rounded-sm w-full transition-shadow mb-3 mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-2' id='description' />

              <label htmlFor="startDate">Start Date & Time : </label>
              <input type="datetime-local" className='outline-blue-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-2' id='startDate' />

              <label htmlFor="endDate">End Date & Time : </label>
              <input type="datetime-local" className='outline-blue-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-2' id='endDate' />

              <label htmlFor="endDate">Location :</label>
              <select className='outline-blue-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-2' id="">
                <option value="">Homagama , Sri Lanka</option>
              </select>

            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Body
