import {  Entity,  PrimaryGeneratedColumn,  ManyToOne,  JoinColumn,  Column } from 'typeorm';
import { WorkflowTicket } from './ticket.entity';
import { EdaWorkflow } from './workflow.entity';

@Entity('workflow_tickets_workflow_lnk')
export class WorkflowTicketLnk {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => WorkflowTicket, (ticket) => ticket.workflow_ticket_lnks)
    @JoinColumn({ name: 'workflow_ticket_id' }) // Khóa ngoại liên kết với workflow_tickets
    ticket: WorkflowTicket;

    @ManyToOne(() => EdaWorkflow, (workflow) => workflow.ticket_lnks)
    @JoinColumn({ name: 'eda_workflow_id' }) // Khóa ngoại liên kết với eda_workflows
    workflow: EdaWorkflow;

    @Column()
    workflow_ticket_ord: number; // Thứ tự của ticket trong workflow
}
