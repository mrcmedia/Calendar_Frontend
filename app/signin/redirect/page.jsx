"use client";
import React, { useEffect } from 'react'
import cookie from 'js-cookie';
import axios from 'axios';

const page = () => {
    useEffect(() => {
        async function ado()
        {
            let code = cookie.get('code');
            console.log(`code is ${code}`)
            if(code !== undefined)
            {
                if(code.length > 0 )
                {
                    await axios.post('/api/calendar/auth/set-cookie/', {data:{code:code}}).then((response) => {
                        console.log(response.data);
                        cookie.remove('code');
                        code = '';
                        window.location.href = '/';
                    }).catch((error) => {
                        console.error(error);
                    })
                }
            }
        }
        ado();
    }, [])
    return (
    <div>
        Redirecting ...
    </div>
    )
}

export default page
