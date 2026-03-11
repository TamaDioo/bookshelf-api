import express from 'express';
import { createBook, updateBookById, deleteBookById, getBooks, getBookById } from './controller.js';

const router = express.Router();
router.post('/books', createBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBookById);
router.delete('/books/:id', deleteBookById);

export default router;