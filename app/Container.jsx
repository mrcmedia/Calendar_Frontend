import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Oval, RotatingLines } from 'react-loader-spinner';
import BirthdayContainer from './BirthdayContainer'
import EventContainer from './EventContainer'



const Container = () => {

  const [data , setData] = useState([]);

  useEffect(() => {
    setData([]);
    async function GetData(){
      const response = await axios.get('/api/calendar/operations/get-events');
      setData(response.data);
    };
    GetData();
  
  },[])

  useEffect(() => {
    data.map((items)=> {
      console.log(items.start);
    })
  },[data])
  
  return (
    <div className='w-full h-fit md:h-full relative sm:flex block md:flex-row flex-col'>
      <div className='md:flex-1 md:h-full h-fit w-full overflow-y-hidden sm:overflow-y-scroll'>
        <h1 className='text-3xl bg-white-600 block lg:relative  bg-white shadow-md p-4'>Events for the day</h1>
        <div className='w-full h-fit'>
            
            {
              data.length > 0 ? 
              data.map((items) => {
                  return(
                    <EventContainer
                    summary={items.summary}
                    description={items.description}
                    stDate={new Date(items.start.dateTime).toLocaleString()}
                    endDate={new Date(items.end.dateTime).toLocaleString()}
                    />
                  )
                })
              : 
                  <span className='fixed lg:absolute bg-white lg:bg-none  top-0 left-0 space-x-5 right-0 bottom-0 flex items-center justify-center '>
                  <Oval
                    height={30}
                    width={30}
                    color="black"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="gray"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                  <p>Loading ...</p>
              </span>
            }
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
