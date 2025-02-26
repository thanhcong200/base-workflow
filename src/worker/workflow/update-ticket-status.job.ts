import logger from '@common/logger';
import { IJobUpdateTicketWorkflow } from '@common/queue/job-interface';
import { QueueService } from '@common/queue/queue.service';
import { JOB_UPDATE_TICKET_WORKFLOW as JOB_NAME } from '@config/jobs';
import { Job, DoneCallback, Queue } from 'bull';
import _ from 'lodash';

export class JobUpdateTicketWorkflow {
    static async register(): Promise<Queue<unknown>> {
        logger.info(`Listening to queue: ${JOB_NAME}`);
        const queue = await QueueService.getQueue<IJobUpdateTicketWorkflow>(JOB_NAME);
        queue.process(JobUpdateTicketWorkflow.handler);
        return queue;
    }
    static async handler(job: Job<IJobUpdateTicketWorkflow>, done: DoneCallback): Promise<void> {
        try {
            logger.debug(`Process job ${JOB_NAME}-${job.id}`);
            logger.debug(`Processed job ${JOB_NAME}-${job.id}`);
            done();
        } catch (error) {
            logger.error(`Process ${JOB_NAME} error: `, error);
            done(error);
        }
    }
}
