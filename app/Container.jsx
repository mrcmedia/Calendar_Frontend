import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Oval, RotatingLines } from 'react-loader-spinner';
import BirthdayContainer from './BirthdayContainer'
import EventContainer from './EventContainer'
import { deleteCookie } from 'cookies-next';
import { base64decode } from 'nodejs-base64';


async function GetData(){
  try
  {
    const response = await axios.get('/api/calendar/operations/get-events');
    return response.data.items;
  }
  catch(err)
  {
    console.error(err.response);
  }
};


const Container = () => {

  const Timer = useRef();
  const TimeOut = useRef();

  const [data , setData] = useState([]);
  const [isload , setIsload] = useState(true);
  const [isBuffer , setIsBuffer] = useState(false);

  useEffect(() => {
    if(isload)
    {
      setIsBuffer(true);
      async function get()
      {
        setData(await GetData())
        setIsBuffer(false);
      }
      get()
      setIsload(false);
    }
  })
   
  return (
    <div className='w-full h-fit md:h-full relative sm:flex block md:flex-row flex-col'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className='md:flex-1 md:h-full h-fit w-full overflow-y-hidden sm:overflow-y-scroll'>
        <h1 className='text-3xl bg-white-600 block lg:relative  bg-white shadow-md p-4'>Events for the day</h1>
        <div className='w-full h-fit'>
            
            {
              data.length > 0 ? 
              data.map((items) => {
                  try
                  {
                    if(JSON.parse(base64decode(items.description)).type === "Event")
                    {
                      return(
                        <EventContainer key={items.id}
                        location={items.location}
                        summary={items.summary}
                        description={JSON.parse(base64decode(items.description)).description}
                        stDate={new Date(items.start.dateTime).toLocaleString()}
                        endDate={new Date(items.end.dateTime).toLocaleString()}
                        id={items.id}
                        type="Event"
                        />
                      )
                    }
                  }
                  catch(err)
                  {
                    if(err instanceof SyntaxError)
                    {
                      return(
                        <span className='fixed lg:absolute text-center flex-col bg-slate-200 lg:bg-none  top-0 left-0 space-x-5 right-0 bottom-0 flex items-center justify-center '>
                          <h1 className='text-5xl mb-5'> Runtime Error!</h1>
                          <p>please use this website for custormize calendar todos </p>
                          <p className='text-xs'>Note : you have to delete all events that submitted from standard google calendar to use this website</p>
                          <p className='text-xs'>Recomended : setup new google account</p>
                        </span>
                      )
                    }
                  }
                })
              : isBuffer ? 
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
              : <span className='fixed lg:absolute bg-slate-200 lg:bg-none flex-col space-y-5  top-0 left-0 space-x-5 right-0 bottom-0 flex items-center justify-center '>
                <h1 className='text-5xl'><i className="fa fa-bullhorn" aria-hidden="true"></i></h1>
                <h1 className='text-3xl '>Nothing to see here !</h1>
              </span>
            }
        </div>
      </div>
      <div className='lg:flex-[0.3] md:flex-[0.5] shadow-2xl sm:h-full h-fit overflow-y-hidden sm:overflow-y-scroll'>
        <h1 className='shadow-md shadow-slate-400 py-5 px-3 bg-blue-600 text-white text-xl'>Birthdays for the day</h1>
        {
          data.map(({description , summary , id , start}) => {

            try
            {
              if(JSON.parse(base64decode(description)).type === "Birthday")
              {
                return(
                  <BirthdayContainer key={id}
                  summary={summary}
                  description={JSON.parse(base64decode(description)).description}
                  stDate={new Date(start.dateTime).toDateString()}
                  id={id}
                  type="Birthday"
                  />
                )
              }
            }
            catch(err)
            {
              if(err instanceof SyntaxError)
              {
                return(
                  <span className='fixed lg:absolute text-center bg-slate-200 lg:bg-none flex-col top-0 left-0 p-5 right-0 bottom-0 flex items-center justify-center '>
                    <h1 className='text-4xl mb-1 md:mb-5'> Runtime Error!</h1>
                    <p className='mb-5 md:mb-0'>please use this website for custormize calendar todos </p>
                    <p className='text-xs'>Note : you have to delete all events that submitted from standard google calendar to use this website</p>
                    <p className='text-xs'>Recomended : setup new google account</p>
                  </span>
                )
              }
            }
          })
        }
      </div>
    </div>
  )
}

export default Container
