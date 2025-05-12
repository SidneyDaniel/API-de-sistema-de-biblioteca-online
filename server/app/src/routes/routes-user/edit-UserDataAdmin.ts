import express from "express";
import UserController from "@src/controllers/controler-user";
import midlewareVerifySession from "@src/midllewares/midleware-verifiy-session";

const router = express.Router()
const editUserAmdmin = new UserController;

router.put('/user-management/adm/edit', midlewareVerifySession.verifyAdm, editUserAmdmin.editUsersAdm)

export default router;