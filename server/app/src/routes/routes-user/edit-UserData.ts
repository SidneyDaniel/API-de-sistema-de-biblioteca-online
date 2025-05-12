import express from "express";
import UserController from "@src/controllers/controler-user";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const editUser = new UserController;

router.post('/user-management/edit', midlewareVerifySession.verificar, editUser.editUsers)

export default router;