import { DatabaseAdapter } from "@common/infrastructure/database.adapter";

export class TicketService {
    public static async findOneTicKet(id: string) {
        return DatabaseAdapter.instance.query('SELECT * FROM tickets');
    }

    public static async updateTicKet(id: string, status: string) {
        return DatabaseAdapter.instance.query('UPDATE tickets SET ticket_status = $1 WHERE id = $2', [status, id]);
    }
}