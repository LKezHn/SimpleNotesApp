
const jwt = require('jsonwebtoken')
const config = require('../config');

const User = require('../models/User');

function userIsAuth(req, res, next) {
  if (req.userID) {
    res.status(200).send({ auth: true })
  }
}

async function signUp (req, res, next) {
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
}

async function login(req, res, next) {
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
}

async function getUserInfo(req, res, next) {
  const user = await User.findById(req.userID, { password: 0, notes: 0 });
  if (!user) {
    return res.status(404).send({ message: 'User not found' })
  }
  res.status(200).send(user);
}

module.exports = {
  userIsAuth, signUp, login, getUserInfo
}