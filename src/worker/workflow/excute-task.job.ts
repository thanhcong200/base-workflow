import logger from '@common/logger';
import { IJobExcuteTaskWorkflow } from '@common/queue/job-interface';
import { QueueService } from '@common/queue/queue.service';
import ticketService from '@common/workflow/ticket.service';
import { JOB_EXCUTE_TASK_WORKFLOW as JOB_NAME } from '@config/jobs';
import { Job, DoneCallback, Queue } from 'bull';
import _ from 'lodash';

export class JobExcuteTaskWorkflow {
    static async register(): Promise<Queue<unknown>> {
        logger.info(`Listening to queue: ${JOB_NAME}`);
        const queue = await QueueService.getQueue<IJobExcuteTaskWorkflow>(JOB_NAME);
        queue.process(JobExcuteTaskWorkflow.handler);
        return queue;
    }
    static async handler(job: Job<IJobExcuteTaskWorkflow>, done: DoneCallback): Promise<void> {
        try {
            logger.debug(`Process job ${JOB_NAME}-${job.id}}`);
            await ticketService.excuteFunction(job.data.excute_function_name, job.data.input)
            // await(await QueueService.getQueue<IJobExcuteTaskWorkflow>(JOB_NAME)).add({
            //     ticket_id: '2',
            //     excute_function_name: 'sendNoti',
            //     input: { username: 'cong' },
            // });

            // excute task

            // push result to update ticket job
            // (await QueueService.getQueue<IJobUpdateTicketWorkflow>(JOB_UPDATE_TICKET_WORKFLOW)).add({

            // })
            // (await QueueService.getQueue<IJobCreateLog>(JOB_CREATE_LOG_WORKFLOW)).add({

            // })

            logger.debug(`Processed job ${JOB_NAME}-${job.id}`);
            done();
        } catch (error) {
            logger.error(`Process ${JOB_NAME} error: `, error);
            done(error);
        }
    }
}
