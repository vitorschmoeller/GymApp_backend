export class InvalidCredentialsError extends Error {
  constructor() {
    // call the father constructor
    super("Invalid credentials.");
  }
}
