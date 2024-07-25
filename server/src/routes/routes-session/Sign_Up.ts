import express from 'express';
const router = express.Router();
import SessionController from '@src/controllers/controller-session';

const session = new SessionController;

router.post('/cadastrar', session.signUp);
router.post('/cadastrar/admin', session.signUpAdm) ;

export default router