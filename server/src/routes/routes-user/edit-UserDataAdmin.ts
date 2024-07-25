import express from "express";
import UserController from "@src/controllers/controler-user";
import functionVerifiySession from "@src/midllewares/function-verifiy-session";

const router = express.Router()
const editUserAmdmin = new UserController;

router.put('/editarUsuarios', functionVerifiySession.verificarAdm, editUserAmdmin.editarUsuariosAdm)

export default router;