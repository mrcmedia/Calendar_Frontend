import React from 'react'
import BirthdayContainer from './BirthdayContainer'
import EventContainer from './EventContainer'

const Container = () => {
  return (
    <div className='w-full h-fit md:h-full sm:flex block md:flex-row flex-col'>
      <div className='md:flex-1 md:h-full h-fit w-full overflow-y-hidden sm:overflow-y-scroll'>
        <h1 className='text-3xl bg-white-600  bg-white shadow-md p-4'>Events for the day</h1>
        <div className='w-full h-fit'>
            <EventContainer/>
            <EventContainer/>
            <EventContainer/>
            <EventContainer/>
            <EventContainer/>
            <EventContainer/>
            <EventContainer/>
        </div>
      </div>
      <div className='lg:flex-[0.3] md:flex-[0.5] shadow-2xl sm:h-full h-fit overflow-y-hidden sm:overflow-y-scroll'>
        <h1 className='shadow-md shadow-slate-400 py-5 px-3 bg-blue-600 text-white text-xl'>Birthdays for the day</h1>
        <BirthdayContainer/>
        <BirthdayContainer/>
        <BirthdayContainer/>
        <BirthdayContainer/>
        <BirthdayContainer/>
      </div>
    </div>
  )
}

export default Container
