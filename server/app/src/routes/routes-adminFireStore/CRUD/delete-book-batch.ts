import express from "express";
import BooksController from "@src/controllers/controller-books";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const removeBooksBatch = new BooksController;

router.delete('/removeBookBatch', midlewareVerifySession.verifyAdm, removeBooksBatch.deleteBooksBatch)

export default router;