
const note = require('../models/noteModel')


const getNotes = async (req, res) => {
    try {
        const notes = await note.find({})
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const createNote = async (req, res) => {
    try {
        const newNote = await req.body
        if (!newNote.title || !newNote.content) {
            return res.status(400).json({
                success: false,
                message: "Please provide title and content"
            });
        }
        await note.create(newNote)
        res.status(200).json({
            success: true,
            message: "Note added successfully",
            data: newNote
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await note.findByIdAndUpdate(id, req.body)
        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: `no note with id : ${id}`
            })
        }
        const updatedNoteData = await note.findById(id)
        res.status(200).json({ success: true, data: updatedNoteData })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await note.findByIdAndDelete(id)

        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: `no note with id : ${id}`
            })
        }
        res.status(200).json({
            success: true,
            message: `Note with id ${id} deleted successfully`,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = { getNotes, createNote, updateNote, deleteNote }
