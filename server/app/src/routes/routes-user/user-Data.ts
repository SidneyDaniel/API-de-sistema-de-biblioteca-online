import express from "express";
import UserController from "@src/controllers/controler-user";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const userData = new UserController;

router.get('/dadosUsuario', functionVerifiySession.verificar, userData.dadosUsuario)

export default router;