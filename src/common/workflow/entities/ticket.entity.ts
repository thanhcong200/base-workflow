import {  Entity,  PrimaryGeneratedColumn,  Column,  OneToMany, BeforeInsert, CreateDateColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm';
import { TicketLog } from './ticket-log.entity';
import { v4 as uuidv4 } from 'uuid';
import { WorkflowTicketLnk } from './workflow-ticket-lnk.entity';
import { TicketLogLnk } from './ticket-log-lnk.entity';
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

    @OneToMany(() => WorkflowTicketLnk, (lnk) => lnk.ticket)
    workflow_ticket_lnks: WorkflowTicketLnk[];

    @OneToMany(() => TicketLogLnk, (log) => log.ticket)
    ticket_log_lnks: TicketLogLnk[];

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
