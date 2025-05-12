import express from "express";
import BooksController from "@src/controllers/controller-books";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const removeBooks = new BooksController;

router.delete('/book/del', midlewareVerifySession.verifyAdm, removeBooks.removeBook)

export default router;