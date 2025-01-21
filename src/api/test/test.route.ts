import express from 'express';
import { TestController } from '@api/test/test.controller';

const router = express.Router();

router.get('/common', TestController.common);
router.post('/common', TestController.common);

export default router;
