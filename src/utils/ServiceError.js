export default class ServiceError extends Error {
    constructor(message, status) {
        super(message); // envia a mensagem pra classe Error
        this.status = status; // adiciona nova variável de status
    }
}