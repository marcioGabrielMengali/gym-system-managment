export class MemberNotFoundError extends Error {
    constructor() {
        super('Member not found');
    }
}