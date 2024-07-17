import express from "express";
import FavBooks from "@src/controllers/controller-favBooks";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const addFavBook = new FavBooks;

router.post('/addBooksFavorites', functionVerifiySession.verificar, addFavBook.addBooksFavorite)

export default router;