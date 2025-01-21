export enum TopicName {
    WORKFLOW = 'workflow',
}

export enum EventKey {}

export enum EventName {
    DPC_WORKFLOW = 'dpc_workflow',
    EXCUTE_TASK_WORKFLOW = 'excute_task_workflow',
}

export interface IEventTopic {
    event: string;
    topic: TopicName;
}

export const EventTopics: Map<EventKey, IEventTopic> = new Map();

// EventTopics.set(EventKey.PURCHASED_PACKAGE__CREATE, { topic: TopicName.PURCHASED_PACKAGE, event: 'create' });
