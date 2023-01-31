import axios from 'axios';
import Hamburger from 'hamburger-react';
import React, { useEffect, useState } from 'react'
import Clock from 'react-live-clock';
import {useForm} from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import Container from './Container';
const SriLanka = require('get-srilanka-districts-cities');




const Body = () => {

  //#region Constances

  const [date] = useState(new Date().toLocaleString("en-LK", {timeZone: "Asia/Colombo", dateStyle:'long'}));
  const [DayOfWeek] = useState(new Date().toLocaleString("en-LK", {timeZone: "Asia/Colombo", weekday:'long'}));
  const [userLogo, setuserLogo] = useState('');
  const [userName, setUserName] = useState('');
  const [IsBig , setIsBig] = useState(window.innerWidth >= 1024);
  const [Width, setWidth] = useState(0);
  const [SlCities, setSlCities] = useState([])
  const [Load, setLoad] = useState(false);
  const [customFilter, setCustomFilter] = useState(true);

  const EventForm = useForm();
  const BirthdayForm = useForm();

  //#endregion

//#region useEffects  
  useEffect(() => {
    axios.get('/api/calendar/auth/get-user').then((response)=> {
        setuserLogo(response.data.picture)
        setUserName(response.data.name)
    })
  }, [])

  useEffect(() => {
    if(SlCities.length == 0)
    {
      SriLanka.provinceList()[0].map((provices) => {
        SriLanka.getDistrictList(provices)[0].map((cities) => {
          SriLanka.cityList(provices , cities)[0].map((items) => {
            setSlCities(SlCities => [...SlCities , items]);
          })
        })
      })
    }
  }, [SlCities])

  useEffect(() => {
    window.addEventListener('resize' , CheckWidth);
    return() => {
      window.removeEventListener('resize' , CheckWidth)
    }
  },[])

//#endregion

//#region Basicfunctions

  

  function CheckWidth(event)
  {
    if(Width === event.target.innerWidth)
    {
      if(event.target.innerWidth >= 1024)
      {
        setIsBig(true);
        HandleMenu(true);
      }
      else if(event.target.innerWidth < 1024)
      {
        setIsBig(false);
        HandleMenu(false);
      }
    }
    setWidth(event.target.innerWidth);
  } 
  

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
  //#endregion




  const handleEventSubmit = async (event) => {
    setLoad(true);
    try
    {
      const response = await axios.post('/api/calendar/operations/create-event',event)
      document.getElementById('eventForms').reset();
      setLoad(false);
    }
    catch(err)
    {
      setLoad(false);
      console.error(err.response);
    }
  }

  const handleBirthdaySubmit = async (event) => {
    setLoad(true);
    try
    {
      const response = await axios.post('/api/calendar/operations/create-birthday',event)
      document.getElementById('birthdayForms').reset();
      setLoad(false);
      console.log(response.data);
    }
    catch(err)
    {
      setLoad(false);
      console.error(err.response);
    }

    console.log(event);

  }


  return (
    <div className='flex-1 w-full relative'>
      <section className='shadow-md text-white absolute top-0 left-0 right-0 z-40 bg-blue-600 flex items-center'>
        <section className='block '><Hamburger size={'15'} toggled={IsBig} onToggle={(toggle) => {HandleMenu(toggle)}}/></section>
        <h2 className='p-1 sm:p-3 text-xl'>Calendar Operations.</h2>
      </section>
      <div className='absolute  top-0 left-0 right-0 bottom-0 flex'>
      <div id='menu' className='lg:flex-[0.2] hidden lg:block mt-11 sm:mt-12 shadow-2xl pb-5 md:pb-0 overflow-scroll'>
        <section className='w-full  bg-blue-600 text-white shadow-xl'>
          <section className='flex items-center p-4 sm:p-0'>
            <section className=' px-3 mt-1 flex-1 sm:mt-3 w-full flex flex-col'>
                <Clock
                format={'HH:mm'}
                className="text-4xl sm:text-5xl"
                ticking={true} />
                <h1 className='text-xl sm:text-3xl'>{DayOfWeek}</h1>
                <h1 className='text-sm sm:text-xl relative bottom-2 mb-1 sm:mb-3'>{date}</h1>
            </section>
            <section className='md:hidden flex flex-col items-center justify-center pr-3'>
            <img src={userLogo} width={'45'} height={'45'} className='w-[45px] sm:mr-0 sm:w-[50px] rounded-full' alt="dp" />
              <p>{userName}</p>
            </section>
          </section>
        </section>
        <section className='p-3 w-full'>
            <h2 className='text-lg'>Filters</h2>
            <section className='flex relative space-x-2 items-center'>
              <input checked={customFilter} onChange={(e) => {setCustomFilter(e.target.checked)}} id='today-filter' className='relative outline-none bottom-[1px]' type="checkbox"/>
              <label className='cursor-pointer' htmlFor="today-filter">Realtime Events And Birthdays</label>
            </section>
            {!customFilter && <section className='flex flex-col'>
              <label htmlFor="datefrom">From :</label>
              <input defaultValue={'2023-01-01'} className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 mb-3 outline-1 p-1 px-3 text-sm' type="date" id='datefrom' />

              <label htmlFor="datefrom">To :</label>
              <input defaultValue={'2023-01-01'} className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 mb-3 outline-1 p-1 px-3 text-sm' type="date" id='datefrom' />
            </section>}
          </section>
        <section className='py-5 w-full shadow-md bg-slate-50'>
          <h1 className='text-center text-md'>Add Event</h1>
          <form id='eventForms' onSubmit={EventForm.handleSubmit(handleEventSubmit)} className='w-[90%] mx-auto'>
            <label className='text-sm' htmlFor="summary">Summary :</label>
            <input name='summary' {...EventForm.register('summary', {required:true})} placeholder='Summary' type="text" className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 mb-3 outline-1 p-1 px-3 text-sm' id='summary' />
            {EventForm.formState.errors.summary && <p className='text-sm w-full text-red-600 mb-3'>summary required! (this is like a title)</p>}

            <label className=' bg-white text-sm' htmlFor="description">Description :</label>
            <textarea {...EventForm.register('description', {required:true})} name='description' placeholder='Description' className='bg-white outline-slate-200 mb-3 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='description' />
            {EventForm.formState.errors.description && <p className='text-sm w-full text-red-600 mb-3'>Description about event required!</p>}

            <label className='bg-white text-sm' htmlFor="startDate">Start Date & Time : </label>
            <input {...EventForm.register('startDate', {required:true})}  name='startDate' defaultValue={'2023-01-01T12:00'} type="datetime-local" className='bg-white mb-3 outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='startDate' />
            {EventForm.formState.errors.startDate && <p className='text-sm w-full text-red-600 mb-3'>Starting Date required!</p>}

            <label className='bg-white text-sm' htmlFor="endDate">End Date & Time : </label>
            <input {...EventForm.register('endDate', {required:true})} name='endDate' defaultValue={'2023-01-01T12:00'} type="datetime-local" className='bg-white mb-3 outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='endDate' />
            {EventForm.formState.errors.endDate && <p className='text-sm w-full text-red-600 mb-3'>Ending Date required!</p>}

            <label className='bg-white text-sm' htmlFor="location">Location :</label>
            <select defaultValue='Pitipana Homagama, Sri Lanka' {...EventForm.register('location', {required:true})} name='location' className='bg-white outline-slate-200 mb-3 outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id="location">
            <option value={'Pitipana Homagama, Sri Lanka'}>Pitipana Homagama, Sri Lanka</option>
              {SlCities.length > 0 && SlCities.map((itemss) => {
                return (<option key={`${Math.random()} ${itemss} `} value={`${itemss}, Sri Lanka`}>{itemss}, Sri Lanka</option>)
              })}
            </select>
            {EventForm.formState.errors.location && <p className='text-sm w-full text-red-600 mb-3'>Location required!</p>}
            <button className=' w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700'>Add Event</button>
          </form>
          {Load && <span className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/80'>
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </span>}
        </section>
        <p className='bg-white text-center mt-3 text-slate-400'> ------ OR ------ </p>
        <h1 className='bg-white text-center text-md mt-5'>Add Birthday</h1>
        <form id='birthdayForms' onSubmit={BirthdayForm.handleSubmit(handleBirthdaySubmit)} className='bg-white w-[90%] mx-auto my-5'>
            <label className='bg-white text-sm' htmlFor="birthdayPerson">Bidthday Boy / Girl Name :</label>
            <input {...BirthdayForm.register('birthdayPerson', {required:true})} name='birthdayPerson' type="text" placeholder='Happy Birthday' className='bg-white outline-slate-200 outline rounded-sm w-full transition-shadow mt-1 mb-3 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='birthdayPerson' />
            {BirthdayForm.formState.errors.birthdayPerson && <p className='text-sm w-full text-red-600 mb-3'>Person Name / Post required!</p>}

            <label className='bg-white text-sm' htmlFor="birthdaydescription">Who is he/her :</label>
            <textarea {...BirthdayForm.register('birthdaydescription', {required:true})} name='birthdaydescription' placeholder='teacher security' className='bg-white outline-slate-200 outline mb-3 rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='birthdaydescription' />
            {BirthdayForm.formState.errors.birthdaydescription && <p className='text-sm w-full text-red-600 mb-3'>Some description required!</p>}

            <label className='bg-white text-sm' htmlFor="dateofbirth">Date Of Birth : </label>
            <input {...BirthdayForm.register('dateofbirth', {required:true})}  name='dateofbirth' type="date" defaultValue='2023-01-01' className=' outline-slate-200 mb-3 bg-white outline rounded-sm w-full transition-shadow mt-1 focus:shadow-sm focus:outline-blue-500 outline-1 p-1 px-3 text-sm' id='dateofbirth' />
            {BirthdayForm.formState.errors.dateofbirth && <p className='text-sm w-full text-red-600 mb-3'>Date of Birth required!</p>}
            <button className='w-full p-2 bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700'>Add Birthday</button>
          </form>
      </div>
      <div style={{display:IsBig && window.innerWidth < 1024 ? 'none' :'block'}} className='z-0 w-fill h-full pt-12 relative flex-1'>
        <Container/>
      </div>
      </div>
    </div>
  )
}

export default Body