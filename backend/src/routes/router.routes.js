const express = require('express');
const mongoose = require('mongoose')
// JsonWebToken
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User.js');
const Note = require('../models/Note.js');
const config = require('../config.js');
const verifyToken = require('../middlewares/verifyrToken.js');


router.post('/verifyToken', verifyToken, function (req, res, next) {
  if (req.userID) {
    res.status(200).send({ auth: true })
  }
});
/* 
  Register an user and get the token
*/
router.post('/signup', async function (req, res, next) {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password
  });
  user.password = await user.encryptPass(user.password);
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 30 * 60
  });
  await user.save();
  res.status(200).send({ status: 'saved', token })
});

// Get the info of an authenticated user
router.get('/me', verifyToken, async function (req, res, next) {
  const user = await User.findById(req.userID, { password: 0, notes: 0 });
  if (!user) {
    return res.status(404).send({ message: 'User not found' })
  }
  res.status(200).send(user);
});

// Auth of an registered user
router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).send({ auth: false, messsage: 'User not found' });
  }

  const passIsValid = await user.verifyPass(password, user.password);
  if (!passIsValid) {
    return res.status(401).send({ auth: false, token: null })
  }

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 30 * 60
  })

  res.status(200).send({ auth: true, token, id: user._id });
});

//Create a note
router.post('/createNote', verifyToken, async function (req, res, next) {
  const { noteTitle, noteDescription } = req.body;
  const note = new Note({
    noteTitle,
    noteDescription
  })

  const user = User.findById(req.userID, { password: 0 });

  if (!user) {
    return res.status(401).send({ auth: false })
  }

  await note.save()
  await User.updateOne({ _id: req.userID }, {
    $addToSet: {
      notes: note._id
    }
  })


  return res.status(200).send({ message: 'Note added' })
})

/** db.users.aggregate({ $project: { _id: 0, NumberOfNotes: { $size: "$notes"}}}).pretty() */

router.get('/numberOfNotes', verifyToken, async function (req, res, next) {
  const user = await User.findById(req.userID, { _id: 0, username: 1 })
  const notes = await User.aggregate().match({ username: user.username }).project({ Number: { $size: "$notes" } })
  if (!notes) {
    return res.status(404).send({ message: 'User not found' })
  }
  res.status(200).send({ quantity: notes[0].Number })
})

// Get all notes of an user
router.get('/notes', verifyToken, async function (req, res, next) {
  const user = await User.findById(req.userID, { username: 1, _id: 0 })
  const userNotes = await User.aggregate([
    { $match: 
      { username: user.username}
    },
    { $lookup:
      { from: "notes", localField: "notes", foreignField: "_id", as: "notes"}
    },
    { $unwind: "$notes"},
    { $sort: 
      {"notes.createdAt": -1}
    },
    { $limit: 5},
    {$group: 
      {
        "_id": "$_id",
        "notes": { $push: "$notes"}
      }
    }
  ])

  if (!user) {
    return res.status(404).send({ message: 'User not found' })
  }
  res.status(200).send(userNotes)

})

// Get one note of an user
router.get('/notes/:id', verifyToken, async function (req, res, next) {
  const data = await Note.findOne({ _id: req.params.id })
  res.send(data)
})

// Update one note
router.put('/notes/:id', verifyToken, async function (req, res, next) {
  const { noteTitle, noteDescription } = req.body
  await Note.findOneAndUpdate({ _id: req.params.id }, {
    noteTitle,
    noteDescription
  })
  res.status(200).send({ message: 'Note updated' })

})

//Delete a note
router.delete('/notes/:id', verifyToken, async function (req, res, next) {
  const noteToDelete = await Note.findById({ _id: req.params.id }, { _id: 1 })
  await Note.deleteOne({ _id: noteToDelete._id })
  await User.updateOne({ _id: req.userID }, {
    $pull: {
      notes: {
        $in: [noteToDelete._id]
      }
    }
  })

  res.status(200).send({ message: 'Note deleted' })
})

module.exports = router


//db.users.aggregate([{ $lookup:{ from: "notes", localField: "notes", foreignField: "_id", as: "notes"}},{ $unwind: "$notes"},{ $sort: {"notes.createdAt": -1}},{$group: {"_id": "$_id","notes": { $push: "$notes"}}}]).pretty()
