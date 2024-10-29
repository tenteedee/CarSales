import express from 'express';
const router = express.Router();
import {

  listShowrooms,
  getShowroom,
} from '../../controllers/shop/ShowroomController.js';

router.get('/list', listShowrooms);
router.get('/detail/:id', getShowroom);
export default router;


