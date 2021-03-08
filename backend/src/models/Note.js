const { model, Schema} = require('mongoose');

const noteSchema = new Schema({
  noteTitle: {
    type: String,
    required: true,
  },
  noteDescription: {
    type: String,
    required: true
  }
},{
  timestamps: true
})

module.exports = model("Note", noteSchema);