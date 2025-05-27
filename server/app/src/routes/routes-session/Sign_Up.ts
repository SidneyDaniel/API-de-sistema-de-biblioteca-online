import express from 'express';
const router = express.Router();
import SessionController from '@src/controllers/controller-session';

const session = new SessionController;

router.post('/signup', session.signUp);
router.post('/signup/admin', session.signUpAdm) ;

export default router