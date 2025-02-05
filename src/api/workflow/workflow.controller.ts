import { IJobExcuteTaskWorkflow } from '@common/queue/job-interface';
import { QueueService } from '@common/queue/queue.service';
import ticketService from '@common/workflow/ticket.service';
import { JOB_EXCUTE_TASK_WORKFLOW as JOB_NAME } from '@config/jobs';
import { NextFunction, Request, Response } from 'express';

export class WorkflowController {
    static async common(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // const ticket = await WorkFlowService.createTicket();
            // const workflowLog = await WorkFlowService.createWorkflowLog();
            // const ticketLog = await WorkFlowService.createTicketLog();
            // await ticketService.excuteFunction("sendMail", {email: "cong@gmail.com", password: "2"})
            const queue = await QueueService.getQueue<IJobExcuteTaskWorkflow>(JOB_NAME);
            await queue.add({ticket_id: "1", excute_function_name: "sendMail", input: {email: "congvd@gmail.com", password:"11"}})
            res.sendJson({
                message: 'Operation executed successfully!',
                data: 1,
            }); 
        } catch (error) {
            next(error);
        }
    }
}
