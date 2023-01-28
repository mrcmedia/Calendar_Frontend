const { default: axios } = require('axios');
const express = require('express')
const {google} = require('googleapis')
const { base64decode } = require('nodejs-base64');
const config = require('config')

const {OAuth2} = google.auth;

const router = express.Router();

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
)

router.get('/create-event', async (req,res) => {
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

        const response = await calendar.events.insert({
            calendarId:'primary',
            requestBody:{
                summary:"Ado aye balamua aa",
                location:"Homagama, Sri Lanka",
                description:"Kohomada machan ithin aaaa",
                start:{
                    dateTime:new Date('2022-04-23T14:00:30')
                },
                end:{
                    dateTime:new Date('2022-04-23T15:59:30')
                },
                colorId:7
            }
        })
        const date = new Date();

    }
    catch(err)
    {
        res.status(err.response.status).json(err.message)

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

        const calendar = google.calendar('v3')

        const response = await calendar.events.list({
            auth:oauth2Client,
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