import {  Entity,  PrimaryGeneratedColumn,  Column,  ManyToOne,  OneToMany, BeforeInsert } from 'typeorm';
import { TicketLog } from './ticket-log.entity';
import { EdaWorkflow } from './workflow.entity';
import { v4 as uuidv4 } from 'uuid';
import { WorkflowTicketWorkflowLnk } from './workflow-ticket-lnk.entity';
@Entity('workflow_tickets')
export class WorkflowTicket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', unique: true })
    document_id: string; // UUID của Strapi

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: ['init', 'processing', 'completed', 'failed'],
    })
    ticket_status: string;

    @Column({ type: 'jsonb', nullable: true })
    nodes: any;

    @Column({ type: 'jsonb', nullable: true })
    edges: any;

    @Column({ type: 'jsonb', nullable: true })
    metadata: any;

    @OneToMany(() => WorkflowTicketWorkflowLnk, (lnk) => lnk.ticket)
    workflowLink: WorkflowTicketWorkflowLnk[];

    @OneToMany(() => TicketLog, (log) => log.ticket)
    logs: TicketLog[];

    @BeforeInsert()
    generateUUID() {
        if (!this.document_id) {
            this.document_id = uuidv4();
        }
    }
}
