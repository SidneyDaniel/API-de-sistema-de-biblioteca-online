import express from "express";
import FavBooks from "@src/controllers/controller-favBooks";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const removeFavBook = new FavBooks;

router.delete('/book/fav/del', midlewareVerifySession.verificar, removeFavBook.removeBooksFavorite)

export default router;