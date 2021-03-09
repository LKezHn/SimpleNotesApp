
const express = require('express');
const router = express.Router();

const { userIsAuth, signUp, login, getUserInfo } = require('../controllers/user.controller')
const { createNote, getAllNotes, getNote, updateNote, deleteNote } = require('../controllers/note.controller');
const { createGroup, joinGroup, getGroups } = require('../controllers/group.controller')

const verifyToken = require('../middlewares/verifyrToken.js');

// -------------------------------------------------------------------------
// User Routes
// -------------------------------------------------------------------------

// Auth user
router.post('/verifyToken', verifyToken, userIsAuth);
//Register an user and get the token
router.post('/signup', signUp);
// Get the info of an authenticated user
router.get('/me', verifyToken, getUserInfo);
// Auth of an registered user
router.post('/login', login);

// -------------------------------------------------------------------------
// Notes Routes
// -------------------------------------------------------------------------

//Create a note
router.post('/createNote', verifyToken, createNote)
// Get all notes of an user
router.get('/notes', verifyToken, getAllNotes)
// Get one note of an user
router.get('/notes/:id', verifyToken, getNote)
// Update one note
router.put('/notes/:id', verifyToken, updateNote)
//Delete a note
router.delete('/notes/:id', verifyToken, deleteNote)

// -------------------------------------------------------------------------
// Group Routes
// -------------------------------------------------------------------------

// Create a new group
router.post('/newGroup', verifyToken, createGroup)
// Join to a group
router.post('/joinGroup', verifyToken, joinGroup)
// Get all the groups
router.get('/groups', verifyToken, getGroups)

module.exports = router

//db.users.aggregate([{ $lookup:{ from: "notes", localField: "notes", foreignField: "_id", as: "notes"}},{ $unwind: "$notes"},{ $sort: {"notes.createdAt": -1}},{$group: {"_id": "$_id","notes": { $push: "$notes"}}}]).pretty()
/** db.users.aggregate({ $project: { _id: 0, NumberOfNotes: { $size: "$notes"}}}).pretty() */