import { Types } from "mongoose";

export interface IUser {
  id?: Types.ObjectId; // ID del usuario (opcional, para uso en la aplicación)
  first_name: string; // Nombre del usuario
  last_name: string; // Apellido del usuario
  email: string; // Correo electrónico del usuario
  password: string; // Contraseña del usuario
  role?: "user" | "admin"; // Rol del usuario (opcional, por defecto "user")
  pets?: Types.ObjectId[]; // Array de referencias a mascotas
}
