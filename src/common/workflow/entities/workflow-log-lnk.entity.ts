import {  Entity,  PrimaryGeneratedColumn,  ManyToOne,  JoinColumn,  Column } from 'typeorm';
import { EdaWorkflow } from './workflow.entity';
import { WorkflowLog } from './workflow-log.entity';

@Entity('workflow_logs_workflow_lnk')
export class WorkflowLogLnk {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => WorkflowLog, (log) => log.workflow_log_lnks)
    @JoinColumn({ name: 'workflow_log_id' }) // Khóa ngoại liên kết với workflow_logs
    log: WorkflowLog;

    @ManyToOne(() => EdaWorkflow, (workflow) => workflow.workflow_log_lnks)
    @JoinColumn({ name: 'eda_workflow_id' }) // Khóa ngoại liên kết với eda_workflows
    workflow: EdaWorkflow;

    @Column()
    workflow_log_ord: number; // Thứ tự của ticket trong workflow
}
