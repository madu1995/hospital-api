const express = require('express')
const { saveRegistration,loginUser,getAllUsers,deleteUser } = require('../controller/register-controller')

const router = express.Router()

router.post('/register', saveRegistration)
router.post('/login', loginUser)
router.get('/get', getAllUsers)
router.delete('/delete/:id', deleteUser);

module.exports = router;