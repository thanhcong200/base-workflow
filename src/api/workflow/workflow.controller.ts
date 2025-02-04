import { NextFunction, Request, Response } from 'express';
import { WorkFlow } from './workflow.service';

export class WorkflowController {
    static async common(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const a = await WorkFlow.createTicket();
            res.sendJson({
                message: 'Operation executed successfully!',
                data: a,
            });
        } catch (error) {
            next(error);
        }
    }
}
