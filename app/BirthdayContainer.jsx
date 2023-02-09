import React from 'react'

const BirthdayContainer = ({summary , stDate , description}) => {
  return (
    
    <>
      <div className='w-full flex-col lg:p-2 mt-5 relative max-h-[250px] flex min-h-fit items-center bg-slate-50'>
          <div className='p-3 overflow-y-scroll min-h-fit max-h-[250px] w-full'>
              <h1 className='text-4xl'>{summary}</h1>
              <p className='mt-1 mb-2'>Birthday : {stDate}</p>
              <h2 className='underline text-lg md:text-md '>about nipuna nishan</h2>
              <p>{description}</p>
          </div>
      </div>
      <div className='flex justify-between shadow-md w-full bg-slate-50'>
          <button className='text-xs w-fit hover:bg-blue-600 rounded-tr hover:text-white transition duration-200 p-2'><i className="fa fa-edit pr-1" aria-hidden="true"></i>Update</button>
          <button className='text-xs w-fit hover:bg-red-600 rounded-tl hover:text-white transition  duration-200 p-2'><i className="fa fa-eraser pr-1 " aria-hidden="true"></i>Delete</button>
        </div>
    </>  
  )
}

export default BirthdayContainer
