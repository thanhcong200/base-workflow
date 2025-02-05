import {  DatabaseAdapter } from '@common/infrastructure/database.adapter';
import {  WorkflowTicket } from '@common/workflow/entities/ticket.entity';
import { WorkflowTicketLnk } from '@common/workflow/entities/workflow-ticket-lnk.entity';
import {  EdaWorkflow } from '@common/workflow/entities/workflow.entity';
import { Repository } from 'typeorm';
import { TicketLog } from './entities/ticket-log.entity';
import { TicketLogLnk } from './entities/ticket-log-lnk.entity';
import { WorkflowLog } from './entities/workflow-log.entity';
import { WorkflowLogLnk } from './entities/workflow-log-lnk.entity';

export class WorkFlowService {
    private ticketRepo: Repository<WorkflowTicket>;
    private workflowRepo: Repository<EdaWorkflow>;
    private workflowTicketLnkRepo: Repository<WorkflowTicketLnk>;
    private ticketLogRepo: Repository<TicketLog>;
    private ticketLogLnkRepo: Repository<TicketLogLnk>;
    private workflowLogRepo: Repository<WorkflowLog>;
    private workflowLogLnkRepo: Repository<WorkflowLogLnk>;

    // Constructor để khởi tạo các repository
    constructor() {
        this.ticketRepo = DatabaseAdapter.getInstance().getRepository(WorkflowTicket);
        this.workflowRepo = DatabaseAdapter.getInstance().getRepository(EdaWorkflow);
        this.workflowTicketLnkRepo = DatabaseAdapter.getInstance().getRepository(WorkflowTicketLnk);
        this.ticketLogRepo = DatabaseAdapter.getInstance().getRepository(TicketLog);
        this.ticketLogLnkRepo = DatabaseAdapter.getInstance().getRepository(TicketLogLnk);
        this.workflowLogRepo = DatabaseAdapter.getInstance().getRepository(WorkflowLog);
        this.workflowLogLnkRepo = DatabaseAdapter.getInstance().getRepository(WorkflowLogLnk);
    }

    async createWorkflowLog() {
        const workflow = this.workflowRepo.create({
            name: 'New Workflow', // Tên workflow mới
            type: 'ai', // Loại workflow (dpc, ai, bi)
        });

        // Lưu workflow vào cơ sở dữ liệu
        const savedWorkflow = await this.workflowRepo.save(workflow);
        console.log('Created New Workflow:', savedWorkflow);

        const workflowLog = new WorkflowLog();
        workflowLog.data_change = { name: 'hihi' };

        // Lưu ticket vào cơ sở dữ liệu
        const saveLog = await this.workflowLogRepo.save(workflowLog);

        // 3. Liên kết ticket với workflow trong bảng phụ

        const workflowLogLnk = new WorkflowLogLnk();
        workflowLogLnk.log = saveLog;
        workflowLogLnk.workflow = workflow;
        workflowLogLnk.workflow_log_ord = 1; // Thứ tự của ticket trong workflow

        // Lưu mối quan hệ vào bảng phụ
        await this.workflowLogLnkRepo.save(workflowLogLnk);

        return saveLog;
    }

    async createTicketLog() {
        const ticket = new WorkflowTicket();
        ticket.name = 'ticketName';
        ticket.ticket_status = 'init'; // Trạng thái mặc định là "init"

        // Lưu ticket vào cơ sở dữ liệu
        const savedTicket = await this.ticketRepo.save(ticket);

        const log = new TicketLog();
        log.data_change = { name: 'hihi' };

        // Lưu ticket vào cơ sở dữ liệu
        const saveLog = await this.ticketLogRepo.save(log);

        // 3. Liên kết ticket với workflow trong bảng phụ

        const ticketLogLnk = new TicketLogLnk();
        ticketLogLnk.ticket = savedTicket;
        ticketLogLnk.log = saveLog;
        ticketLogLnk.ticket_log_ord = 1; // Thứ tự của ticket trong workflow

        // Lưu mối quan hệ vào bảng phụ
        await this.ticketLogLnkRepo.save(ticketLogLnk);

        return saveLog;
    }

    async createTicket() {
        const workflow = this.workflowRepo.create({
            name: 'New Workflow', // Tên workflow mới
            type: 'ai', // Loại workflow (dpc, ai, bi)
        });

        // Lưu workflow vào cơ sở dữ liệu
        const savedWorkflow = await this.workflowRepo.save(workflow);
        console.log('Created New Workflow:', savedWorkflow);

        const ticket = new WorkflowTicket();
        ticket.name = 'ticketName';
        ticket.ticket_status = 'init'; // Trạng thái mặc định là "init"

        // Lưu ticket vào cơ sở dữ liệu
        const savedTicket = await this.ticketRepo.save(ticket);

        // 3. Liên kết ticket với workflow trong bảng phụ

        const ticketWorkflowLink = new WorkflowTicketLnk();
        ticketWorkflowLink.ticket = savedTicket;
        ticketWorkflowLink.workflow = workflow;
        ticketWorkflowLink.workflow_ticket_ord = 1; // Thứ tự của ticket trong workflow

        // Lưu mối quan hệ vào bảng phụ
        await this.workflowTicketLnkRepo.save(ticketWorkflowLink);

        return savedTicket;
    }
} 

export default new WorkFlowService();
