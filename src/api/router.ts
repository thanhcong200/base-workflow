import express, { Request, Response } from 'express';
import { NODE_ENV } from '@config/environment';
import testRoutes from './test/test.route';
import workflowRoutes from './workflow/workflow.route';


const router = express.Router();

/**
 * GET /status
 */
router.get('/status', (req: Request, res: Response) => res.send('OK'));
router.use('/workflows', workflowRoutes)

if (NODE_ENV === 'development') {
    router.use('/tests', testRoutes);
}

export default router;
