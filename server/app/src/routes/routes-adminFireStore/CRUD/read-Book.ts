import express from "express";
import BooksController from "@src/controllers/controller-books";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const readBooks = new BooksController;

router.get('/readBook', functionVerifiySession.verificar, readBooks.readBook)

export default router;

