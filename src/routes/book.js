const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book');

router
    .route('/')
    .get(bookController.getBooks)
    .post(bookController.createBooks);

router
    .route('/:id')
    .get(bookController.getBookByID)
    .patch(bookController.updateBook)
    .delete(bookController.deleteByID)


module.exports = router;