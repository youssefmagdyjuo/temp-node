const express = require('express');
const app = express()
let notes = [
    { id: 1, title: "First Note", content: "This is my first note." },
    { id: 2, title: "Second Note", content: "This is my second note." }
];

app.use(express.json())
app.use(express.static('public'))
// get method 
app.get('/api/notes', (req, res) => {
    res.status(200).json(notes)
})

// post method 
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    if (!newNote.title || !newNote.content) {
        return res.status(400).json({
            success: false,
            message: "Please provide title and content"
        });
    }
    const noteWithId = { id: notes.length + 1, ...newNote };
    notes.push(noteWithId);
    res.status(201).json({
        success: true,
        message: "Note added successfully",
        data: noteWithId
    });
})

app.listen(5000, () => {
    console.log('server is listening on port 5000....');
})


