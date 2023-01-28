import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Header = () => {
    const [userLogo, setuserLogo] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        axios.get('/api/calendar/auth/get-user').then((response)=> {
            setuserLogo(response.data.picture)
            setUserName(response.data.name)
        })
    }, [])

    return (
    <div className='w-full relative flex items-center h-fit p-3 bg-slate-100'>
        <section className='relative flex-1'>
            <h1 className='text-2xl sm:text-4xl'>Calendar</h1>
            <p className='top-[-8px] relative text-xs sm:text-lg left-1 underline'>Mahinda Rajapaksha College Homagama.</p>
        </section>
        <h4 className='mr-2 text-sm hidden sm:block'>{userName}</h4>
        <img className='w-[45px] sm:mr-0 sm:w-[50px] rounded-full' src={userLogo} alt="dp" />
    </div>
  )
}

export default Header
