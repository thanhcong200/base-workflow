import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TicketLogLnk } from './ticket-log-lnk.entity';

@Entity('ticket_logs')
export class TicketLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', unique: true })
    document_id: string; // UUID của Strapi

    @Column({ type: 'jsonb', nullable: true })
    data_change: any;

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
