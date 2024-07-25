import express from "express";
import UserController from "@src/controllers/controler-user";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const listUser = new UserController;

router.get('/listarUsuarios', functionVerifiySession.verificarAdm, listUser.listarUsarios)

export default router;