import { Types } from "mongoose";

export interface IPet {
  id?: string; // ID del pet (opcional, para uso en la aplicación)
  name: string; // Nombre de la mascota
  specie: string; // Especie de la mascota
  birthdate: Date; // Fecha de nacimiento de la mascota
  gender: string; // Género de la mascota
  adopted?: boolean; // Estado de adopción (opcional, por defecto `false`)
  image?: string | null; // URL de la imagen de la mascota (opcional)
  owner?: Types.ObjectId | string | null; // ID del dueño (puede ser ObjectId o string)
}
