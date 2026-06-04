const express = require('express');

const router = express.Router();

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} = require('../controllers/livroController');

router.post('/', createBook);

router.get('/', getBooks);

router.get('/:id', getBookById);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

router.patch('/:id/borrow', borrowBook);

router.patch('/:id/return', returnBook);

module.exports = router;