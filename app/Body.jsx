import axios from 'axios';
import Hamburger from 'hamburger-react';
import React, { useEffect, useState } from 'react'
import Clock from 'react-live-clock';

const Body = () => {
  const [date] = useState(new Date().toLocaleString("en-LK", {timeZone: "Asia/Colombo", dateStyle:'long'}));
  const [DayOfWeek] = useState(new Date().toLocaleString("en-LK", {timeZone: "Asia/Colombo", weekday:'long'}));

  const [userLogo, setuserLogo] = useState('');
  const [userName, setUserName] = useState('');
  const [IsBig , setIsBig] = useState(window.innerWidth >= 768);
  const [Width, setWidth] = useState(0);

  useEffect(() => {
    axios.get('/api/calendar/auth/get-user').then((response)=> {
        setuserLogo(response.data.picture)
        setUserName(response.data.name)
    })
  }, [])

  function CheckWidth(event)
  {
    if(Width === event.target.innerWidth)
    {
      if(event.target.innerWidth >= 768)
      {
        setIsBig(true);
        HandleMenu(true);
      }
      else if(event.target.innerWidth < 768)
      {
        setIsBig(false);
        HandleMenu(false);
      }
    }
    setWidth(event.target.innerWidth);
  } 
  useEffect(() => {
    window.addEventListener('resize' , CheckWidth);
    return() => {
      window.removeEventListener('resize' , CheckWidth)
    }
  },[])
  

  const HandleMenu = (e) => {
    setIsBig(e);
    if(e)
    {
      document.querySelector('#menu').style.display = 'block';
      document.getElementById('menu').classList.remove('closeme');
      document.getElementById('menu').classList.add('openme');
    }
    else
    {
      document.getElementById('menu').classList.remove('openme');
      document.getElementById('menu').classList.add('closeme');
      setTimeout(() => {
        document.querySelector('#menu').style.display = 'none';
      }, 200);
    }
  }

  return (
    <div className='flex-1 w-full relative'>
      <section className='shadow-md text-white absolute top-0 left-0 right-0 z-40 bg-blue-600 flex items-center'>
        <section className='block '><Hamburger size={'15'} toggled={IsBig} onToggle={(toggle) => {HandleMenu(toggle)}}/></section>
        <h2 className='p-1 sm:p-3 text-xl'>Calendar Operations.</h2>
      </section>
      <div className='absolute  top-0 left-0 right-0 bottom-0 flex'>
      <div id='menu' className='lg:flex-[0.2] hidden md:block md:flex-[0.4] mt-12 shadow-2xl pb-5 md:pb-0 overflow-scroll'>
        <section className='w-full  bg-blue-600 text-white shadow-xl'>
          <section className='flex items-center p-2 sm:p-0'>
            <section className=' px-3 mt-1 flex-1 sm:mt-3 w-full flex flex-col'>
                <Clock
                format={'HH:mm'}
                className="text-4xl sm:text-5xl"
                ticking={true} />
                <h1 className='text-xl sm:text-3xl'>{DayOfWeek}</h1>
                <h1 className='text-sm sm:text-xl relative bottom-2 mb-1 sm:mb-3'>{date}</h1>
            </section>
            <section className='md:hidden flex flex-col items-center justify-center pr-3'>
              <img className='rounded-full w-[50%]' src={userLogo} alt="logo/ac" />
              <p>{userName}</p>
            </section>
          </section>
        </section>
        <section className='py-5 w-full shadow-md bg-slate-50'>
          <h1 className='text-center text-md'>Add Event</h1>
          <form className='w-[90%] mx-auto'>
            <label className='text-sm' htmlFor="summary">Summary :</label>
            <input placeholder='Summary' type="text" className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='summary' />

            <label className='bg-white text-sm' htmlFor="description">Description :</label>
            <textarea placeholder='Description' className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mb-3 mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='description' />

            <label className='bg-white text-sm' htmlFor="startDate">Start Date & Time : </label>
            <input value={'2022-04-23T14:00:30'} type="datetime-local" className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='startDate' />

            <label className='bg-white text-sm' htmlFor="endDate">End Date & Time : </label>
            <input value={'2022-04-23T14:00:30'} type="datetime-local" className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='endDate' />

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
            <input type="text" placeholder='Happy Birthday' className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='summary' />

            <label className='bg-white text-sm' htmlFor="description">Who is he/her :</label>
            <textarea placeholder='teacher security' className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mb-3 mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='description' />

            <label className='bg-white text-sm' htmlFor="startDate">Date Of Birth : </label>
            <input type="datetime-local" value={'2022-04-23T14:00:30'} className=' outline-slate-200 bg-white outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='startDate' />


            <button className='w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700'>Add Birthday</button>
          </form>
      </div>
      <div className='z-0 w-fill h-full pt-12 relative flex-1'>
      </div>
      </div>
    </div>
  )
}

export default Body




// delay-1000 ease-in-out transition