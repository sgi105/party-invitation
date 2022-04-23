var express = require('express')
var router = express.Router()
const { createUser, getUser } = require('../controllers/userController')

/* GET users listing. */
router.get('/:number', getUser)

router.post('/', createUser)

module.exports = router
