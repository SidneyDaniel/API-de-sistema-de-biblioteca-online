import ResgisteredController from '@src/controllers/controller-registeredBooks';
import express from 'express';
const router = express.Router();

const regis = new ResgisteredController;

router.get('/lastRegisteredBook', regis.lastRegisteredBook);

export default router;