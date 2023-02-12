"use client";
import React from 'react'


const Header = () => {
  return (
    <div className={`absolute w-full z-[100] min-h-fit flex items-center shadow-md bg-white p-2`}>
        <section className='relative'>
          <h1 className='text-2xl sm:text-4xl'>Calander</h1>
          <p className='top-[-8px] relative left-1 underline'>Mahinda Rajapaksha College Homagama.</p>
        </section>
    </div>
  )
}
export default Header