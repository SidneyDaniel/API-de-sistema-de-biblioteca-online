import express from 'express';
const router = express.Router();
import AccesCodesController from '@src/controllers/controler-acessCodes';

const getAccessCode = new AccesCodesController ;

router.get('/acessCode', getAccessCode.getAccesCode);

export default router;