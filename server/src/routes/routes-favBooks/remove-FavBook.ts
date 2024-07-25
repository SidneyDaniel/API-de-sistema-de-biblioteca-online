import express from "express";
import FavBooks from "@src/controllers/controller-favBooks";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const removeFavBook = new FavBooks;

router.delete('/removeFavBook', functionVerifiySession.verificar, removeFavBook.removeBooksFavorite)

export default router;