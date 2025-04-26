export class MemberAlreadyExistsError extends Error {
  constructor() {
    super('Member already exists');
  }
}
