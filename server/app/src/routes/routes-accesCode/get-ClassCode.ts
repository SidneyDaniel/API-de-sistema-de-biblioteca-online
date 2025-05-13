import express from 'express';
const router = express.Router();
import AccesCodesController from '@src/controllers/controler-acessCodes';

const getClassCodes = new AccesCodesController;

router.post('/acess-code/class-code', getClassCodes.getClassCode)

export default router;