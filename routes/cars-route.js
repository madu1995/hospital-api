const express = require('express')
const {
    saveCars,
    deleteCars,
    updateCars,
    getAllCars,
    getAllCarsWithUsers
} = require('../controller/cars-controller')

const router = express.Router()

router.get('/', getAllCars)
router.get('/users', getAllCarsWithUsers)
router.post('/', saveCars)
router.delete('/:id', deleteCars)
router.put('/:id', updateCars)

module.exports = router