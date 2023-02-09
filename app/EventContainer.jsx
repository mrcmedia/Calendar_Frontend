import React from 'react'

const EventContainer = ({summary , description , stDate , location , endDate , id}) => {
  return (
    <div className='w-full mt-5 flex flex-col relative items-center sm:bg-slate-50 bg-slate-50 shadow-md'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className='p-10 flex-1 lg:p-20 xl:py-30 xl:px-52 overflow-y-scroll w-full'>
            <h1 className='text-4xl md:text-5xl capitalize mb-3'>{summary}</h1>
            <section className='sm:flex block items-center justify-start md:justify-between'>
                <p>Event Starts : {stDate}</p>
                <p>Event Ends : {endDate}</p>
            </section>
            <p className='text-xs'>Location : {location}</p>
            <h2 className='underline text-lg py-2 font-semibold'>ABOUT EVENT</h2>
            <p>{description}</p>
        </div>
        <div className='flex justify-between w-full'>
          <button className='text-xs w-fit hover:bg-blue-600 rounded-tr hover:text-white transition duration-200 p-2'><i className="fa fa-edit pr-1" aria-hidden="true"></i>Update</button>
          <button className='text-xs w-fit hover:bg-red-600 rounded-tl hover:text-white transition duration-200 p-2'><i className="fa fa-eraser pr-1 " aria-hidden="true"></i>Delete</button>
        </div>
    </div>
  )
}

export default EventContainer