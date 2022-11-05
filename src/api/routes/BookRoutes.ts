import express from "express";
import controller from '../controllers/BookController';
import { Schemas, ValidateSchema } from '../middlewares/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.book.create), controller.create);
router.get('/get/:bookId', controller.getById);
router.get('/get', controller.getAll);
router.patch('/update/:bookId', ValidateSchema(Schemas.book.create), controller.update);
router.delete('/delete/:bookId', controller.deleteBook);

export = router;