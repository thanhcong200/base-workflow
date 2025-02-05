import logger from '@common/logger';
import { TicketLogLnk } from '@common/workflow/entities/ticket-log-lnk.entity';
import { TicketLog } from '@common/workflow/entities/ticket-log.entity';
import { WorkflowTicket } from '@common/workflow/entities/ticket.entity';
import { WorkflowLogLnk } from '@common/workflow/entities/workflow-log-lnk.entity';
import { WorkflowLog } from '@common/workflow/entities/workflow-log.entity';
import { WorkflowTicketLnk } from '@common/workflow/entities/workflow-ticket-lnk.entity';
import { EdaWorkflow } from '@common/workflow/entities/workflow.entity';
import { DataSource } from 'typeorm';

/**
 * Singleton Database client
 */
export class DatabaseAdapter {
    static instance: DataSource;

    private constructor() {} // Prevent direct instantiation

    public static getInstance(): DataSource {
        if (!DatabaseAdapter.instance) {
            DatabaseAdapter.instance = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'fancho',
                password: '123456aA',
                database: 'eda',
                synchronize: false, // Set to false in production
                logging: true,
                entities: [EdaWorkflow, WorkflowLog, WorkflowTicket, TicketLog, WorkflowLogLnk, WorkflowTicketLnk, TicketLogLnk], // Adjust path if needed
                migrations: [],
                subscribers: [],
            });
        }
        return DatabaseAdapter.instance;
    }

    public static async connect(): Promise<void> {
        const dataSource = DatabaseAdapter.getInstance();
        if (!dataSource.isInitialized) {
            try {
                await dataSource.initialize();
                logger.info('Database connected successfully!');
            } catch (error) {
                logger.info('Database connection error:', error);
            }
        }
    }

    public static async disconnect(): Promise<void> {
        const dataSource = DatabaseAdapter.getInstance();
        if (dataSource.isInitialized) await dataSource.destroy();
        logger.info('Database connected successfully!');
    }
}
