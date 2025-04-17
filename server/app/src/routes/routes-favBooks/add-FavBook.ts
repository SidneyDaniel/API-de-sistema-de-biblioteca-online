import express from "express";
import FavBooks from "@src/controllers/controller-favBooks";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const addFavBook = new FavBooks;

router.post('/addBooksFavorites', midlewareVerifySession.verificar, addFavBook.addBooksFavorite)

export default router;