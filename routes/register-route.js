const express = require('express')
const { saveRegistration,loginUser } = require('../controller/register-controller')

const router = express.Router()

router.post('/register', saveRegistration)
router.post('/login', loginUser)

module.exports = router;