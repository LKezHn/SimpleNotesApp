
const express = require('express');
const router = express.Router();

const { userIsAuth, signUp, login, getUserInfo, updateUserInfo } = require('../controllers/user.controller')
const { createNote, getAllNotes, getNote, updateNote, deleteNote } = require('../controllers/note.controller');
const { createGroup, joinGroup, getGroupInfo, addNote, getUserGroups, getGroupNotes } = require('../controllers/group.controller')

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
// Update info of an user
router.put('/me/edit', verifyToken, updateUserInfo)

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
router.post('/groups/new', verifyToken, createGroup)
// Join to a group
router.post('/groups/:code/join', verifyToken, joinGroup)
//Get all the groups
router.get('/groups/:id', verifyToken, getGroupInfo)
// Add note to group
router.post('/groups/:id/newNote', verifyToken, addNote)
// Get all notes of an group
router.get('/groups/:id/notes', verifyToken, getGroupNotes)
// Get user's groups
router.get("/groups", verifyToken, getUserGroups)

module.exports = router

//db.users.aggregate([{ $lookup:{ from: "notes", localField: "notes", foreignField: "_id", as: "notes"}},{ $unwind: "$notes"},{ $sort: {"notes.createdAt": -1}},{$group: {"_id": "$_id","notes": { $push: "$notes"}}}]).pretty()
/** db.users.aggregate({ $project: { _id: 0, NumberOfNotes: { $size: "$notes"}}}).pretty() */