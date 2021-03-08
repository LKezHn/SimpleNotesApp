const { Schema, model } = require('mongoose');
// BCrypt for encrypt passwords
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [
    {
      ref: "Note",
      type: Schema.Types.ObjectId
    }
  ]
});

userSchema.methods.encryptPass = async (password) =>{
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

userSchema.methods.verifyPass = async (password, encryptedPassword) =>{
  return await bcrypt.compare(password, encryptedPassword);
}

module.exports = model('User', userSchema);