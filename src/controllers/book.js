const { Book } = require('../models');

const getBooks = (_, res) => {
    Book.findAll().then(books => {
        res.status(200).json(books);
    });
}

const createBooks = (req, res) => {
    const newBook = req.body;

    Book
        .create(newBook)
        .then(newBookCreated => res.status(201).json(newBookCreated));
}

const getBookByID = (req, res) => {
    Book.findByPk(req.params.bookId).then(book => {
        if (!book) {
            res
                .status(404)
                .json({ error: 'The book could not be found.' })
        } else {
            res.status(200).json(book);
        }
    });
};

const updateBookByID = (req, res) =>
    Book.update(req.body, { where: { id: req.params.bookId } }).then(([updatedBook]) => {
        if (!updatedBook) {
            res.status(404).json({ error: 'The book could not be found.' })
        } else {
            res.status(200).json(updatedBook)
        }
    });

const deleteByID = (req, res) =>
    Book.findByPk(req.params.bookId).then(book => {
        if (!book) {
            res
                .status(404)
                .json({ error: 'The book could not be found.' })
        } else {
            Book.destroy({ where: { id: req.params.bookId } }).then(() => {
                res.status(204).send();
            });
        }
    });





module.exports = {
    getBooks,
    createBooks,
    getBookByID,
    updateBookByID,
    deleteByID
}