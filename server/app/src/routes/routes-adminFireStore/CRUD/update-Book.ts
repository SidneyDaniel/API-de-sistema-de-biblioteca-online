import express from "express";
import BooksController from "@src/controllers/controller-books";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const editBooks = new BooksController;

router.put('/book/edit', midlewareVerifySession.verifyAdm, editBooks.editBook)

export default router;