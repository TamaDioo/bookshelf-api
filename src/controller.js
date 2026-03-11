import { nanoid } from 'nanoid';
import books from '../src/books.js';

export const createBook = (req, res) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = { name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt };

  if (name === undefined || name === null || name === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
  } else if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
  } else {
    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
      return res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
    }
  }

  return res.status(500).json({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
};

export const getBooks = (req, res) => {
  const { name, reading, finished } = req.query;

  let filteredBooks = books;

  if (name !== undefined) {
    filteredBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }

  if (finished !== undefined) {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
  }

  const responseBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return res.json({
    status: 'success',
    data: {
      books: responseBooks
    }
  });
};

export const getBooksByName = (req, res) => {
  const { name } = req.params;
  const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  const responseBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  return res.json({
    status: 'success',
    data: {
      books: responseBooks
    }
  });
};

export const getBookById = (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);
  if (book) {
    return res.status(200).json({
      status: 'success',
      data: { book }
    });
  }
  return res.status(404).json({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  });
};

export const updateBookById = (req, res) => {
  const { id } = req.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    if (name === undefined || name === null || name === '') {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      });
    }

    if (readPage > pageCount) {
      return res.status(400).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      });
    }

    books[index] = {
      ...books[index],
      name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
    };

    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
};

export const deleteBookById = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
};