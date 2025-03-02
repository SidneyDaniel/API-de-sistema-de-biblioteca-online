import express from "express";
import FavBooks from "@src/controllers/controller-favBooks";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const getFavBook = new FavBooks;

router.get('/readFavoritesBook', functionVerifiySession.verificar, getFavBook.getBooksFavorite)

export default router;