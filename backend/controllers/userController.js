const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Code = require('../models/codeModel')
const randomCodeGenerator = require('../utils/randomCodeGenerator')

// @desc check for valid code, number, and create a new user. Then, update the used code's used status, and guest info.
// @route POST /users
const createUser = asyncHandler(async (req, res) => {
  let { number, name, gender, invitedCode } = req.body

  if (!(number && name && gender && invitedCode))
    return res.status(400).json({
      message: 'Please provide name, number, gender, and invitation code',
    })

  invitedCode = invitedCode.toUpperCase()

  // check for correct code
  const matchedCode = await Code.findOne({ code: invitedCode })

  // code does not exist, return error
  if (!matchedCode)
    return res.status(400).json({
      message: 'Wrong code',
    })

  // code is already used, return error
  if (matchedCode.used === true)
    return res.status(400).json({
      message: 'Code is already used',
    })

  // check if duplicate number
  const duplicateNumber = await User.findOne({ number })
  if (duplicateNumber)
    return res.status(400).json({
      message: 'You are already registered',
    })

  // update code to "used: true", "guest: name"
  const updatedCode = await Code.updateOne(
    {
      code: invitedCode,
    },
    {
      used: true,
      guestName: name,
      guestNumber: number,
    }
  )

  // create new code
  let invitationCode = randomCodeGenerator()

  // check if duplicate exists
  const duplicateCode = await Code.findOne({ code: invitationCode })
  if (duplicateCode) invitationCode = invitationCode + '1'

  // save new code
  const newCode = await Code.create({
    code: invitationCode,
    ownerNumber: number,
    ownerName: name,
  })

  // save data
  const result = await User.create({
    number,
    name,
    gender,
    invitedCode,
    invitationCode,
    invitedBy: matchedCode.ownerName,
  })

  // response
  return res.status(200).json(result)
})

// @desc get user number, and return invitation code/status
// @route GET /user/:number
const getUser = asyncHandler(async (req, res) => {
  let { number } = req.params

  // check
  const matchedCode = await Code.findOne({ ownerNumber: number })

  // code does not exist, return error
  if (!matchedCode)
    return res.status(400).json({
      message: 'Wrong code',
      n,
    })

  return res.status(200).json(matchedCode)
})

module.exports = { createUser, getUser }
