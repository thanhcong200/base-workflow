import {  Entity,  PrimaryGeneratedColumn,  Column,  ManyToOne, BeforeInsert } from 'typeorm';
import { WorkflowTicket } from './ticket.entity';
import  {v4 as uuidv4 } from 'uuid';


@Entity('ticket_logs')
export class TicketLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', unique: true })
    document_id: string; // UUID của Strapi

    @Column({ type: 'jsonb', nullable: true })
    data_change: any;

    @ManyToOne(() => WorkflowTicket, (ticket) => ticket.logs, { cascade: true })
    ticket: WorkflowTicket;

    @BeforeInsert()
    generateUUID() {
        if (!this.document_id) {
            this.document_id = uuidv4();
        }
    }
}
