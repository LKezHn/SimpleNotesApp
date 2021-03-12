const { model, Schema } = require('mongoose')


const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  members : [{
    ref: "User",
    type: Schema.Types.ObjectId
  }],
  notes: [{
      ref: "GroupNote",
      type: Schema.Types.ObjectId
  }]
})

module.exports = model("Group", groupSchema);