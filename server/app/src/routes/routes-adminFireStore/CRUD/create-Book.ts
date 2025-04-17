import express from "express";
import BooksController from "@src/controllers/controller-books";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const createBooks = new BooksController;

router.post('/addBook', midlewareVerifySession.verifyAdm, createBooks.createBook)

export default router;