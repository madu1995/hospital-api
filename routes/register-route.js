const express = require('express')
const { saveRegistration,loginUser,getAllUsers } = require('../controller/register-controller')

const router = express.Router()

router.post('/register', saveRegistration)
router.post('/login', loginUser)
router.get('/get', getAllUsers)

module.exports = router;