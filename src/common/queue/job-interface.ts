export interface IJobCreateLog {
    data: object;
    type: string;
    ticket_id: string;
}


export interface IJobExcuteTaskWorkflow {
    ticket_id: string;
    excute_function_name: string;
    input: object;
}

export interface IJobUpdateTicketWorkflow {
    ticket_id: string;
    data: object;
}