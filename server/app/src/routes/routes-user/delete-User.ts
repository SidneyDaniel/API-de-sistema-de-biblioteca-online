import express from "express";
import UserController from "@src/controllers/controler-user";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const deleteUser = new UserController;

router.delete('/deletarUsuarios', midlewareVerifySession.verifyAdm, deleteUser.deletarUsuario)

export default router;