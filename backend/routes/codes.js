var express = require('express')
var router = express.Router()
const {
  getNewCode,
  checkCode,
  updateCode,
} = require('../controllers/codeController')

/* generate new code */
router.get('/', getNewCode)

// check if good code
router.post('/', checkCode)

// update used code
router.put('/', updateCode)

module.exports = router
