import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeUpdate,
} from 'typeorm';
import { WorkflowLog } from './workflow-log.entity';
import { v4 as uuidv4 } from 'uuid';
import { WorkflowTicketLnk } from './workflow-ticket-lnk.entity';
import { WorkflowLogLnk } from './workflow-log-lnk.entity';

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

    @OneToMany(() => WorkflowTicketLnk, (lnk) => lnk.workflow)
    ticket_lnks: WorkflowTicketLnk[];

    @OneToMany(() => WorkflowLogLnk, (log) => log.workflow)
    workflow_log_lnks: WorkflowLogLnk[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @BeforeInsert()
    generateUUID() {
        if (!this.document_id) {
            this.document_id = uuidv4();
        }

        if (!this.created_at) {
            this.created_at = new Date();
        }
        if (!this.updated_at) {
            this.updated_at = new Date();
        }
    }

    @BeforeUpdate()
    updateUpdateAt() {
        this.updated_at = new Date();
    }
}
