export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export interface CustomError extends Error {
  statusCode: number;
  message: string;
  stack?: string;
}
