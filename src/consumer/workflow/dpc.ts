import { EventName, TopicName } from '@common/event-source/event-source.topic';
import { KafkaMessage } from 'kafkajs';
import { EventData } from '@common/event-source/EventData';
import logger from '@common/logger';
import { QueueService } from '@common/queue/queue.service';
import { JOB_EXCUTE_TASK_WORKFLOW } from '@config/jobs';
import {  IJobExcuteTaskWorkflow } from '@common/queue/job-interface';

export class DPCWorkflowHandler {
    static getName(): string {
        return 'DPCWorkflowHandler';
    }
    static getTopic(): string {
        return TopicName.WORKFLOW;
    }
    static getEvents(): string[] {
        return [EventName.EXCUTE_TASK_WORKFLOW];
    }
    static match(topic: string, message: KafkaMessage): boolean {
        if (topic !== DPCWorkflowHandler.getTopic()) {
            return false;
        }
        const headers = message.headers;
        if (!headers || !headers.event) {
            return false;
        }
        return DPCWorkflowHandler.getEvents().includes(headers.event.toString());
    }
    static async process(
        topic: string,
        partition: number,
        message: KafkaMessage,
        parsedMessage: EventData,
    ): Promise<void> {
        logger.debug('Processing message', { parsedMessage });
        
        (
            await QueueService.getQueue<IJobExcuteTaskWorkflow>(
                JOB_EXCUTE_TASK_WORKFLOW,
            )
        ).add({
            ticket_id: "1",
            excute_function_name: "excute",
            input: {}
        });
        return;
    }
}
