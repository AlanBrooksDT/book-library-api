const {
    getAllItems,
    createItem,
    updateItem,
    getItemById,
    deleteItem,
} = require('./helpers');

const getBooks = (_, res) => getAllItems(res, 'book');

const createBooks = (req, res) => createItem(res, 'book', req.body);

const getBookByID = (req, res) => getItemById(res, 'book', req.params.id);

const updateBook = (req, res) => updateItem(res, 'book', req.body, req.params.id);

const deleteByID = (req, res) => deleteItem(res, 'book', req.params.id);

module.exports = {
    getBooks,
    createBooks,
    getBookByID,
    updateBook,
    deleteByID
}