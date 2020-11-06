const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
    before(async () => Book.sequelize.sync());

    describe('with no records in the database', () => {
        describe('POST /books', () => {
            it('creates a new book in the database', async () => {
                const response = await request(app).post('/books').send({
                    title: 'Crime and Punishment',
                    author: 'Fyodor Dostoyevsky',
                    genre: 'Psychological Fiction',
                    ISBN: '1234567'
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true,
                });

                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal('Crime and Punishment');
                expect(response.body.author).to.equal('Fyodor Dostoyevsky');
                expect(newBookRecord.title).to.equal('Crime and Punishment');
                expect(newBookRecord.author).to.equal('Fyodor Dostoyevsky');
                expect(newBookRecord.genre).to.equal('Psychological Fiction');
                expect(newBookRecord.ISBN).to.equal('1234567');
            });
        });
    });
    describe('POST /books', () => {
        it('returns validation error if title field is left empty', async () => {
            const response = await request(app).post('/books').send({});
            const newBookRecord = await Book.findByPk(response.body.id, {
                raw: true,
            });

            expect(response.status).to.equal(400);
            expect(response.body.errors.length).to.equal(2);
            expect(newBookRecord).to.equal(null);
        });
    });
    describe('POST /books', () => {
        it('returns validation error if author field is left empty', async () => {
            const response = await request(app).post('/books').send({});
            const newBookRecord = await Book.findByPk(response.body.id, {
                raw: true,
            });

            expect(response.status).to.equal(400);
            expect(response.body.errors.length).to.equal(2);
            expect(newBookRecord).to.equal(null);
        });
    });
});

describe('with records in the database', () => {
    let books;

    beforeEach(async () => {
        await Book.destroy({ where: {} });

        books = await Promise.all([
            Book.create({
                title: 'Crime and Punishment',
                author: 'Fyodor Dostoyevsky',
                genre: 'Psychological Fiction',
                ISBN: '1234567'
            }),
            Book.create({ title: 'Magician', author: 'Raymond Feist', genre: 'Fantasy', ISBN: '1234568' }),
            Book.create({ title: 'The Three Musketeers', author: 'Alexandre Dumas', genre: 'Historical Fiction', ISBN: '1234569' }),
        ]);
    });

    describe('GET /books', () => {
        it('gets all book records', async () => {
            const response = await request(app).get('/books');

            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(3);

            response.body.forEach((book) => {
                const expected = books.find((a) => a.id === book.id);

                expect(book.title).to.equal(expected.title);
                expect(book.author).to.equal(expected.author);
                expect(book.genre).to.equal(expected.genre);
                expect(book.ISBN).to.equal(expected.ISBN)
            });
        });
    });

    describe('GET /books/:id', () => {
        it('gets books record by id', async () => {
            const book = books[0];
            const response = await request(app).get(`/books/${book.id}`);

            expect(response.status).to.equal(200);
            expect(response.body.title).to.equal('Crime and Punishment');
            expect(response.body.author).to.equal('Fyodor Dostoyevsky');
            expect(response.body.genre).to.equal('Psychological Fiction');
            expect(response.body.ISBN).to.equal('1234567');
        });

        it('returns a 404 if the reader does not exist', async () => {
            const response = await request(app).get('/books/12345');

            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The book could not be found.');
        });
    });

    describe('PATCH /books/:id', () => {
        it('updates books genre by id', async () => {
            const book = books[0];
            const response = await request(app)
                .patch(`/books/${book.id}`)
                .send({ genre: 'Crime' });
            const updatedBookRecord = await Book.findByPk(book.id, {
                raw: true,
            });

            expect(response.status).to.equal(200);
            expect(updatedBookRecord.genre).to.equal('Crime');
        });

        it('returns a 404 if the book does not exist', async () => {
            const response = await request(app)
                .patch('/books/12345')
                .send({ genre: 'Enter genre here' });

            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The book could not be found.');
        });
    });

    describe('DELETE /books/:id', () => {
        it('deletes reader record by id', async () => {
            const book = books[0];
            const response = await request(app).delete(`/books/${book.id}`);
            const deletedBook = await Book.findByPk(book.id, { raw: true });

            expect(response.status).to.equal(204);
            expect(deletedBook).to.equal(null);
        });

        it('returns a 404 if the reader does not exist', async () => {
            const response = await request(app).delete('/books/12345');
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The book could not be found.');
        });
    });
});