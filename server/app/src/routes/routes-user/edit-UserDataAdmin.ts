import express from "express";
import UserController from "@src/controllers/controler-user";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const editUserAmdmin = new UserController;

router.put('/editarUsuarios', midlewareVerifySession.verifyAdm, editUserAmdmin.editarUsuariosAdm)

export default router;