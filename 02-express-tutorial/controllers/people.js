const { people } = require('../data')

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people })
    res.send(`<h1>Home Page</h1>`)
}

const createPersone = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: true, msg: 'please provied name value' })
    }
    res.status(201).json({ success: true, person: name })
}

const updatePersone = (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const person = people.find(p => p.id == Number(id))
    if (!person) {
        return res.status(404)
            .json({ success: false, msg: `no person with id ${id}` })
    }
    const newPeople = people.map(p => {
        if (p.id == id) {
            p.name = name
        }
        return p
    })
    res.status(200).json({ success: true, newPeople })
}


const deletePersone = (req, res) => {
    const { id } = req.params
    const person = people.find(p => p.id == Number(id))
    if (!person) {
        return res.status(404)
            .json({ success: false, msg: `no person with id ${id}` })
    }
    const newPeople = people.filter(p => {
        return p.id != id
    })
    res.status(200).json({ success: true, newPeople })
}

module.exports = { getPeople, createPersone, updatePersone, deletePersone }