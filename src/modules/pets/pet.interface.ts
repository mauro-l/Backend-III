import { Types } from "mongoose";

export interface IPet {
  id?: string; // ID del pet (opcional, para uso en la aplicación)
  name: string; // Nombre de la mascota
  specie: string; // Especie de la mascota
  birthday: Date; // Fecha de nacimiento de la mascota
  adopted?: boolean; // Estado de adopción (opcional, por defecto `false`)
  image?: string; // URL de la imagen de la mascota (opcional)
  owner?: Types.ObjectId | string; // ID del dueño (puede ser ObjectId o string)
}
