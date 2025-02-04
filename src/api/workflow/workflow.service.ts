import {  DatabaseAdapter } from '@common/infrastructure/database.adapter';
import {  WorkflowTicket } from '@common/workflow/entities/ticket.entity';
import { WorkflowTicketWorkflowLnk } from '@common/workflow/entities/workflow-ticket-lnk.entity';
import {  EdaWorkflow } from '@common/workflow/entities/workflow.entity';

export class WorkFlow {
    static async createTicket() {
        const ticketRepo = DatabaseAdapter.instance.getRepository(WorkflowTicket);
        const workflowRepo = DatabaseAdapter.instance.getRepository(EdaWorkflow);
        const ticketWorkflowLnkRepo = DatabaseAdapter.instance.getRepository(WorkflowTicketWorkflowLnk);

        const workflow = workflowRepo.create({
            name: 'New Workflow', // Tên workflow mới
            type: 'ai', // Loại workflow (dpc, ai, bi)
        });

        // Lưu workflow vào cơ sở dữ liệu
        const savedWorkflow = await workflowRepo.save(workflow);
        console.log('Created New Workflow:', savedWorkflow);

        const ticket = new WorkflowTicket();
        ticket.name = "ticketName";
        ticket.ticket_status = 'init'; // Trạng thái mặc định là "init"

        // Lưu ticket vào cơ sở dữ liệu
        const savedTicket = await ticketRepo.save(ticket);

        // 3. Liên kết ticket với workflow trong bảng phụ

        const ticketWorkflowLink = new WorkflowTicketWorkflowLnk();
        ticketWorkflowLink.ticket = savedTicket;
        ticketWorkflowLink.workflow = workflow;
        ticketWorkflowLink.workflow_ticket_ord = 1; // Thứ tự của ticket trong workflow

        // Lưu mối quan hệ vào bảng phụ
        await ticketWorkflowLnkRepo.save(ticketWorkflowLink);

        return savedTicket;
    }
}
