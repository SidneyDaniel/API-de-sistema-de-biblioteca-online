import express from "express";
import UserController from "@src/controllers/controler-user";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const deleteUser = new UserController;

router.delete('/deletarUsuarios', functionVerifiySession.verificarAdm, deleteUser.deletarUsuario)

export default router;