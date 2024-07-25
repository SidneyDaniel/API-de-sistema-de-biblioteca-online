import express from 'express';
const router = express.Router();
import SessionController from '@src/controllers/controller-session';

const session = new SessionController;

router.post('/login', session.login);
router.post('/login/adm', session.loginAdm) ;

export default router