import {  Entity,  PrimaryGeneratedColumn,  Column,  OneToMany, BeforeInsert } from 'typeorm';
import { WorkflowLog } from './workflow-log.entity';
import { v4 as uuidv4 } from 'uuid';
import { WorkflowTicketWorkflowLnk } from './workflow-ticket-lnk.entity';

@Entity('eda_workflows')
export class EdaWorkflow {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'uuid', unique: true })
    document_id: string; // UUID của Strapi

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: ['dpc', 'ai', 'bi'],
    })
    type: string;

    @Column({
        type: 'enum',
        enum: ['draft', 'active', 'inactive'],
        default: 'draft',
    })
    workflow_status: string;

    @Column({ type: 'jsonb', nullable: true })
    nodes: any;

    @Column({ type: 'jsonb', nullable: true })
    edges: any;

    @OneToMany(() => WorkflowTicketWorkflowLnk, (lnk) => lnk.workflow)
    ticketsLink: WorkflowTicketWorkflowLnk[];

    @OneToMany(() => WorkflowLog, (log) => log.workflow)
    logs: WorkflowLog[];

    @BeforeInsert()
    generateUUID() {
        if (!this.document_id) {
            this.document_id = uuidv4();
        }
    }
}
