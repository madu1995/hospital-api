const express = require('express')  
const { savePatient,
  saveUserWithCars,
  deletePatient,
  getAllPatients,
  getAllUsersWithBooks,
  updatePatient}= require('../controller/patient-controller')

const router = express.Router()

router.get('/', getAllPatients)
router.get('/books/', getAllUsersWithBooks)
router.post('/', savePatient)
router.post('/with-cars', saveUserWithCars)
router.delete('/:id', deletePatient)
router.put('/:id', updatePatient)

module.exports = router;