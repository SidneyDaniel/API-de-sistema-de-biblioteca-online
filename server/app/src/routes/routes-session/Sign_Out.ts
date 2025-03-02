import express from 'express';
const router = express.Router();
import SessionController from '@src/controllers/controller-session';

const session = new SessionController;

router.post('/sessionLogout', session.signOut);

export default router