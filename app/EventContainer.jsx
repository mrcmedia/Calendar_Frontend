import React from 'react'

const EventContainer = ({summary , description , stDate , location , endDate}) => {
  return (
    <div className='w-full mt-5 flex items-center sm:bg-slate-50 bg-slate-50 shadow-md'>
        <div className='p-10 lg:p-20 xl:py-30 xl:px-52 overflow-y-scroll w-full'>
            <h1 className='text-4xl md:text-5xl capitalize mb-3'>{summary}</h1>
            <section className='sm:flex block items-center justify-start md:justify-between'>
                <p>Event Starts : {stDate}</p>
                <p>Event Ends : {endDate}</p>
            </section>
            <p className='text-xs'>Location : {location}</p>
            <h2 className='underline text-lg py-2 font-semibold'>ABOUT EVENT</h2>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default EventContainer