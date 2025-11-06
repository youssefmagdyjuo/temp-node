const express = require('express');
const app = express();
const peopleRouter = require('./routes/people')
const authRouter = require('./routes/auth')
// static assets 
app.use(express.static('./methods-public'));
// parse form data (html form via action & method)
app.use(express.urlencoded({ extended: false }))
// parse json (javascript)
app.use(express.json())

app.use('/api/people',peopleRouter)
app.use('/login',authRouter)





app.listen(5000, () => {
    console.log('server is lisitening on port 5000....');
})