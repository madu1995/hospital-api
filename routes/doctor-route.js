const express = require('express')
const { saveDoctor,
  deleteDoctor,
  getAllDoctors,
  updateDoctor } = require('../controller/doctor-controller')

const router = express.Router()

router.get('/', getAllDoctors)
router.post('/', saveDoctor)
router.delete('/:id', deleteDoctor)
router.put('/:id', updateDoctor)

module.exports = router;