import ResgisteredController from '@src/controllers/controller-registeredBooks';
import express from 'express';
const router = express.Router();

const regis = new ResgisteredController;

router.post('/registeredBooks', regis.registeredBooks);

export default router;