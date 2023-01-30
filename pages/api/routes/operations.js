const { default: axios } = require('axios');
const express = require('express')
const {google} = require('googleapis')
const { base64decode } = require('nodejs-base64');
const config = require('config')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const {VerifyError} = require('../../../utils/CustomErrors')

const {OAuth2} = google.auth;

const router = express.Router();

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
)


function Verrify(request)
{
    const auth_cookie = cookie.parse(request.headers.cookie).auth;
    if(auth_cookie)
    {
        return jwt.verify(auth_cookie , process.env.JWT_SECRET).email;
    }
    else{
        throw new VerifyError('Cookie error')
    }
}

router.get('/create-event', async (req,res) => {
    
    try
    {
        const email = Verrify(req);
        const rt = await axios.get(`${config.get('git_url')}/${email}`,
        {
            headers:{
            "Authorization":`${process.env.GITPA_TOKEN}`,
            "Content-Type":"application/json"
            }
        });
        const refresh_token = base64decode(rt.data.content)
        oauth2Client.setCredentials({
            refresh_token:refresh_token
        })

        const calendar = google.calendar({version:'v3' , auth:oauth2Client})

        const response = await calendar.events.insert({
            calendarId:'primary',
            requestBody:{
                summary:"Ado aye balamua aa",
                location:"Homagama, Sri Lanka",
                description:"Kohomada machan ithin aaaa",
                start:{
                    dateTime:new Date('2023-01-30T15:00:30')
                },
                end:{
                    dateTime:new Date('2023-01-30T16:00:30')
                },
                colorId:7
            }
        })
        res.status(response.status).json(response.data);
    }
    catch(err)
    {
        if(err instanceof jwt.JsonWebTokenError)
        {
            res.status(400).json(err.message);
        }
        else if(err instanceof VerifyError)
        {
            res.status(400).json(err.message);
        }
        else
        {
            res.status(err.response.status).json(err.message)
        }
    }
});

router.get('/delete-event', async (req,res) => {

    try
    {
        const rt = await axios.get(`${config.get('git_url')}/${req.query.email}`,
        {
            headers:{
            "Authorization":`${process.env.GITPA_TOKEN}`,
            "Content-Type":"application/json"
            }
        });
        const refresh_token = base64decode(rt.data.content)
        oauth2Client.setCredentials({
            refresh_token:refresh_token
        })

        const calendar = google.calendar({version:'v3' , auth:oauth2Client})

        const response = await calendar.events.list({
            calendarId:"primary",
        })
        
        console.log(new Date(Date.now('asia/colombo')))
        res.json(response.data.items)
    }
    catch(err)
    {
        res.json(err.message)

    }
})

module.exports = router;













// const date = new Date();

// // ✅ Get a string according to a provided Time zone
// alert(
//   date.toLocaleString('si-LK', {
//     timeZone: 'Asia/Colombo',
//   }),
// ); 