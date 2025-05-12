import express from "express";
import UserController from "@src/controllers/controler-user";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const listUser = new UserController;

router.get('/user-management/all', midlewareVerifySession.verifyAdm, listUser.listUsers)

export default router;