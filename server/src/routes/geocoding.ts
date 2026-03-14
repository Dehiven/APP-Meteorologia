import { Router } from 'express';
import { geocodingController } from '../controllers/geocodingController';

const router = Router();

router.get('/search', geocodingController.search);

export default router;
