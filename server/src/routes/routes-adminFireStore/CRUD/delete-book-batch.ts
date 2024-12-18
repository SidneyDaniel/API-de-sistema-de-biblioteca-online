import express from "express";
import BooksController from "@src/controllers/controller-books";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const removeBooksBatch = new BooksController;

router.delete('/removeBookBatch', functionVerifiySession.verificarAdm, removeBooksBatch.deleteBooksBatch)

export default router;