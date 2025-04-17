import express from "express";
import UserController from "@src/controllers/controler-user";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const userData = new UserController;

router.get('/dadosUsuario', midlewareVerifySession.verificar, userData.dadosUsuario)

export default router;