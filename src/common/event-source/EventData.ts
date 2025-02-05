// tslint:disable: variable-name

import { Types } from 'mongoose';

export enum EventObjectType {
    USER = 'User',
}

export const EventObjectTypeCode = new Map<EventObjectType, number>([
    [EventObjectType.USER, 1],
   
]);

export interface IEventSubject {
    type: string;
    id: string;
    name?: string;
}

export interface IEventObject {
    type: EventObjectType;
    id: string;
    data?: unknown;
}

export interface IEventContext {
    req?: unknown;
}

export interface IEventDataResponse {
    id: string;
    topic: string;
    event: string;
    key?: string;
    subject?: IEventSubject;
    di_obj?: IEventObject;
    in_obj?: IEventObject;
    pr_obj?: IEventObject;
    context?: IEventContext;
    sent_at: number;
}

export interface IEventData {
    id?: Types.ObjectId;
    topic: string;
    event: string;
    key?: string;
    subject?: IEventSubject;
    di_obj?: IEventObject;
    in_obj?: IEventObject;
    pr_obj?: IEventObject;
    context?: IEventContext;
    sent_at?: Date;
    other_data?: unknown;
}

export class EventData implements IEventData {
    id: Types.ObjectId;
    topic: string;
    event: string;
    key?: string;
    subject?: IEventSubject;
    di_obj?: IEventObject;
    in_obj?: IEventObject;
    pr_obj?: IEventObject;
    context?: IEventContext;
    sent_at: Date;
    other_data?: unknown;
    constructor(data: IEventData) {
        this.id = data.id || new Types.ObjectId();
        this.event = data.event;
        this.topic = data.topic;
        this.key = data.key;
        this.subject = data.subject;
        this.di_obj = data.di_obj;
        this.in_obj = data.in_obj;
        this.pr_obj = data.pr_obj;
        this.context = data.context;
        this.sent_at = data.sent_at || new Date();
        this.other_data = data.other_data || null;
    }

    static newFrom(data: any): EventData {
        return new EventData({
            id: new Types.ObjectId(),
            event: data.event,
            topic: data.topic,
            key: data.key,
            subject: data.subject,
            di_obj: data.di_obj,
            in_obj: data.in_obj,
            pr_obj: data.pr_obj,
            context: data.context,
            sent_at: new Date(data.sent_at),
        });
    }

    transform(): IEventDataResponse {
        const transformed: IEventDataResponse = {
            id: this.id.toString(),
            event: this.event,
            topic: this.topic,
            key: this.key,
            subject: this.subject,
            di_obj: this.di_obj,
            in_obj: this.in_obj,
            pr_obj: this.pr_obj,
            context: this.context,
            sent_at: this.sent_at.valueOf(),
        };
        return transformed;
    }
}
