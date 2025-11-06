const express = require('express')
const app = express()
const mongoose = require('mongoose')
const productRouter = require('./routes/productRoute')


//midllwere
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//rouetes
app.use('/api/products',productRouter)

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})


mongoose.connect("mongodb+srv://youssefMagdy:ItZAQghQeV6aPkNW@backenddb.efa8pgx.mongodb.net/?appName=BackendDB")
    .then(() => {
        console.log('connected');
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        })
    })
    .catch((err) => {
        console.log(err);
    })