import express from 'express';

import {createBook, findBook, deleteBook, updateBook} from '../controllers/bookController.mjs'

const router = express.Router();

router.get('/api/books',findBook);
router.post('/api/books/add',createBook);
router.delete('/api/books/delete/:id', deleteBook);
router.put('/api/books/update/:id', updateBook);

export default router;