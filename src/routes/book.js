const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book');

router
    .route('/')
    .get(bookController.getBooks)
    .post(bookController.createBooks);

router
    .route('/:bookId')
    .get(bookController.getBookByID)
    .patch(bookController.updateBookByID)
    .delete(bookController.deleteByID)


module.exports = router;