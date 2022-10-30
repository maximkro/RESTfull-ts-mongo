import express from "express";
import controller from '../controllers/AuthorController';

const router = express.Router();

router.post('/create', controller.create);
router.get('/get/:authorId', controller.getById);
router.get('/get', controller.getAll);
router.patch('/update/:authorId', controller.update);
router.delete('/delete/:authorId', controller.deleteAuthor);

export = router;