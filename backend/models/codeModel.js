const mongoose = require('mongoose')

const codeSchema = mongoose.Schema(
  {
    code: String,
    ownerNumber: String,
    ownerName: String,
    guestNumber: String,
    guestName: String,
    used: {
      default: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
)

// - code
// - owner
// - user
// - used

module.exports = mongoose.model('Code', codeSchema)
