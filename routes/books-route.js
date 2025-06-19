const express = require('express')  
const { saveBooks,
  deleteBooks,
  getAllBooks,
  updateBooks}= require('../controller/books-controller')

const router = express.Router()

router.get('/', getAllBooks)
router.post('/', saveBooks)
router.delete('/:id', deleteBooks)
router.put('/:id', updateBooks)

module.exports = router;