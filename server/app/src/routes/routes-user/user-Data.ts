import express from "express";
import UserController from "@src/controllers/controler-user";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const userData = new UserController;

router.get('/user-management/data', midlewareVerifySession.verificar, userData.userData)

export default router;