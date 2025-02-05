class TicketService {
    async excuteFunction(functionName: string, params: object) {
        await this[functionName](params);
    }

    async sendMail({email, password}) {
        console.log(email, password)
    }

    async sendNoti({username}) {
        console.log(username)
    }
} 

export default new TicketService();