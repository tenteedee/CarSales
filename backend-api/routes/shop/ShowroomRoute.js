import express from 'express';
const router = express.Router();
import {
  getAllShowrooms,
 

} from '../../controllers/shop/ShowroomController.js';

router.get('/all', getAllShowrooms);
export default router;


