import express from "express";
import FavBooks from "@src/controllers/controller-favBooks";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const getFavBook = new FavBooks;

router.get('/book/fav', midlewareVerifySession.verificar, getFavBook.getBooksFavorite)

export default router;