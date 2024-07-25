import express from "express";
import UserController from "@src/controllers/controler-user";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const editUser = new UserController;

router.post('/editarUsuarios', functionVerifiySession.verificar, editUser.editarUsuario)

export default router;