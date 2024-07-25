import express from 'express';
const router = express.Router();
import AccesCodesController from '@src/controllers/controler-acessCodes';

const getSavedClass = new AccesCodesController ;

router.post('/salasSalvas', getSavedClass.getSavedClass);

export default router;