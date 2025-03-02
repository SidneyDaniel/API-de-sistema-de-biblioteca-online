import express from "express";
import BooksController from "@src/controllers/controller-books";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const removeBooks = new BooksController;

router.delete('/removeBook', functionVerifiySession.verificarAdm, removeBooks.removeBook)

export default router;