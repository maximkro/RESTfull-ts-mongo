import express from "express";
import controller from '../controllers/BookController';

const router = express.Router();

router.post('/create', controller.create);
router.get('/get/:bookId', controller.getById);
router.get('/get', controller.getAll);
router.patch('/update/:bookId', controller.update);
router.delete('/delete/:bookId', controller.deleteBook);

export = router;