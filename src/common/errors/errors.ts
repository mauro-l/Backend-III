import { AppError } from "./appError.js";

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  //Este tipo de error indica que el cliente envió datos que no cumplen con las reglas del sistema.
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  //Se usa cuando las credenciales son incorrectas o faltan.
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  //Se usa cuando las credenciales son válidas, pero el usuario no tiene permisos para acceder.
  constructor(message = "Forbidden Error") {
    super(message, 403);
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database Error") {
    super(message, 500);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict Error") {
    super(message, 409); // Código de estado HTTP 409: Conflict
    //Intentar registrar un recurso que ya existe.
    //Dos usuarios o procesos intentan modificar el mismo recurso al mismo tiempo, causando un conflicto.
  }
}
