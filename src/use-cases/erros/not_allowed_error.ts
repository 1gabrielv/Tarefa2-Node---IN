export class NotAllowedError extends Error {
    constructor() {
        super('Ação não permitida.');
        this.name = 'NotAllowedError';
    }
}