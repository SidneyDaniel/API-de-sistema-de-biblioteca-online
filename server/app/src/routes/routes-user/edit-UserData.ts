import express from "express";
import UserController from "@src/controllers/controler-user";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const editUser = new UserController;

router.post('/editarUsuarios', midlewareVerifySession.verificar, editUser.editarUsuario)

export default router;