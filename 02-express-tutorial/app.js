const express = require('express');
const app = express();
const morgan = require('morgan')
const { people } = require('./data')

// static assets 
app.use(express.static('./methods-public'));
// parse form data (html form via action & method)
app.use(express.urlencoded({ extended: false }))
// parse json (javascript)
app.use(express.json())

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
    res.send(`<h1>Home Page</h1>`)
})

app.post('/api/people', (req, res) => {
    const {name} = req.body
    if(!name){
        return res.status(400).json({success: true,msg:'please provied name value'})
    }
    res.status(201).json({success: true,person: name})
})

app.post('/login', (req, res) => {
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Get Out')
})


app.listen(5000, () => {
    console.log('server is lisitening on port 5000....');
})