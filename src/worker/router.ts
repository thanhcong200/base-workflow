import { JobHandler } from '@worker/interface';
import { Queue } from 'bull';
import { JobCreateLogWorkflow } from './workflow/create-log.job';
import { JobExcuteTaskWorkflow } from './workflow/excute-task.job';
import { JobUpdateTicketWorkflow } from './workflow/update-ticket-status.job';

export class Router {
    static async register(): Promise<Queue[]> {
        const queues: JobHandler[] = [JobCreateLogWorkflow];
        queues.push(JobExcuteTaskWorkflow);
        queues.push(JobUpdateTicketWorkflow);

        return Promise.all(queues.map((queue) => queue.register()));
    }
}
