const asyncHandler = require('express-async-handler')
const Code = require('../models/codeModel')
const randomCodeGenerator = require('../utils/randomCodeGenerator')

const getNewCode = asyncHandler(async (req, res) => {
  let code = randomCodeGenerator()

  // check if duplicate exists
  const sameCode = await Code.findOne({ code })
  if (sameCode) code = code + '1'

  // save to db
  const result = await Code.create({ code })

  // return to client
  res.status(200).json({
    status: 200,
    data: result,
  })
})

// check if good code
// POST method
// /codes
const checkCode = asyncHandler(async (req, res) => {
  const enteredCode = req.body.code.toUpperCase()
  const code = await Code.findOne({ code: enteredCode })

  // code does not exist
  if (!code)
    return res.status(200).json({
      status: 400,
      message: 'Wrong code',
    })

  // code is already used
  if (code.used === true)
    return res.status(200).json({
      status: 400,
      message: 'Code is already used',
    })

  // good code
  return res.status(200).json({
    status: 200,
    message: 'Success',
  })
})

// update used code
const updateCode = asyncHandler(async (req, res) => {
  const { code, used, user } = req.body
  const enteredCode = req.body.code.toUpperCase()

  // update db
  const result = await Code.updateOne(
    {
      code: enteredCode,
    },
    {
      used,
      guest: user,
    }
  )

  // response
  res.status(200).json({
    status: 200,
    data: result,
  })
})

module.exports = {
  getNewCode,
  checkCode,
  updateCode,
}
