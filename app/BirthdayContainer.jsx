import React from 'react'

const BirthdayContainer = ({summary , stDate , description}) => {
  return (
    <div className='w-full lg:p-10 mt-5 max-h-[250px] flex min-h-fit items-center bg-slate-50 shadow-md'>
        <div className='p-3 overflow-y-scroll min-h-fit max-h-[250px] w-full'>
            <h1 className='text-4xl'>{summary}</h1>
            <p className='mt-1 mb-2'>Birthday : {stDate}</p>
            <h2 className='underline text-lg md:text-md '>about nipuna nishan</h2>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default BirthdayContainer
