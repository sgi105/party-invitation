var express = require('express')
var router = express.Router()
const {
  createUser,
  getUser,
  countUser,
} = require('../controllers/userController')

/* GET users listing. */
router.get('/count', countUser)
router.get('/:number', getUser)

router.post('/', createUser)

module.exports = router
