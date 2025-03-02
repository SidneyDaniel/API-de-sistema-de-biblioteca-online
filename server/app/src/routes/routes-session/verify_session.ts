import express from 'express';
const router = express.Router();
import SessionController from '@src/controllers/controller-session';

const session = new SessionController;

router.get('/verifySession', session.verifySession);

export default router