export class GymNotFoundError extends Error {
  constructor() {
    super('Gym not found');
  }
}