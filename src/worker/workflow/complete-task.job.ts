import { KafkaAdapter } from '@common/infrastructure/kafka.adapter';
import logger from '@common/logger';
import { IJobExcuteTaskWorkflow } from '@common/queue/job-interface';
import { QueueService } from '@common/queue/queue.service';
import { JOB_EXCUTE_TASK_WORKFLOW as JOB_NAME } from '@config/jobs';
import { Job, DoneCallback, Queue } from 'bull';
import _ from 'lodash';

export class JobCompleteTaskWorkflow {
    static async register(): Promise<Queue<unknown>> {
        logger.info(`Listening to queue: ${JOB_NAME}`);
        const queue = await QueueService.getQueue<IJobExcuteTaskWorkflow>(JOB_NAME);
        queue.on('completed', JobCompleteTaskWorkflow.handler);
        return queue;
    }
    static async handler(job: Job<IJobExcuteTaskWorkflow>): Promise<void> {
        try {
            logger.debug(`Process job ${JOB_NAME}-${job.id}`);

            // (await KafkaAdapter.getConsumer() ).commitOffsets([])

            logger.debug(`Processed job ${JOB_NAME}-${job.id}`);
        } catch (error) {
            logger.error(`Process ${JOB_NAME} error: `, error);
        }
    }
}
