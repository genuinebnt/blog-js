export class AppError extends Error {
  message: string;
  name: string;

  constructor({ message, name }: { message: string; name: string }) {
    super();
    this.name = name;
    this.message = message;
  }
}
