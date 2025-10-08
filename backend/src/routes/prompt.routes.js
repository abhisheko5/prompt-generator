import express from 'express';
import {promptgenerator,dummydata} from '../controllers/prompt.js';
const router=express.Router();

router.route('/generate').post(promptgenerator);
router.route('/dummy').get(dummydata);

export default router;