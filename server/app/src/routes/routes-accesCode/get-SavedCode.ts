import express from 'express';
const router = express.Router();
import AccesCodesController from '@src/controllers/controler-acessCodes';

const getSavedClass = new AccesCodesController ;

router.post('/acess-code/saved-class', getSavedClass.getSavedClass);

export default router;