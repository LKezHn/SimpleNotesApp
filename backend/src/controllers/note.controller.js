
const User = require('../models/User')
const Note = require('../models/Note')

async function createNote(req, res, next) {
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
}

async function getAllNotes(req, res, next) {
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
}

async function getNote(req, res, next) {
  const data = await Note.findOne({ _id: req.params.id })
  res.send(data)
}

async function updateNote(req, res, next) {
  const { noteTitle, noteDescription } = req.body
  await Note.findOneAndUpdate({ _id: req.params.id }, {
    noteTitle,
    noteDescription
  })
  res.status(200).send({ message: 'Note updated' })
  
}

async function deleteNote(req, res, next) {
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
}

module.exports = {
  createNote, getAllNotes, getNote, updateNote, deleteNote
}