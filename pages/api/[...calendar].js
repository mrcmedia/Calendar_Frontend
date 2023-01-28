const Express = require('express')
const cors = require('cors');

const app = Express();
const auth = require('./routes/auth')
const ops = require('./routes/operations')

app.use('/api/calendar/auth', auth);
app.use('/api/calendar/operations', ops);
app.use(Express.urlencoded({extended:false}));
app.use(cors({
    origin:'http://localhost:3000'
}))

export default app;
