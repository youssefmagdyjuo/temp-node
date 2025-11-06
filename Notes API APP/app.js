const express = require('express');
const app = express()
const notesRouter = require('./routes/notes')
const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://youssef_notesapi:youssef_notesapi@notesapi.fhc9l1q.mongodb.net/?appName=NotesAPI"

//Midellweres
app.use(express.json())
app.use(express.static('public'))

//Routes
app.use('/api/notes', notesRouter)


mongoose.connect(DB_URL)
    .then(() => {
        console.log('connected');
        // RUN SERVER
        app.listen(5000, () => {
            console.log('server is listening on port 5000....');
        })
    })
    .catch((err) => {
        console.log(err);
    })

