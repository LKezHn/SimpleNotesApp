const User = require('../models/User')
const GroupNote = require('../models/GroupNote')
const Group = require('../models/Group')
const generateCode = require('../libs/generateCode');

async function createGroup(req, res){
  const { name } = req.body
  const code = generateCode()
  const user = User.findById(req.userID, { password: 0 })

  if(!user){
    return res.status(400).send({message: "user doesn't exists"})
  }
  const group = new Group({
    name,
    code
  })

  const data = await group.save()

  await Group.updateOne({_id: group._id},{
    $addToSet: {
      members: req.userID
    }
  })

  res.status(200).send({message: 'Group added', data })
}

async function joinGroup(req, res){
  const { code } = req.body
  const group = Group.find({code: code}, {password: 0})

  if(!group){
    return res.status(400).send({message: "Group doesn't exists"})
  }

  await Group.updateOne({ _id: group._id},{
    $addToSet: {
      members: req.userID
    }
  })

  res.status(200).send({message: 'User joined'})
}

async function getGroups(req, res){
  const groups = await Group.find(); 
  
  return res.status(200).send(groups)
}

async function addNote(req, res){

  const { noteTitle, noteDescription } = req.body
  const group = await Group.find({code: req.params.id})

  if(!group){
    return res.status(400).send({message: "Group doesn't exists"})
  }
  
  const note = new GroupNote({
    noteTitle,
    noteDescription,
    author: req.userID
  })
  await note.save()
  
  console.log(note._id)

  await Group.updateOne({code: req.params.id},{
    $addToSet:{
      notes: note._id
    }
  })

  res.status(200).send({message: 'Note added'})

}

async function getUserGroups(req, res){
  const groups = await Group.find({ members: [ req.userID]})
  res.status(200).send(groups)
}

async function getGroupNotes(req, res){
  const group = await Group.find({ code: req.params.id }, { code: 0, members: 0, name: 0 }).populate({
    path: 'notes',
    populate: {
      path: 'author',
      select: {
        password: 0,
        notes: 0,
        email: 0
      }
    }
  })
  res.status(200).send(group[0].notes)
}

async function changeGroupName(req, res){

  const { groupName } = req.body 

  await Group.findOneAndUpdate({ code: req.params.id }, {
    name: groupName
  })

  res.status(200).send({ message: 'Name updated'})
}

module.exports = {
  createGroup, joinGroup, getGroups, addNote, getUserGroups, getGroupNotes, changeGroupName
}