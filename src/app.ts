import express from "express";
import authorRoutes from './api/routes/AuthorRoutes';
import bookRoutes from './api/routes/BookRoutes';


const app = express();

app.use(express.json());

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);


export default app;