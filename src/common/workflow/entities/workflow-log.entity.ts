import {  Entity,  PrimaryGeneratedColumn,  Column,  ManyToOne, BeforeInsert } from 'typeorm';
import { EdaWorkflow } from './workflow.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('workflow_logs')
export class WorkflowLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', unique: true })
    document_id: string; // UUID của Strapi

    @Column({ type: 'jsonb', nullable: true })
    data_change: any;

    @ManyToOne(() => EdaWorkflow, (workflow) => workflow.logs, { cascade: true })
    workflow: EdaWorkflow;

    @BeforeInsert()
    generateUUID() {
        if (!this.document_id) {
            this.document_id = uuidv4();
        }
    }
}
