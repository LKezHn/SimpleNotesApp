
const { model, Schema } = require('mongoose');

const groupNoteSchema = new Schema({
  noteTitle: {
    type: String,
    required: true,
  },
  noteDescription: {
    type: String,
    required: true
  },
  author: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
},{
  timestamps: true
})

module.exports = model('groupNote', groupNoteSchema);