import express from "express";
import controller from '../controllers/AuthorController';
import { Schemas, ValidateSchema } from '../middlewares/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.author.create), controller.create);
router.get('/get/:authorId', controller.getById);
router.get('/get', controller.getAll);
router.patch('/update/:authorId', ValidateSchema(Schemas.author.update), controller.update);
router.delete('/delete/:authorId', controller.deleteAuthor);

export = router;