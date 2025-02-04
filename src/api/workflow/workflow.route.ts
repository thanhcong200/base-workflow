import express from 'express';
import { WorkflowController } from '@api/workflow/workflow.controller';

const router = express.Router();

router.get('/', WorkflowController.common);
router.post('/', WorkflowController.common);

export default router;
