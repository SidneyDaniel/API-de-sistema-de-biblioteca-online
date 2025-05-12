import ResgisteredController from '@src/controllers/controller-registeredBooks';
import express from 'express';
const router = express.Router();

const regis = new ResgisteredController;

router.post('/book/registered', regis.registeredBooks);

export default router;