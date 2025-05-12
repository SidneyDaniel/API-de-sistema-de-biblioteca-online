import express from "express";
import BooksController from "@src/controllers/controller-books";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const readBooks = new BooksController;

router.get('/book', midlewareVerifySession.verificar, readBooks.readBook)

export default router;

