import {  Entity,  PrimaryGeneratedColumn,  ManyToOne,  JoinColumn,  Column } from 'typeorm';
import { TicketLog } from './ticket-log.entity';
import { WorkflowTicket } from './ticket.entity';

@Entity('ticket_logs_ticket_lnk')
export class TicketLogLnk {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TicketLog, (log) => log.ticket_log_lnks)
    @JoinColumn({ name: 'ticket_log_id' })
    log: TicketLog;

    @ManyToOne(() => WorkflowTicket, (ticket) => ticket.ticket_log_lnks)
    @JoinColumn({ name: 'workflow_ticket_id' })
    ticket: WorkflowTicket;

    @Column()
    ticket_log_ord: number;
}
