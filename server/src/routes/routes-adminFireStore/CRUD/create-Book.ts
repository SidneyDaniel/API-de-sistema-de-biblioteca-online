import express from "express";
import BooksController from "@src/controllers/controller-books";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const createBooks = new BooksController;

router.post('/addBook', functionVerifiySession.verificarAdm, createBooks.createBook)

export default router;