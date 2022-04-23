const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    number: String,
    name: String,
    gender: String,
    going: {
      type: Boolean,
      default: true,
    },
    invitationCode: String,
    invitedCode: String,
    invitedBy: String,
  },
  {
    timestamps: true,
  }
)

// - number(unique)
// - name
// - gender
// - going
// - code
// - invitedBy

module.exports = mongoose.model('User', userSchema)
