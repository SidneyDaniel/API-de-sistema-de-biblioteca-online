import express from "express";
import BooksController from "@src/controllers/controller-books";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const editBooks = new BooksController;

router.put('/editBook', functionVerifiySession.verificarAdm, editBooks.editBook)

export default router;