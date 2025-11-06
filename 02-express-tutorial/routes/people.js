const express = require('express');
const router =express.Router()
const { getPeople, createPersone, updatePersone, deletePersone } = require('../controllers/people')

// // GET METHOD
// router.get('/', getPeople)

// // POST METHOD
// router.post('/',createPersone )

// // PUT METHOD
// router.put('/:id', updatePersone)

// // DELETE METHOD
// router.delete('/:id', deletePersone)

// == OR ==
router.route('/').get(getPeople).post(createPersone);
router.route('/:id').put(updatePersone).delete(deletePersone)

module.exports= router
